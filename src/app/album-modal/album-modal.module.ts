import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumModalPageRoutingModule } from './album-modal-routing.module';

import { AlbumModalPage } from './album-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumModalPageRoutingModule
  ],
  declarations: [AlbumModalPage]
})
export class AlbumModalPageModule {}
