import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { Song } from 'src/app/models/song';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  allSongs: Song[] = [];
  displayedSongs: Song[] = [];
  musicName: string = '';
  swiperModules = [IonicSlides];
  constructor(private router: Router, private playerService: PlayerService) {
    this.createAllSongs();
  }

  play(song: Song) {
    this.playerService.currentListening.next({
      musicList: [song],
      currentIndex: 0,
    });

    console.log([song]);

    this.router.navigate(['/player']);
  }

  searchMusic(music: string) {
    if (music.trimStart() === '') {
      this.displayedSongs = [];
      return;
    }
    this.displayedSongs = this.allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(music.toLowerCase()) ||
        song.artiste.toLowerCase().includes(music.toLowerCase())
    );
  }

  createAllSongs() {
    this.allSongs.push(
      new Song(
        'E1001',
        'Photograph',
        'Ed Sheeran',
        '2F097c7b735ceb410943cbd507a6e1dfda272fd8a8.mp3?alt=media&token=cbb698ff-9132-41cc-8b79-cc1ebaad567a',
        'assets/images/photograph.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'C1001',
        'Endlessly',
        'The Cab',
        '2F99e455921cf33b4242b463f778111cad251c1937.mp3?alt=media&token=2c9dab24-e2cd-4b91-9e14-3c2d4371a2f0',
        'assets/images/endlessly.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'O1001',
        'Letting Go',
        'One OK Rock',
        '2F1cf8d48884a0ce9cbf21bba281a0a8e2b43f0bb2.mp3?alt=media&token=8341a274-78eb-4baf-9380-197de48c3c1c',
        'assets/images/letting_go.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'P1001',
        'The Scientist',
        'Coldplay',
        '2F95cb9df1b056d759920b5e85ad7f9aff0a390671.mp3?alt=media&token=dadcb685-a470-468f-b66c-fe75b294d959',
        'assets/images/the_scientist.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'S1001',
        'The Way You Look Tonight',
        'Michael Buble',
        '2Fa5b8972e764025020625bbf9c1c2bbb06e394a60.mp3?alt=media&token=7c5fc9ee-4ca3-477b-91c8-fd02289927a6',
        'assets/images/michael_buble_collection.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'S1002',
        'Billie Jean',
        'Michael Jackson',
        '2Ff504e6b8e037771318656394f532dede4f9bcaea.mp3?alt=media&token=3433047d-707f-46ea-b28c-542ea663a6a0',
        'assets/images/billie_jean.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'S1005',
        'Wonderwall',
        'Oasis',
        '2Fb4347e755d823bd300c7520a2ab7533a718a7c98.mp3?alt=media&token=f0bccfc5-7d61-4479-9e92-718c36ee681f',
        'assets/images/wonder_wall.jpg'
      )
    );

    this.allSongs.push(
      new Song(
        'S1008',
        'Boy With Luv',
        'BTS',
        '2Fd16797fb391fb909f3c46454d7cf89a2718f8171.mp3?alt=media&token=6560f93a-39b8-4639-b30a-6283386f2a80',
        'assets/images/persona.jpg'
      )
    );
  }
}
