import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FamilyUnit } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-family-unit',
  templateUrl: './family-unit.page.html',
  styleUrls: ['./family-unit.page.scss'],
})
export class FamilyUnitPage implements OnInit {
  listFamilyUnit:FamilyUnit[] = [];
  isLoading = false
  user
  constructor(
    private dooleService: DooleService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    public router: Router,
    private translate: TranslateService) { this.user = this.authService.user?.familyUnit}

  ngOnInit() {
    this.getFamilyUnitData()
  }

  getFamilyUnitData(){
    this.isLoading = true
    this.dooleService.getAPIFamilyUnit().subscribe(
      async (res: any) =>{
        console.log('[FamilyUnitPage] getFamilyUnitData()', await res);
        this.listFamilyUnit = res
        this.isLoading = false
       },(err) => { 
          console.log('[FamilyUnitPage] getFamilyUnitData() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  changeAccount(family){
    console.log('[FamilyUnitPage] changeAccount()', family.name);
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
            console.log('[FamilyUnitPage] presentAlertConfirm() Cuenta de:', family.name);
            this.changeUser(family)
          }
        }
      ]
    });

    await alert.present();
  }

  changeUser(user?){
    console.log('[FamilyUnitPage] changeUser() Cuenta de:', user);
    this.authService.setUserFamilyId(user? user.id: null);
    this.router.navigateByUrl('home');
  }


  returnUser(){
    console.log('[FamilyUnitPage] returnUser()');
    this.authService.setUserFamilyId(null);
    this.router.navigateByUrl('home');
  }


}
