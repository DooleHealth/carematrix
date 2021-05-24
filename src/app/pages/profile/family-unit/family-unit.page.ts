import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FamilyUnit } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-family-unit',
  templateUrl: './family-unit.page.html',
  styleUrls: ['./family-unit.page.scss'],
})
export class FamilyUnitPage implements OnInit {
  listFamilyUnit:FamilyUnit[];
  constructor(
    private dooleService: DooleService,
    private alertController: AlertController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getFamilyUnitData()
  }

  getFamilyUnitData(){
    this.dooleService.getAPIFamilyUnit().subscribe(
      async (res: any) =>{
        console.log('[FamilyUnitPage] getFamilyUnitData()', await res);
        this.listFamilyUnit = res
       },(err) => { 
          console.log('[FamilyUnitPage] getFamilyUnitData() ERROR(' + err.code + '): ' + err.message); 
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
          }
        }
      ]
    });

    await alert.present();
  }


}
