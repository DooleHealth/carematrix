import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LanguageService } from 'src/app/services/language.service';
const { Storage } = Plugins;


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  loginForm: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  validation_messages = {
    'username': [
      { type: 'required', message: 'login.username_val' }
    ],
    'password': [
      { type: 'required', message: 'login.password_val' },
    ]
  };
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService,
    public loadingController: LoadingController,
    public location: Location,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private ngZone: NgZone,
    public languageService: LanguageService,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', 
      Validators.compose([
        Validators.required
      ])),
      password: new FormControl('',
        Validators.compose([
        Validators.required])
      )
    });
   }

  ngOnInit() {
  }

  showAlert(message:string) {
    this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });
  }

  async dismissLoading() {
   
    if (this.redirectLoader) {
      console.log("dismissLoading");
      this.redirectLoader.dismiss();
    }
  }

  setUser(data: { id_usuari_mgc: string; mutua: string; name: string; id_usuari_amiq: string; quadre:string, language_id:number}){
    //console.log("setUser", data);
    this.authService.id_usuari_mgc = data.id_usuari_mgc;
    this.authService.mutua = data.mutua;
  
    this.authService.setUser(data.name, data.id_usuari_mgc, data.id_usuari_amiq, data.mutua, data.quadre, data.language_id);
    let language = this.authService.user.idioma;
    this.languageService.changeLanguage(language);
    localStorage.setItem('language', language);
  
  }

  resetSubmitError() {
    this.submitError = null;
  }

    // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // hide the loader and redirect the user to the profile page
  redirectLoggedUserToHomePage() {
    console.log('[LandingPage] redirectLoggedUserToHomePage()');
    //this.dismissLoading();
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {      
      //this.router.navigate(['app/home']);
      this.router.navigate(['legal']);
    });
  }

  doDooleAppLogin() : void {
    let text = this.translate.instant('login.submit');
    this.loadingController.create({
      spinner: 'lines',
      message: text + 'DooleApp',
      cssClass: 'custom-loading',
      backdropDismiss:false
    }).then((loader) => {
      const currentUrl = this.location.path();
      this.redirectLoader = loader;
      this.redirectLoader.present();
      this.authService.login(this.loginForm.value).subscribe(async (res) => {

        console.log('doMgcLogin', res);
        if(res.status == 301 || res.status == 302 || res.status == 392){
          this.showAlert(this.translate.instant('login.fail'));
          this.dismissLoading();
        }else{

          this.setUser(await res);
          console.log("this mutua: ", res.mutua);
          this.saveInLocalStorage('mutua')
         
          this.resetSubmitError();
          // Must sign agreement, redirect to /legal
          if (res.condicion_legal == 0) {
            console.log(res);
            this.dismissLoading();
            this.router.navigate(['/legal'], { state: { agreement: res.condicion_legal_contingut.contingut } });
            
          } else{
            this.dismissLoading();
            this.redirectLoggedUserToHomePage();
          }

        }
      }, async (error) => {
       console.log('doMGCLogin ERROR', await error);
       this.dismissLoading();
       throw error;
     });
    });
   
  }

  private async saveInLocalStorage(data: any){
    /**
     * On iOS this plugin  Storage will use UserDefaults and on Android SharedPreferences. 
     * Stored data is cleared if the app is uninstalled.
     */
    await Storage.set({
      key: 'mutua',
      value: data
    });
  }
 

 
}
