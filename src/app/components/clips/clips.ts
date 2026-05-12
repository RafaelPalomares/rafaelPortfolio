import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clips.html',
  styleUrl: './clips.scss',
})
export class ClipsComponent {
  @ViewChild('videoEl') videoEl!: ElementRef<HTMLVideoElement>;

  playing = signal(false);
  muted = signal(true);

  toggle() {
    const v = this.videoEl.nativeElement;
    if (v.paused) {
      v.play();
      this.playing.set(true);
    } else {
      v.pause();
      this.playing.set(false);
    }
  }

  toggleMute() {
    const v = this.videoEl.nativeElement;
    v.muted = !v.muted;
    this.muted.set(v.muted);
  }

  onEnded() {
    this.playing.set(false);
  }
}
