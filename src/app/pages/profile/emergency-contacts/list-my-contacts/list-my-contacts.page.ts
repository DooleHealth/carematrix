import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { EmergencyContact } from 'src/app/models/user';
import { Contacts } from '@capacitor-community/contacts';

export interface Contact {
  displayName?: string;
  phoneNumbers?: Array<any>;
}

@Component({
  selector: 'app-list-my-contacts',
  templateUrl: './list-my-contacts.page.html',
  styleUrls: ['./list-my-contacts.page.scss'],
})
export class ListMyContactsPage implements OnInit {
  contacts = [];
  contactsBackup = [];
  isHybrid = true;
  isLoading = false;
  emergencyContact: EmergencyContact = {}
  constructor(
    public platform: Platform,
    ) { }

  ngOnInit() {
    if(!this.platform.is('hybrid')){
      this.isHybrid = false;
      return;
    }
    if(this.platform.is('android'))
      this.checkPermission()
    else
      this.getContacts()
  }


  async getContacts(){
    this.isLoading = true
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
    };
    Contacts.getContacts({ projection }).then((result) => {
      console.log(`[ListMyContactsPage] getContacts()`, JSON.stringify(result.contacts));
      this.contacts = this.setContacts(result.contacts);
      this.contactsBackup = this.contacts;
      this.isLoading = false

    })
  }

  setContacts(contacts){
    let list_contacts = []
    if( contacts.length > 0){
      contacts.forEach(c => {
        if(c?.name?.display && c?.phones?.length > 0){
          console.log(`[ListMyContactsPage] getContacts(): ${c?.name?.display}, ${c?.phones[0]?.number}`);
          const contact:Contact = {displayName: c?.name?.display, phoneNumbers: c?.phones}
          list_contacts.push(contact)
        }

      })
    }
    return list_contacts
  }

  async checkPermission(){
    return Contacts.checkPermissions().then(result =>{
      console.log('[ListMyContactsPage] checkPermission(): ', result.contacts);
      let isPermissed = result.contacts
      if(isPermissed && isPermissed == 'granted') this.getContacts()
      else this.getPermission();
    }).catch(error =>{
      console.log(`[ListMyContactsPage] checkPermission(): ${error}`);
    })
  }

  async getPermission(){
    Contacts.requestPermissions().then((response) => {
      console.log('Contacts permission response: ', response.contacts);
      if (response.contacts == 'granted') {
        //console.log('Granted permissions for contacts');
        this.getContacts()

      }
    });
  }

  getDataContact(contact){
    console.log(`[ListMyContactsPage] getDataContact(): ${contact.displayName} , ${contact.phoneNumbers[0].number}`);
  }

  async filterList(evt) {
    console.log('[ListMyContactsPage] filterList()');
    this.contacts = this.contactsBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.contacts = this.contacts.filter(currentContacts => {
      if (currentContacts.displayName && searchTerm) {
        return (currentContacts.displayName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

}
