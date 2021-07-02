import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
const { Storage } = Plugins;
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  email = ''
  isSubmitted= false
  code = new FormControl('', [Validators.required, Validators.minLength(4)]);
  constructor(
    public router: Router,    
    private translate: TranslateService,
    private alertController: AlertController,
    private dooleService: DooleService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.email = history.state.email;
    console.log('[VerificationPage] ngOnInit()', this.email);
  }


  goIntro(){
    console.log('[VerificationPage] goIntro()', this.code.value);
    this.isSubmitted = true
    if(!this.code.invalid){
      this.checkCode(this.code.value)
    }
  }

  checkCode(code){
    this.dooleService.postAPIcodeVerification(code).subscribe(
      async (res: any) =>{
        console.log('[VerificationPage] checkCode()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          this.checkConditionLegal()
          //this.router.navigateByUrl("intro")
        }else{
          this.dooleService.presentAlert(this.translate.instant("verification.alert_message"))
        }
       },(err) => { 
          console.log('VerificationPage checkCode()  ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


  sendEmail(email){
    console.log('[VerificationPage] sendEmail()',email );
    this.dooleService.postAPIemailVerification(email).subscribe(
      async (res: any) =>{
        console.log('[LegalPage] sendEmail()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          let messagge = this.translate.instant("verification.send_email_alert_message")
          await  this.dooleService.presentAlert(messagge)
        }
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  async getVerificationCode(){
    console.log('[VerificationPage] getVerificationCode()' );
    this.sendEmail(this.email)
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
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/intro']);
      }
    })
  }

}
