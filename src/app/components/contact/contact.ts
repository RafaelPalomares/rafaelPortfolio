import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../services/portfolio';
import { SocialLink, PersonInfo } from '../../models/portfolio.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  person: PersonInfo | null = null;
  socials: SocialLink[] = [];
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.portfolioService.getData().subscribe((d) => {
      this.person = d.person;
      this.socials = d.socials;
    });
  }
}
