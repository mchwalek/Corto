import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService) {}


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.oauthService.getIdToken();
    const authReq = !!idToken ? req.clone({ setHeaders: { Authorization: `Bearer ${idToken}` } }) : req;

    return next.handle(authReq);
  }
}
