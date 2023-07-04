import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {
  isSubmitted= false
  email = new FormControl('', [Validators.required, Validators.minLength(9), Validators.email,]);
  constructor(
    public router: Router,
    private translate: TranslateService,
    private alertController: AlertController,
    private dooleService: DooleService,
    public nav: NavController
  ) { }

  ngOnInit() {
  }

  goVerification(){
    console.log('[LegalPage] goVerification()', this.email.value);
    this.isSubmitted = true
    if(!this.email.invalid){
      this.presentAlertConfirm()
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.email.value,
      message: this.translate.instant("sms.alert_message"),
      buttons: [
        {
          text: this.translate.instant("sms.ko_button"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("sms.ok_button"),
          handler: () => {
            console.log('Confirm Okay');
            this.sendEmail(this.email.value);
          }
        }
      ]
    });

    await alert.present();
  }


  sendEmail(email){
    let user_email ={email: email}
    this.dooleService.postAPIemailVerification(user_email).subscribe(
      async (res: any) =>{
        console.log('[LegalPage] sendEmail()', await res);
        let  isSuccess = res.success
        if(isSuccess){
          this.nav.navigateForward("verification", { state: {email: this.email.value} });
        }else{
          console.log('[LegalPage] sendEmail() Unsuccessful response', await res);
        }
       },(err) => {
          console.log('[LegalPage] sendEmail() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }



}
