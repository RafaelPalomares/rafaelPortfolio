import { Injectable } from '@angular/core';
import { catchError, from, Observable, of } from 'rxjs';
import {
  CurrentSeasonInfo,
  GameResult,
  GameRow,
  HighlightGame,
  OpponentRecord,
  PointRow,
  PointType,
  PointTypeShare,
  RecentForm,
  SeasonComparison,
  SeasonComparisonSlice,
  SeasonRow,
  SeasonSummary,
  SetBreakdownEntry,
  SetterStats,
  StreakInfo,
  TrendPoint,
  VolleyStats,
  VolleyStatsBundle,
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
  winRate: 0,
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
  currentSeason: null,
  results: [],
  lastGameDate: null,
  streak: { type: 'none', length: 0 },
  recentForm: { outcomes: [] },
  bestWin: null,
  closestGame: null,
  setBreakdown: [],
  opponentRecords: [],
  trend: [],
};

/**
 * Empty bundle used when no data is available or a request fails, so the
 * dashboard can render a clean zero-state instead of breaking.
 */
const EMPTY_BUNDLE: VolleyStatsBundle = {
  career: EMPTY_STATS,
  seasons: [],
  comparison: { current: null, previous: null },
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
   * Loads all visible games and points and returns the aggregated bundle.
   * Emits an empty bundle if the request fails for any reason.
   * @returns An observable that emits the aggregated volleyball bundle
   */
  public getStats(): Observable<VolleyStatsBundle> {
    return from(this.loadStats()).pipe(catchError(() => of(EMPTY_BUNDLE)));
  }

  /**
   * Fetches the raw rows from Supabase and builds the aggregated bundle.
   * @returns A promise resolving to the aggregated volleyball bundle
   */
  private async loadStats(): Promise<VolleyStatsBundle> {
    const client = this.supabase.getClient();

    const gamesResponse = await client
      .from('games')
      .select('id, title, opponent, date, my_score, opponent_score, notes, season_id, created_at')
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

    // Seasons may not be readable (e.g. no policy yet); treat a failure as
    // "no season info" rather than breaking the whole dashboard.
    const seasonsResponse = await client
      .from('seasons')
      .select('id, name, created_at')
      .order('created_at', { ascending: false });

    const games = (gamesResponse.data ?? []) as readonly GameRow[];
    const points = (pointsResponse.data ?? []) as readonly PointRow[];
    const seasons =
      seasonsResponse.error != null ? [] : ((seasonsResponse.data ?? []) as readonly SeasonRow[]);

    return this.buildBundle(games, points, seasons);
  }

  /**
   * Builds the full bundle: the whole-career aggregate, a per-season breakdown
   * for the season filter, and a comparison of the two most recent seasons.
   * @param games The visible game rows, newest-first
   * @param points The visible point rows
   * @param seasons The visible season rows, newest-first
   * @returns The aggregated volleyball bundle
   */
  private buildBundle(
    games: readonly GameRow[],
    points: readonly PointRow[],
    seasons: readonly SeasonRow[],
  ): VolleyStatsBundle {
    const career = this.aggregate(games, points, seasons);

    const seasonSummaries: SeasonSummary[] = seasons.map((season) => {
      const seasonGames = games.filter((game) => game.season_id === season.id);
      const seasonGameIds = new Set(seasonGames.map((game) => game.id));
      const seasonPoints = points.filter((point) => seasonGameIds.has(point.game_id));
      return {
        id: season.id,
        name: season.name,
        stats: this.aggregate(seasonGames, seasonPoints, seasons),
      };
    });

    const comparison = this.buildSeasonComparison(seasonSummaries);

    return {
      career,
      seasons: seasonSummaries,
      comparison,
    };
  }

  /**
   * Builds a comparison between the current season and the previous one. The
   * season summaries are expected newest-first, so the first two entries are
   * used when available.
   * @param summaries The per-season summaries, newest-first
   * @returns The season comparison, with null sides when data is missing
   */
  private buildSeasonComparison(summaries: readonly SeasonSummary[]): SeasonComparison {
    const toSlice = (summary: SeasonSummary): SeasonComparisonSlice => ({
      name: summary.name,
      winRate: summary.stats.winRate,
      assistsPerGame: summary.stats.setter.assistsPerGame,
      pointsPerGame: summary.stats.pointsPerGame,
    });

    return {
      current: summaries.length > 0 ? toSlice(summaries[0]) : null,
      previous: summaries.length > 1 ? toSlice(summaries[1]) : null,
    };
  }

  /**
   * Combines games and points into summary statistics.
   * @param games The visible game rows
   * @param points The visible point rows
   * @returns The aggregated volleyball statistics
   */
  private aggregate(
    games: readonly GameRow[],
    points: readonly PointRow[],
    seasons: readonly SeasonRow[],
  ): VolleyStats {
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
    const currentSeason = this.buildCurrentSeasonInfo(games, seasons);
    const results = this.buildResults(games);

    const decidedGames = wins + losses;
    const winRate = decidedGames === 0 ? 0 : Math.round((wins / decidedGames) * 1000) / 10;

    const highlights = this.buildHighlights(games);

    return {
      gamesPlayed,
      wins,
      losses,
      winRate,
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
      currentSeason,
      results,
      lastGameDate: games.length > 0 ? games[0].date : null,
      streak: this.buildStreak(results),
      recentForm: this.buildRecentForm(results),
      bestWin: highlights.bestWin,
      closestGame: highlights.closestGame,
      setBreakdown: this.buildSetBreakdown(points),
      opponentRecords: this.buildOpponentRecords(games),
      trend: this.buildTrend(games, points),
    };
  }

  /**
   * Computes the current win or loss streak from the ordered results.
   * @param results The game results, newest-first
   * @returns The current streak type and length
   */
  private buildStreak(results: readonly GameResult[]): StreakInfo {
    let length = 0;
    let type: StreakInfo['type'] = 'none';

    for (const result of results) {
      if (result.outcome === 'draw') {
        break;
      }
      if (type === 'none') {
        type = result.outcome;
        length = 1;
      } else if (result.outcome === type) {
        length += 1;
      } else {
        break;
      }
    }

    return { type, length };
  }

  /**
   * Builds the recent-form indicator from the last five games.
   * @param results The game results, newest-first
   * @returns The last five outcomes, oldest-first
   */
  private buildRecentForm(results: readonly GameResult[]): RecentForm {
    const lastFive = results.slice(0, 5).map((result) => result.outcome);
    return { outcomes: [...lastFive].reverse() };
  }

  /**
   * Determines the biggest-margin win and the closest decided game.
   * @param games The visible game rows
   * @returns The best win and closest game, each null when unavailable
   */
  private buildHighlights(games: readonly GameRow[]): {
    bestWin: HighlightGame | null;
    closestGame: HighlightGame | null;
  } {
    let bestWin: HighlightGame | null = null;
    let closestGame: HighlightGame | null = null;

    for (const game of games) {
      if (game.my_score === game.opponent_score) {
        continue;
      }

      const difference = game.my_score - game.opponent_score;
      const highlight: HighlightGame = {
        title: game.title,
        opponent: game.opponent,
        date: game.date,
        myScore: game.my_score,
        opponentScore: game.opponent_score,
        difference,
      };

      if (difference > 0 && (bestWin == null || difference > bestWin.difference)) {
        bestWin = highlight;
      }

      const absDifference = Math.abs(difference);
      if (closestGame == null || absDifference < Math.abs(closestGame.difference)) {
        closestGame = highlight;
      }
    }

    return { bestWin, closestGame };
  }

  /**
   * Counts the points I scored, grouped by positive set number and sorted
   * ascending. Rows with a non-positive set number are ignored.
   * @param points The visible point rows
   * @returns The per-set point counts, ascending by set number
   */
  private buildSetBreakdown(points: readonly PointRow[]): readonly SetBreakdownEntry[] {
    const perSet = new Map<number, number>();

    for (const point of points) {
      if (!point.scored_by_me) {
        continue;
      }
      if (!Number.isInteger(point.set_number) || point.set_number <= 0) {
        continue;
      }
      perSet.set(point.set_number, (perSet.get(point.set_number) ?? 0) + 1);
    }

    return [...perSet.entries()]
      .map(([setNumber, pointsScored]) => ({ setNumber, points: pointsScored }))
      .sort((entryA, entryB) => entryA.setNumber - entryB.setNumber);
  }

  /**
   * Groups games by opponent and computes a record and win rate for each.
   * @param games The visible game rows
   * @returns The per-opponent records, sorted by games played then win rate
   */
  private buildOpponentRecords(games: readonly GameRow[]): readonly OpponentRecord[] {
    const perOpponent = new Map<string, { wins: number; losses: number; draws: number }>();

    for (const game of games) {
      const entry = perOpponent.get(game.opponent) ?? { wins: 0, losses: 0, draws: 0 };
      if (game.my_score > game.opponent_score) {
        entry.wins += 1;
      } else if (game.my_score < game.opponent_score) {
        entry.losses += 1;
      } else {
        entry.draws += 1;
      }
      perOpponent.set(game.opponent, entry);
    }

    return [...perOpponent.entries()]
      .map(([opponent, record]) => {
        const decided = record.wins + record.losses;
        const winRate = decided === 0 ? 0 : Math.round((record.wins / decided) * 1000) / 10;
        return {
          opponent,
          wins: record.wins,
          losses: record.losses,
          draws: record.draws,
          winRate,
        };
      })
      .sort((recordA, recordB) => {
        const playedA = recordA.wins + recordA.losses + recordA.draws;
        const playedB = recordB.wins + recordB.losses + recordB.draws;
        if (playedB !== playedA) {
          return playedB - playedA;
        }
        return recordB.winRate - recordA.winRate;
      });
  }

  /**
   * Builds the assists-per-game trend across the game timeline, oldest-first.
   * @param games The visible game rows
   * @param points The visible point rows
   * @returns The ordered trend points
   */
  private buildTrend(
    games: readonly GameRow[],
    points: readonly PointRow[],
  ): readonly TrendPoint[] {
    const assistsByGame = new Map<string, number>();
    for (const point of points) {
      if (point.scored_by_me && point.point_type === 'assist') {
        assistsByGame.set(point.game_id, (assistsByGame.get(point.game_id) ?? 0) + 1);
      }
    }

    const ordered = [...games].sort((gameA, gameB) => gameA.date.localeCompare(gameB.date));

    return ordered.map((game) => ({
      date: game.date,
      assists: assistsByGame.get(game.id) ?? 0,
    }));
  }

  /**
   * Maps the raw game rows into display-ready results, newest first.
   * @param games The visible game rows, expected newest-first
   * @returns The ordered game results
   */
  private buildResults(games: readonly GameRow[]): readonly GameResult[] {
    return games.map((game) => {
      let outcome: GameResult['outcome'] = 'draw';
      if (game.my_score > game.opponent_score) {
        outcome = 'win';
      } else if (game.my_score < game.opponent_score) {
        outcome = 'loss';
      }

      return {
        title: game.title,
        opponent: game.opponent,
        date: game.date,
        myScore: game.my_score,
        opponentScore: game.opponent_score,
        outcome,
      };
    });
  }

  /**
   * Determines the current season (the most recently created one) and counts
   * how many games belong to it. The headline stats always reflect my whole
   * career; this is only used to show an honest status note for the ongoing
   * season, which may still be empty.
   * @param games The visible game rows
   * @param seasons The visible season rows, expected newest-first
   * @returns The current season info, or null when no season data is available
   */
  private buildCurrentSeasonInfo(
    games: readonly GameRow[],
    seasons: readonly SeasonRow[],
  ): CurrentSeasonInfo | null {
    if (seasons.length === 0) {
      return null;
    }

    const current = seasons[0];
    const gamesPlayed = games.filter((game) => game.season_id === current.id).length;

    return {
      name: current.name,
      gamesPlayed,
    };
  }

  /**
   * Derives my aggregated setter/player statistics from the raw point rows.
   *
   * Efficiency percentages follow standard volleyball conventions:
   * - Serve efficiency: (aces - serve errors) / serve attempts
   * - Attack efficiency: (kills - attack errors) / attack attempts
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
