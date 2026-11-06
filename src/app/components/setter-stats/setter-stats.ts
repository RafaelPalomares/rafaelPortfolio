import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { VolleyStatsService } from '../../services/volley-stats';
import {
  PointTypeShare,
  SetBreakdownEntry,
  SetterStats,
  TrendPoint,
  VolleyStats,
  VolleyStatsBundle,
} from '../../models/volley-stats.model';

/**
 * A single headline metric rendered as an animated count-up tile.
 */
interface StatTile {
  readonly key: string;
  readonly label: string;
  readonly target: number;
  readonly suffix: string;
  readonly decimals: number;
}

/**
 * A single segment of the point-type distribution bar.
 */
interface DistributionSegment {
  readonly label: string;
  readonly percentage: number;
  readonly colorClass: string;
}

/**
 * A single derived setter metric shown in the efficiency breakdown.
 */
interface SetterMetric {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
}

/**
 * One arc segment of the point-type donut chart.
 */
interface DonutSegment {
  readonly label: string;
  readonly percentage: number;
  readonly colorClass: string;
  readonly dashArray: string;
  readonly dashOffset: number;
}

/**
 * One bar of the per-set point breakdown chart.
 */
interface SetBar {
  readonly setNumber: number;
  readonly points: number;
  readonly heightPercent: number;
}

/**
 * The computed SVG geometry for the assists-per-game trend sparkline.
 */
interface TrendChart {
  readonly polylinePoints: string;
  readonly areaPoints: string;
  readonly maxAssists: number;
  readonly hasData: boolean;
}

/**
 * A selectable season option for the season filter control.
 */
interface SeasonOption {
  readonly id: string | null;
  readonly name: string;
}

/**
 * Geometry for one point of the point-type radar polygon.
 */
interface RadarPoint {
  readonly label: string;
  readonly value: number;
  readonly axisX: number;
  readonly axisY: number;
  readonly pointX: number;
  readonly pointY: number;
  readonly labelX: number;
  readonly labelY: number;
}

const RADAR_CENTER = 130;
const RADAR_RADIUS = 95;
const COUNT_UP_DURATION_MS = 1400;

const DONUT_RADIUS = 60;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

const TREND_WIDTH = 280;
const TREND_HEIGHT = 90;
const TREND_PADDING = 10;

/**
 * Maps each point type to a color class used by both the distribution bar and
 * its legend.
 */
const POINT_TYPE_COLORS: Readonly<Record<string, string>> = {
  kill: 'seg-kill',
  ace: 'seg-ace',
  block: 'seg-block',
  opponent_error: 'seg-oppo-error',
  other: 'seg-other',
};

/**
 * Volleyball stats dashboard: animated headline metrics, a point-type
 * distribution bar, and a point-type radar, backed by live data from Supabase.
 */
