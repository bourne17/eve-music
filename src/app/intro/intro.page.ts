import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOps = {
    initialSlide: 0,
    slidePerView: 1,
    centeredSlides: true,
    speed: 400,
  };

  slides = [
    {
      imageSrc: 'assets/img/EvyMusic.png',
      imageAlt: 'Eve music logo',
      title: 'Escucha tu música',
      subTitle: 'EN CUALQUIER LUGAR',
      description:
        'Los mejores álbumes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas',
      icon: 'play',
    },
    {
      imageSrc: 'assets/img/EvyMusic.png',
      imageAlt: 'Eve music logo',
      title: 'Disfruta de nuestro reproductor',
      subTitle: 'DE VIDEOS INCREIBLES',
      description:
        'Entra al modo video de nuestro reproductor y obten acceso a clips, documentales y making offs increibles de tu artista favorito.',
      icon: 'videocam',
    },
    {
      imageSrc: 'assets/img/EvyMusic.png',
      imageAlt: 'Eve music logo',
      title: 'MODO DEPORTE',
      subTitle: 'aqui va el subtitulo',
      description:
        'Crea un playlist basada en tu actividad fisica Ten reportes y acceso a lo que necesites, integrado con GPS',
      icon: 'bicycle',
    },
  ];
  constructor(private router: Router, private storage: Storage) {}
  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/menu');
  }
  async ngOnInit() {
    await this.storage.create();
  }
}
