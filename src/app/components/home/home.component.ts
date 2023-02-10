import { SpotifyService } from '../../services/spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  musics: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.errorMessage = '';

    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        this.musics = data;
        this.loading = false;
      },
      (errorService) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorService.error.error.message;
      }
    );
  }
}
