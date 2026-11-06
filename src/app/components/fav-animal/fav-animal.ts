import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { FavAnimal } from '../../models/portfolio.model';

/**
 * Renders the "favorite animal" section: a single featured animal with a short
 * explanation of why it resonates and a few standout traits.
 */
@Component({
  selector: 'app-fav-animal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fav-animal.html',
  styleUrl: './fav-animal.scss',
})
export class FavAnimalComponent implements OnInit {
  private readonly portfolioService = inject(PortfolioService);

  animal: FavAnimal | null = null;

  ngOnInit(): void {
    this.portfolioService.getData().subscribe((data) => {
      this.animal = data.favAnimal;
    });
  }
}
