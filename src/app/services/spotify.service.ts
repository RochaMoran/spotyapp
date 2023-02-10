import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

//Sirve para inyectar el servicio en cualquier parte de la aplicación
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {
    const url: string = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAqlfOCoCv20lpTt5OOeogN-UHoR63FMCLACpVg6K2sw3FE08JWS0wsh7Bcn9HSWZuHCtXGw-iN0f-qZDf8Mw_kGtNjHSoW0MStkDc9oXyep7ndtiFx',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtist(artist: string) {
    return this.getQuery(`search?q=${artist}&type=artist`).pipe(
      map((data: any) => data['artists'].items)
    );
  }

  getArtistById(id: number) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: number) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }

  updateToken() {
    return this.http
      .get(
        'https://spotify-get-token.herokuapp.com/spotify/d6b55734aa3f4b49af89ae8023b6c69e/4659ca881ead4eed81c45197f071db34'
      )
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
