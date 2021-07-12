import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input()credentials: {username, password};
  constructor( private authService: AuthenticationService, private dooleService: DooleService, private router: Router, private ngZone: NgZone,  private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loginUser();
  }

  loginUser(){
    this.authService.login(this.credentials).subscribe(async (res) => {
      console.log('[LandingPage] doDooleAppLogin()', res);
      if(res.success){
        this.checkConditionLegal();
      }else{
        this.modalCtrl.dismiss({error: 'Credenciales Inválidas'});
      }
    }, async (error) => { 
     console.log('doDooleAppLogin() ERROR', await error?.message);
     this.modalCtrl.dismiss({error:error});
     throw error;
   });
  }

  checkConditionLegal(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LandingPage] checkConditionLegal()', await res);
         if(res.success)
          this.redirectPage(res.accepted_last)


       },(err) => { 
          console.log('[LandingPage] checkConditionLegal() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
     
  }

  redirectPage(condicion){
    if(!condicion){
      this.router.navigate(['/legal']);
      this.modalCtrl.dismiss({date:null});
    } else{
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
        this.modalCtrl.dismiss({date:null});
      }
    })
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
      setTimeout(() => {
        // Close modal
        this.modalCtrl.dismiss({date:null});
    }, 500);
      
    });
  }


}
