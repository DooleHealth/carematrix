import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-detail-health-card',
  templateUrl: './detail-health-card.page.html',
  styleUrls: ['./detail-health-card.page.scss'],
})
export class DetailHealthCardPage implements OnInit {
  card: HealthCard;
  constructor(
    private dooleService: DooleService,
    public router: Router,
    private alertController: AlertController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getHealthCard()
  }

  getHealthCard(){
    this.card = history.state.card;
    console.log('[DetailHealthCardPage] getHealthCard()' ,  this.card); 
  }

  serviceDeleteHealthCard(){
    this.dooleService.deleteAPIhealthCard( this.card).subscribe(
      async (res: any) =>{
        console.log('[DetailHealthCardPage] serviceDeleteHealthCard()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          let messagge = this.translate.instant('detail_health_card.alert_message_delete_card')
          let header = this.translate.instant('alert.header_info')
           this.dooleService.showAlertAndReturn(header, messagge, false, '/cards' )
          
        }else{
          console.log('[DetailHealthCardPage] serviceDeleteHealthCard() Unsuccessful response', await res);
        }
       },(err) => { 
          console.log('[DetailHealthCardPage] serviceDeleteHealthCard() ERROR(' + err.code + '): ' + err.message); 
           this.dooleService.presentAlert(err.messagge)
          throw err; 
      });
  }

  editHealthCard(){
    console.log('[DetailHealthCardPage] editHealthCard()');
  }

  deleteHealthCard(){
    console.log('[DetailHealthCardPage] deleteHealthCard()');
    if(this.card === undefined || this.card === null ) return
    this.presentAlertConfirm()
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant(this.card.name),
      message: this.translate.instant("detail_health_card.confirmation_delete_card"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[DetailHealthCardPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[DetailHealthCardPage] AlertConfirm Okay');
            this.serviceDeleteHealthCard();
          }
        }
      ]
    });

    await alert.present();
  }


}
