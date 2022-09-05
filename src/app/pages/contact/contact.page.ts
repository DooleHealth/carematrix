import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  segment = 'video';
  constructor(
    public authService: AuthenticationService,
    public role: RolesService,
    private router: Router,) { }
    
  ngOnInit() {
    this.setSegment()
  }

  setSegment(){
    if(!this.role?.component?.agenda){
      this.segment = 'chat'
      if(!this.role?.component?.chat){
          this.segment = ''
      }
    }
  }

  goMedicalDirectory(isOnline){
    localStorage.setItem('isOnline-contact', isOnline);
    this.router.navigate([`medical-directory`],{state:{isOnline: isOnline}});
  }


}
