import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { SkillsComponent } from '../../components/skills/skills';
import { ProjectsComponent } from '../../components/projects/projects';
import { IdolsComponent } from '../../components/idols/idols';
import { HobbiesComponent } from '../../components/hobbies/hobbies';
import { ClipsComponent } from '../../components/clips/clips';
import { MusicIdolsComponent } from '../../components/music-idols/music-idols';
import { FavCharactersComponent } from '../../components/fav-characters/fav-characters';
import { RowletComponent } from '../../components/rowlet/rowlet';
import { StoryStreamComponent } from '../../components/story-stream/story-stream';
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
    IdolsComponent,
    HobbiesComponent,
    ClipsComponent,
    MusicIdolsComponent,
    FavCharactersComponent,
    RowletComponent,
    StoryStreamComponent,
    ContactComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
