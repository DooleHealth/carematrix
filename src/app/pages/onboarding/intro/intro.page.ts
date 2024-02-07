import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Swiper } from 'swiper/types';

const INTRO_KEY = 'intro';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {


  @ViewChild('swiper') swiperRef: ElementRef<HTMLElement & { swiper?: Swiper } & { initialize: () => void }> | undefined;
  swiper?: Swiper;
  isLastSlide: boolean = false;

  currentSlideIndex: number;

  
  constructor(
    public router: Router,
    private authService: AuthenticationService,) { }

  ngOnInit() {}

 async introAction(){
   await this.authService.setShowIntroLocalstorage()
   this.router.navigate(['home']);
 }


 onSlideChange() {
  if (this.swiperRef?.nativeElement.swiper.isEnd) {
    this.isLastSlide = true;
  }
  else {
    this.isLastSlide = false;
  }
}

swipeNext() {
  this.swiperRef?.nativeElement.swiper.slideNext();
}


}
