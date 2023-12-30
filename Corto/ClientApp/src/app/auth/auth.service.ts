import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { AppRoutes } from '../app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;

  constructor() {
    const settings: UserManagerSettings = {
      authority: 'https://dev-8jr1l7tj0ahmffmn.us.auth0.com',
      client_id: 'iR35GuXfTXOA5oGuTBgIrzE53jLZtoFB',
      redirect_uri: `${window.location.origin}/${AppRoutes.Callback}`,
      post_logout_redirect_uri: window.location.origin,
      response_type: 'code',
      scope: 'openid profile',
    };

    this.userManager = new UserManager(settings);
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public async completeAuthentication(): Promise<void> {
    await this.userManager.signinRedirectCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public async isLoggedIn(): Promise<boolean> {
    const user = await this.userManager.getUser();
    return !!user?.access_token;
  }

  public async getIdToken(): Promise<string> {
    const user = await this.userManager.getUser();
    return user?.id_token ?? '';
  }
}
