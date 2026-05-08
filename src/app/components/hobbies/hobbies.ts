import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { Hobby } from '../../models/portfolio.model';

@Component({
  selector: 'app-hobbies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hobbies.html',
  styleUrl: './hobbies.scss',
})
export class HobbiesComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  hobbies: Hobby[] = [];

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => (this.hobbies = d.hobbies));
  }
}
