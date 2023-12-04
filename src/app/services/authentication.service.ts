import { Inject, Injectable, Injector, PLATFORM_ID, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiEndpointsService } from '../services/api-endpoints.service';
import { Constants } from '../config/constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router, RouterOutlet } from '@angular/router';
import { FamilyUnit } from '../models/user';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './token.service';
import { Capacitor } from '@capacitor/core';

const INTRO_KEY = 'intro';
//const TOKENS = 'tokens';
//const TOKEN_KEY = 'token';

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
  public isFamily:boolean;
  private indexEndPoint: number;
  private tokens = []
  showingSignInAlert: boolean = false;
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private tokenService: TokenService,
    private api: ApiEndpointsService,
    public platform: Platform,
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    private constants: Constants,
    public alertController: AlertController,
    private injector: Injector) {
      this.setUser();
  }

  getIndexEndPoint(){
    this.indexEndPoint = Number(localStorage.getItem('endpoint'))
    console.log("[AuthService] indexEndPoint: ", this.indexEndPoint);
  }

  getAuthToken() {
    const token =  this.tokenService.getAuthToken()
    //console.log("[AuthService] getAuthToken: ", token);
    return token;
  }

  setAuthToken(token) {
    this.tokenService.setAuthToken(token)
  }

  // getAuthToken() {
  //   const token = localStorage.getItem(TOKEN_KEY);
  //   return token;
  // }

  // setAuthToken(token) {
  //   localStorage.setItem(TOKEN_KEY, token);
  // }

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
        if (res.token){
          this.tokenService.setAuthToken(res.token);
          this.setAuthToken(res.token);
        }

        // Set indexEndPoint ios_dev if it is QA
          this.getIndexEndPoint()
            if (Capacitor.isNativePlatform()) {
              //console.log(data);
              let access = true;
              if(this.deviceToken && this.devicePlatform)
                this.registerDevice(this.deviceToken, this.devicePlatform);

              if (this.platform.is('ios')){
                if(this.voipDeviceToken)
                  this.registerDevice(this.voipDeviceToken, (this.indexEndPoint!==0)?'iosvoipdev':'iosvoip');

              }

            }

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
    Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });

  }

  setFamilyUnitLocalstorage(familyUnit: []) {


    familyUnit.forEach(member => {
      let s: string = member['name'];
      let fullname = s.split(',');
      let u = new User(member['id'], '', fullname[1], fullname[0], member['thumbnail']);
      console.log("familyUnit Local:", u);
      Preferences.set({
        key: String(u.idUser),
        value: JSON.stringify(u)
      });
    })
  }

  getFamilyUnitLocalstorage(id): Promise<User> {
    return Preferences.get({ key: id }).then((val) => {
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
    Preferences.set({
      key: String(user.id),
      value: JSON.stringify(this.user)
    });


  }

  getUserLocalstorage(): Promise<User> {
    return Preferences.get({ key: 'user' }).then((val) => {
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
    return Preferences.get({ key: 'showIntro' }).then((val) => {
      return Boolean(val.value)
    });
  }

  async setShowIntroLocalstorage() {
    await Preferences.set({
      key: 'showIntro',
      value: 'true'
    });
  }

  setTwoFactor(tfCenter){
    localStorage.setItem('two-factor-center', tfCenter);
  }

  async logout1(): Promise<void>{
    console.log('logout');
    this.isAuthenticated.next(false);
    await Preferences.remove({ key: 'user' }).then((val) => { });
       this.tokenService.removeAuthToken()
    return
  }

  logout(allDevices?): Observable<any>  {
    let path = 'patient/logout'
    //this.getAllTokenDevices()
    const tokens = this.tokenService.getAllTokenDevices();
      let params = {
        tokens:  tokens, //
        allDevices: allDevices? allDevices: false
      }
      console.log('logout', params );
      const endpoint = this.api.getEndpoint(path);
      return this.http.post(endpoint, params).pipe(
        map( (res: any) => {
          console.log(`[AuthenticationService] logout(${path}) res: `, JSON.stringify(res) );
          this.isAuthenticated.next(false);
           Preferences.remove({ key: 'user' }).then((val) => { });
           this.tokenService.removeAuthToken()
          return res;
        })
      );
  }

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
        this.tokenService.saveAllTokenDevices(postData)
        //this.saveAllTokenDevices(postData)
        return response;
      },
      (error) => {
        // Called when error
        console.log('error user/device/register: ', error);
        throw error;
      });
  }

  // saveAllTokenDevices(token){
  //   this.tokens.push(token)
  //   console.log(`[AuthService] saveAllTokenDevices()`, this.tokens);
  //   localStorage.setItem(TOKENS,JSON.stringify(this.tokens))
  // }

  // getAllTokenDevices(){
  //   let list = JSON.parse(localStorage.getItem(TOKENS))
  //   console.log(`[AuthService] getAllTokenDevices()`, list);
  //   this.tokens = list? list:[]
  // }


  async showIntro() {
    return Preferences.get({ key: INTRO_KEY }).then(async (data) => {
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

  redirectLogin(){
    this.router.navigateByUrl('/landing');
  }


  async redirectUnauthenticated() {

      const translateService = this.injector.get(TranslateService)

      const alert = await this.alertController.create({
        cssClass: "alertClass",
        header:  translateService.instant('info.title'),
        backdropDismiss:false,
        // subHeader: 'Subtitle',
        message: translateService.instant('landing.login_again'),
        buttons: [
          {text: translateService.instant('button.accept'),
          handler: () => {
            this.router.navigateByUrl(`/landing`);
          }
        }
        ]
      });

      await alert.present();
    }

}
