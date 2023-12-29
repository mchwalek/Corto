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
    return from(this.authService.getIdToken()).pipe(
      switchMap(idToken => {
        const authReq = idToken ? req.clone({ setHeaders: { Authorization: `Bearer ${idToken}` } }) : req;
        return next.handle(authReq);
      }));
  }
}
