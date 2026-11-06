/**
 * The kinds of actions tracked per rally, matching the `points.point_type`
 * CHECK constraint in the database. These include both point-winning actions
 * (ace, kill, block, opponent_error) and other tracked actions such as a
 * setter assist, a dig, or a serve/attack/reception error.
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
  | 'reception'
  | 'reception_error'
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
 * Aggregated volleyball statistics derived from the `games` and `points`
 * tables, ready to be rendered by the stats dashboard.
 */
export interface VolleyStats {
  readonly gamesPlayed: number;
  readonly wins: number;
  readonly losses: number;
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
  readonly lastGameDate: string | null;
}
