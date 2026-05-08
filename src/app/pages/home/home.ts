import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { IdolsComponent } from '../../components/idols/idols';
import { HobbiesComponent } from '../../components/hobbies/hobbies';
import { FavCharactersComponent } from '../../components/fav-characters/fav-characters';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    IdolsComponent,
    HobbiesComponent,
    FavCharactersComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
