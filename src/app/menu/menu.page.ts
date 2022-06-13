import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(
    private storage: Storage,
    private menu: MenuController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  closeMenu() {
    this.menu.close();
  }
  logout() {
    this.storage.set('isUserLoggedIn', false);
    this.navCtrl.navigateRoot('/login');
  }
}
