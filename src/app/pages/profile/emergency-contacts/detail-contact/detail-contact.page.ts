import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  contact: any = {};
  id
  userImage:string = 'assets/icons/user_icon.svg';
  ref_telephone = 'tel:+34'
  constructor(
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.getContact()
  }

  getContact(){
    this.contact = history.state.contact;
    console.log('[DetailContactPage] getContact()' ,  this.contact); 
    if(this.contact){
      this.ref_telephone = 'tel:'+ this.contact.phone
    }
  }

  getDetailContact(){ 
    //There is not field: contact.socialRelationName
    this.id = this.contact.id
    if(this.id)
    this.dooleService.getAPIemergencyContactID(this.id).subscribe(
      async (res: any) =>{
        console.log('[DetailContactPage] getDetailContact()', await res);
        if(res.success)
        this.contact= res.emergencyContact
       },(err) => { 
          console.log('[DetailContactPage] getDetailContact() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

}
