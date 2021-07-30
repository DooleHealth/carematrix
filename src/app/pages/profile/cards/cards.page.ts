import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AddHealthCardPage } from './add-health-card/add-health-card.page';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  listCard=[];
  isLoading = false
  constructor(
    public router: Router,
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    console.log('[CardsPage] ngOnInit()');
    this.getHealthCards()
  }

  ionViewDidEnter(){
    console.log('[CardsPage] ionViewDidEnter()');
    this.getHealthCards()
  }

  getHealthCards(){
    this.isLoading = true
    this.dooleService.getAPIhealthCards().subscribe(
      async (res: any) =>{
        console.log('[CardsPage] getHealthCards()', await res);
        if(res.success)
        this.listCard = res.healthcards
        this.isLoading = false
       },(err) => { 
          console.log('[CardsPage] getHealthCards() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  formatDate(d){
    let date = new Date(d.split(' ')[0]);
    let time = d[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date;
  }

  async addCard(){
    const modal = await this.modalCtrl.create({
      component:  AddHealthCardPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });
  
    modal.onDidDismiss()
      .then((result) => {
        console.log('addCard()', result);     
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'add'){
          this.notification.displayToastSuccessful()
          this.getHealthCards()
        }
      });
  
      await modal.present();
  
    }

}
