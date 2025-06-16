import { Injectable } from '@angular/core';
import { AuthService } from '../../users/services/auth.service';

@Injectable({
  providedIn: 'root',
})
class UserClient {
  constructor(private readonly authService: AuthService) {}

  // Método para obtener el userId de un usuario
  getUserId(): number | null {
    return this.authService.getUser()?.id || null;
  }
}

export default UserClient;
