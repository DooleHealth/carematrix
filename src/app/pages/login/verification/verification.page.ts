import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
const { Storage } = Plugins;
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  KEY_TELEPHONE_STORAGE = 'telephone';
  isSubmitted= false
  code = new FormControl('', [Validators.required, Validators.minLength(4)]);
  constructor(
    public router: Router,    
    private translate: TranslateService,
    private alertController: AlertController,
    private dooleService: DooleService
  ) { }

  ngOnInit() {
  }


  goIntro(){
    console.log('[VerificationPage] goIntro()', this.code.value);
    this.isSubmitted = true
    if(!this.code.invalid){
      this.checkCode(this.code.value)
    }
  }

  checkCode(code){
    this.dooleService.postAPIsmsConfirmation(code).subscribe(
      async (res: any) =>{
        console.log('[VerificationPage] checkCode()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          this.router.navigateByUrl("intro")
        }else{
          this.presentAlert(this.translate.instant("verification.alert_message"))
        }
       },(err) => { 
          console.log('VerificationPage checkCode()  ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [{
        text: this.translate.instant("alert.button_ok"),
        handler: () => {
          console.log('Confirm Okay');
        }
      }],
    });
    await alert.present();
  }

  sendTelephone(telephone){
    console.log('[VerificationPage] sendTelephone()',telephone );
    this.dooleService.postAPIsmsVerification(telephone).subscribe(
      async (res: any) =>{
        console.log('[LegalPage] sendTelephone()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          this.presentAlert(
            this.translate.instant("verification.send_telephone_alert_message"))
        }
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  async getVerificationCode(){
    console.log('[VerificationPage] getVerificationCode()' );
    Storage.get({key: this.KEY_TELEPHONE_STORAGE}).then((data)=>{
      let  telephone = data.value
      this.sendTelephone(telephone)
    })
  }

}
