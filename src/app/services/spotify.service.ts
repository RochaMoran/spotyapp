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
        'Bearer BQAfQ2hXFgw_N16EJE4JejcrNv8ZXHoCkrGx5Oy6Ybkxb-ic5zL-WWyCS1fOl7GXjvF7HHTi0llSWbB50iRUcM9ooSzOt4Zrzqqlf4krEH_DugTiPsy6',
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
}
