import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio';
import { PortfolioData, VolleyballPlayer } from '../../models/portfolio.model';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './legal.html',
  styleUrl: './legal.scss',
})
export class LegalComponent implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  public currentYear: number = new Date().getFullYear();
  public data: PortfolioData | null = null;

  public ngOnInit(): void {
    this.portfolioService.getData().subscribe((data) => (this.data = data));
  }

  /**
   * Returns only the volleyball players that have a locally hosted video clip.
   * @param portfolio The loaded portfolio data
   * @returns The subset of players that provide a videoUrl
   */
  public videoPlayers(portfolio: PortfolioData): VolleyballPlayer[] {
    return portfolio.volleyballPlayers.filter((player) => Boolean(player.videoUrl));
  }
}
