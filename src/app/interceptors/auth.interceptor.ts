import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: AuthenticationService, private token: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.loginService.getAuthToken();
    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + token,
        }
      });
    }

    return next.handle(req).pipe(catchError(err => {
      if ([401,403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api
          this.loginService.logout();
          this.loginService.redirectLogin();
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(err);
  }))
  }
}
