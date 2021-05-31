import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserProfile } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {
  userProfile: UserProfile;
  constructor(private dooleService: DooleService,
    private router: Router,
    public translate: TranslateService,) { }

  ngOnInit() {
    this.getPersonalInformation()
  }

  getPersonalInformation(){
    this.dooleService.getAPIuserProfile().subscribe(
      async (res: any) =>{
        this.userProfile = res as UserProfile;
        console.log('[PersonalPage] getPersonalInformation()', await this.userProfile);


       },(err) => { 
          console.log('[PersonalPage] getPersonalInformation() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

}
