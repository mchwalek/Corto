import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AppRoutes } from '../app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private oauthService: OAuthService, private router: Router) {}

  canActivate(): boolean {
    const hash = window.location.hash;
    if (hash && hash.includes('id_token=')) {
      return true;
    }

    if (this.oauthService.hasValidAccessToken()) {
      return true;
    }

    this.router.navigate([`/${AppRoutes.Login}`]);
    return false;
  }
}
