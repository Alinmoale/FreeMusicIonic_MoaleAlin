import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/models/song';
import { PlayerService } from 'src/app/services/player.service';
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from 'firebase/database';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit, OnDestroy {
  song: Song = new Song(
    '',
    '',
    '',
    'https://firebasestorage.googleapis.com/v0/b/bitmusic-4e6d9.appspot.com/o/Songs%' +
      '2Fd9720b94d983ae9c055a14f944e404861ed2d110.mp3?alt=media&token=84c2beaa-36fc-4a31-97da-7c62772a055c',
    ''
  );

  playing = false;
  currentPosition = 0;
  musicsList: Song[] = [];
  currentSongIndex = 0;
  repeat: boolean = false;
  isFavorite = false;
  userId: string = '';

  togglePlay() {
    this.playing = !this.playing;
    this.playing
      ? this.playerService.audio.play()
      : this.playerService.audio.pause();
  }

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private authService: AuthService,
    private toastService: ToastService,
    private db: AngularFireDatabase
  ) {
    this.playerService.audio.addEventListener('timeupdate', () => {
      this.currentPosition = this.playerService.audio.currentTime;
    });

    this.playerService.audio.addEventListener('ended', () => {
      this.playing = false;
      this.currentPosition = 0;
      if (this.repeat) {
        this.loadCurrentSong();
      } else {
        this.playNext();
      }
    });

    this.playerService.audio.addEventListener('timeupdate', () => {
      this.currentPosition = Math.floor(this.playerService.audio.currentTime);
    });
  }

  toggleRepeat() {
    this.repeat = !this.repeat;
  }

  playPrevious() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
    } else {
      this.currentSongIndex = this.musicsList.length - 1; // Optionally loop back to the last song
    }
    this.loadCurrentSong();
  }

  playNext() {
    if (!this.repeat) {
      if (this.currentSongIndex < this.musicsList.length - 1) {
        this.currentSongIndex++;
      } else {
        this.currentSongIndex = 0; // Optionally loop back to the last song
      }
    }
    this.loadCurrentSong();
  }

  loadCurrentSong() {
    this.song = this.musicsList[this.currentSongIndex];
    this.playerService.audio.src =
      'https://firebasestorage.googleapis.com/v0/b/bitmusic-4e6d9.appspot.com/o/Songs%' +
      this.song.fileLink;
    this.checkFavorite();
    this.playerService.audio.remove();
    this.playerService.audio.play();
    this.playing = true;
  }

  seek({ detail: { value } }: { detail: { value: number } }): void {
    this.playerService.audio.currentTime = value;
  }

  ngOnInit() {
    this.authService.getUserId().subscribe({
      next: (uid) => {
        this.userId = uid as string;
        this.checkFavorite();
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.playerService.currentListening.subscribe((data) => {
      if (data) {
        this.musicsList = data.musicList;
        this.currentSongIndex = data.currentIndex;
        this.song = this.musicsList[this.currentSongIndex];
        this.playerService.audio.src =
          'https://firebasestorage.googleapis.com/v0/b/bitmusic-4e6d9.appspot.com/o/Songs%' +
          this.song.fileLink;

        // get(child(dbRef, 'users/' + this.userId + '/songs/' + this.song.id))
        //   .then((snapshot) => {
        //     if (snapshot.exists()) {
        //       this.isFavorite = true;
        //       console.log(snapshot.val());
        //     } else {
        //       this.isFavorite = false;
        //       console.log('No data available');
        //     }
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
        this.togglePlay();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  checkFavorite() {
    const db = getDatabase();

    const starCountRef = ref(
      db,
      'users/' + this.userId + '/songs/' + this.song.id
    );
    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log('data', data);

        if (data) {
          this.isFavorite = true;
        } else {
          this.isFavorite = false;
        }
      },
      { onlyOnce: true }
    );
  }

  addToLibrary(song: Song) {
    console.log('heree');

    const db = getDatabase();
    set(ref(db, 'users/' + this.userId + '/songs/' + song.id), song)
      .then(() => {
        this.toastService.presentToast(`Added ${song.title} to Library`);
        this.isFavorite = true;
      })
      .catch((error) => {
        console.error(error);
      });
    const songRef = this.db.object(`users/${this.userId}/songs/${song.id}`);
  }

  removeFromLibrary(song: Song) {
    const db = getDatabase();
    remove(ref(db, 'users/' + this.userId + '/songs/' + song.id))
      .then(() => {
        this.toastService.presentToast(`Removed ${song.title} from Library`);
        this.isFavorite = false;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    this.playerService.currentListening.next(null);
    // this.audio.remove();
  }
}
