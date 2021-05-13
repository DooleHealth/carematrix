import { Inject, Injectable, PLATFORM_ID, ViewChild } from '@angular/core';

import { Plugins } from '@capacitor/core';

import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiEndpointsService } from '../services/api-endpoints.service';
import { HttpService } from '../services/http.service';
import { Constants } from '../config/constants';
import {HttpErrorResponse} from '@angular/common/http';
import { Platform } from '@ionic/angular';

import {AngularFireAuth} from "@angular/fire/auth";
import { Router, RouterOutlet } from '@angular/router';
const { Storage } = Plugins;
const TOKEN_KEY = 'token';


@Injectable()
export class User{
  
  condicion_legal: boolean;
  constructor(){};
  //constructor(){};
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public user: User;
  public mutua: string;
  public isRecovery: boolean = false;
  public action:string;

  public id_usuari_mgc:string;

  public data : Array<any>;
  public email: string;
  public agendaUser = [];
  public tiene_email: boolean;
  public deviceToken: string; //="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay00Zm00NUBtZ2MtZG9vbGUuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay00Zm00NUBtZ2MtZG9vbGUuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJhdWQiOiJodHRwczpcL1wvaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tXC9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsInVpZCI6IjE2NCIsImlhdCI6MTYxMjUxNzQ1NCwiZXhwIjoxNjEyNTIxMDU0fQ.TUngoAxjR8CUY7yiWX8MB3LLwpwmYJgrkVdfNlL7PE4Y-dyJir_jGkwlhAbgFtTOtXio2n6Tyv3B4adUTdF-bsnViVPuwbdRrBX2_Cme9NYB11IvI2vKEMoqua0OYmq5ol9B-6lG_634Cdu1Vh3neTyUhnZhjm9JdHDGyQfFqXQ4rXp2P_M6Woq7d_Wr-Gfo6RDJNRIxvRfy_S9yebzw1r3rUrtXaUCa5Y6RvIAiJEZv0eH1VdTHDiX4ISAkb_bQqr1883ySV47_Rk8FTKyl3MoU534hgk0Qk3ISf7wKTSgZAowleSQrIe9VTkjIVBFgnQoeu97NmmdOXMcpHSb11A";
  public devicePlatform: string;
  public dietsAndAdvices: [];
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(private http: HttpService,  
    private api: ApiEndpointsService, 
    private constants: Constants,  
    public platform: Platform,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: object) { 
      
  }

  getAuthToken() {
    const token = localStorage.getItem(TOKEN_KEY );
    return token;
  }

  hasToken() : boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  
  setAuthToken(token){
    localStorage.setItem(TOKEN_KEY, token);
  }
  
  

  

  login(credentials: {username, password, credencial, mutua?:string}): Observable<any> {

    const endpoint = this.api.getEndpoint('patient/login');

    return this.http.post(endpoint, credentials).pipe(
      map((res: any) => {

        console.log("Login res: ", res);

        if(!res.success){
          this.throwError(res);
        }
        // save user's token
        if(res.token)
          localStorage.setItem(TOKEN_KEY, res.token);
          
        if(res.firebaseToken){
          this.firebaseAuth.signInWithCustomToken(res.firebaseToken).then((data) => {
            if(!this.platform.is('mobileweb') && !this.platform.is('desktop')){
              this.registerDevice();
            }
            
          }, (error) => {
            console.log(error);
          });
        }
        
        // user's data
        return res.data;

      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }),
    );
  }

  logout(): Promise<void> {
    console.log('logout');
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});    
  }

  validateCredentials(credentials: Object, resource : string): Observable<any> {
    
    const endpoint = this.api.getEndpoint('appamiq/' + resource);
    //console.log("endpoint_ ", endpoint);
    return this.http.post(endpoint, credentials).pipe(
      map((res: any) => {
       
        if(res.status != 200)
          this.throwError(res);
        else
          return res.data;
       
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  get(endpt): Observable<any>{
    const endpoint = this.api.getDooleEndpoint(endpt);
    return this.http.get(endpoint).pipe(
        map((res: any) => {

          return res;

        })
    );

  }

  post(endpt, items): Observable<any>{
    const endpoint = this.api.getDooleEndpoint(endpt);
   
    return this.http.post(endpoint, items).pipe(
        map((res: any) => {

          return res;

        })
    );


  }

  throwError(error: any) {
    if(error instanceof HttpErrorResponse)
      throw new HttpErrorResponse(error);
    else 
      throw new Error(error);
  }


  public registerDevice() {

    //console.log("register device token:"+this.deviceToken+" "+this.devicePlatform);

    const postData = {
      token: this.deviceToken,
      platform: this.devicePlatform,
    };

    this.post('user/device/register', postData).subscribe(
        async (data) => {

        },
        (error) => {
          // Called when error
          console.log('error: ', error);
          throw new HttpErrorResponse(error);
        },
        () => {
          // Called when operation is complete (both success and error)
          // loading.dismiss();
        });
  }
}
