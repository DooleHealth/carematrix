import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private dooleService: DooleService
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
    const telephoneTemp =  this.telephone.value
    this.telephone.setValue(this.COUNTRY_CODE + telephoneTemp)
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.COUNTRY_CODE +" "+  telephoneTemp,
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
            this.sendTelephone(this.telephone.value);
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
          this.saveTelephone()
          this.router.navigateByUrl("verification")
        }else{
          console.log('[LegalPage] sendTelephone() Unsuccessful response', await res);
        }
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  async saveTelephone(){
    await Storage.set({
     key: 'telephone',
     value: this.telephone.value
   });
   console.log(`[VerificationPage] saveTelephone()`);
 }

}
