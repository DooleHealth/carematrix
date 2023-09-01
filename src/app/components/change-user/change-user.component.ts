import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FamilyUnit } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
@Component({
  selector: 'changeUser',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.scss'],
})
export class ChangeUserComponent implements OnInit {  
  @Input('isFamily') isFamily: boolean;
  isLoading = false
  user
  constructor(
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private alertController: AlertController,
    public router: Router,
    private translate: TranslateService) { this.user = this.authService?.user?.familyUnit}

  ngOnInit() {
    
  }

  getFamilyUnitData(){
    this.isLoading = true
    this.dooleService.getAPIFamilyUnit().subscribe(
      async (res: any) =>{
        console.log('[ChangeUserComponent] getFamilyUnitData()', await res);
        //this.listFamilyUnit = res
        this.isLoading = false
       },(err) => { 
          console.log('[ChangeUserComponent] getFamilyUnitData() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  changeAccount(family){
    console.log('[ChangeUserComponent] changeAccount()', family.name);
    this.presentAlertConfirm(family)
  }

  async presentAlertConfirm(family) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: family.name,
      message: this.translate.instant("setting.family_unit.msg_alert_change_perfil"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("alert.button_change"),
          handler: () => {
            console.log('Confirm Okay');
            console.log('[ChangeUserComponent] presentAlertConfirm() Cuenta de:', family.name);
            this.changeUser(family)
          }
        }
      ]
    });

    await alert.present();
  }

  changeUser(user?){
    console.log('[ChangeUserComponent] changeUser() Cuenta de:', user);
    this.authService.setFamilyUnit(user);
    this.router.navigateByUrl('home');
    console.log(this.authService?.user.listFamilyUnit) 
  }

  returnUser(){
    console.log('[ChangeUserComponent] returnUser()');
    this.authService.setUserFamilyId(null);
    this.router.navigateByUrl('home');
    console.log(this.authService?.user.listFamilyUnit) 
  }


}

