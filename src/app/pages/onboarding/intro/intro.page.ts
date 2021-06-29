import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
const { Storage } = Plugins;
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
