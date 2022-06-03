import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumModalPage } from './album-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumModalPageRoutingModule {}
