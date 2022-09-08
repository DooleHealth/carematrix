import { transition } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-add-health-card',
  templateUrl: './add-health-card.page.html',
  styleUrls: ['./add-health-card.page.scss'],
})
export class AddHealthCardPage implements OnInit {
  @Input() card: any
  healthCardTypes =[]
  dateMax: any;
  formHealthCard: FormGroup;
  isSubmittedName = false;
  isSubmittedAffiliationNumber = false;
  isSubmittedModality = false;
  isSubmittedExpiration = false;
  isSubmittedIssueDate = false;
  isAddCard = true;
  isSubmitted: boolean;
  constructor(
    private dooleService: DooleService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    public router: Router,
    private translate: TranslateService,
    public datepipe: DatePipe,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.setFormCard()
    this.getHealthCardTypes()
    let year = (new Date(Date.now()).getFullYear()) + 20
    this.dateMax =  year
  }

  setFormCard(){
    this.formHealthCard = this.formBuilder.group({
      id: [''],
      health_card_type_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      expiration_date: ['', [ this.checkDate.bind(this)]],
      issue_date: ['', [ this.checkStartDate.bind(this)]],
      /* description: ['description'], */
    
    })
  
  }

  private checkStartDate(group: FormControl) {
    if(this.formHealthCard !== null && this.formHealthCard !== undefined) {
      const start_date = group.value;
      const end_date = this.formHealthCard.get('expiration_date').value;
      console.log(`[AddHealthCardPage] checkStartDate(${start_date}, ${end_date})`);
      if(start_date && end_date && end_date !== ''){
        return new Date(start_date).getTime()  <= new Date(end_date).getTime() ? null : {
          NotLess: true
      };
      }
    }
 }

  private checkDate(group: FormControl) {
    if(this.formHealthCard !== null && this.formHealthCard !== undefined) {
      const start_date = this.formHealthCard.get('issue_date').value;
      const end_date = group.value;
      console.log(`[AddHealthCardPage] checkDate(${start_date}, ${end_date})`);
      if(start_date && end_date && end_date !== ''){
        return new Date(start_date).getTime()  <= new Date(end_date).getTime() ? null : {
          NotLess: true
      };
      }
    }
 }

 checkDateEvent(){
  // if(this.formHealthCard !== null && this.formHealthCard !== undefined) {
  //   const start_date = this.formHealthCard.get('issue_date').value;
  //   const end_date = this.formHealthCard.get('expiration_date').value;;
  //   console.log(`[AddHealthCardPage] checkDate(${start_date}, ${end_date})`);
  //   if(start_date && end_date && end_date !== '' && start_date !== ''){
  //     return new Date(start_date).getTime()  <= new Date(end_date).getTime() ? null : {
  //       NotLess: true
  //   };
  //   }
  // }

  if (this.formHealthCard.get('expiration_date').hasError('NotLess') && this.formHealthCard.get('issue_date').hasError('NotLess')) {
    console.log('[AddHealthCardPage] checkDateEvent() End y Start Hay error');
    this.formHealthCard.get('issue_date').setValue('');
    this.formHealthCard.get('expiration_date').setValue('');
  }

  else if (this.formHealthCard.get('expiration_date').hasError('NotLess')) {
    console.log('[AddHealthCardPage] checkDateEvent() End Hay error');
    //this.formHealthCard.get('issue_date').setValue('');
  }
  else  if (this.formHealthCard.get('issue_date').hasError('NotLess')){
    console.log('[AddHealthCardPage] checkDateEvent() Start Hay error');
    //this.formHealthCard.get('expiration_date').setValue('');
  }
  else
  console.log('[AddHealthCardPage] checkDateEvent() No Hay error');
 }

  ionViewDidEnter(){
    console.log('[AddHealthCardPage] ionViewDidEnter()');
    this.getHealthCard()
  }

  getHealthCard(){
    //this.card = history.state.card;
    console.log('[AddHealthCardPage] getHealthCard()' ,  this.card);
    if(this.card){
      this.isAddCard = false
      this.showDetailCard()
    }else{
      this.setFormCard()
    }
  }

  getErrorEndDate() {
    if (this.formHealthCard.get('expiration_date').hasError('NotLess')) {
      return this.translate.instant("add_health_card.error_end_date");
    }
    return '';
  }

  getErrorStartDate() {
    if (this.formHealthCard.get('issue_date').hasError('NotLess')) {
      return this.translate.instant("add_health_card.error_start_date");
    }
    return '';
  }

  showDetailCard(){
    this.formHealthCard.get('id').setValue(this.card.id)
    //this.formHealthCard.get('health_card_type_id').setValue(this.card.type.id) //
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
          if(this.card?.type?.id){
            let type = this.healthCardTypes.find(type => (type.id === this.card.type.id))
            this.formHealthCard.get('health_card_type_id').setValue(type.id) 
          }
        }
       },(err) => { 
          console.log('[AddHealthCardPage] getHealthCardTypes() ERROR(' + err.code + '): ' + err.message); 
           this.presentAlert(err.messagge)
          throw err; 
      });
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
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
            this.modalCtrl.dismiss({error:null, action: 'add'});
            console.log(this.formHealthCard);
          }else{
            console.log('[AddHealthCardPage] addCard() Unsuccessful response', await res);
            let messagge = this.translate.instant('add_health_card.error_alert_message_add_card')
            this.presentAlert(messagge)
          }
         },(err) => { 
            console.log('[AddHealthCardPage] addCard() ERROR(' + err.code + '): ' + err.message); 
            let messagge = this.translate.instant('add_health_card.error_alert_message_add_card') + ', '+ err.message
             this.presentAlert(messagge)
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
            this.modalCtrl.dismiss({error:null, action: 'update'});
          }else{
            console.log('[AddHealthCardPage] editCard() Unsuccessful response', await res);
            let messagge = this.translate.instant('edit_health_card.error_alert_message_edit_card')
            this.presentAlert(messagge)
          }
         },(err) => { 
            console.log('[AddHealthCardPage] editCard() ERROR(' + err.code + '): ' + err.message); 
            let messagge = this.translate.instant('edit_health_card.error_alert_message_edit_card')+', '+ err.message
             this.presentAlert(messagge)
            throw err; 
        });
    }
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      message: message,
      buttons: [{
        text: this.translate.instant("alert.button_ok"),
        handler: () => {
          console.log('Confirm Okay');
          this.modalCtrl.dismiss({error:message});
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }


  isSubmittedFields(isSubmitted){
    this.isSubmittedName = isSubmitted
    this.isSubmittedAffiliationNumber = isSubmitted;
    this.isSubmittedModality = isSubmitted;
    this.isSubmittedExpiration = isSubmitted;
    this.isSubmittedIssueDate = isSubmitted;
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
           this.modalCtrl.dismiss({error:null, action: 'delete'});     
        }else{
          console.log('[DetailHealthCardPage] serviceDeleteHealthCard() Unsuccessful response', await res);
          let messagge = this.translate.instant('delete_health_card.error_alert_message_delete_card')
          this.presentAlert(messagge)
        }
       },(err) => { 
          console.log('[DetailHealthCardPage] serviceDeleteHealthCard() ERROR(' + err.code + '): ' + err.message); 
          let messagge = this.translate.instant('delete_health_card.error_alert_message_delete_card')+', '+err.message
          this.presentAlert(messagge)
          throw err; 
      });
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }


}
