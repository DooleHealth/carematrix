import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {
  COUNTRY_CODE = "+34"
  isSubmitted= false
  telephone = new FormControl('', [Validators.required, Validators.minLength(9)]);
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
    console.log('[LegalPage] goVerification()', this.telephone.value);
    this.isSubmitted = true
    if(!this.telephone.invalid){
      this.presentAlertConfirm()
    }
  }

  async presentAlertConfirm() {
    const telephoneTemp =  this.COUNTRY_CODE + this.telephone.value
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.COUNTRY_CODE +" "+  this.telephone.value,
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
            this.sendTelephone(telephoneTemp);
          }
        }
      ]
    });

    await alert.present();
  }


  sendTelephone(telephone){
    this.dooleService.postAPIsmsVerification(telephone).subscribe(
      async (res: any) =>{
        console.log('[LegalPage] sendTelephone()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          let value= this.COUNTRY_CODE + this.telephone.value
          this.nav.navigateForward("verification", { state: {phone: value} });
        }else{
          console.log('[LegalPage] sendTelephone() Unsuccessful response', await res);
        }
       },(err) => { 
          console.log('[LegalPage] sendTelephone() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }



}
