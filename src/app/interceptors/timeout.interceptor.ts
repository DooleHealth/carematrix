import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(!window.navigator.onLine){
      console.log('TimeoutInterceptor: ERR_INTERNET_DISCONNECTED');
      return throwError({status:0, message:'ERR_INTERNET_DISCONNECTED'});
    }
    else{
      const timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
      const timeoutValueNumeric = Number(timeoutValue);
  
      return next.handle(req).pipe(timeout(timeoutValueNumeric));
    }
  
  }
}