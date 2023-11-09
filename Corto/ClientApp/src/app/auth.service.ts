import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client-ts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: 'https://accounts.google.com',
      client_id: '662908248642-ip6c3n7mso953lkqvvcftq8dbq4ehncc.apps.googleusercontent.com',
      redirect_uri: `${window.location.origin}/callback`,
      response_type: 'code',
      scope: 'openid profile',
      post_logout_redirect_uri: `${window.location.origin}`,
    };

    this.userManager = new UserManager(settings);
  }

  login() {
    return this.userManager.signinRedirect();
  }

  async completeAuthentication() {
    await this.userManager.signinRedirectCallback();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }
}
