import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { ProjectsComponent } from '../../components/projects/projects';
import { IdolsComponent } from '../../components/idols/idols';
import { FavCharactersComponent } from '../../components/fav-characters/fav-characters';
import { FavAnimalComponent } from '../../components/fav-animal/fav-animal';
import { VolleyballComponent } from '../../components/volleyball/volleyball';
import { SetterStatsComponent } from '../../components/setter-stats/setter-stats';
import { LockerComponent } from '../../components/locker/locker';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    VolleyballComponent,
    SetterStatsComponent,
    LockerComponent,
    IdolsComponent,
    FavCharactersComponent,
    FavAnimalComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
