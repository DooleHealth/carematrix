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
        //console.log(`[DooleService] getAPI_SCP_goals(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPI_SCP_procedures(): Observable<any> {
    let path = `rehabilify/sharedcareplan/medical-procedures`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPI_SCP_procedures(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPI_SCP_prescribedApp(): Observable<any> {
    let path = `rehabilify/prescribed-apps`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPI_SCP_procedures(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPI_SCP_StatusContent(): Observable<any> {
    let path = `sharecareplan/content/group/new-content-statuses`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPI_SCP_StatusContent(${path}) res: `, res);
        return res;
      })
    );
  }

  getAPIExercises(params): Observable<any> {
    let path = 'rehabilify/sharedcareplan/exercises';
    const endpoint = this.api.getEndpoint(path);
    let httpParams = new HttpParams()
    .set('tags', params.tags)
    .set('interactions', params.interactions)
    .set('readingTime', params.readingTime);
    return this.http.get(endpoint, httpParams).pipe(
      map((res: any) => {
        console.log(`[DooleService] getAPIExercises(${path}) res: `, res);
        return res;
      })
    );
  }
}
