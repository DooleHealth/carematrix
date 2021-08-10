import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Directive, HostListener } from '@angular/core';
const { Storage } = Plugins;
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  //email = ''
  isSubmitted= false
  pattern = "^\\d{1,4}$"
  code = new FormControl('', [Validators.required, Validators.minLength(6)/* , Validators.pattern(this.pattern) */]);
  constructor(
    public router: Router,    
    private translate: TranslateService,
    private dooleService: DooleService,
    private authService: AuthenticationService,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    //this.email = history.state.email;
    console.log('[VerificationPage] ngOnInit()');
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
          this.notification.displayToastSuccessful()
        }else{
          this.dooleService.presentAlert(this.translate.instant("verification.alert_message"))
        }
       },(err) => { 
          console.log('VerificationPage checkCode()  ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


  sendEmailWithCode(){
    this.dooleService.getAPICodeByEmail().subscribe(
      async (res: any) =>{
        console.log('[VerificationPage] sendEmailWithCode()', await res);
        this.showAlertSendEmail(res.success)
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          let messagge = this.translate.instant("verification.send_email_alert_message")
          this.dooleService.presentAlert(messagge +' '+ err.message)
          throw err; 
      });
  }

  async showAlertSendEmail(success){
    if(success)
      this.notification.displayToastSuccessful()
    else{
      let messagge = this.translate.instant("verification.error_send_email_alert_message")
      await this.dooleService.presentAlert(messagge)
    }
  }

  checkConditionLegal(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[VerificationPage] checkConditionLegal()', await res);
         if(res.success)
          this.redirectPage(res.accepted_last)
         else
          alert(res.message)
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

  @HostListener('keypress', ['$event'])
  onInput(event: any) {
    const pattern = /[0-9]/; // without ., for integer only
    let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      return false;
    }
    return true;
  }

}
