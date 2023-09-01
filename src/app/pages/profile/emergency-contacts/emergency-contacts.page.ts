import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ListMyContactsPage } from './list-my-contacts/list-my-contacts.page';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.page.html',
  styleUrls: ['./emergency-contacts.page.scss'],
})
export class EmergencyContactsPage implements OnInit {
  listContact = []
  isLoading = true
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    console.log('[EmergencyContactsPage] ionViewDidEnter()');
    this.getListContact()
  }


  getListContact(){
    this.isLoading = true
    this.dooleService.getAPIemergencyContact().subscribe(
      async (res: any) =>{
        console.log('[EmergencyContactsPage] getListContact()', await res);
        if(res.success)
        this.listContact = res.emergencyContact
        this.isLoading = false
       },(err) => { 
          console.log('[EmergencyContactsPage] getListContact() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }


}
