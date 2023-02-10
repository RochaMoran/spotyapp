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
        'Bearer BQBh66xU10gF-ZeiyNM-C823cNWFq6-zB9GBt8ligaIPMt3XOttC7zDjmjT-Cn_Vfbg2MgMc3_rhIEqoj_AALcueHLQP1kK1GgIGF-vmRVfCcf8QAEV-',
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
}
