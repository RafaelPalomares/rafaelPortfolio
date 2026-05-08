import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { FavCharacter } from '../../models/portfolio.model';

@Component({
  selector: 'app-fav-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fav-characters.html',
  styleUrl: './fav-characters.scss',
})
export class FavCharactersComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  characters: FavCharacter[] = [];
  openCopyright: string | null = null;

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => (this.characters = d.favCharacters));
  }

  toggleCopyright(name: string) {
    this.openCopyright = this.openCopyright === name ? null : name;
  }
}
