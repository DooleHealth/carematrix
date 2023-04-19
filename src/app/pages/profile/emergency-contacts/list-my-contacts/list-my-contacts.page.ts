import { Component, OnInit } from '@angular/core';

//import { Plugins } from "@capacitor/core";
import { Contacts } from '@capacitor-community/contacts';

import { Platform } from '@ionic/angular';
import { EmergencyContact } from 'src/app/models/user';
//const  { Contacts } = Plugins;

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
      this.getPermission() 
    else
      this.getContacts()    
  }

  async getContacts() {
    const projection = {
      name: true,
      phones: true,
      postalAddresses: true,
    };
  
    const result = await Contacts.getContacts({projection});
    this.contacts = result.contacts;
    this.contactsBackup = this.contacts;
    this.isLoading = false;
  };


  async getPermission() {
    try {
      const permissionStatus = await Contacts.checkPermissions();
      const isPermitted = permissionStatus.contacts === 'granted';
      if (isPermitted) {
        await this.getContacts();
      }
    } catch (error) {
      console.log(`[ListMyContactsPage] getDataContact(): ${error}`);
    }
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
