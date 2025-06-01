import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private apiUrl = 'https://api.genius.com/artists/16775/songs';
  private accessToken =
    'kIs2F9YH5bnmqI1JCppijAsGZ01qR6Pi9O39RPu93dc4TzR_kKcbZVdYd7qwvK4M';

  constructor(private storage: AngularFireStorage, private http: HttpClient) {}

  getFirebaseSongs() {
    return this.http
      .get(this.apiUrl + '?access_token=' + this.accessToken)
      .pipe(
        map((response: any) => {
          return response.response.songs;
        })
      );
  }
}
