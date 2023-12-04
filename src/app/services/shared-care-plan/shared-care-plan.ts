import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiEndpointsService } from '../api-endpoints.service';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedCarePlanService {

  constructor(
    private http: HttpService,
    private api: ApiEndpointsService,
  ) { }


  getAPI_SCP_goals(): Observable<any> {
    let path = `sharecareplan/goals`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPI_SCP_procedures(id): Observable<any> {
    let path = `rehabilify/medical-procedures/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

get_APi_ACP_forms(id): Observable<any> {
    let path = `rehabilify/sharedcareplan/forms/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

  get_APi_ACP_monitoring(id): Observable<any> {
    let path = `rehabilify/sharedcareplan/monitoring/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

  get_APi_ACP_medication(id): Observable<any> {
    let path = `rehabilify/sharedcareplan/medication-plan/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }


  post_API_ACP_declined_acepted(model, model_id, type, coments?): Observable<any> {
    let path = `sharecareplan/content/acepted-or-declined?model_id&model&type&coments`;
    let httpParams = new HttpParams();
    httpParams = httpParams? httpParams.append('model', model) : httpParams
    httpParams = httpParams? httpParams.append('model_id', model_id) : httpParams
    httpParams = httpParams? httpParams.append('type', type) : httpParams
    httpParams = httpParams? httpParams.append('coments', coments) : httpParams
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint, httpParams).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

}