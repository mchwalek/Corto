import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppRoutes } from '../app-routes';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (await this.authService.getLoginState()) {
      return true;
    }

    this.router.navigate([`/${AppRoutes.Login}`]);
    return false;
  }
}
