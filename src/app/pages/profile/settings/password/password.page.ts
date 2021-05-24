import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  isSubmittedNewPassword= false;
  isSubmittedRepeatedPassword= false;
  isSubmittedCurrentPassword= false;
  formPassword: FormGroup;
  constructor(
    private dooleService: DooleService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
     this.formPassword = this.formBuilder.group({
     newPassword: ['', [Validators.required, Validators.minLength(4)]],
     confirmedPassword: ['', [Validators.required, Validators.minLength(4), this.checkPasswords.bind(this)]],
      currentPassword: ['', [Validators.required, Validators.minLength(4)]],
   })
 
  }

  private checkPasswords(group: FormControl) {
    if(this.formPassword !== null && this.formPassword !== undefined) {
      const pass = this.formPassword.get('newPassword').value;
      const confirmPass = group.value;
      //console.log(`[PasswordPage] checkPasswords(${pass}, ${confirmPass})`);
      return pass === confirmPass ? null : {
          NotEqual: true
      };
    }
 }

  changePassword(){
    this.isSubmittedPassword(true)
    if(!this.formPassword.invalid){
      this.presentAlertConfirm()
      console.log(`[PasswordPage] changePassword(OK)`);
    }

  }

  getErrorCurrentPassword() {
    if (this.formPassword.get('currentPassword').hasError('required')) {
      return this.translate.instant("setting.password.validators_required");
    }
    if (this.formPassword.get('currentPassword').hasError('minlength')) {
      return this.translate.instant("setting.password.validators_minlength");
    }
    return '';
  }

  getErrorNewPassword(){
    if (this.formPassword.get('newPassword').hasError('required')) {
      return this.translate.instant("setting.password.validators_required");
    }
    if (this.formPassword.get('newPassword').hasError('minlength')) {
      return this.translate.instant("setting.password.validators_minlength");
    }
    return '';
  }

  getErrorConfirmPassword() {
    if (this.formPassword.get('confirmedPassword').hasError('required')) {
      return this.translate.instant("setting.password.validators_required");
    }
    if (this.formPassword.get('confirmedPassword').hasError('NotEqual')) {
      return this.translate.instant("setting.password.validators_check_password");
    }
    return '';
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant("alert.header_confirmation"),
      message: this.translate.instant("setting.password.password_confirmation"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('Confirm Okay');
            this.postChangePassword();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [{
        text: this.translate.instant("alert.button_ok"),
        handler: () => {
          console.log('Confirm Okay');
          this.isSubmittedPassword(false)
          this.router.navigateByUrl('/profile/settings');
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

  postChangePassword(){
    let params = {
      oldPassword: this.formPassword.get('currentPassword').value,
      newPassword: this.formPassword.get('newPassword').value,
    }
    this.dooleService.postAPIChangePassword(params).subscribe(
      async (res: any) =>{
       console.log('[InitialPage] postChangePassword()', await res);
       if(res.success){
          this.presentAlert(this.translate.instant("setting.password.success_changed_password"))
       }
        else{
          this.presentAlert(this.translate.instant("setting.password.no_success_changed_password"))
        }
       },(err) => { 
          console.log('postChangePassword() ERROR(' + err.code + '): ' + err.message); 
          this.presentAlert(this.translate.instant("setting.password.error_changed_password"))
          throw err; 
      });
  }

  isSubmittedPassword(isSubmitted){
    this.isSubmittedNewPassword= isSubmitted;
    this.isSubmittedRepeatedPassword= isSubmitted;
    this.isSubmittedCurrentPassword= isSubmitted;
  }
}
