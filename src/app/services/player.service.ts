import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentListening = new BehaviorSubject<{
    musicList: Song[];
    currentIndex: number;
  } | null>(null);

  audio = new Audio();
  constructor() {}
}
