import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PusherService } from 'src/app/services/pusher.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  NAME_BIND = 'LevelAccomplishmentCompleted'
  segment = 'video';
  constructor(
    public authService: AuthenticationService,
    public role: RolesService,
    private pusher: PusherService) { }
  ngOnInit() {
    this.setSegment()
    this.getPusher()
  }

  setSegment(){
    if(!this.role?.component?.agenda){
      this.segment = 'chat'
      if(!this.role?.component?.chat){
          this.segment = ''
      }
    }
  }

  getPusher(){
    console.log('[ContactPage] getPusher()');
    const channel = this.pusher.init();
        channel.bind(this.NAME_BIND, (data) => {
          console.log('[ContactPage] getPusher()' ,  data);
        });
  }

}
