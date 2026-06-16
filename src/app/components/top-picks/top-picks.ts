import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';

interface TopBook {
  title: string;
  author: string;
  pages?: number;
  coverUrl: string;
  note: string;
  flipped: boolean;
}

interface TopFilm {
  title: string;
  year: number;
  director: string;
  posterUrl: string;
  note: string;
  rating: number;
  flipped: boolean;
}

@Component({
  selector: 'app-top-picks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-picks.html',
  styleUrl: './top-picks.scss',
})
export class TopPicksComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  books = signal<TopBook[]>([]);
  films = signal<TopFilm[]>([]);

  ngOnInit() {
    this.portfolioService.getData().subscribe((data) => {
      this.books.set(
        data.readingList.slice(0, 3).map((b) => ({
          title: b.title,
          author: b.author,
          pages: b.pages,
          coverUrl: b.coverUrl ?? '',
          note: b.note ?? '',
          flipped: false,
        }))
      );

      this.films.set(
        data.filmList.slice(0, 3).map((f) => ({
          title: f.title,
          year: f.year,
          director: f.director,
          posterUrl: f.posterUrl,
          note: f.note ?? '',
          rating: f.rating ?? 0,
          flipped: false,
        }))
      );
    });
  }

  flipBook(index: number) {
    this.books.update((books) =>
      books.map((b, i) => (i === index ? { ...b, flipped: !b.flipped } : b))
    );
  }

  flipFilm(index: number) {
    this.films.update((films) =>
      films.map((f, i) => (i === index ? { ...f, flipped: !f.flipped } : f))
    );
  }
}
