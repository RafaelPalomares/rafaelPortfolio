import { Injectable } from '@angular/core';
import { catchError, from, Observable, of } from 'rxjs';
import {
  GameRow,
  PointRow,
  PointType,
  PointTypeShare,
  SetterStats,
  VolleyStats,
} from '../models/volley-stats.model';
import { SupabaseClientService } from './supabase-client';

/**
 * Human-readable labels for each point type, in the order they should be
 * displayed in the breakdown.
 */
const POINT_TYPE_LABELS: ReadonlyArray<{ readonly type: PointType; readonly label: string }> = [
  { type: 'kill', label: 'Kills' },
  { type: 'ace', label: 'Aces' },
  { type: 'block', label: 'Blocks' },
  { type: 'opponent_error', label: 'Opponent Errors' },
  { type: 'other', label: 'Other' },
];

/**
 * Empty statistics used when no data is available or a request fails, so the
 * dashboard can render a clean zero-state instead of breaking.
 */
/**
 * Empty setter statistics used as part of the zero-state.
 */
const EMPTY_SETTER_STATS: SetterStats = {
  totalAssists: 0,
  assistsPerGame: 0,
  totalSetErrors: 0,
  assistToErrorRatio: 0,
  totalServeAces: 0,
  totalServeErrors: 0,
  serveEfficiency: 0,
  totalAttackKills: 0,
  totalAttackErrors: 0,
  attackEfficiency: 0,
  totalBlocks: 0,
  totalDigs: 0,
};

/**
 * Empty statistics used when no data is available or a request fails, so the
 * dashboard can render a clean zero-state instead of breaking.
 */
const EMPTY_STATS: VolleyStats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  totalPointsWon: 0,
  totalAces: 0,
  totalKills: 0,
  totalBlocks: 0,
  acesPerGame: 0,
  killsPerGame: 0,
  blocksPerGame: 0,
  pointsPerGame: 0,
  pointTypeShares: POINT_TYPE_LABELS.map((entry) => ({
    type: entry.type,
    label: entry.label,
    value: 0,
    percentage: 0,
  })),
  setter: EMPTY_SETTER_STATS,
  lastGameDate: null,
};

/**
 * Reads volleyball game and point data from Supabase and aggregates it into
 * summary statistics (totals, per-game averages, and a point-type breakdown).
 *
 * Which rows are visible is determined entirely by the Row Level Security
 * policies on the `games` and `points` tables, so this service never needs to
 * know or send a user identifier.
 */
@Injectable({
  providedIn: 'root',
})
export class VolleyStatsService {
  private readonly supabase: SupabaseClientService;

  constructor(supabase: SupabaseClientService) {
    this.supabase = supabase;
  }

  /**
   * Loads all visible games and points and returns aggregated statistics.
   * Emits empty statistics if the request fails for any reason.
   * @returns An observable that emits the aggregated volleyball statistics
   */
  public getStats(): Observable<VolleyStats> {
    return from(this.loadStats()).pipe(catchError(() => of(EMPTY_STATS)));
  }

  /**
   * Fetches the raw rows from Supabase and builds the aggregated result.
   * @returns A promise resolving to the aggregated volleyball statistics
   */
  private async loadStats(): Promise<VolleyStats> {
    const client = this.supabase.getClient();

    const gamesResponse = await client
      .from('games')
      .select('id, title, opponent, date, my_score, opponent_score, notes, created_at')
      .order('date', { ascending: false });

    if (gamesResponse.error != null) {
      throw new Error(`Failed to load games: ${gamesResponse.error.message}`);
    }

    const pointsResponse = await client
      .from('points')
      .select('id, game_id, point_type, set_number, scored_by_me, created_at');

    if (pointsResponse.error != null) {
      throw new Error(`Failed to load points: ${pointsResponse.error.message}`);
    }

    const games = (gamesResponse.data ?? []) as readonly GameRow[];
    const points = (pointsResponse.data ?? []) as readonly PointRow[];

    return this.aggregate(games, points);
  }

