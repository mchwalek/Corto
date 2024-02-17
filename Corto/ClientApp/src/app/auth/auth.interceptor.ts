import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getAccessToken()).pipe(
      switchMap(accessToken => {
        const authReq = accessToken ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }) : req;
        return next.handle(authReq);
      }));
  }
}
