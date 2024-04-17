// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from '../shared/classes/url-builder';
import { QueryStringParameters } from '../shared/classes/query-string-parameters';
// Application Constants
import { Constants } from 'src/app/config/constants';
@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {
  constructor(
    // Application Constants
    private constants: Constants
  ) { }
  /* #region URL CREATOR */
  // URL
  private createUrl( action: string, isDooleAPI: boolean = false): string {
    //Change EndPoind
    this.setEndPoint()

    const urlBuilder: UrlBuilder = new UrlBuilder(
      isDooleAPI ? this.constants.API_DOOLE_ENDPOINT : this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }
  // URL WITH QUERY PARAMS
  private createUrlWithQueryParameters(
    action: string, 
    queryStringHandler?: 
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    //Change EndPoind
    this.setEndPoint()
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT, 
      action
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }
  
  public getEndpoint = (action): string => this.createUrl(action, false);
  public getDooleEndpoint = (action): string => this.createUrl(action, true);
  public getEndpointWithParameters = (action, parameters): string => this.createUrlWithQueryParameters(action, parameters);
  // URL WITH PATH VARIABLES
  private createUrlWithPathVariables(
    action: string, 
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,  
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }
  /* #endregion */

  setIndexEndPointLocalstorage(endpoint) {
    console.log(`[ApiEndpointsService] setEndPointLocalstorage()`, endpoint);
    localStorage.setItem('endpoint', JSON.stringify(endpoint));
  }

  getIndexEndPointLocalstorage() {
    let endpoint = localStorage.getItem('endpoint');
    if(endpoint) return Number(JSON.parse(endpoint))
    return undefined
  }

  setEndPoint(){
    let indexEndPoint = this.getIndexEndPointLocalstorage()
    let index = indexEndPoint? indexEndPoint:0
    this.constants.setEndPoint(index)
    this.constants.INDEX = index
  }

  loadEndPoints(){
    this.constants.addEndPoint()
  }




}
