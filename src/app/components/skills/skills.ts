import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { SkillCategory } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  skills: SkillCategory[] = [];

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => (this.skills = d.skills));
  }
}
