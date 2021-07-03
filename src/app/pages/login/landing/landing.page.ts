import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LanguageService } from 'src/app/services/language.service';
import { DooleService } from 'src/app/services/doole.service';
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

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private translate: TranslateService,
    public loadingController: LoadingController,
    public location: Location,
    private authService: AuthenticationService,
    public alertController: AlertController,
    private ngZone: NgZone,
    public languageService: LanguageService,
    private dooleService: DooleService
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


  async dismissLoading() {
   
    if (this.redirectLoader) {
      console.log("dismissLoading");
      this.redirectLoader.dismiss();
    }
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
      this.router.navigate(['home']);
    });
  }

  doDooleAppLogin() : void {
    let text = this.translate.instant('landing.login');
    this.loadingController.create({
      spinner: 'lines',
      message: text,
      cssClass: 'custom-loading',
      backdropDismiss:false
    }).then((loader) => {
      const currentUrl = this.location.path();
      this.redirectLoader = loader;
      this.redirectLoader.present();
      console.log('[LandingPage] doDooleAppLogin()', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe(async (res) => {
        console.log('[LandingPage] doDooleAppLogin()', res);
        if(res.success){
        this.checkConditionLegal();
        }
        this.dismissLoading();
      }, async (error) => { 
       console.log('doDooleAppLogin() ERROR', await error?.message);
       this.dismissLoading();
       throw error;
     });
    });
   
  }

  checkConditionLegal(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LandingPage] checkConditionLegal()', await res);
         //if(res.accepted_last)
         this.redirectPage(res.accepted_last)

       },(err) => { 
          console.log('[LandingPage] checkConditionLegal() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
     
  }

  redirectPage(condicion){
    if(!condicion)
      this.router.navigate(['/legal']);
    else{
      this.showIntro()
    }      
  }

  showIntro(){
    this.authService.getShowIntroLocalstorage().then((showIntro) =>{
      console.log(`[LegalPage] getStorage() localStorage`,showIntro);
      if(showIntro){
        this.redirectLoggedUserToHomePage();
      }else{
        this.router.navigate(['/intro']);
      }
    })
  }

  private async saveInLocalStorage(data: any){
    /**
     * On iOS this plugin  Storage will use UserDefaults and on Android SharedPreferences. 
     * Stored data is cleared if the app is uninstalled.
     */
    await Storage.set({
      key: 'user',
      value: JSON.stringify(data)
    });
  }


  sendPassword(username){
    console.log('[LandingPage] passwordRecovery()');
    this.dooleService.postAPIpasswordRecovery(username) .subscribe(
      async (res: any) =>{
        //console.log('[InitialPage] passwordRecovery()', await res);

       },(err) => { 
          console.log('[LandingPage] passwordRecovery() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  async passwordRecovery() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('landing.header_message_password_recovery'),
      message: this.translate.instant('landing.message_password_recovery'),
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: this.translate.instant('landing.user'),
        }],
        buttons: [
          {
            text: this.translate.instant("alert.button_cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('[LandingPage] AlertConfirm Cancel');
            }
          }, {
            text: this.translate.instant("alert.button_send"),
            handler: (data) => {
              console.log('[LandingPage] AlertConfirm Okay', data.username );
              this.sendPassword(data.username)
            }
          }
        ]
    });

    await alert.present();
  }


 
}
