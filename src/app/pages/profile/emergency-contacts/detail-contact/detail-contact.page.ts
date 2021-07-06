import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  contact: any = {};
  userImage:string = 'assets/icons/user_icon.svg';
  ref_telephone = 'tel:+34'
  constructor(/* private callNumber: CallNumber, */) { }

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

}
