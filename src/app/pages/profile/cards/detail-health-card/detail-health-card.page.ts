import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AddHealthCardPage } from '../add-health-card/add-health-card.page';
@Component({
  selector: 'app-detail-health-card',
  templateUrl: './detail-health-card.page.html',
  styleUrls: ['./detail-health-card.page.scss'],
})
export class DetailHealthCardPage implements OnInit {
  card: any = {};
  id
  isLoading = false
  constructor(
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getDetailsHealthCard()
  }

  getDetailsHealthCard(){
    this.isLoading = true
    this.dooleService.getAPIhealthCardId(this.id).subscribe(
      async (res: any) =>{
        console.log('[CardsPage] getHealthCards()', await res);
        if(res.success)
        this.card = res.healthcard
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

  async editCard(){
    const modal = await this.modalCtrl.create({
      component:  AddHealthCardPage,
      componentProps: { card: this.card},
      cssClass: "modal-custom-class"
    });
  
    modal.onDidDismiss()
      .then((result) => {
        console.log('addCard()', result);     
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }
        else if(result?.data?.action == 'update'){
          this.notification.displayToastSuccessful()
          this.getDetailsHealthCard()
        }
        else if(result?.data?.action == 'delete'){
          this.notification.displayToastSuccessful()
          this.router.navigate(['/profile/cards'])
        }
      });
  
      await modal.present();
  
    }


}
