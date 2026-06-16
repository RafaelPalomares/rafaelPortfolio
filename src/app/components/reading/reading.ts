import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
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

  filteredBooks = computed(() => {
    const filter = this.activeFilter();
    const all = this.books();
    if (filter === 'all') return all;
    return all.filter((b) => b.status === filter);
  });

  stats = computed(() => {
    const all = this.books();
    return {
      total: all.length,
      reading: all.filter((b) => b.status === 'reading').length,
      completed: all.filter((b) => b.status === 'completed').length,
      wantToRead: all.filter((b) => b.status === 'want-to-read').length,
    };
  });

  ngOnInit() {
    this.portfolioService.getData().subscribe((data) => {
      const items = data.readingList;

      // Use the CORS-friendly books API endpoint
      const isbns = items.map((item) => `ISBN:${item.isbn}`).join(',');
      this.http
        .get<any>(`https://openlibrary.org/api/books?bibkeys=${isbns}&format=json&jscmd=data`)
        .pipe(catchError(() => of({})))
        .subscribe((response) => {
          const books: BookInfo[] = items.map((item) => {
            const key = `ISBN:${item.isbn}`;
            const res = response[key];
            if (!res) {
              return {
                isbn: item.isbn,
                title: item.note ?? `ISBN ${item.isbn}`,
                author: '',
                coverUrl: `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`,
                pages: null,
                year: null,
                status: item.status,
                progress: item.status === 'completed' ? 100 : (item.progress ?? 0),
                note: item.note,
              };
            }
            return {
              isbn: item.isbn,
              title: res.title ?? 'Unknown Title',
              author: res.authors?.[0]?.name ?? '',
              coverUrl: res.cover?.medium ?? `https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`,
              pages: res.number_of_pages ?? null,
              year: res.publish_date ? parseInt(res.publish_date, 10) || null : null,
              status: item.status,
              progress: item.status === 'completed' ? 100 : (item.progress ?? 0),
              note: item.note,
            };
          });
          this.books.set(books);
          this.loading.set(false);
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
    return res.by_statement ?? (res.authors?.length ? 'Author' : '');
  }
}
