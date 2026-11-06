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
  SetBalance,
  SetNumberPerformance,
  SetResultRow,
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
  setBalance: {
    setsWon: 0,
    setsLost: 0,
    setsPlayed: 0,
    setWinRatio: 0,
    averagePointsPerSet: 0,
  },
  setNumberPerformance: [],
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

    // Set results may not be backfilled or readable yet; treat a failure or an
    // empty response as "no set data" rather than breaking the dashboard.
    const setResultsResponse = await client
      .from('set_results')
      .select('id, game_id, team_id, set_number, my_score, opponent_score, created_at');

    const games = (gamesResponse.data ?? []) as readonly GameRow[];
    const points = (pointsResponse.data ?? []) as readonly PointRow[];
    const seasons =
      seasonsResponse.error != null ? [] : ((seasonsResponse.data ?? []) as readonly SeasonRow[]);
    const setResults =
      setResultsResponse.error != null
        ? []
        : ((setResultsResponse.data ?? []) as readonly SetResultRow[]);

    return this.buildBundle(games, points, seasons, setResults);
  }

  /**
   * Builds the full bundle: the whole-career aggregate, a per-season breakdown
   * for the season filter, and a comparison of the two most recent seasons.
   * @param games The visible game rows, newest-first
   * @param points The visible point rows
   * @param seasons The visible season rows, newest-first
   * @param setResults The visible set-result rows
   * @returns The aggregated volleyball bundle
   */
  private buildBundle(
    games: readonly GameRow[],
    points: readonly PointRow[],
    seasons: readonly SeasonRow[],
    setResults: readonly SetResultRow[],
  ): VolleyStatsBundle {
    const career = this.aggregate(games, points, seasons, setResults);

    const seasonSummaries: SeasonSummary[] = seasons.map((season) => {
      const seasonGames = games.filter((game) => game.season_id === season.id);
      const seasonGameIds = new Set(seasonGames.map((game) => game.id));
      const seasonPoints = points.filter((point) => seasonGameIds.has(point.game_id));
      const seasonSetResults = setResults.filter((setResult) =>
        seasonGameIds.has(setResult.game_id),
      );
      return {
        id: season.id,
        name: season.name,
        stats: this.aggregate(seasonGames, seasonPoints, seasons, seasonSetResults),
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
   * Combines games, points, and set results into summary statistics.
   * @param games The visible game rows
   * @param points The visible point rows
   * @param seasons The visible season rows
   * @param setResults The visible set-result rows
   * @returns The aggregated volleyball statistics
   */
  private aggregate(
    games: readonly GameRow[],
    points: readonly PointRow[],
    seasons: readonly SeasonRow[],
    setResults: readonly SetResultRow[],
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

    const highlights = this.buildHighlights(games, setResults);

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
      setBalance: this.buildSetBalance(setResults),
      setNumberPerformance: this.buildSetNumberPerformance(setResults),
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
   * Determines the most dominant win and the closest decided game, ranking by
   * the total points scored across a game's `set_results` rows rather than by
   * the set-margin on the games row.
   *
   * For each game its set-result rows are summed into `myPoints`/`oppPoints`
   * and `pointDifference = myPoints - oppPoints`. Games that have been
   * backfilled with set scores rank by that signed point spread; games with no
   * set-result rows fall back cleanly to the games-row set-margin
   * (`my_score - opponent_score`). To keep the ranking honest with mixed data,
   * a game that has real point data always outranks one that only has the
   * set-margin fallback, so the point-based ordering takes over as soon as any
   * set scores exist while never breaking before they do. With no set-result
   * rows at all the behaviour is identical to the plain set-margin ranking.
   * @param games The visible game rows
   * @param setResults The visible set-result rows
   * @returns The best win and closest game, each null when unavailable
   */
  private buildHighlights(
    games: readonly GameRow[],
    setResults: readonly SetResultRow[],
  ): {
    bestWin: HighlightGame | null;
    closestGame: HighlightGame | null;
  } {
    const pointsByGame = this.sumSetPointsByGame(setResults);

    let bestWin: HighlightGame | null = null;
    let closestGame: HighlightGame | null = null;

    for (const game of games) {
      if (game.my_score === game.opponent_score) {
        continue;
      }

      const setMargin = game.my_score - game.opponent_score;
      const gamePoints = pointsByGame.get(game.id) ?? null;
      const hasPoints = gamePoints != null;
      const pointDifference = hasPoints ? gamePoints.myPoints - gamePoints.oppPoints : null;
      // Rank by the signed point spread when set scores exist, otherwise by the
      // set-margin. `difference` keeps the set-margin for display/fallback.
      const rankingValue = pointDifference ?? setMargin;

      const highlight: HighlightGame = {
        title: game.title,
        opponent: game.opponent,
        date: game.date,
        myScore: game.my_score,
        opponentScore: game.opponent_score,
        difference: setMargin,
        myPoints: hasPoints ? gamePoints.myPoints : null,
        opponentPoints: hasPoints ? gamePoints.oppPoints : null,
        pointDifference,
      };

      if (rankingValue > 0 && this.outranksBestWin(bestWin, hasPoints, rankingValue)) {
        bestWin = highlight;
      }

      if (this.outranksClosestGame(closestGame, hasPoints, rankingValue)) {
        closestGame = highlight;
      }
    }

    return { bestWin, closestGame };
  }

  /**
   * Sums the per-game point totals across a game's `set_results` rows. Rows
   * with a non-positive set number are ignored, matching the other set-based
   * aggregations. Games without any set-result rows are simply absent from the
   * map so the caller can fall back to the games-row set-margin.
   * @param setResults The visible set-result rows
   * @returns A map from game id to its summed points for and against
   */
  private sumSetPointsByGame(
    setResults: readonly SetResultRow[],
  ): Map<string, { myPoints: number; oppPoints: number }> {
    const pointsByGame = new Map<string, { myPoints: number; oppPoints: number }>();

    for (const setResult of setResults) {
      if (!Number.isInteger(setResult.set_number) || setResult.set_number <= 0) {
        continue;
      }
      const entry = pointsByGame.get(setResult.game_id) ?? { myPoints: 0, oppPoints: 0 };
      entry.myPoints += setResult.my_score;
      entry.oppPoints += setResult.opponent_score;
      pointsByGame.set(setResult.game_id, entry);
    }

    return pointsByGame;
  }

  /**
   * Decides whether a candidate should replace the current biggest win. A
   * candidate with real point data always beats one ranked only by the
   * set-margin fallback; otherwise the larger signed spread wins.
   * @param current The current best win, or null when none chosen yet
   * @param candidateHasPoints Whether the candidate has real point data
   * @param candidateValue The candidate's signed ranking spread
   * @returns True when the candidate should become the new best win
   */
  private outranksBestWin(
    current: HighlightGame | null,
    candidateHasPoints: boolean,
    candidateValue: number,
  ): boolean {
    if (current == null) {
      return true;
    }
    const currentHasPoints = current.pointDifference != null;
    if (candidateHasPoints !== currentHasPoints) {
      return candidateHasPoints;
    }
    const currentValue = current.pointDifference ?? current.difference;
    return candidateValue > currentValue;
  }

  /**
   * Decides whether a candidate should replace the current closest game. A
   * candidate with real point data always beats one ranked only by the
   * set-margin fallback; otherwise the smaller absolute spread wins.
   * @param current The current closest game, or null when none chosen yet
   * @param candidateHasPoints Whether the candidate has real point data
   * @param candidateValue The candidate's signed ranking spread
   * @returns True when the candidate should become the new closest game
   */
  private outranksClosestGame(
    current: HighlightGame | null,
    candidateHasPoints: boolean,
    candidateValue: number,
  ): boolean {
    if (current == null) {
      return true;
    }
    const currentHasPoints = current.pointDifference != null;
    if (candidateHasPoints !== currentHasPoints) {
      return candidateHasPoints;
    }
    const currentValue = current.pointDifference ?? current.difference;
    return Math.abs(candidateValue) < Math.abs(currentValue);
  }

  /**
   * Builds the set-balance summary from the real set scores: sets won versus
   * lost (a set is won when my score beats the opponent's), the resulting win
   * ratio, and the average points scored per set. Tied set scores count as
   * played but neither won nor lost. Returns a clean zero-state when no set
   * results have been backfilled yet.
   * @param setResults The visible set-result rows
   * @returns The aggregated set balance
   */
  private buildSetBalance(setResults: readonly SetResultRow[]): SetBalance {
    let setsWon = 0;
    let setsLost = 0;
    let setsPlayed = 0;
    let totalPoints = 0;

    for (const setResult of setResults) {
      if (!Number.isInteger(setResult.set_number) || setResult.set_number <= 0) {
        continue;
      }
      setsPlayed += 1;
      totalPoints += setResult.my_score;
      if (setResult.my_score > setResult.opponent_score) {
        setsWon += 1;
      } else if (setResult.my_score < setResult.opponent_score) {
        setsLost += 1;
      }
    }

    const decidedSets = setsWon + setsLost;
    const setWinRatio = decidedSets === 0 ? 0 : Math.round((setsWon / decidedSets) * 1000) / 10;
    const averagePointsPerSet =
      setsPlayed === 0 ? 0 : Math.round((totalPoints / setsPlayed) * 10) / 10;

    return {
      setsWon,
      setsLost,
      setsPlayed,
      setWinRatio,
      averagePointsPerSet,
    };
  }

  /**
   * Groups the real set results by set number and computes a win/loss record
   * and win rate for each, giving an honest "performance by set number" view
   * (first set versus fifth-set tiebreak, and so on). Rows with a non-positive
   * set number are ignored.
   * @param setResults The visible set-result rows
   * @returns The per-set-number performance, ascending by set number
   */
  private buildSetNumberPerformance(
    setResults: readonly SetResultRow[],
  ): readonly SetNumberPerformance[] {
    const perSetNumber = new Map<number, { setsWon: number; setsLost: number; setsPlayed: number }>();

    for (const setResult of setResults) {
      if (!Number.isInteger(setResult.set_number) || setResult.set_number <= 0) {
        continue;
      }
      const entry =
        perSetNumber.get(setResult.set_number) ?? { setsWon: 0, setsLost: 0, setsPlayed: 0 };
      entry.setsPlayed += 1;
      if (setResult.my_score > setResult.opponent_score) {
        entry.setsWon += 1;
      } else if (setResult.my_score < setResult.opponent_score) {
        entry.setsLost += 1;
      }
      perSetNumber.set(setResult.set_number, entry);
    }

    return [...perSetNumber.entries()]
      .map(([setNumber, record]) => {
        const decided = record.setsWon + record.setsLost;
        const winRate = decided === 0 ? 0 : Math.round((record.setsWon / decided) * 1000) / 10;
        return {
          setNumber,
          setsWon: record.setsWon,
          setsLost: record.setsLost,
          setsPlayed: record.setsPlayed,
          winRate,
        };
      })
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
