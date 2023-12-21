//TODO: rewrite

//import { Injectable } from '@angular/core';
//import { OAuthService } from 'angular-oauth2-oidc';

//@Injectable({
//  providedIn: 'root'
//})
//export class AuthService {
//constructor(private oauthService: OAuthService) {
//  }

//  public login(): void {
//    this.oauthService.initLoginFlow();
//  }

//  public logout(): void {
//    this.oauthService.logOut();
//  }

//  public addLoginHandler(handler: Function): void {
//    this.oauthService.events.subscribe(event => {
//      if (event.type == 'token_received') {
//        handler();
//      }
//    });
//  }

//  get isUserLoggedIn(): boolean {
//    return this.oauthService.hasValidIdToken();
//  }
//}
