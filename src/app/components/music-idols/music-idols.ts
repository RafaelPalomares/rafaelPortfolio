import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortfolioService } from '../../services/portfolio';
import { MusicIdol } from '../../models/portfolio.model';

@Component({
  selector: 'app-music-idols',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-idols.html',
  styleUrl: './music-idols.scss',
})
export class MusicIdolsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  private sanitizer = inject(DomSanitizer);

  idols: MusicIdol[] = [];
  playingIndex: number | null = null;
  openCopyright: string | null = null;

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => (this.idols = d.musicIdols));
  }

  togglePlay(index: number) {
    this.playingIndex = this.playingIndex === index ? null : index;
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleCopyright(name: string) {
    this.openCopyright = this.openCopyright === name ? null : name;
  }
}
