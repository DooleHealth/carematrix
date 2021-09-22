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
  staff
  constructor(
    private dooleService: DooleService, private router: Router
  ) { }

  ngOnInit() {
    this.doctor = history.state.doctor;
   
    console.log('[DoctorsPage] ngOnInit()', this.doctor);
    if(this.doctor){
      this.getDoctor()
      this.getAllowedContacts()
    }
  }

  getDoctor(){
    this.dooleService.getAPIstaffId(this.doctor.id).subscribe(
      async (res: any) =>{
        console.log('[AgendaPage] getDoctor()', await res);
        if(res.success){
          this.doctor = res.staff
        }

       },(err) => { 
          console.log('[AgendaPage] getDoctor() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
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
    if(contact?.id === this.doctor.id) {
      this.staff = contact
      this.isAllowed = true
    }
  }

  redirect(){
    //let doctor = this.staff
    console.log('[AgendaPage] redirect()', this.staff);
    if(this.staff){
      this.router.navigate(['/contact/chat/conversation'],{state:{staff:this.staff, chat:this.staff.message_header_id}})
    }else{
      this.router.navigate(['bookings'], {state:{staff:this.staff, isOnline:history.state.isOnline}});
    }
  }

}
