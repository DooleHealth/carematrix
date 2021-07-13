import { transition } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-add-health-card',
  templateUrl: './add-health-card.page.html',
  styleUrls: ['./add-health-card.page.scss'],
})
export class AddHealthCardPage implements OnInit {
  card: any={};
  healthCardTypes =[]
  dateMax: any;
  formHealthCard: FormGroup;
  isSubmittedName = false;
  isSubmittedAffiliationNumber = false;
  isSubmittedModality = false;
  isAddCard = true;
  constructor(
    private dooleService: DooleService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public router: Router,
    private translate: TranslateService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.getHealthCardTypes()
    let year = (new Date(Date.now()).getFullYear()) + 20
    this.dateMax =  year
    this.setFormCard()
  }

  setFormCard(){
    this.formHealthCard = this.formBuilder.group({
      id: [''],
      health_card_type_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      expiration_date: [''],
      issue_date: [''],
      /* description: ['description'], */
    })
  }

  ionViewDidEnter(){
    console.log('[AddHealthCardPage] ionViewDidEnter()');
    this.getHealthCard()
  }

  getHealthCard(){
    this.card = history.state.card;
    console.log('[AddHealthCardPage] getHealthCard()' ,  this.card);
    if(this.card){
      this.isAddCard = false
      this.showDetailCard()
    }else{
      this.setFormCard()
    }
  }


  showDetailCard(){
    this.formHealthCard.get('id').setValue(this.card.id)
    this.formHealthCard.get('health_card_type_id').setValue(this.card.type.id) //
    this.formHealthCard.get('name').setValue(this.card.name)
    this.formHealthCard.get('card_number').setValue(this.card.card_number)
    this.formHealthCard.get('expiration_date').setValue(this.card.expiration_date? this.card.expiration_date:'')
    this.formHealthCard.get('issue_date').setValue(this.card.issue_date? this.card.issue_date:'')
  }
  compareFn(e1: any, e2: any): boolean {
    return  e1.id === e2.id
  }

  getHealthCardTypes(){
    console.log('[AddHealthCardPage] getHealthCardTypes()'); 
    this.dooleService.getAPIhealthCardTypes().subscribe(
      async (res: any) =>{
        console.log('[AddHealthCardPage] getHealthCardTypes()', await res); 
        if(res.success ){
          this.healthCardTypes = res.healthCardTypes
        }
       },(err) => { 
          console.log('[AddHealthCardPage] getHealthCardTypes() ERROR(' + err.code + '): ' + err.message); 
           this.dooleService.presentAlert(err.messagge)
          throw err; 
      });
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  addCard(){
    console.log('[AddHealthCardPage] addCard()' , this.formHealthCard.value); 
    this.isSubmittedFields(true);
    if(this.formHealthCard.valid){

      let expiration_date = this.formHealthCard.get('expiration_date').value;
      this.formHealthCard.get('expiration_date').setValue(this.transformDate(expiration_date));

      let issue_date = this.formHealthCard.get('issue_date').value;
      this.formHealthCard.get('issue_date').setValue(this.transformDate(issue_date));

      this.dooleService.postAPIhealthCards(this.formHealthCard.value).subscribe(
        async (res: any) =>{
          console.log('[AddHealthCardPage] addCard()', await res);
          if(res.success ){
            let messagge = this.translate.instant('add_health_card.alert_message_add_card')
            let header = this.translate.instant('alert.header_info')
            this.dooleService.showAlertAndReturn(header,messagge,false, '/profile/cards')
          }else{
            console.log('[AddHealthCardPage] addCard() Unsuccessful response', await res);
            let messagge = this.translate.instant('add_health_card.error_alert_message_add_card')
            this.dooleService.presentAlert(messagge)
          }
         },(err) => { 
            console.log('[AddHealthCardPage] addCard() ERROR(' + err.code + '): ' + err.message); 
            let messagge = this.translate.instant('add_health_card.error_alert_message_add_card') + ', '+ err.message
             this.dooleService.presentAlert(messagge)
            throw err; 
        });
    }
  }

  editCard(){
    console.log('[AddHealthCardPage] editCard()' , this.formHealthCard.value); 
    this.isSubmittedFields(true);
    if(this.formHealthCard.valid){
      let expiration_date = this.formHealthCard.get('expiration_date').value;
      this.formHealthCard.get('expiration_date').setValue(this.transformDate(expiration_date));

      let issue_date = this.formHealthCard.get('issue_date').value;
      this.formHealthCard.get('issue_date').setValue(this.transformDate(issue_date));
      this.dooleService.putAPIhealthCard(this.formHealthCard.value).subscribe(
        async (res: any) =>{
          console.log('[AddHealthCardPage] editCard()', await res);
          let  isSuccess = res.success 
          if(isSuccess){
            let message = this.translate.instant('edit_health_card.alert_message_edit_card')
            let header = this.translate.instant('alert.header_info')
            this.dooleService.showAlertAndReturn(header,message,false, '/profile/cards')
          }else{
            console.log('[AddHealthCardPage] editCard() Unsuccessful response', await res);
            let messagge = this.translate.instant('edit_health_card.error_alert_message_edit_card')
            this.dooleService.presentAlert(messagge)
          }
         },(err) => { 
            console.log('[AddHealthCardPage] editCard() ERROR(' + err.code + '): ' + err.message); 
            let messagge = this.translate.instant('edit_health_card.error_alert_message_edit_card')+', '+ err.message
             this.dooleService.presentAlert(messagge)
            throw err; 
        });
    }
  }

/*   async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [{
        text: this.translate.instant("alert.button_ok"),
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigateByUrl('/cards');
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  } */


  isSubmittedFields(isSubmitted){
    this.isSubmittedName = isSubmitted
    this.isSubmittedAffiliationNumber = isSubmitted;
    this.isSubmittedModality = isSubmitted;
  }

  deleteHealthCard(){
    console.log('[AddHealthCardPage] deleteHealthCard()');
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
            console.log('[AddHealthCardPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[AddHealthCardPage] AlertConfirm Okay');
            this.serviceDeleteHealthCard();
          }
        }
      ]
    });

    await alert.present();
  }

  serviceDeleteHealthCard(){
    this.dooleService.deleteAPIhealthCard( this.card).subscribe(
      async (res: any) =>{
        console.log('[DetailHealthCardPage] serviceDeleteHealthCard()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          let messagge = this.translate.instant('detail_health_card.alert_message_delete_card')
          let header = this.translate.instant('alert.header_info')
           this.dooleService.showAlertAndReturn(header, messagge, false, '/profile/cards' )         
        }else{
          console.log('[DetailHealthCardPage] serviceDeleteHealthCard() Unsuccessful response', await res);
          let messagge = this.translate.instant('delete_health_card.error_alert_message_delete_card')
          this.dooleService.presentAlert(messagge)
        }
       },(err) => { 
          console.log('[DetailHealthCardPage] serviceDeleteHealthCard() ERROR(' + err.code + '): ' + err.message); 
          let messagge = this.translate.instant('delete_health_card.error_alert_message_delete_card')+', '+err.message
          this.dooleService.presentAlert(messagge)
          throw err; 
      });
  }


}
