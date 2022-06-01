import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EvyMusicService } from '../services/evy-music.service';
import {SongsModalPage} from '../songs-modal/songs-modal.page';
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

  constructor(private musicService: EvyMusicService, private modalController: ModalController) {}

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

  async showSongs(artist)
  {
    const songs=await this.musicService.getArtistTopTracks(artist.id);
    const modal=await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.track,
        artist:artist.name
      }
    });
  }
}
