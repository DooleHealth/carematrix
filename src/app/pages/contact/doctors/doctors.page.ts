import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {
  doctor : any ={}
  allowed = []
  isAllowed = false
  constructor(
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.doctor = history.state.doctor;
    console.log('[DoctorsPage] ngOnInit()', this.doctor);
    if(this.doctor)
    this.getAllowedContacts()
  }

  getAllowedContacts(){
    this.dooleService.getAPIallowedContacts().subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getAllowedContacts()', await res);
        if(res?.allowed){
          this.allowed = res.allowed
          this.isAllowedDoctor()
        }

       },(err) => { 
          console.log('[AgendaPage] getAllowedContacts() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  isAllowedDoctor(){
    let contact = this.allowed.find(user => user.id == this.doctor.id)
    if(contact) this.isAllowed = true
  }



}
