import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swiper, { SwiperOptions } from 'swiper';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { BehaviorSubject } from 'rxjs';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
