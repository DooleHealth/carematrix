import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { Router } from '@angular/router';

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
    private dooleService: DooleService, private router: Router
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
        if(res){
          this.allowed = res
          if(this.allowed.length > 0)
          this.isAllowedDoctor()
        }

       },(err) => { 
          console.log('[AgendaPage] getAllowedContacts() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  isAllowedDoctor(){
    let contact = this.allowed.find(user => user.id == this.doctor.id)
    if(contact?.id === this.doctor.id) this.isAllowed = true
  }

  redirect(doctor){

    if(this.doctor){
      this.router.navigate(['/contact/chat/conversation'],{state:{staff:doctor, chat:doctor.message_header_id}})
    }else{
      this.router.navigate(['bookings'], {state:{staff:doctor, isOnline:history.state.isOnline}});
    }
  }

}
