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
      client_secret: '***REMOVED***',
      redirect_uri: `${window.location.origin}/callback`,
      post_logout_redirect_uri: `${window.location.origin}`,
      response_type: 'code',
      scope: 'openid profile',
    };

    this.userManager = new UserManager(settings);
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public completeAuthentication(): Promise<User> {
    return this.userManager.signinRedirectCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
