/**
 * The kinds of actions tracked per rally, matching the `points.point_type`
 * CHECK constraint in the database. These include both point-winning actions
 * (ace, kill, block, opponent_error) and other tracked actions such as a
 * setter assist, a dig, or a serve/attack error.
 */
export type PointType =
  | 'ace'
  | 'kill'
  | 'block'
  | 'opponent_error'
  | 'assist'
  | 'set_error'
  | 'dig'
  | 'serve_error'
  | 'attack_error'
  | 'other';

/**
 * Raw row shape returned by the Supabase `games` table.
 * Column names use snake_case to match Postgres conventions.
 */
export interface GameRow {
  readonly id: string;
  readonly title: string;
  readonly opponent: string;
  readonly date: string;
  readonly my_score: number;
  readonly opponent_score: number;
  readonly notes: string | null;
  readonly season_id: string | null;
  readonly created_at: string | null;
}

/**
 * Raw row shape returned by the Supabase `seasons` table.
 * Column names use snake_case to match Postgres conventions.
 */
export interface SeasonRow {
  readonly id: string;
  readonly name: string;
  readonly created_at: string | null;
}

/**
 * Describes the current (most recently created) season and how many games I
 * have played in it so far. Used to show an honest "season status" note.
 */
export interface CurrentSeasonInfo {
  readonly name: string;
  readonly gamesPlayed: number;
}

/**
 * The outcome of a single game, ready to be rendered in the results list.
 */
export interface GameResult {
  readonly title: string;
  readonly opponent: string;
  readonly date: string;
  readonly myScore: number;
  readonly opponentScore: number;
  readonly outcome: 'win' | 'loss' | 'draw';
}

/**
 * Raw row shape returned by the Supabase `set_results` table.
 * Column names use snake_case to match Postgres conventions.
 */
export interface SetResultRow {
  readonly id: string;
  readonly game_id: string;
  readonly team_id: string;
  readonly set_number: number;
  readonly my_score: number;
  readonly opponent_score: number;
  readonly created_at: string | null;
}

/**
 * Raw row shape returned by the Supabase `points` table.
 * Column names use snake_case to match Postgres conventions.
 */
export interface PointRow {
  readonly id: string;
  readonly game_id: string;
  readonly point_type: PointType;
  readonly set_number: number;
  readonly scored_by_me: boolean;
  readonly created_at: string | null;
}

/**
 * The share of my scored points that fall into a single point type.
 * `value` is the raw count and `percentage` is its share of all my points.
 */
export interface PointTypeShare {
  readonly type: PointType;
  readonly label: string;
  readonly value: number;
  readonly percentage: number;
}

/**
 * My aggregated setter/player performance across all games, derived entirely
 * from the `points` table. Includes totals, a per-game assist average, and
 * derived efficiency percentages.
 */
export interface SetterStats {
  readonly totalAssists: number;
  readonly assistsPerGame: number;
  readonly totalSetErrors: number;
  readonly assistToErrorRatio: number;
  readonly totalServeAces: number;
  readonly totalServeErrors: number;
  readonly serveEfficiency: number;
  readonly totalAttackKills: number;
  readonly totalAttackErrors: number;
  readonly attackEfficiency: number;
  readonly totalBlocks: number;
  readonly totalDigs: number;
}

/**
 * A current win or loss streak, derived from the ordered game results.
 */
export interface StreakInfo {
  readonly type: 'win' | 'loss' | 'none';
  readonly length: number;
}

/**
 * The outcomes of the last few games, oldest-first, for a compact W-L-D form
 * indicator.
 */
export interface RecentForm {
  readonly outcomes: readonly ('win' | 'loss' | 'draw')[];
}

/**
 * A single highlighted game, used for the biggest win and the closest game.
 *
 * `myScore`/`opponentScore` are the set counts from the `games` row (e.g. 3-1)
 * and `difference` is the set-margin used as a ranking fallback. When the game
 * has real `set_results` rows, `myPoints`/`opponentPoints` carry the total
 * points scored across all sets and `pointDifference` is their signed spread;
 * these drive the ranking and let the card show the actual point spread. They
 * are null for games whose set scores have not been backfilled yet.
 */
export interface HighlightGame {
  readonly title: string;
  readonly opponent: string;
  readonly date: string;
  readonly myScore: number;
  readonly opponentScore: number;
  readonly difference: number;
  readonly myPoints: number | null;
  readonly opponentPoints: number | null;
  readonly pointDifference: number | null;
}

