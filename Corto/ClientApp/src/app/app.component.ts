import { Component } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      clientId: '662908248642-ip6c3n7mso953lkqvvcftq8dbq4ehncc.apps.googleusercontent.com',
      redirectUri: window.location.origin,
      strictDiscoveryDocumentValidation: false,
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
