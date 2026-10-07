import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.html',
  styleUrl: './playlist.scss'
})
export class PlaylistComponent {
  songs = [
    'Just Give Me a Reason',
    'Impostor Syndrome',
    'Earrings',
    'Мой мармеладный (My Marmalade)',
    'The One That Got Away',
    'Boys Don\'t Cry',
    'Forever Young',
    'The Winner Takes It All',
    '18 мне уже',
    'Wet'
  ];
}
