import { Injectable, Optional } from '@angular/core';
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
    if (!req.url.startsWith('https://localhost:7248')) {
      return next.handle(req);
    }

    const idToken = this.oauthService.getIdToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    });

    return next.handle(authReq);

  }
}
