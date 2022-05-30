import { Inject, Injectable, PLATFORM_ID, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { Constants } from '../config/constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, RouterOutlet } from '@angular/router';
import { FamilyUnit } from '../models/user';
const { Storage } = Plugins;
const TOKEN_KEY = 'token';
const INTRO_KEY = 'intro';

export class User {
  condicion_legal: boolean;
  image: any;
  idPatient: string;
  idUser: string;
  first_name: string;
  secret: string;
  roles: any = [];
  familyUnit: string;
  name: string;
  listFamilyUnit: FamilyUnit[] = [];
  constructor(idUser: string, secret: string, name: string, first_name: string, image: string) {
    this.idUser = idUser
    this.secret = secret
    this.name = name
    this.first_name = first_name
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
  public action: string;
  public id_user: string;
  public data: Array<any>;
  public email: string;
  public agendaUser = [];
  public tiene_email: boolean;
  public deviceToken: string;
  public devicePlatform: string;
  public voipDeviceToken: string;
  public voipDevicePlatform: string;
  public dietsAndAdvices: [];
  public deviceVoipToken: any;
  public isFamily:boolean;
  private indexEndPoint: number;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(private http: HttpClient,
    private api: ApiEndpointsService,
    public platform: Platform,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    private constants: Constants,
    @Inject(PLATFORM_ID) private platformId: object) {
    this.setUser();
  }

  getIndexEndPoint(){
    this.indexEndPoint = Number(localStorage.getItem('endpoint'))
    console.log("[AuthService] indexEndPoint: ", this.indexEndPoint);
  }

  getAuthToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }

  hasToken(): boolean {
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

  setAuthToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  login(credentials: { username, password, hash }): Observable<any> {

    const endpoint = this.api.getEndpoint('patient/login');

    console.log('credentials: ', credentials);
    return this.http.post(endpoint, credentials).pipe(
      map((res: any) => {

        console.log("[AuthService] login() OK ");
        console.log("[AuthService] endpoint", endpoint);
        if (!res.success) {
          return res
        }
        // save user's token
        if (res.token)
          this.setAuthToken(res.token);
        // Set indexEndPoint ios_dev if it is QA
          this.getIndexEndPoint()
        // if (res.firebaseToken) {
        //   this.firebaseAuth.signInWithCustomToken(res.firebaseToken).then((data) => {
            if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
              //console.log(data);
              let access = true;
              if(this.deviceToken && this.devicePlatform)
                this.registerDevice(this.deviceToken, this.devicePlatform);
              
              if (this.platform.is('ios')){
                if(this.voipDeviceToken) 
                  this.registerDevice(this.voipDeviceToken, (this.indexEndPoint!==0)?'iosvoipdev':'iosvoip');        
                
              }
               
              
            }

        //   }, (error) => {
        //     console.log("[signInWithCustomToken] error", error);
        //     throw error;
        //   });
        // }
        this.user = new User(res.idUser, credentials.password, res.name, res.first_name, res.temporary_url);
        this.id_user = res.idUser;
        this.setUserLocalstorage(this.user)
        this.setTwoFactor(res.twoFactorCenter)
        if (res?.familyUnit.length > 0) {
          this.user.listFamilyUnit = res.familyUnit;
        }

        return res;

      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      }),
    );
  }

  setUser() {
    if (!this.user) {
      this.getUserLocalstorage().then(user => {
        console.log("[AuthenticationService] setUser()", user);
        if (user)
          this.user = user
      })
    }

  }

  setUserLocalstorage(user) {
    console.log(`[AuthenticationService] setUserLocalstorage()`, user);
    Storage.set({
      key: 'user',
      value: JSON.stringify(user)
    });

  }

  setFamilyUnitLocalstorage(familyUnit: []) {

  
    familyUnit.forEach(member => {
      let s: string = member['name'];
      let fullname = s.split(',');
      let u = new User(member['id'], '', fullname[1], fullname[0], member['thumbnail']);
      console.log("familyUnit Local Storage:", u);
      Storage.set({
        key: u.idUser,
        value: JSON.stringify(u)
      });
    })
  }

  getFamilyUnitLocalstorage(id): Promise<User> {
    return Storage.get({ key: id }).then((val) => {
      console.log(`[AuthenticationService] getFamilyUnitLocalstorage(${id})`, val);
      return JSON.parse(val.value);
    });
  }

  public async setFamilyUnit(user) {
    this.isFamily = true;
    let s: string = user['name'];
    let fullname = s.split(',');
    this.user = new User(user.id, '', fullname[0].replace(',',''), fullname[1], user.thumbnail);
    this.user.familyUnit = user.id;
    Storage.set({
      key: user.id,
      value: JSON.stringify(this.user)
    });


  }

  getUserLocalstorage(): Promise<User> {
    return Storage.get({ key: 'user' }).then((val) => {
      return JSON.parse(val.value);
    });
  }

  public async setUserFamilyId(id) {

    await this.getUserLocalstorage().then(user => {
      console.log(`[AuthenticationService] MEMBER(${id})`, user);
      let s: string = user['name'];
      let fullname = s.split(',');
      this.user = new User(user['idUser'], '', fullname[0].replace(',',''), fullname[1], user['image']);
      this.user.familyUnit = id;
      this.setUserLocalstorage(this.user)
    })
  }

  getShowIntroLocalstorage(): Promise<any> {
    return Storage.get({ key: 'showIntro' }).then((val) => {
      return Boolean(val.value)
    });
  }

  async setShowIntroLocalstorage() {
    await Storage.set({
      key: 'showIntro',
      value: 'true'
    });
  }

  setTwoFactor(tfCenter){
    localStorage.setItem('two-factor-center', tfCenter);
  }

  async logout(): Promise<void> {
    console.log('logout');
    this.isAuthenticated.next(false);
    await Storage.remove({ key: 'user' }).then((val) => { });
    return Storage.remove({ key: TOKEN_KEY });
  }

/*   logout(params): Observable<any>  {
    console.log('logout');
    const endpoint = this.api.getEndpoint('patient/login');
    return this.http.post(endpoint, params).pipe(
      map(async (res: any) => {
        //console.log(`[DooleService] postAPIaddAgenda(${path}) res: `, res);
        this.isAuthenticated.next(false);
        await Storage.remove({ key: 'user' }).then((val) => { });
        await Storage.remove({ key: TOKEN_KEY });
        return res;
      })
    );

  } */

  increaseNumloginFailed(){
    let numFailLogin = 0
    let num = localStorage.getItem('num-fail-login');
    if(num){
      let numFailLogin = Number(JSON.parse(num)) + 1
      localStorage.setItem('num-fail-login',''+numFailLogin);
      localStorage.setItem('login_request_locked_at',''+(new Date().getTime()));
    }else{
      localStorage.setItem('num-fail-login','1');
      localStorage.setItem('login_request_locked_at',''+(new Date().getTime()));
      numFailLogin = 1
    }
    console.log('[AuthenticationService] increaseNumloginFailed()', numFailLogin);
  }

  increaseNumFPAIOFailed(){
    let num = localStorage.getItem('num-fail-finger-print');
    if(num){
      localStorage.setItem('num-fail-login',''+(Number(JSON.parse(num)) + 1));
      localStorage.setItem('login_request_locked_at',''+(new Date().getTime()));
    }else{
      localStorage.setItem('num-fail-login','1');
      localStorage.setItem('login_request_locked_at',''+(new Date().getTime()));
    }
  }

  getNumloginFailed(){
    let num = localStorage.getItem('num-fail-login');
    if(num) return Number(JSON.parse(num))
    return 0
  }

  getDateloginFailed(){
    let num = localStorage.getItem('login_request_locked_at');
    if(num) return Number(JSON.parse(num))
    return 0
  }

  getNumFingerPrinterFailed(){
    let num = localStorage.getItem('num-fail-finger-print');
    if(num) return Number(JSON.parse(num))
    return 0
  }

  removeNumloginFailed(){
    localStorage.removeItem('num-fail-login');
    localStorage.removeItem('login_request_locked_at');
  }

  removeNumFirgerPFailed(){
    localStorage.removeItem('num-fail-finger-print');
    localStorage.removeItem('login_request_locked_at');
  }

  get(endpt): Observable<any> {
    const endpoint = this.api.getDooleEndpoint(endpt);
    return this.http.get(endpoint).pipe(
      map((res: any) => {
        return res;
      })
    );

  }

  post(endpt, items): Observable<any> {
    const endpoint = this.api.getDooleEndpoint(endpt);

    // endpoint
    //console.log("body", endpt);
    // body
    //console.log("body",items);
    return this.http.post(endpoint, items).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  throwError(error: any) {

    if (error instanceof HttpErrorResponse)
      throw new HttpErrorResponse(error);
    else
      throw new Error(error);
  }


  public registerDevice(token, platform) {

     if(platform == 'FCM')
      platform = 'android';
     if(platform == 'APNS')
      platform =  (this.indexEndPoint!==0)?'ios_dev':'ios';
     if(platform == 'ios')
      platform =  (this.indexEndPoint!==0)?'ios_dev':'ios';

     const postData = {
      token: token,
      platform: platform
    };

    console.log("postData: ",  postData);

    return this.post('user/device/register', postData).subscribe(
      async (data) => {
        let response=data;
        console.log("response user/device/register");
        console.log(response);
      
        return response;
      },
      (error) => {
        // Called when error
        console.log('error user/device/register: ', error);
        throw error;
      });
  }

  async showIntro() {
    return Storage.get({ key: INTRO_KEY }).then(async (data) => {
      let showIntro = Boolean(data.value)
      console.log(`[AuthService] showIntro()`, showIntro);
      return showIntro;

    })

  }


  postAPIbiometric(params: Object): Observable<any> {
    let path = `user/biometric`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.post(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] postAPIbiometric(${path}) res: `, res);
        return res;

      })
    );
  }

  putAPIbiometric(id: any, params: Object): Observable<any> {
    let path = `user/biometric/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.put(endpoint, params).pipe(
      map((res: any) => {
        console.log(`[DooleService] putAPIbiometric(${path}) res: `, res);
        return res;

      })
    );
  }

  deleteAPIbiometric(id: Object): Observable<any> {
    let path = `user/biometric/${id}`;
    const endpoint = this.api.getEndpoint(path);
    return this.http.delete(endpoint).pipe(
      map((res: any) => {
        console.log(`[DooleService] deleteAPIbiometric(${path}) res: ${res}`, JSON.stringify(res));
        return res;
      })
    );
  }
}
