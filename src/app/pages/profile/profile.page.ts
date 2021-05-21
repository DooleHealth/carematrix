import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { FirebaseAuthService } from 'src/app/services/firebase/auth/firebase-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  PATH_USERDATA= '/user/informationUser'
  userDoole : User
  constructor( 
    private authService: AuthenticationService,
    private firebaseService: FirebaseAuthService,
    private dooleService: DooleService,
    private router: Router,) { }

  ngOnInit() {
    this.getUserDoole()
  }

  getUserDoole(){
    this.dooleService.getAPIhome(this.PATH_USERDATA).subscribe(
      async (res: any) =>{
        //console.log('[InitialPage] getAll()', await res);
        this.userDoole = res as User
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


  signOut() {
    this.authService.logout();
    this.firebaseService.signOut().subscribe(() => {
      // Sign-out successful.
      // Replace state as we are no longer authorized to access profile page.
      console.log("signout user");
      this.router.navigateByUrl('/landing');
    }, (error) => {
      console.log('signout error', error);
    });
  }


}
