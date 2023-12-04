import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiEndpointsService } from '../api-endpoints.service';
import { HttpService } from '../http.service';

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

  getAPI_SCP_procedures(id): Observable<any> {
    let path = `rehabilify/medical-procedures/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        //console.log(`[DooleService] getAPI_SCP_procedures(${path}) res: `, res);
        return res;
      })
    );
  }
}
