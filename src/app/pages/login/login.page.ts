import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input()credentials: {username, password, hash};
  constructor( 
    private authService: AuthenticationService, 
    private dooleService: DooleService, 
    private router: Router, 
    private ngZone: NgZone, 
    public languageService: LanguageService, 
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private analyticsService: AnalyticsService
    ) { }

  ngOnInit() {
    this.loginUser();
  }

  async ionViewDidEnter(){
    //this.analyticsService.setScreenName('login','LoginPage')
  }

  loginUser(){
    this.authService.login(this.credentials).subscribe(async (res) => {
      //console.log('[LoginPage] doDooleAppLogin()', res);
      await res;
      if(res.success){ 
        //this.analyticsService.setUser(res.idUser)
        //this.analyticsService.logEvent('login', res)
        //this.analyticsService.logEvent('sign_in_doole', {user_doole: res.idUser})
        //this.analyticsService.logEvent('user_doole', {userId: res.idUser})
        if(res.twoFactorUser){
          this.router.navigate(['/verification']);
          this.modalCtrl.dismiss({error:null});
        }
        else
        this.checkConditionLegal();
      }else{
        let message = this.translate.instant('landing.message_wrong_credentials')
        this.modalCtrl.dismiss({error: message});
      }
    
    }, async (error) => { 
     //console.log('doDooleAppLogin() ERROR', await error?.message);
     this.modalCtrl.dismiss({error:error});
     throw error;
   });
  }


  checkConditionLegal(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{

        //console.log('[LoginPage] checkConditionLegal()', await res);
         if(res.success)

        //console.log('[LoginPage] checkConditionLegal()', await res);
        if(res.success)

          this.redirectPage(res.accepted_last)
        else
          this.modalCtrl.dismiss({error:res.message});
       },(err) => { 
          console.log('[LoginPage] checkConditionLegal() ERROR(' + err.code + '): ' + err.message); 
          this.modalCtrl.dismiss({error:err.message});
          throw err; 
      });
     
  }

  redirectPage(condicion){
    if(!condicion){
      this.router.navigate(['/legal']);
      this.modalCtrl.dismiss({error:null});
    }else{
      this.redirectBiometric()
    }      
  }

  showIntro(){
    this.authService.getShowIntroLocalstorage().then((showIntro) =>{
      console.log(`[LegalPage] getStorage() localStorage`,showIntro);
      if(showIntro){
        this.redirectLoggedUserToHomePage();
      }else{
        this.router.navigate(['/intro']).then(()=>{
          this.modalCtrl.dismiss({error:null});
        });
        
      }
    })
  }

    // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // hide the loader and redirect the user to the profile page
  redirectLoggedUserToHomePage() {
    console.log('[LoginPage] redirectLoggedUserToHomePage()');
    //this.dismissLoading();
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {      
      this.router.navigate(['home']);
      setTimeout(() => {
        // Close modal
        this.modalCtrl.dismiss({date:null});
    }, 500);
      
    });
  }

  redirectBiometric(){
    let condicion = JSON.parse( localStorage.getItem('show-bio-dialog') )
    if(condicion){
      this.modalCtrl.dismiss({error:null});
      this.router.navigate(['/login/biometric-auth']);
    } else{
      this.showIntro()
    }      
  }


}
