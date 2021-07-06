import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-emergency-contacts',
  templateUrl: './emergency-contacts.page.html',
  styleUrls: ['./emergency-contacts.page.scss'],
})
export class EmergencyContactsPage implements OnInit {
  listContact = []
  isLoading = false
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService
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
