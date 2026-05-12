import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  projects: Project[] = [];

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => (this.projects = d.projects));
  }
}
