import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  artists: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) {
    this.loading = false;
  }

  searchArtist(search: string) {
    this.loading = search.length > 0 ? true : false;

    this.spotify.getArtist(search).subscribe((data: any) => {
      this.artists = data;
      this.loading = false;
    });
  }
}
