import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validationMessages = {
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'Ingresa un email válido.' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener al menos 5 caracteres.',
      },
    ],
    apellido: [
      { type: 'required', message: 'El apellido es requerido.' },
      {
        type: 'minlength',
        message: 'El apellido debe tener mínimo tres letras.',
      },
    ],
    nombre: [
      { type: 'required', message: 'El nombre es requerido.' },
      {
        type: 'minlength',
        message: 'El nombre debe tener mínimo tres letras.',
      },
    ],
  };
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      nombre: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
      apellido: new FormControl(
        '',
        Validators.compose([Validators.minLength(3), Validators.required])
      ),
    });
  }
  async ngOnInit() {
    await this.storage.create();
  }
  register(userData) {
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack('/login');
    });
  }
  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }
}
