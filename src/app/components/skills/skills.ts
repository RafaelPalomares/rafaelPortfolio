import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';
import { SkillCategory, Language } from '../../models/portfolio.model';

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
  languages: Language[] = [];
  activeCategory: string | null = null;

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => {
      this.skills = d.skills;
      this.languages = d.languages;
      this.activeCategory = d.skills[0]?.category ?? null;
    });
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }

  /** Returns a CSS opacity class based on level 1–5 */
  levelClass(level?: number): string {
    return `level-${level ?? 1}`;
  }

  dots(level?: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}
