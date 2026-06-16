import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PortfolioService } from '../../services/portfolio';
import { ReadingItem, FilmItem, TopSong } from '../../models/portfolio.model';

interface TopBook {
  isbn: string;
  title: string;
  author: string;
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

interface TopSongDisplay {
  title: string;
  artist: string;
  spotifyEmbed: string;
  note: string;
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
  private sanitizer = inject(DomSanitizer);

  books = signal<TopBook[]>([]);
  films = signal<TopFilm[]>([]);
  songs = signal<TopSongDisplay[]>([]);

  ngOnInit() {
    this.portfolioService.getData().subscribe((data) => {
      // Books
      const bookItems = data.readingList.slice(0, 3);
      this.loadBooks(bookItems);

      // Films
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

      // Songs
      this.songs.set(
        data.topSongs.slice(0, 3).map((s) => ({
          title: s.title,
          artist: s.artist,
          spotifyEmbed: s.spotifyEmbed,
          note: s.note ?? '',
          flipped: false,
        }))
      );
    });
  }

  private loadBooks(items: ReadingItem[]) {
    // Use local cover images if provided, otherwise fall back to Open Library
    const books: TopBook[] = items.map((item) => ({
      isbn: item.isbn,
      title: item.note ?? 'Unknown',
      author: '',
      coverUrl: item.coverUrl ?? `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`,
      note: item.note ?? '',
      flipped: false,
    }));

    // Try to fetch titles from Open Library
    const isbns = items.map((i) => `ISBN:${i.isbn}`).join(',');
    fetch(`https://openlibrary.org/api/books?bibkeys=${isbns}&format=json&jscmd=data`)
      .then((res) => res.json())
      .then((data) => {
        const enriched: TopBook[] = items.map((item) => {
          const key = `ISBN:${item.isbn}`;
          const info = data[key];
          return {
            isbn: item.isbn,
            title: info?.title ?? item.note ?? 'Unknown',
            author: info?.authors?.[0]?.name ?? '',
            coverUrl: item.coverUrl ?? info?.cover?.medium ?? `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`,
            note: item.note ?? '',
            flipped: false,
          };
        });
        this.books.set(enriched);
      })
      .catch(() => {
        this.books.set(books);
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

  flipSong(index: number) {
    this.songs.update((songs) =>
      songs.map((s, i) => (i === index ? { ...s, flipped: !s.flipped } : s))
    );
  }

  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
