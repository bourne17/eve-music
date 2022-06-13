import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CrudserviceService } from './crudservice.service';


@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private storage: Storage, private crud: CrudserviceService) {}

  async loginUser(credential) {

    const user = await this.crud.getUser(credential.email);
    return new Promise((accept, reject) => {
      if (
        user.email === credential.email &&
        user.password === credential.password
      ) {
        accept('Login correcto');
      } else {
        reject('login incorrecto');
      }
    });
  }
  registerUser(userData) {
    userData.password = btoa(userData.password);
    return this.storage.set('user', userData);
  }
}
