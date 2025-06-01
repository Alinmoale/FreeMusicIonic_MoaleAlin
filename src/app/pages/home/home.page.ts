import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { AlertController, IonicSlides } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MusicService } from '../../services/music.service';
import { Song } from 'src/app/models/song';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  displayName: string | null = '';
  topTracks: Song[] = [];
  topArtists: Song[] = [];
  songsFromGenius: any[] = [];
  swiperModules = [IonicSlides];
  isMusicPlaying = false;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    private musicService: MusicService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.createTopTracks();
    this.createTopArtists();
    this.checkAndPromptUsername();
    this.setWelcomeMessage();
    this.loadSongs();
    this.checkIfMusicIsPlaying();
  }

  checkIfMusicIsPlaying() {
    this.playerService.currentListening.subscribe((data) => {
      if (data) {
        this.isMusicPlaying = true;
      } else {
        this.isMusicPlaying = false;
      }
    });
  }

  async checkAndPromptUsername() {
    const user = await this.afAuth.currentUser;
    if (user && !user.displayName) {
      await this.presentUsernamePopup();
    }
  }

  async presentUsernamePopup() {
    const alert = await this.alertController.create({
      header: 'Enter Username',
      backdropDismiss: false,
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Username',
        },
      ],
      buttons: [
        {
          text: 'Save',
          handler: async (data) => {
            if (data.username) {
              await this.saveUsername(data.username);
              this.setWelcomeMessage();
              return true; // Close the popup
            } else {
              this.toastService.presentToast('Username is required');
              return false; // Keep the popup open
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async saveUsername(username: string) {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.updateProfile({ displayName: username });
    }
  }

  async setWelcomeMessage() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.displayName = user.displayName ? user.displayName : 'user';
    }
  }

  async loadSongs() {
    this.musicService.getFirebaseSongs().subscribe((data: any) => {
      this.songsFromGenius = data;
    });
  }

  playTopTracks(songIndex: number) {
    this.playerService.currentListening.next({
      musicList: this.topTracks,
      currentIndex: songIndex,
    });

    this.router.navigate(['/player']);
  }

  playTopArtists(songIndex: number) {
    this.playerService.currentListening.next({
      musicList: this.topArtists,
      currentIndex: songIndex,
    });

    this.router.navigate(['/player']);
  }

  openPlayer() {
    this.router.navigate(['/player']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  createTopTracks() {
    this.topTracks.push(
      new Song(
        'E1001',
        'Photograph',
        'Ed Sheeran',
        '2F097c7b735ceb410943cbd507a6e1dfda272fd8a8.mp3?alt=media&token=cbb698ff-9132-41cc-8b79-cc1ebaad567a',
        'assets/images/photograph.jpg'
      )
    );

    this.topTracks.push(
      new Song(
        'C1001',
        'Endlessly',
        'The Cab',
        '2F99e455921cf33b4242b463f778111cad251c1937.mp3?alt=media&token=2c9dab24-e2cd-4b91-9e14-3c2d4371a2f0',
        'assets/images/endlessly.jpg'
      )
    );

    this.topTracks.push(
      new Song(
        'O1001',
        'Letting Go',
        'One OK Rock',
        '2F1cf8d48884a0ce9cbf21bba281a0a8e2b43f0bb2.mp3?alt=media&token=8341a274-78eb-4baf-9380-197de48c3c1c',
        'assets/images/letting_go.jpg'
      )
    );

    this.topTracks.push(
      new Song(
        'P1001',
        'The Scientist',
        'Coldplay',
        '2F95cb9df1b056d759920b5e85ad7f9aff0a390671.mp3?alt=media&token=dadcb685-a470-468f-b66c-fe75b294d959',
        'assets/images/the_scientist.jpg'
      )
    );
  }

  createTopArtists() {
    this.topArtists.push(
      new Song(
        'S1001',
        'The Way You Look Tonight',
        'Michael Buble',
        '2Fa5b8972e764025020625bbf9c1c2bbb06e394a60.mp3?alt=media&token=7c5fc9ee-4ca3-477b-91c8-fd02289927a6',
        'assets/images/michael_buble_collection.jpg'
      )
    );

    this.topArtists.push(
      new Song(
        'S1005',
        'Wonderwall',
        'Oasis',
        '2Fb4347e755d823bd300c7520a2ab7533a718a7c98.mp3?alt=media&token=f0bccfc5-7d61-4479-9e92-718c36ee681f',
        'assets/images/wonder_wall.jpg'
      )
    );

    this.topArtists.push(
      new Song(
        'S1008',
        'Boy With Luv',
        'BTS',
        '2Fd16797fb391fb909f3c46454d7cf89a2718f8171.mp3?alt=media&token=6560f93a-39b8-4639-b30a-6283386f2a80',
        'assets/images/persona.jpg'
      )
    );

    this.topArtists.push(
      new Song(
        'S1002',
        'Billie Jean',
        'Michael Jackson',
        '2Ff504e6b8e037771318656394f532dede4f9bcaea.mp3?alt=media&token=3433047d-707f-46ea-b28c-542ea663a6a0',
        'assets/images/billie_jean.jpg'
      )
    );
  }
}
