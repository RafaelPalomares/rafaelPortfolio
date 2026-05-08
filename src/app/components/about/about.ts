import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { PortfolioData } from '../../models/portfolio.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  data: PortfolioData | null = null;
  quoteFlipped = false;

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => (this.data = d));
  }
}
