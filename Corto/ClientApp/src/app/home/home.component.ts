import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private authService: AuthService) {
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  get showLogin(): boolean {
    return !this.authService.isLoggedIn;
  }

  get showLogout(): boolean {
    return this.authService.isLoggedIn;
  }
}
