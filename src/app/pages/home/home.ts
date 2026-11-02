import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { ProjectsComponent } from '../../components/projects/projects';
import { IdolsComponent } from '../../components/idols/idols';
import { HobbiesComponent } from '../../components/hobbies/hobbies';
import { TopPicksComponent } from '../../components/top-picks/top-picks';
import { FavCharactersComponent } from '../../components/fav-characters/fav-characters';
import { VolleyballComponent } from '../../components/volleyball/volleyball';
import { LockerComponent } from '../../components/locker/locker';
import { ContactComponent } from '../../components/contact/contact';
import { ArtGalleryComponent } from '../../components/art-gallery/art-gallery';

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
    LockerComponent,
    IdolsComponent,
    HobbiesComponent,
    TopPicksComponent,
    FavCharactersComponent,
    ArtGalleryComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
