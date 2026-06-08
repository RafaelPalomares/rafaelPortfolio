import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { Idol } from '../../models/portfolio.model';

@Component({
  selector: 'app-idols',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './idols.html',
  styleUrl: './idols.scss',
})
export class IdolsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  historicalIdols: Idol[] = [];
  sportsIdols: Idol[] = [];
  openCopyright: string | null = null;

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => {
      this.historicalIdols = d.idols.filter((i) => i.category === 'historical');
      this.sportsIdols = d.idols.filter((i) => i.category === 'sports');
    });
  }

  toggleCopyright(name: string) {
    this.openCopyright = this.openCopyright === name ? null : name;
  }
}