/**
 * The set-balance summary derived from the `set_results` table: how many sets
 * I won versus lost, the resulting win ratio, and the average points scored per
 * set from the real set scores.
 */
export interface SetBalance {
  readonly setsWon: number;
  readonly setsLost: number;
  readonly setsPlayed: number;
  readonly setWinRatio: number;
  readonly averagePointsPerSet: number;
}

/**
 * My win/loss record within a single set number (e.g. all first sets, all
 * tiebreaks), aggregated across the games in scope. Used for an honest
 * "performance by set number" view.
 */
export interface SetNumberPerformance {
  readonly setNumber: number;
  readonly setsWon: number;
  readonly setsLost: number;
  readonly setsPlayed: number;
  readonly winRate: number;
}

/**
 * My point-involvement rate within a single set number, derived from the
 * `points` and `set_results` tables. Counts the points I was personally
 * involved in (points I scored directly plus my assists) as a share of the
 * team points scored in those sets. Only sets that have a matching
 * `set_results` denominator contribute.
 */
export interface SetNumberInvolvement {
  readonly setNumber: number;
  readonly involvements: number;
  readonly teamPoints: number;
  readonly involvementRate: number;
}

/**
 * My overall point-involvement summary plus a per-set-number breakdown. The
 * overall rate is the total involvements across all qualifying sets divided by
 * the team points across those same sets, as a percentage. A set qualifies
 * only when it has a matching `set_results` row to supply the denominator.
 */
export interface PointInvolvement {
  readonly totalInvolvements: number;
  readonly totalTeamPoints: number;
  readonly qualifyingSets: number;
  readonly involvementRate: number;
  readonly bySetNumber: readonly SetNumberInvolvement[];
}

/**
 * My record against a single opponent, with a derived win rate.
 */
export interface OpponentRecord {
  readonly opponent: string;
  readonly wins: number;
  readonly losses: number;
  readonly draws: number;
  readonly winRate: number;
}

/**
 * A single point on the assists-per-game trend timeline.
 */
export interface TrendPoint {
  readonly date: string;
  readonly assists: number;
}

/**
 * Aggregated volleyball statistics derived from the `games` and `points`
 * tables, ready to be rendered by the stats dashboard.
 */
export interface VolleyStats {
  readonly gamesPlayed: number;
  readonly wins: number;
  readonly losses: number;
  readonly winRate: number;
  readonly totalPointsWon: number;
  readonly totalAces: number;
  readonly totalKills: number;
  readonly totalBlocks: number;
  readonly acesPerGame: number;
  readonly killsPerGame: number;
  readonly blocksPerGame: number;
  readonly pointsPerGame: number;
  readonly pointTypeShares: readonly PointTypeShare[];
  readonly setter: SetterStats;
  readonly currentSeason: CurrentSeasonInfo | null;
  readonly results: readonly GameResult[];
  readonly lastGameDate: string | null;
  readonly streak: StreakInfo;
  readonly recentForm: RecentForm;
  readonly bestWin: HighlightGame | null;
  readonly closestGame: HighlightGame | null;
  readonly setBalance: SetBalance;
  readonly setNumberPerformance: readonly SetNumberPerformance[];
  readonly pointInvolvement: PointInvolvement;
  readonly opponentRecords: readonly OpponentRecord[];
  readonly trend: readonly TrendPoint[];
}

/**
 * A single season paired with its own scoped aggregate statistics.
 */
export interface SeasonSummary {
  readonly id: string;
  readonly name: string;
  readonly stats: VolleyStats;
}

/**
 * A compact slice of a season's headline metrics, used for season-to-season
 * comparison.
 */
export interface SeasonComparisonSlice {
  readonly name: string;
  readonly winRate: number;
  readonly assistsPerGame: number;
  readonly pointsPerGame: number;
}

/**
 * A comparison between the current season and the previous one. Either side may
 * be null when not enough seasons are available.
 */
export interface SeasonComparison {
  readonly current: SeasonComparisonSlice | null;
  readonly previous: SeasonComparisonSlice | null;
}

/**
 * The full result returned by the stats service: the whole-career aggregate,
 * a per-season breakdown for the season filter, and a season comparison.
 */
export interface VolleyStatsBundle {
  readonly career: VolleyStats;
  readonly seasons: readonly SeasonSummary[];
  readonly comparison: SeasonComparison;
}
