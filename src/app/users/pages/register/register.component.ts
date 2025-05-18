import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './register.component.html'
  , styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';  // <-- AÑADIDO
  password = '';
  role: 'admin' | 'empresa' = 'empresa';

  registerError: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.registerError = null;
    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {

        console.log('Registro exitoso', res);
      },
      error: (err) => {

        this.registerError = err.error?.message || 'Error en el registro';
      }
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
