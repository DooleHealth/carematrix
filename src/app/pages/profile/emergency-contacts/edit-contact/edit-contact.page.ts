import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

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
  contact
  constructor(  
    private formBuilder: FormBuilder,
    private dooleService: DooleService,
    public router: Router,
    private alertController: AlertController,
    private translate: TranslateService) { }

  ngOnInit() {
    this.formContact = this.formBuilder.group({
      name: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      family_relationship: ['', [Validators.required]],
    })
    this.getContact()
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
    this.showContact()   
    console.log('[EditContactPage] getContact()' , JSON.stringify(this.contact) ); 
    this.userImg()

  }

  userImg(){
    if(this.contact !== undefined && this.contact.thumbnail !== undefined && this.contact.thumbnail !== null 
      && this.contact.thumbnail !== '')
      this.userImage = this.contact.thumbnail;
  }

  showContact(){
    this.formContact.get('telephone').setValue(this.contact.telephone)
    this.formContact.get('name').setValue(this.contact.name)
    this.formContact.get('family_relationship').setValue(this.contact.family_relationship)
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

  delete(contact){
    console.log('[EditContactPage] delete()' ,  contact); 
    if(this.contact === undefined || this.contact === null ) return
    this.presentAlertConfirm()
  }

  saveContact(){
    console.log('[EditContactPage] saveContact()' , this.formContact.value); 
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant(this.contact.name),
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
            this.serviceDeleteContact();
          }
        }
      ]
    });

    await alert.present();
  }

  serviceDeleteContact(){
    this.dooleService.deleteAPIemergencyContact( this.contact.id).subscribe(
      async (res: any) =>{
        console.log('[EditContactPage] serviceDeleteContact()', await res);
        let  isSuccess = res.success 
        if(isSuccess){
          let messagge = this.translate.instant('edit_contact.alert_message_delete_contact')
          let header = this.translate.instant('alert.header_info')
           this.dooleService.showAlertAndReturn(header, messagge, false, '/cards' )
          
        }else{
          console.log('[EditContactPage] serviceDeleteContact() Unsuccessful response', await res);
        }
       },(err) => { 
          console.log('[EditContactPage] serviceDeleteContact() ERROR(' + err.code + '): ' + err.message); 
           this.dooleService.presentAlert(err.messagge)
          throw err; 
      });
  }


  isSubmittedFields(isSubmitted){
    this.isSubmittedName = isSubmitted
    this.isSubmittedTelephone = isSubmitted;
    this.isSubmittedRelationship = isSubmitted;
  }



}