  /**
   * Combines games and points into summary statistics.
   * @param games The visible game rows
   * @param points The visible point rows
   * @returns The aggregated volleyball statistics
   */
  private aggregate(games: readonly GameRow[], points: readonly PointRow[]): VolleyStats {
    const gamesPlayed = games.length;

    let wins = 0;
    let losses = 0;
    for (const game of games) {
      if (game.my_score > game.opponent_score) {
        wins += 1;
      } else if (game.my_score < game.opponent_score) {
        losses += 1;
      }
    }

    const counts = this.countPointsByType(points);
    const totalPointsWon = POINT_TYPE_LABELS.reduce((sum, entry) => sum + counts[entry.type], 0);

    const perGame = (total: number): number =>
      gamesPlayed === 0 ? 0 : Math.round((total / gamesPlayed) * 100) / 100;

    const pointTypeShares = this.buildPointTypeShares(counts, totalPointsWon);
    const setter = this.buildSetterStats(points, gamesPlayed);

    return {
      gamesPlayed,
      wins,
      losses,
      totalPointsWon,
      totalAces: counts.ace,
      totalKills: counts.kill,
      totalBlocks: counts.block,
      acesPerGame: perGame(counts.ace),
      killsPerGame: perGame(counts.kill),
      blocksPerGame: perGame(counts.block),
      pointsPerGame: perGame(totalPointsWon),
      pointTypeShares,
      setter,
      lastGameDate: games.length > 0 ? games[0].date : null,
    };
  }

  /**
   * Derives my aggregated setter/player statistics from the raw point rows.
   *
   * Efficiency percentages follow standard volleyball conventions:
   * - Serve efficiency: (aces - serve errors) / serve attempts
   * - Attack efficiency: (kills - attack errors) / attack attempts
   * - Reception positive %: successful receptions / reception attempts
   *
   * Attempt totals are reconstructed from the tracked outcome rows, so the
   * percentages are only as complete as the data that was entered.
   * @param points The visible point rows
   * @param gamesPlayed The number of games, used for per-game averages
   * @returns The aggregated setter statistics
   */
  private buildSetterStats(points: readonly PointRow[], gamesPlayed: number): SetterStats {
    const totals: Record<PointType, number> = {
      ace: 0,
      kill: 0,
      block: 0,
      opponent_error: 0,
      assist: 0,
      set_error: 0,
      dig: 0,
      serve_error: 0,
      attack_error: 0,
      reception: 0,
      reception_error: 0,
      other: 0,
    };

    for (const point of points) {
      totals[point.point_type] += 1;
    }

    const serveAttempts = totals.ace + totals.serve_error;
    const attackAttempts = totals.kill + totals.attack_error;

    const efficiency = (positive: number, negative: number, attempts: number): number =>
      attempts === 0 ? 0 : Math.round(((positive - negative) / attempts) * 1000) / 10;

    const assistsPerGame =
      gamesPlayed === 0 ? 0 : Math.round((totals.assist / gamesPlayed) * 100) / 100;

    // Assist-to-error ratio: how many clean assists per setting error. When
    // there are no setting errors, the ratio equals the assist count so a
    // flawless record still reads as a strong number rather than infinity.
    const assistToErrorRatio =
      totals.set_error === 0
        ? totals.assist
        : Math.round((totals.assist / totals.set_error) * 10) / 10;

    return {
      totalAssists: totals.assist,
      assistsPerGame,
      totalSetErrors: totals.set_error,
      assistToErrorRatio,
      totalServeAces: totals.ace,
      totalServeErrors: totals.serve_error,
      serveEfficiency: efficiency(totals.ace, totals.serve_error, serveAttempts),
      totalAttackKills: totals.kill,
      totalAttackErrors: totals.attack_error,
      attackEfficiency: efficiency(totals.kill, totals.attack_error, attackAttempts),
      totalBlocks: totals.block,
      totalDigs: totals.dig,
    };
  }

  /**
   * Counts the points I scored, grouped by point type.
   * @param points The visible point rows
   * @returns A record mapping each point type to the number of points I scored
   */
  private countPointsByType(points: readonly PointRow[]): Record<PointType, number> {
    const counts: Record<PointType, number> = {
      ace: 0,
      kill: 0,
      block: 0,
      opponent_error: 0,
      assist: 0,
      set_error: 0,
      dig: 0,
      serve_error: 0,
      attack_error: 0,
      reception: 0,
      reception_error: 0,
      other: 0,
    };

    for (const point of points) {
      if (point.scored_by_me) {
        counts[point.point_type] += 1;
      }
    }

    return counts;
  }

  /**
   * Builds the ordered point-type breakdown with percentage shares.
   * @param counts The per-type point counts
   * @param total The total number of points I scored
   * @returns The ordered point-type shares
   */
  private buildPointTypeShares(
    counts: Record<PointType, number>,
    total: number,
  ): readonly PointTypeShare[] {
    return POINT_TYPE_LABELS.map((entry) => {
      const value = counts[entry.type];
      const percentage = total === 0 ? 0 : Math.round((value / total) * 1000) / 10;
      return {
        type: entry.type,
        label: entry.label,
        value,
        percentage,
      };
    });
  }
}
