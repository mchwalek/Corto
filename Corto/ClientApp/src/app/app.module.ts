import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app-routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    OAuthModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      { path: AppRoutes.Home, component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
      { path: AppRoutes.Login, component: LoginComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.configureOAuth();
  }

  private configureOAuth(): void {
    this.oauthService.configure({
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin,
      clientId: '662908248642-ip6c3n7mso953lkqvvcftq8dbq4ehncc.apps.googleusercontent.com',
      strictDiscoveryDocumentValidation: false,
    });
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
