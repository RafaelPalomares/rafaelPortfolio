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
  openPlayerVideo = signal<string | null>(null);

  plays: SetterPlay[] = [
    {
      id: 'quick1',
      name: 'Quick 1 (Middle Attack)',
      targetZone: 'Zone 3 (Center Net)',
      tempo: '1st Tempo · Rapid Fire',
      description: 'The middle blocker takes off before the ball even reaches the setter’s hands. Caught at the peak of the jump with zero delay.',
      tacticalWhy: 'Bypasses the opposing middle blocker before they can commit, forcing the defense to freeze in the middle.',
      ballPath: { x1: 270, y1: 75, x2: 200, y2: 68 },
    },
    {
      id: 'shoot',
      name: 'Shoot (Wide Middle Quick)',
      targetZone: 'Left Gap (Z3 → Z4)',
      tempo: '1st Tempo · Fast & Wide',
      description: 'The middle blocker runs a 1st-tempo quick far away from the setter, attacking a flat, fast ball out in the gap toward the left side instead of right in front of the setter.',
      tacticalWhy: 'Stretching the quick wide pulls the opposing middle blocker out of the center, opening huge seams for the pins and the back row.',
      ballPath: { x1: 270, y1: 75, x2: 120, y2: 66 },
    },
    {
      id: 'backone',
      name: 'Back One (Quick Behind)',
      targetZone: 'Just Behind Setter',
      tempo: '1st Tempo · Rapid Fire',
      description: 'A quick 1st-tempo ball set blind directly behind the setter’s head, meeting the middle blocker at the peak of the jump just behind the setter.',
      tacticalWhy: 'Mirrors the front quick on the back shoulder, keeping the opposing middle guessing which side of the setter the quick will come from.',
      ballPath: { x1: 270, y1: 75, x2: 290, y2: 66 },
    },
    {
      id: 'dball',
      name: 'D-Ball (Quick to Oppo)',
      targetZone: 'Right of Setter (toward Z2)',
      tempo: '1st Tempo · Rapid Fire',
      description: 'A quick 1st-tempo ball pushed to the right of the setter toward the opposite side, letting the attacker meet it fast before the block closes.',
      tacticalWhy: 'Running a quick on the right stresses the opposing block on the opposite’s side and keeps a fast-tempo option alive away from the middle.',
      ballPath: { x1: 270, y1: 75, x2: 325, y2: 70 },
    },
    {
      id: 'pipe6',
      name: 'Back-Row Pipe Attack',
      targetZone: 'Zone 6 (3m Line Center)',
      tempo: '1.5 Tempo',
      description: 'A flat, driving set delivered directly over the 3-meter line to an oncoming back-row attacker surging from deep court.',
      tacticalWhy: 'Exploits the seams between the blockers when the middle blocker is committed to the front court attack.',
      ballPath: { x1: 270, y1: 75, x2: 200, y2: 230 },
    },
    {
      id: 'oppo2',
      name: 'Oppo "2" (Front Row)',
      targetZone: 'Zone 2 (Right Pin)',
      tempo: '2nd Tempo · Front Row',
      description: 'A back set delivered to the opposite hitter attacking from the front row on the right antenna — the classic "2" ball swung over Zone 2.',
      tacticalWhy: 'Gives the opposite a clean front-row swing on the right pin, often isolating them against a single blocker.',
      ballPath: { x1: 270, y1: 75, x2: 345, y2: 80 },
    },
    {
      id: 'oppoA',
      name: 'Oppo "A" (Back Row)',
      targetZone: 'Zone 1 (Back Right)',
      tempo: '2nd Tempo · Back Row',
      description: 'The same opposite attack, but run as an "A" ball from the back row — the opposite swings from behind the 3-meter line on the right side of the court.',
      tacticalWhy: 'Keeps the opposite dangerous even from the back row, adding a right-side back-row option that stretches the block vertically and deep.',
      ballPath: { x1: 270, y1: 75, x2: 330, y2: 215 },
    },
    {
      id: 'dump',
      name: 'Second-Touch Setter Dump',
      targetZone: 'Zone 4 / 3 (Empty Campfire)',
      tempo: 'Instant Surprise',
      description: 'Faking a high set with square shoulders, the setter flicks their left wrist and tips the ball directly into an open pocket on the opponent’s floor.',
      tacticalWhy: 'Keeps opposing blockers honest; when they jump to block the middle, the dump lands completely uncontested.',
      ballPath: { x1: 270, y1: 75, x2: 250, y2: 40 },
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

  togglePlayerVideo(name: string): void {
    this.openPlayerVideo.set(this.openPlayerVideo() === name ? null : name);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
