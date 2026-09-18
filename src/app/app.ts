import {
  Component,
  HostListener,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class App implements OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly elRef = inject(ElementRef);

  /** Konami Code: ↑↑↓↓←→←→BA */
  private readonly konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];
  private inputBuffer: string[] = [];

  private canvas: HTMLCanvasElement | null = null;
  private animationId: number | null = null;

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.inputBuffer.push(event.key);

    // Keep buffer at same length as sequence
    if (this.inputBuffer.length > this.konamiSequence.length) {
      this.inputBuffer.shift();
    }

    if (this.isKonamiCode()) {
      this.inputBuffer = [];
      this.startCodeRain();
    }
  }

  ngOnDestroy(): void {
    this.stopCodeRain();
  }

  private isKonamiCode(): boolean {
    if (this.inputBuffer.length !== this.konamiSequence.length) return false;
    return this.inputBuffer.every(
      (key, i) => key.toLowerCase() === this.konamiSequence[i].toLowerCase(),
    );
  }

  private startCodeRain(): void {
    // If already running, stop first
    if (this.canvas) {
      this.stopCodeRain();
    }

    // Create fullscreen canvas overlay
    this.canvas = this.renderer.createElement('canvas') as HTMLCanvasElement;
    this.renderer.setStyle(this.canvas, 'position', 'fixed');
    this.renderer.setStyle(this.canvas, 'top', '0');
    this.renderer.setStyle(this.canvas, 'left', '0');
    this.renderer.setStyle(this.canvas, 'width', '100vw');
    this.renderer.setStyle(this.canvas, 'height', '100vh');
    this.renderer.setStyle(this.canvas, 'z-index', '99999');
    this.renderer.setStyle(this.canvas, 'pointer-events', 'auto');
    this.renderer.setStyle(this.canvas, 'cursor', 'pointer');
    this.renderer.appendChild(document.body, this.canvas);

    const ctx = this.canvas.getContext('2d')!;
    const width = (this.canvas.width = window.innerWidth);
    const height = (this.canvas.height = window.innerHeight);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);

    // Each column gets a random y-offset to start
    const drops: number[] = Array.from({ length: columns }, () =>
      Math.random() * -100,
    );

    // Characters: katakana + digits + symbols for that authentic Matrix look
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\*+-.,:;!?@#$%^&';

    const draw = () => {
      // Slightly transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head of the stream is brighter
        ctx.fillStyle =
          Math.random() > 0.98 ? '#fff' : `hsl(120, 100%, ${40 + Math.random() * 20}%)`;
        ctx.fillText(char, x, y);

        // Reset drop to top randomly after passing screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      this.animationId = requestAnimationFrame(draw);
    };

    draw();

    // Click anywhere on canvas to dismiss
    this.renderer.listen(this.canvas, 'click', () => this.stopCodeRain());

    // Also dismiss with Escape key
    const escListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.stopCodeRain();
        document.removeEventListener('keydown', escListener);
      }
    };
    document.addEventListener('keydown', escListener);
  }

  private stopCodeRain(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.canvas) {
      this.renderer.removeChild(document.body, this.canvas);
      this.canvas = null;
    }
  }
}
