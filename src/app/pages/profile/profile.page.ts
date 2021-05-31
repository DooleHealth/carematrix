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
  userDoole : User
  userImage:string = 'assets/icons/user_icon.svg'
  constructor( 
    private authService: AuthenticationService,
    private firebaseService: FirebaseAuthService,
    private dooleService: DooleService,
    private router: Router,) { }

  ngOnInit() {
    this.getUserProfile()
  }

  getUserProfile(){
    this.userDoole = history.state.user;
    console.log('[ProfilePage] getUserProfile()' ,  this.userDoole); 
    this.userImg()
  }

  userImg(){
    if(this.userDoole !== undefined && this.userDoole.image !== undefined && this.userDoole.image !== null 
      && this.userDoole.image !== '')
      this.userImage = this.userDoole.image;
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
