import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
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
  @ViewChild(IonContent, { static: false }) content: IonContent;
  swiper?: Swiper;
  isLastSlide: boolean = false;

  currentSlideIndex: number;

  constructor(
    public router: Router,
    private authService: AuthenticationService,) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.currentSlideIndex = this.swiperRef?.nativeElement.swiper.activeIndex+1;
  }

  ngAfterViewInit() {
    // Espera un tick para asegurar que la vista está completamente cargada
    setTimeout(() => {
      this.content.scrollToBottom(1); // 300 es la duración de la animación en milisegundos
    }, 1);
  }
  
  async introAction() {
    await this.authService.setShowIntroLocalstorage()
    this.router.navigate(['home']);
  }

  onSlideChange() {

    this.currentSlideIndex = this.swiperRef?.nativeElement.swiper.activeIndex+1;

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