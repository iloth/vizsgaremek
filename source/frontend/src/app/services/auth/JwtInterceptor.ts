import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

//TODO: Implement refreshtoken (https://www.bezkoder.com/angular-10-refresh-token/)

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.auth.accessToken
        }
      });
    }

    return next.handle(req);
  }


}
