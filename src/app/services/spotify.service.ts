import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SpotifyService {

  artistas: any[] = [];
  urlSpotify: string = 'https://api.spotify.com/v1/';
  token: string = 'BQBLgkx3JKtj0qVnIjLI1J46abI91fOGJ6d6C33D2puSLcBJhpGXGHx1H3Ry0Hhu7mIdX-NrKE3oHipTO4s';

  constructor(public http: HttpClient) {
    console.log('servicio spotify listo');
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'authorization': `Bearer ${this.token}`
    });
    return headers;
  }

  getArtista(id: string) {
    const url = `${this.urlSpotify}artists/${id}`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
                // .map( (resp: any) => {
                //   this.artistas = resp.artists.items;
                //   return this.artistas;
                // });
  }

  getTop(id: string) {
    const url = `${this.urlSpotify}artists/${id}/top-tracks?country=US`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  getArtistas(termino: string) {
    const url = `${this.urlSpotify}search?query=${termino}&type=artist&limit=20`;
    const headers = this.getHeaders();

    return this.http.get(url, { headers })
                .map( (resp: any) => {
                  this.artistas = resp.artists.items;
                  return this.artistas;
                });
  }

}
