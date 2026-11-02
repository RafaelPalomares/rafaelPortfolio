import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { VolleyballPlayer } from '../../models/portfolio.model';

export interface SetterPlay {
  id: string;
  name: string;
  targetZone: string;
  tempo: string;
  description: string;
  tacticalWhy: string;
  ballPath: { x1: number; y1: number; x2: number; y2: number };
}

@Component({
  selector: 'app-volleyball',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volleyball.html',
  styleUrl: './volleyball.scss',
})
export class VolleyballComponent implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  favPlayers = signal<VolleyballPlayer[]>([]);
  openPlayerCopyright = signal<string | null>(null);

  plays: SetterPlay[] = [
    {
      id: 'quick1',
      name: 'Quick 1 (Middle Attack)',
      targetZone: 'Zone 3 (Center Net)',
      tempo: '1st Tempo · Rapid Fire',
      description: 'The middle blocker takes off before the ball even reaches the setter’s hands. Caught at the peak of the jump with zero delay.',
      tacticalWhy: 'Bypasses the opposing middle blocker before they can commit, forcing the defense to freeze in the middle.',
      ballPath: { x1: 270, y1: 140, x2: 240, y2: 90 },
    },
    {
      id: 'outside4',
      name: 'High Ball Outside',
      targetZone: 'Zone 4 (Left Pin)',
      tempo: '2nd / High Tempo',
      description: 'A crisp, high-arching ball pushed all the way out to the left antenna, giving the outside hitter maximum elevation and vision.',
      tacticalWhy: 'Provides the hitter room to tool off the block or hit sharp cross-court angles past the perimeter diggers.',
      ballPath: { x1: 270, y1: 140, x2: 60, y2: 85 },
    },
    {
      id: 'pipe6',
      name: 'Back-Row Pipe Attack',
      targetZone: 'Zone 6 (3m Line Center)',
      tempo: '1.5 Tempo',
      description: 'A flat, driving set delivered directly over the 3-meter line to an oncoming back-row attacker surging from deep court.',
      tacticalWhy: 'Exploits the seams between the blockers when the middle blocker is committed to the front court attack.',
      ballPath: { x1: 270, y1: 140, x2: 200, y2: 230 },
    },
    {
      id: 'back2',
      name: 'Back-Set to Opposite',
      targetZone: 'Zone 2 (Right Pin)',
      tempo: '2nd Tempo',
      description: 'The setter arches their back slightly and pushes an inverted ball blind behind their head to the opposite attacker.',
      tacticalWhy: 'Draws the opposing middle toward the left, opening an isolated 1-on-1 single block on the right pin.',
      ballPath: { x1: 270, y1: 140, x2: 340, y2: 85 },
    },
    {
      id: 'dump',
      name: 'Second-Touch Setter Dump',
      targetZone: 'Zone 4 / 3 (Empty Campfire)',
      tempo: 'Instant Surprise',
      description: 'Faking a high set with square shoulders, the setter flicks their left wrist and tips the ball directly into an open pocket on the opponent’s floor.',
      tacticalWhy: 'Keeps opposing blockers honest; when they jump to block the middle, the dump lands completely uncontested.',
      ballPath: { x1: 270, y1: 140, x2: 250, y2: 40 },
    },
  ];

  selectedPlay = signal<SetterPlay>(this.plays[0]);

  ngOnInit(): void {
    this.portfolioService.getData().subscribe((data) => {
      this.favPlayers.set(data.volleyballPlayers);
    });
  }

  selectPlay(play: SetterPlay): void {
    this.selectedPlay.set(play);
  }

  togglePlayerCopyright(name: string): void {
    this.openPlayerCopyright.set(this.openPlayerCopyright() === name ? null : name);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
