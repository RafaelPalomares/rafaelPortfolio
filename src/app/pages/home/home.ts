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
import { RowletComponent } from '../../components/rowlet/rowlet';
import { ContactComponent } from '../../components/contact/contact';
import { ArtGalleryComponent } from '../../components/art-gallery/art-gallery';
import { PlaylistComponent } from '../../components/playlist/playlist';
import { LegendaryItemComponent } from '../../components/legendary-item/legendary-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    IdolsComponent,
    HobbiesComponent,
    TopPicksComponent,
    FavCharactersComponent,
    ArtGalleryComponent,
    RowletComponent,
    ContactComponent,
    PlaylistComponent,
    LegendaryItemComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
