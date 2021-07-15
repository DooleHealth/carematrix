import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpWithoutInterceptor: HttpClient;

  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend,
    private authService: AuthenticationService,
  ) {
    this.httpWithoutInterceptor = new HttpClient(httpBackend);
  }

  private async formatErrors(error: any) {
    return error;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    let user = this.authService.user
    params = (user?.familyUnit) ? params.append('user', user?.familyUnit) : params
    return this.http.get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, options: Object = {}): Observable<any> {

    let httpOptions = this.setHttpOptions(options);
    console.log("url: ", path);
    console.log("body: ", body);
    return this.http.put(
      `${path}`,
      JSON.stringify(body),
      httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    let user = this.authService.user
    if (user?.familyUnit !== null)
      body['user'] = user?.familyUnit;

    let httpOptions = this.setHttpOptions(options);
    console.log("url: ", path);
    console.log("body: ", body);

    return this.http.post(
      `${path}`,
      JSON.stringify(body),
      httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }

  _get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpWithoutInterceptor.get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  _put(path: string, body: Object = {}): Observable<any> {
    return this.httpWithoutInterceptor.put(
      `${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  _post(path: string, body: Object = {}, options: Object = {}): Observable<any> {

    let httpOptions = this.setHttpOptions(options);
    let params = this.setHttpParams(body);


    return this.httpWithoutInterceptor.post(
      `${path}`,
      JSON.stringify(body),
      httpOptions
    ).pipe(catchError(error => this.formatErrors(error)));
  }

  _delete(path): Observable<any> {
    return this.httpWithoutInterceptor.delete(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }

  setHttpParams(body) {
    let params = new HttpParams();

    if (body != null)
      for (let key in body)
        params = params.append(key, body[key]);

    return params;
  }

  setHttpOptions(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return httpOptions;

  }
}