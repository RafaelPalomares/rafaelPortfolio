import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { FilmItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.html',
  styleUrl: './films.scss',
})
export class FilmsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  films = signal<FilmItem[]>([]);
  activeFilter = signal<'all' | 'watched' | 'watching' | 'want-to-watch'>('all');

  filteredFilms = computed(() => {
    const filter = this.activeFilter();
    const all = this.films();
    if (filter === 'all') return all;
    return all.filter((f) => f.status === filter);
  });

  stats = computed(() => {
    const all = this.films();
    return {
      total: all.length,
      watched: all.filter((f) => f.status === 'watched').length,
      watching: all.filter((f) => f.status === 'watching').length,
      wantToWatch: all.filter((f) => f.status === 'want-to-watch').length,
    };
  });

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => this.films.set(d.filmList));
  }

  setFilter(filter: 'all' | 'watched' | 'watching' | 'want-to-watch') {
    this.activeFilter.set(filter);
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'watched': return '✓ Watched';
      case 'watching': return '▶ Watching';
      case 'want-to-watch': return '📋 Watchlist';
      default: return status;
    }
  }
}
