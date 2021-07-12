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
    let verification_code = {code : code}
    this.dooleService.postAPIcodeVerification(verification_code).subscribe(
      async (res: any) =>{
        console.log('[VerificationPage] checkCode()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          //this.checkConditionLegal()
          this.redirectPage(true)
        }else{
          this.dooleService.presentAlert(this.translate.instant("verification.alert_message"))
        }
       },(err) => { 
          console.log('VerificationPage checkCode()  ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


  sendEmail(email){
    let send_email ={email: email}
    console.log('[VerificationPage] sendEmail()',send_email );
    this.dooleService.postAPIemailVerification(send_email).subscribe(
      async (res: any) =>{
        console.log('[LegalPage] sendEmail()', await res);
        let  isSuccess = res.success 
        this.showAlertSendEmail(isSuccess)
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          let messagge = this.translate.instant("verification.send_email_alert_message")
          this.dooleService.presentAlert(messagge +' '+ err.message)
          throw err; 
      });
  }

  async showAlertSendEmail(success){
    let messagge = '' 
    if(success)
      messagge = this.translate.instant("verification.send_email_alert_message")
    else
      messagge = this.translate.instant("verification.send_email_alert_message")
    await  this.dooleService.presentAlert(messagge)
  }

  async getVerificationCode(){
    console.log('[VerificationPage] getVerificationCode()' );
    this.sendEmail(this.email)
  }

  checkConditionLegal(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[VerificationPage] checkConditionLegal()', await res);
         //if(res.accepted_last)
         this.redirectPage(res.accepted_last)

       },(err) => { 
          console.log('[VerificationPage] checkConditionLegal() ERROR(' + err.code + '): ' + err.message); 
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
