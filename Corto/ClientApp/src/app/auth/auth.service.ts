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
      authority: 'https://login.microsoftonline.com/b620fa98-d773-48a6-ab01-c31f80668532/v2.0',
      client_id: '81f84e2d-d28d-4d43-b378-61e2533ed0a9',
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

  public async getLoginState(): Promise<boolean> {
    const user = await this.userManager.getUser();
    return !!user?.access_token;
  }

  public async getUserName(): Promise<string> {
    const user = await this.userManager.getUser();
    return user?.profile?.name ?? '';
  }

  public async getIdToken(): Promise<string> {
    const user = await this.userManager.getUser();
    return user?.id_token ?? '';
  }
}
