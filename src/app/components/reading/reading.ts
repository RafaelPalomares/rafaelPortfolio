import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of, catchError } from 'rxjs';
import { PortfolioService } from '../../services/portfolio';
import { ReadingItem } from '../../models/portfolio.model';

interface BookInfo {
  isbn: string;
  title: string;
  author: string;
  coverUrl: string;
  pages: number | null;
  year: number | null;
  status: 'reading' | 'completed' | 'want-to-read';
  progress: number;
  note?: string;
}

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reading.html',
  styleUrl: './reading.scss',
})
export class ReadingComponent implements OnInit {
  private http = inject(HttpClient);
  private portfolioService = inject(PortfolioService);

  books = signal<BookInfo[]>([]);
  loading = signal(true);
  activeFilter = signal<'all' | 'reading' | 'completed' | 'want-to-read'>('all');

  filteredBooks = () => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.books();
    return this.books().filter((b) => b.status === filter);
  };

  stats = () => {
    const all = this.books();
    return {
      total: all.length,
      reading: all.filter((b) => b.status === 'reading').length,
      completed: all.filter((b) => b.status === 'completed').length,
      wantToRead: all.filter((b) => b.status === 'want-to-read').length,
    };
  };

  ngOnInit() {
    this.portfolioService.getData().subscribe((data) => {
      const items = data.readingList;
      const requests = items.map((item) =>
        this.http.get<any>(`https://openlibrary.org/isbn/${item.isbn}.json`)
      );

      forkJoin(requests).subscribe({
        next: (responses) => {
          const books: BookInfo[] = responses.map((res, i) => {
            const item = items[i];
            return {
              isbn: item.isbn,
              title: res.title ?? 'Unknown Title',
              author: this.extractAuthor(res),
              coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`,
              pages: res.number_of_pages ?? null,
              year: res.publish_date ? parseInt(res.publish_date, 10) || null : null,
              status: item.status,
              progress: item.status === 'completed' ? 100 : (item.progress ?? 0),
              note: item.note,
            };
          });
          this.books.set(books);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    });
  }

  setFilter(filter: 'all' | 'reading' | 'completed' | 'want-to-read') {
    this.activeFilter.set(filter);
  }

  statusLabel(status: string): string {
    switch (status) {
      case 'reading': return '📖 Reading';
      case 'completed': return '✓ Finished';
      case 'want-to-read': return '📋 Want to Read';
      default: return status;
    }
  }

  private extractAuthor(res: any): string {
    if (res.authors && res.authors.length > 0) {
      const key = res.authors[0].key;
      // Open Library returns /authors/OL123A — just use a fallback
      return res.by_statement ?? 'Unknown Author';
    }
    return res.by_statement ?? 'Unknown Author';
  }
}
