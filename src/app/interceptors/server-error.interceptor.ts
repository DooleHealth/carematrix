import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      // TODO: SET RETRY TO 1
      retry(0), 
      catchError((error: HttpErrorResponse) => {
        console.log('ServerErrorInterceptor -> ', error);
       
        if(error.message == 'ERR_INTERNET_DISCONNECTED' || error.status == 0 || error.message=='Timeout has occurred'){
          return throwError(error.message)
        } else if (error.status === 401) {
          //this.router.navigate(['login']);
          return [];
        } else if (error.status === 400) {
          console.log('error 400');
          return [];
        } else if (error.status === 402) {
          console.log('error 402');
            return [];
        } else if (error.status === 404) {
          console.log('error 404');
            return [];
        } else if (error.status === 500) {
            console.log('err 500', error)
            return throwError(error);
        } else {
          console.log('error code not found ', error)
          return throwError(error);
        }

      })
    );
  }
}