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

  segmentChanged(event?) {

    // Fix to Focus on the selected segment
    console.log("event: ",event);
    setTimeout(() => {
      if(event){
        const s = event.target.getBoundingClientRect();
        const sw = (s.right - s.left);
        for (const button of event.target.childNodes) {
          if (button.className?.indexOf('segment-button-checked') > -1) {
            const bc = button.offsetLeft + (button.offsetWidth / 2);
            const diff = bc - (sw / 2);
            event.target.scrollTo({
              left: diff,
              behavior: 'smooth'
            });
            break;
          }
        }
      }
    }, 200);
  }
}
