import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { retry, catchError, timeout, map, finalize } from 'rxjs/operators';
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
      timeout(10000),
      catchError((error) => {
        console.log('ServerErrorInterceptor -> ', error);
      if (error instanceof TimeoutError) {
        console.log('error instanceof TimeoutError ');
        return throwError(error);
      } else if(error.message == 'ERR_INTERNET_DISCONNECTED' || error.status == 0 || error.message=='Timeout has occurred'){
        return throwError(error);
        //return throwError(error)
      } else if (error.status === 401) {
        //this.router.navigate(['login']);
        return [];
      } else if (error.status === 400) {
        console.error('error 400');
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
      }),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }
  private handleSuccessfulResponse(event): HttpResponse<any> {
    // console.log('response at interceptor', event);

    if (event instanceof HttpResponse) {
      event = event.clone({ body: event.body.response });
    }
    return event;
  }

  // private handleErrorResponse(error):  Observable<HttpEvent<any>> {
  //   // console.log('response at interceptor', event);

  //   {
        
      

  //   }
  // }
  private handleRequestCompleted(): void {
    console.log(`Request finished`);
  }

}