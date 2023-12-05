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
    let path = `rehabilify/medical-procedures`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

get_APi_ACP_forms(): Observable<any> {
    let path = `rehabilify/sharedcareplan/forms`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

  get_APi_ACP_monitoring(): Observable<any> {
    let path = `rehabilify/sharedcareplan/monitoring`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }

  get_APi_ACP_medication(): Observable<any> {
    let path = `rehabilify/sharedcareplan/medication-plan`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPIagendaID(${path}) res: `, res);
        return res;
      })
    );
  }


  post_API_ACP_declined_acepted(model, model_id, type, coments?): Observable<any> {
    let path = `sharecareplan/content/acepted-or-declined`;
    let params = {
      'model': model,
      'model_id': model_id,
      'type': type,
      'comments': coments
      
    }   
  const endpoint = this.api.getEndpoint(path);
  return this.http.post(endpoint, params).pipe(
    map((res: any) => {
      //console.log(`[DooleService] postAPIdrugIntake(${path}) res: `, res);
      return res;

    })
  );
  }

}
