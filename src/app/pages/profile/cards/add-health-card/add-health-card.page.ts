import { transition } from '@angular/animations';
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
  card: HealthCard;
  cards = [
    {
      modality: "Mutuas Seguros",
      color: "BDC3C7"
    },
    {
      modality: "Sanidad Pública",
      color: "2980B9"
    },
    {
      modality: "Sanidad Privada",
      color: "09f"
    }
  ]
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
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translateModalityCards()
    let year = (new Date(Date.now()).getFullYear()) + 20
    this.dateMax =  year
    this.formHealthCard = this.formBuilder.group({
      modality: [this.cards[0].modality, [Validators.required]],
      name: ['', [Validators.required]],
      affiliation_number: ['', [Validators.required]],
      expiration_date: [''],
      expedition_date: [''],
    })
    this.getHealthCard()
  }

  getHealthCard(){
    this.card = history.state.card;
    console.log('[AddHealthCardPage] getHealthCard()' ,  this.card);
    if(this.card){
      this.isAddCard = false
      this.showDetailCard()
    }
  }
  
  translateModalityCards(){
    this.cards.forEach((card, index) =>{
      card.modality = this.translate.instant(`health_card.modality_type.text${index}`)
    })
  }

  showDetailCard(){
    this.formHealthCard.get('modality').setValue(this.card.modality)
    this.formHealthCard.get('name').setValue(this.card.name)
    this.formHealthCard.get('affiliation_number').setValue(this.card.affiliation_number)
    this.formHealthCard.get('expiration_date').setValue(this.card.expiration_date? this.card.expiration_date:'')
    this.formHealthCard.get('expedition_date').setValue(this.card.expedition_date? this.card.expedition_date:'')
  }

  addCard(){
    console.log('[AddHealthCardPage] addCard()' , this.formHealthCard.value); 
    this.isSubmittedFields(true);
    if(this.formHealthCard.valid){
      this.dooleService.postAPIhealthCards(this.formHealthCard.value).subscribe(
        async (res: any) =>{
          console.log('[AddHealthCardPage] addCard()', await res);
          let  isSuccess = res.success 
          if(isSuccess){
            let messagge = this.translate.instant('add_health_card.alert_message_add_card')
            let header = this.translate.instant('alert.header_info')
            this.dooleService.showAlertAndReturn(header,messagge,false, '/cards')
          }else{
            console.log('[AddHealthCardPage] addCard() Unsuccessful response', await res);
          }
         },(err) => { 
            console.log('[AddHealthCardPage] addCard() ERROR(' + err.code + '): ' + err.message); 
             this.dooleService.presentAlert(err.messagge)
            throw err; 
        });
    }
  }

  editCard(){
    console.log('[AddHealthCardPage] editCard()' , this.formHealthCard.value); 
    this.isSubmittedFields(true);
    if(this.formHealthCard.valid){
      this.dooleService.putAPIhealthCard(this.formHealthCard.value).subscribe(
        async (res: any) =>{
          console.log('[AddHealthCardPage] editCard()', await res);
          let  isSuccess = res.success 
          if(isSuccess){
            let messagge = this.translate.instant('edit_health_card.alert_message_edit_card')
            let header = this.translate.instant('alert.header_info')
            this.dooleService.showAlertAndReturn(header,messagge,false, '/cards')
          }else{
            console.log('[AddHealthCardPage] editCard() Unsuccessful response', await res);
          }
         },(err) => { 
            console.log('[AddHealthCardPage] editCard() ERROR(' + err.code + '): ' + err.message); 
             this.dooleService.presentAlert(err.messagge)
            throw err; 
        });
    }
  }


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


}
