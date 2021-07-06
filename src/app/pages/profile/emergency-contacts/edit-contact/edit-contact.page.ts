import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { ListRelationshipPage } from '../list-relationship/list-relationship.page';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  userImage:string = 'assets/icons/user_icon.svg';
  isSubmittedName = false;
  isSubmittedTelephone = false;
  isSubmittedRelationship = false;
  isNewContact= true;
  formContact: FormGroup;
  socialRelationType:any
  contact
  constructor(  
    private formBuilder: FormBuilder,
    private dooleService: DooleService,
    public router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.formContact = this.formBuilder.group({
      id: [''],
      full_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      socialRelationName: ['', [Validators.required]],
      social_relation_type_id: [''],
      created_at: [''],
    })
    this.getContact()
  }

  ionViewDidEnter(){
    console.log('[EditContactPage] ionViewDidEnter()');
    this.socialRelationType = history.state.socialRelationType;
    this.showDetailSocialRelationType()
  }

  getContact(){
    let oldContact = history.state.contact;
    let newContact = history.state.newContact;
    
    if(newContact){
      this.contact = newContact
    }else if(oldContact){
      this.contact = oldContact
      this.isNewContact = false
    }
    this.showDetailContact()   
    console.log('[EditContactPage] getContact()' , JSON.stringify(this.contact) ); 

  }

  showDetailContact(){
    if(this.contact?.id)
    this.formContact.get('id').setValue(this.contact.id)
    if(this.contact?.phone)
    this.formContact.get('phone').setValue(this.contact.phone)
    if(this.contact?.full_name)
    this.formContact.get('full_name').setValue(this.contact.full_name)
    this.showDetailSocialRelationType()
  }

  showDetailSocialRelationType(){
    if(this.socialRelationType !== undefined){
      if(this.socialRelationType.name)
      this.formContact.get('socialRelationName').setValue(this.socialRelationType.name)
      if(this.socialRelationType.id)
      this.formContact.get('social_relation_type_id').setValue(this.socialRelationType.id)
    }else if(this.contact !== undefined){
      if(this.contact?.socialRelationName)
      this.formContact.get('socialRelationName').setValue(this.contact.socialRelationName)
      if(this.contact?.social_relation_type_id)
      this.formContact.get('social_relation_type_id').setValue(this.contact.social_relation_type_id)
    }
  }

  sumittedContact(){
    console.log('[EditContactPage] editContact()' ,  this.contact); 
    this.isSubmittedFields(true)
    if(this.formContact.valid){
      if(this.isNewContact)
        this.saveContact()
      else this.updateContact()
    }
  }

  delete(){
    console.log('[EditContactPage] delete()'); 
    if(this.contact === undefined || this.contact === null ) return
    this.presentAlertDeleteConfirm()
  }

  saveContact(){
    console.log('[EditContactPage] saveContact()' , this.formContact.value); 
    let date = new Date().toISOString()
    this.formContact.get('created_at').setValue(date)
      this.dooleService.postAPIemergencyContact(this.formContact.value).subscribe(
        async (res: any) =>{
          console.log('[EditContactPage] saveContact()', await res);
          let  isSuccess = res.success 
          if(isSuccess){
            let messagge = this.translate.instant('edit_contact.alert_message_new_contact')
            let header = this.translate.instant('alert.header_info')
            this.dooleService.showAlertAndReturn(header,messagge, false, '/profile/emergency-contacts')
          }else{
            console.log('[EditContactPage] saveContact() Unsuccessful response', await res);
          }
         },(err) => { 
            console.log('[EditContactPage] saveContact() ERROR(' + err.code + '): ' + err.message); 
             this.dooleService.presentAlert(err.messagge)
            throw err; 
        });
  }

  updateContact(){
    console.log('[EditContactPage] updateContact()' , this.formContact.value); 
      this.dooleService.putAPIemergencyContact(this.contact.id ,this.formContact.value).subscribe(
        async (res: any) =>{
          console.log('[EditContactPage] updateContact()', await res);
          let  isSuccess = res.success 
          if(isSuccess){
            let messagge = this.translate.instant('edit_contact.alert_message_update_contact')
            let header = this.translate.instant('alert.header_info')
            this.dooleService.showAlertAndReturn(header,messagge, false, '/profile/emergency-contacts')
          }else{
            console.log('[EditContactPage] updateContact() Unsuccessful response', await res);
          }
         },(err) => { 
            console.log('[EditContactPage] updateContact() ERROR(' + err.code + '): ' + err.message); 
             this.dooleService.presentAlert(err.messagge)
            throw err; 
        });
  }

  async presentAlertDeleteConfirm() {
    console.log('[EditContactPage] presentAlertConfirm()');
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant(this.contact.full_name),
      message: this.translate.instant("edit_contact.alert_message_confirmation_delete"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[EditContactPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[EditContactPage] AlertConfirm Okay');
            this.deleteContact();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteContact(){
    console.log('[EditContactPage] serviceDeleteContact()', this.contact.id);
    this.dooleService.deleteAPIemergencyContact( this.contact.id).subscribe(
      async (res: any) =>{
        console.log('[EditContactPage] serviceDeleteContact()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          this.alertMessageDeleteContact()
        }else{
          console.log('[EditContactPage] serviceDeleteContact() Unsuccessful response', await res);
        }
       },(err) => { 
          console.log('[EditContactPage] serviceDeleteContact() ERROR(' + err.code + '): ' + err.message); 
           this.dooleService.presentAlert(err.messagge)
          throw err; 
      });
  }

  alertMessageDeleteContact(){
    let messagge = this.translate.instant('edit_contact.alert_message_delete_contact')
    let header = this.translate.instant('alert.header_info')
     this.dooleService.showAlertAndReturn(header, messagge, false, '/profile/emergency-contacts' )
  }


  isSubmittedFields(isSubmitted){
    this.isSubmittedName = isSubmitted
    this.isSubmittedTelephone = isSubmitted;
    this.isSubmittedRelationship = isSubmitted;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ListRelationshipPage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== undefined) {
        this.socialRelationType = dataReturned.data;
        if(this.socialRelationType)
        this.formContact.get('socialRelationName').setValue(this.socialRelationType?.name)
      }
    });

    return await modal.present();
  }



}
