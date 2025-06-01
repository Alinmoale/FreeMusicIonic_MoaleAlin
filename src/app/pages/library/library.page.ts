import { PlayerService } from 'src/app/services/player.service';
import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { Song } from 'src/app/models/song';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  songs: Song[] = [];
  userId: string = '';
  swiperModules = [IonicSlides];
  constructor(
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.authService.getUserId().subscribe({
      next: (uid) => {
        this.userId = uid as string;
        this.fetchSongs();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  play(song: Song) {
    this.playerService.currentListening.next({
      musicList: [song],
      currentIndex: 0,
    });

    console.log([song]);

    this.router.navigate(['/player']);
  }

  fetchSongs() {
    const db = getDatabase();

    const starCountRef = ref(db, 'users/' + this.userId + '/songs/');

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.songs = Object.values(data);
      }
      console.log('data', data);
    });
  }

  removeSongs() {
    const db = getDatabase();
    remove(ref(db, 'users/' + this.userId + '/songs/'))
      .then(() => {
        this.songs = [];
        this.toastService.presentToast(`All songs removed successfully!`);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
