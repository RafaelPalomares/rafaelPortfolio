import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LegalComponent } from './pages/legal/legal';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
