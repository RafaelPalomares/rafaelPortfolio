import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { PortfolioData, Artwork } from '../../models/portfolio.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-art-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './art-gallery.html',
  styleUrl: './art-gallery.scss'
})
export class ArtGalleryComponent implements OnInit {
  data: PortfolioData | null = null;
  artworks: (Artwork & { flipped?: boolean, fetchedImageUrl?: string })[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.portfolioService.getData().subscribe((data) => {
      this.data = data;
      if (data.artGallery) {
        this.artworks = data.artGallery.map(art => ({ ...art, flipped: false }));
        this.fetchImages();
      }
    });
  }

  fetchImages() {
    this.artworks.forEach(art => {
      if (art.imageUrl) {
        art.fetchedImageUrl = art.imageUrl;
      } else if (art.wikipediaTitle) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(art.wikipediaTitle)}&pithumbsize=800&format=json&origin=*`;
        this.http.get<any>(url).subscribe(res => {
          const pages = res.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].thumbnail?.source) {
              art.fetchedImageUrl = pages[pageId].thumbnail.source;
            }
          }
        });
      } else if (art.wikimediaFile) {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(art.wikimediaFile)}&format=json&origin=*`;
        this.http.get<any>(url).subscribe(res => {
          const pages = res.query?.pages;
          if (pages) {
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].imageinfo?.[0]?.url) {
              art.fetchedImageUrl = pages[pageId].imageinfo[0].url;
            }
          }
        });
      }
    });
  }

  toggleFlip(art: any) {
    art.flipped = !art.flipped;
  }
}