@Component({
  selector: 'app-setter-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setter-stats.html',
  styleUrl: './setter-stats.scss',
})
export class SetterStatsComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly volleyStatsService = inject(VolleyStatsService);

  private readonly rootRef = viewChild.required<ElementRef<HTMLElement>>('dashboardRoot');

  private statsSubscription: Subscription | null = null;
  private animationFrameId: number | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private hasAnimated = false;

  readonly bundle = signal<VolleyStatsBundle | null>(null);
  readonly selectedSeasonId = signal<string | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly displayValues = signal<Record<string, number>>({});
  readonly radarProgress = signal<number>(0);

  /**
   * The statistics currently in scope: the whole-career aggregate when no
   * season is selected, otherwise the chosen season's aggregate.
   */
  readonly activeStats = computed<VolleyStats | null>(() => {
    const currentBundle = this.bundle();
    if (currentBundle == null) {
      return null;
    }
    const seasonId = this.selectedSeasonId();
    if (seasonId == null) {
      return currentBundle.career;
    }
    const match = currentBundle.seasons.find((season) => season.id === seasonId);
    return match?.stats ?? currentBundle.career;
  });

  /**
   * Convenience alias so existing template bindings can keep reading `stats()`
   * while the active scope is driven by the season filter.
   */
  readonly stats = computed<VolleyStats | null>(() => this.activeStats());

  /**
   * The season options for the filter control, with an "All Seasons" entry
   * first followed by every tracked season.
   */
  readonly seasonOptions = computed<SeasonOption[]>(() => {
    const currentBundle = this.bundle();
    const options: SeasonOption[] = [{ id: null, name: 'All Seasons' }];
    if (currentBundle != null) {
      for (const season of currentBundle.seasons) {
        options.push({ id: season.id, name: season.name });
      }
    }
    return options;
  });

  statTiles: StatTile[] = [];
  distributionSegments: DistributionSegment[] = [];
  donutSegments: DonutSegment[] = [];
  radarPoints: RadarPoint[] = [];
  setterMetrics: SetterMetric[] = [];
  setBars: SetBar[] = [];
  trendChart: TrendChart = { polylinePoints: '', areaPoints: '', maxAssists: 0, hasData: false };

  ngOnInit(): void {
    this.statsSubscription = this.volleyStatsService.getStats().subscribe((bundle) => {
      this.bundle.set(bundle);
      this.isLoading.set(false);
      this.rebuild();
    });
  }

  /**
   * Handles a season filter change, rescoping the dashboard and replaying the
   * reveal animations when they have already run.
   * @param id The selected season id, or null for all seasons
   */
  onSeasonChange(id: string | null): void {
    this.selectedSeasonId.set(id);
    this.rebuild();
  }

  /**
   * Rebuilds the view-model from the active scope and (re)starts animations
   * once the section has been revealed.
   */
  private rebuild(): void {
    const scoped = this.activeStats();
    if (scoped == null) {
      return;
    }
    this.buildViewModel(scoped);
    if (this.hasAnimated) {
      this.startAnimations();
    }
  }

  ngAfterViewInit(): void {
    this.observeVisibility();
  }

  ngOnDestroy(): void {
    this.statsSubscription?.unsubscribe();
    this.intersectionObserver?.disconnect();
    if (this.animationFrameId != null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * Returns the radar polygon points attribute scaled by the current animation
   * progress, growing the shape from the center outward.
   * @returns An SVG points string for the radar polygon
   */
  radarPolygonPoints(): string {
    const progress = this.radarProgress();
    return this.radarPoints
      .map((point) => {
        const x = RADAR_CENTER + (point.pointX - RADAR_CENTER) * progress;
        const y = RADAR_CENTER + (point.pointY - RADAR_CENTER) * progress;
        return `${x},${y}`;
      })
      .join(' ');
  }

  /**
   * Builds the view-model arrays (tiles, distribution segments, radar geometry)
   * from a freshly loaded stats object.
   * @param stats The loaded volleyball statistics
   */
  private buildViewModel(stats: VolleyStats): void {
    this.statTiles = [
      { key: 'gamesPlayed', label: 'Games Played', target: stats.gamesPlayed, suffix: '', decimals: 0 },
      { key: 'winRate', label: 'Win Rate', target: stats.winRate, suffix: '%', decimals: 0 },
      { key: 'totalAssists', label: 'Total Assists', target: stats.setter.totalAssists, suffix: '', decimals: 0 },
      { key: 'assistsPerGame', label: 'Assists / Game', target: stats.setter.assistsPerGame, suffix: '', decimals: 1 },
      { key: 'totalKills', label: 'Total Kills', target: stats.totalKills, suffix: '', decimals: 0 },
      { key: 'totalBlocks', label: 'Blocks', target: stats.totalBlocks, suffix: '', decimals: 0 },
    ];

    this.distributionSegments = this.buildDistributionSegments(stats.pointTypeShares);
    this.donutSegments = this.buildDonutSegments(stats.pointTypeShares);
    this.radarPoints = this.buildRadarPoints(stats.pointTypeShares);
    this.setterMetrics = this.buildSetterMetrics(stats.setter);
    this.setBars = this.buildSetBars(stats.setBreakdown);
    this.trendChart = this.buildTrendChart(stats.trend);

    const initialValues: Record<string, number> = {};
    for (const tile of this.statTiles) {
      initialValues[tile.key] = 0;
    }
    this.displayValues.set(initialValues);
  }

  /**
   * Builds the derived setter efficiency metrics shown below the dashboard.
   * @param setter The aggregated setter statistics
   * @returns The ordered setter metrics
   */
  private buildSetterMetrics(setter: SetterStats): SetterMetric[] {
    return [
      {
        label: 'Attack Efficiency',
        value: `${setter.attackEfficiency}%`,
        detail: `${setter.totalAttackKills} kills · ${setter.totalAttackErrors} errors`,
      },
      {
        label: 'Serve Efficiency',
        value: `${setter.serveEfficiency}%`,
        detail: `${setter.totalServeAces} aces · ${setter.totalServeErrors} errors`,
      },
      {
        label: 'Assist / Error Ratio',
        value: `${setter.assistToErrorRatio}`,
        detail: `${setter.totalAssists} assists · ${setter.totalSetErrors} set errors`,
      },
      {
        label: 'Digs',
        value: `${setter.totalDigs}`,
        detail: 'Defensive saves',
      },
    ];
  }

  /**
   * Builds the point-type distribution segments in display order.
   * @param shares The point-type shares
   * @returns The ordered distribution segments for the bar
   */
  private buildDistributionSegments(shares: readonly PointTypeShare[]): DistributionSegment[] {
    return shares.map((share) => ({
      label: share.label,
      percentage: share.percentage,
      colorClass: POINT_TYPE_COLORS[share.type] ?? 'seg-other',
    }));
  }

  /**
   * Builds the point-type donut segments, laying each arc end-to-end around the
   * ring using circumference-based dash arrays.
   * @param shares The point-type shares
   * @returns The ordered donut segments
   */
  private buildDonutSegments(shares: readonly PointTypeShare[]): DonutSegment[] {
    const segments: DonutSegment[] = [];
    let offsetPercent = 0;

    for (const share of shares) {
      const arc = (share.percentage / 100) * DONUT_CIRCUMFERENCE;
      segments.push({
        label: share.label,
        percentage: share.percentage,
        colorClass: POINT_TYPE_COLORS[share.type] ?? 'seg-other',
        dashArray: `${arc} ${DONUT_CIRCUMFERENCE - arc}`,
        dashOffset: -(offsetPercent / 100) * DONUT_CIRCUMFERENCE,
      });
      offsetPercent += share.percentage;
    }

    return segments;
  }

  /**
   * Builds the per-set bar heights, scaled to the busiest set so the tallest
   * bar fills the chart.
   * @param setBreakdown The per-set point counts
   * @returns The ordered set bars
   */
  private buildSetBars(setBreakdown: readonly SetBreakdownEntry[]): SetBar[] {
    const maxPoints = setBreakdown.reduce((max, entry) => Math.max(max, entry.points), 0);
    return setBreakdown.map((entry) => ({
      setNumber: entry.setNumber,
      points: entry.points,
      heightPercent: maxPoints === 0 ? 0 : Math.round((entry.points / maxPoints) * 100),
    }));
  }

  /**
   * Builds the assists-per-game sparkline geometry. A single data point renders
   * as a flat line, and an empty trend produces an inert chart.
   * @param trend The ordered assists-per-game trend points
   * @returns The computed sparkline geometry
   */
  private buildTrendChart(trend: readonly TrendPoint[]): TrendChart {
    if (trend.length === 0) {
      return { polylinePoints: '', areaPoints: '', maxAssists: 0, hasData: false };
    }

    const maxAssists = trend.reduce((max, point) => Math.max(max, point.assists), 0);
    const innerWidth = TREND_WIDTH - TREND_PADDING * 2;
    const innerHeight = TREND_HEIGHT - TREND_PADDING * 2;
    const baseline = TREND_HEIGHT - TREND_PADDING;

    const coordinates = trend.map((point, index) => {
      const x =
        trend.length === 1
          ? TREND_WIDTH / 2
          : TREND_PADDING + (innerWidth * index) / (trend.length - 1);
      const ratio = maxAssists === 0 ? 0 : point.assists / maxAssists;
      const y = baseline - innerHeight * ratio;
      return { x, y };
    });

    const polylinePoints = coordinates.map((point) => `${point.x},${point.y}`).join(' ');
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    const areaPoints = `${first.x},${baseline} ${polylinePoints} ${last.x},${baseline}`;

    return { polylinePoints, areaPoints, maxAssists, hasData: true };
  }

  /**
   * Computes radar geometry for each point-type share, evenly spaced around a
   * circle. Values are scaled to the largest share so the shape stays readable.
   * @param shares The point-type shares
   * @returns The computed radar points with axis, value, and label coordinates
   */
  private buildRadarPoints(shares: readonly PointTypeShare[]): RadarPoint[] {
    const count = shares.length;
    const maxPercentage = shares.reduce((max, share) => Math.max(max, share.percentage), 0);
    const scale = maxPercentage === 0 ? 0 : 1 / maxPercentage;

    return shares.map((share, index) => {
      const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
      const ratio = share.percentage * scale;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        label: share.label,
        value: share.percentage,
        axisX: RADAR_CENTER + RADAR_RADIUS * cos,
        axisY: RADAR_CENTER + RADAR_RADIUS * sin,
        pointX: RADAR_CENTER + RADAR_RADIUS * ratio * cos,
        pointY: RADAR_CENTER + RADAR_RADIUS * ratio * sin,
        labelX: RADAR_CENTER + (RADAR_RADIUS + 22) * cos,
        labelY: RADAR_CENTER + (RADAR_RADIUS + 22) * sin,
      };
    });
  }

  /**
   * Starts the dashboard visibility observer so animations trigger only when the
   * section scrolls into view.
   */
  private observeVisibility(): void {
    const element = this.rootRef().nativeElement;

    if (typeof IntersectionObserver === 'undefined') {
      this.hasAnimated = true;
      this.startAnimations();
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.startAnimations();
            this.intersectionObserver?.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );

    this.intersectionObserver.observe(element);
  }

  /**
   * Runs the count-up and radar reveal animations for the current stats.
   */
  private startAnimations(): void {
    if (this.stats() == null) {
      return;
    }

    const startTime = performance.now();

    const step = (now: number): void => {
      const elapsed = now - startTime;
      const linear = Math.min(1, elapsed / COUNT_UP_DURATION_MS);
      const eased = this.easeOutCubic(linear);

      const nextValues: Record<string, number> = {};
      for (const tile of this.statTiles) {
        nextValues[tile.key] = tile.target * eased;
      }
      this.displayValues.set(nextValues);
      this.radarProgress.set(eased);

      if (linear < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }

  /**
   * Cubic ease-out easing function.
   * @param t Linear progress between 0 and 1
   * @returns Eased progress between 0 and 1
   */
  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
