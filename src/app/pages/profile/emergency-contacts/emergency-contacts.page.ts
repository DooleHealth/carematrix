import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.page.html',
  styleUrls: ['./emergency-contacts.page.scss'],
})
export class EmergencyContactsPage implements OnInit {
  listContact
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getListContact()
  }


  getListContact(){
    this.dooleService.getAPIemergencyContact().subscribe(
      async (res: any) =>{
        console.log('[EmergencyContactsPage] getListContact()', await res);
        this.listContact = res
       },(err) => { 
          console.log('[EmergencyContactsPage] getListContact() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


}
