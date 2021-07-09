import { Inject, Injectable, PLATFORM_ID, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { HttpService } from '../services/http.service';
import { Constants } from '../config/constants';
import {HttpErrorResponse} from '@angular/common/http';
import { Platform } from '@ionic/angular';
import {AngularFireAuth} from "@angular/fire/auth";
import { Router, RouterOutlet } from '@angular/router';
const { Storage } = Plugins;
const TOKEN_KEY = 'token';
const INTRO_KEY = 'intro';

export class User{
  condicion_legal: boolean;
  image: any;
  idPatient: string;
  idUser: string;
  secret: string;
  roles : any = [];
  familyUnit : string;
  name:string;
  constructor(idUser:string, secret:string, name:string, image:string){
    this.idUser = idUser
    this.secret = secret
    this.name = name
    this.image = image
  };

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public user: User;
  public isRecovery: boolean = false;
  public action:string;
  public id_user:string;
  public data : Array<any>;
  public email: string;
  public agendaUser = [];
  public tiene_email: boolean;
  public deviceToken: string;
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
      if(!this.user)
        this.setUser("14303",null,'Valarezo, David','https://via.placeholder.com/300x300.png?text=VD' );
     
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

  login(credentials: {username, password}): Observable<any> {

    const endpoint = this.api.getEndpoint('patient/login');

    console.log('credentials: ', credentials);
    return this.http.post(endpoint, credentials).pipe(
      map((res: any) => {

        console.log("[AuthService] login(): ", res);

        if(!res.success){
          return res
          //this.throwError(res);
        }
        // save user's token
        if(res.token)
          this.setAuthToken(res.token);

        if(res.firebaseToken){
          this.firebaseAuth.signInWithCustomToken(res.firebaseToken).then((data) => {
            if(!this.platform.is('mobileweb') && !this.platform.is('desktop')){
              this.registerDevice();
            }

          }, (error) => {
            console.log(error);
          });
        }
        this.user = new User(res.idUser, credentials.password, res.name, res.temporary_url);
        this.setUserLocalstorage(this.user)
        // user's data
        return res;

      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }),
    );
  }

  setUser(idUser: string, secret?: string, name?:string, image?:string ){
    this.user = new User(idUser,secret, name, image);
    console.log("user: ", this.user );
    this.setUserLocalstorage(this.user)
  }

  setUserLocalstorage(user){
     Storage.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  getUserLocalstorage() : Promise<User>{
    return Storage.get({key: 'user'}).then((val) => {
      return JSON.parse(val.value);
    });
  }

  getShowIntroLocalstorage() : Promise<any>{
    return Storage.get({key: 'showIntro'}).then((val) => {
      return Boolean(val.value)
    });
  }

  async setShowIntroLocalstorage(){
    await Storage.set({
     key: 'showIntro',
     value: 'true'
   });
 }

  logout(): Promise<void> {
    console.log('logout');
    this.isAuthenticated.next(false);
    Storage.remove({key: 'user'}).then((val) => { });
    return Storage.remove({key: TOKEN_KEY});
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
        });
  }

  async showIntro(){
    return Storage.get({key: INTRO_KEY}).then(async (data)=>{
      let showIntro = Boolean(data.value)
      console.log(`[AuthService] showIntro()`, showIntro);
      return showIntro;

    })

  }
}
