import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Jersey {
  number: string;
  name: string;
  badge: string;
  colorScheme: 'navy-gold' | 'charcoal-violet' | 'stealth-cyan' | 'black-emerald';
  title: string;
  primaryColor: string;
  accentColor: string;
  reason: string;
  story: string;
  role: string;
  team: string;
  isCurrent: boolean;
  statusLabel: string;
}

export interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
}

@Component({
  selector: 'app-locker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locker.html',
  styleUrl: './locker.scss',
})
export class LockerComponent {
  jerseys: Jersey[] = [
    {
      number: '4',
      name: 'PALOMARES',
      badge: '4th League · Münchenbuchsee',
      colorScheme: 'navy-gold',
      title: 'The NLA Setter Standard',
      primaryColor: '#0f172a',
      accentColor: '#f59e0b',
      role: 'Ezequiel Vázquez · 183 cm (6 ft) Height Twin',
      team: '4. LIGA · MÜNCHENBUCHSEE',
      isCurrent: true,
      statusLabel: 'Currently Active',
      reason:
        'Inspired by my favourite player in the Swiss NLA, Ezequiel Vázquez from Volley Näfels — who shares my exact height: 183 cm / 6 ft. Currently worn competing in the 4th League for VBC Münchenbuchsee.',
      story:
        'In a modern game increasingly dominated by 2-meter giants, seeing Ezequiel dominate the Swiss Nationalliga A at 183 cm (6 ft) — my exact height — is proof that court vision, lightning-fast hands, and pure setter IQ outshine raw height. Wearing #4 for Münchenbuchsee in the 4th League is a tribute to playing smart, moving fast, and running the court with precision.',
    },
    {
      number: '11',
      name: 'PALOMARES',
      badge: 'U20 · Münchenbuchsee',
      colorScheme: 'black-emerald',
      title: 'Master of the Hands',
      primaryColor: '#0a100d',
      accentColor: '#10b981',
      role: 'Micah Christenson Inspiration',
      team: 'U20 · MÜNCHENBUCHSEE',
      isCurrent: true,
      statusLabel: 'Currently Active',
      reason:
        'Dedicated to Micah Christenson (USA National Team) — one of the greatest setters in modern volleyball history. Currently worn competing for the U20 squad at VBC Münchenbuchsee.',
      story:
        'Micah Christenson redefined setter play with his lightning hand speed, deceptive jump sets from deep court, and flawless tempo control. Wearing #11 for the Münchenbuchsee U20 team is a constant pursuit of that standard: setting with butter hands, staying composed under pressure, and elevating every single hitter around you.',
    },
    {
      number: '5',
      name: 'PALOMARES',
      badge: 'Not Currently Active',
      colorScheme: 'charcoal-violet',
      title: 'The Developmental Foundation',
      primaryColor: '#18181b',
      accentColor: '#a855f7',
      role: 'Former Shirt Number',
      team: 'ARCHIVED IN LOCKER',
      isCurrent: false,
      statusLabel: 'Not Currently Active',
      reason:
        'An early developmental number worn during my first competitive seasons learning the setter position. Kept in the locker as a reminder of where my volleyball journey began.',
      story:
        'I wore #5 when I first transitioned into becoming a competitive setter. It was the jersey on my back during long training blocks of learning hand positioning, reading the net, and understanding how to connect with the five teammates on the floor. While not currently in active rotation, it holds the foundation of my setting craft.',
    },
    {
      number: '9',
      name: 'PALOMARES',
      badge: 'Not Currently Active',
      colorScheme: 'stealth-cyan',
      title: 'The High-Tempo Tournament Kit',
      primaryColor: '#090d16',
      accentColor: '#06b6d4',
      role: 'Former Tournament Number',
      team: 'ARCHIVED IN LOCKER',
      isCurrent: false,
      statusLabel: 'Not Currently Active',
      reason:
        'Worn as an alternate tournament jersey during high-pressure weekend cup runs when needing an aggressive change of pace. Currently resting in the locker.',
      story:
        'Number 9 was the shirt I pulled on for intense tournament matches when our offense needed a rapid, fearless shift in momentum. It stood for high-risk, high-reward volleyball: aggressive setter dumps, quick shoots, and relentless tempo. Even though it is archived for now, it represents playing with zero hesitation.',
    },
  ];

  selectedJersey = signal<Jersey>(this.jerseys[0]);
  doorOpen = signal<boolean>(true);
  surpriseUnlocked = signal<boolean>(false);
  confetti = signal<ConfettiPiece[]>([]);
  secretStashInspected = signal<boolean>(false);

  selectJersey(jersey: Jersey) {
    this.selectedJersey.set(jersey);
  }

  toggleDoor() {
    this.doorOpen.update((v) => !v);
  }

  unlockSurprise() {
    this.surpriseUnlocked.set(true);
    this.secretStashInspected.set(true);
    this.generateConfetti();
  }

  closeSurprise() {
    this.surpriseUnlocked.set(false);
  }

  generateConfetti() {
    const colors = ['#818cf8', '#f59e0b', '#10b981', '#ec4899', '#38bdf8', '#fbbf24'];
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 40; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.6,
      });
    }
    this.confetti.set(pieces);
  }
}
