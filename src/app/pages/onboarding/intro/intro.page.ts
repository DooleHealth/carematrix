import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';

const INTRO_KEY = 'intro';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  
  constructor(
    public router: Router,
    private authService: AuthenticationService,) { }

  ngOnInit() {

  }

 async introAction(){
   await this.authService.setShowIntroLocalstorage()
   this.router.navigate(['home']);
 }
 

}
