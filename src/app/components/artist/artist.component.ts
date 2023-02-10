import { SpotifyService } from './../../services/spotify.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  artist: any = {};
  tracks: any = [];
  active: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotify: SpotifyService,
    private location: Location
  ) {
    this.active = true;
    this.activatedRoute.params.subscribe((params) => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: number) {
    this.spotify.getArtistById(id).subscribe((artist) => {
      this.artist = artist;
      this.active = false;
    });
  }

  backPage() {
    this.location.back();
  }

  getTopTracks(id: number) {
    this.spotify.getTopTracks(id).subscribe((topTracks) => {
      this.tracks = topTracks;
      console.log(this.tracks);
    });
  }
}
