import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EvyMusicService } from '../services/evy-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slideOps = {
    loop: false,
    slidesPerView: 4,
    slidesPerGroup: 4,
    grabCursor: true,
    spaceBetween: 30,
    speed: 400,
  };

  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song: any = {};
  currentSong: any = {};
  newTime;
  constructor(
    private musicService: EvyMusicService,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then((newReleases) => {
      this.artists = this.musicService.getArtists();
      console.log(this.artists);
      this.songs = newReleases.albums.items.filter(
        (e) => e.album_type === 'single'
      );
      this.albums = newReleases.albums.items.filter(
        (e) => e.album_type === 'album'
      );
    });
  }

  async showSongs(artist) {
    const songs = await this.musicService.getArtistTopTracks(artist.id);
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name,
      },
    });

    modal.onDidDismiss().then((dataRetuned) => {
      this.song = dataRetuned.data;
    });

    return  modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime =
        (1 / this.currentSong.duration) * this.currentSong.currentTime;
    });
    this.song.playing = true;
  }
  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = '0.00') {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }
}
