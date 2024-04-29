import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { IonContent, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguageService } from 'src/app/services/language.service';
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
  showSpeak= false;

  constructor(
    public router: Router,
    public platform: Platform,
    public translate: TranslateService,
    private languageService: LanguageService,
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
    this.stopSpeak();
    await this.authService.setShowIntroLocalstorage()
    if (this.platform.is('android') || this.platform.is('mobileweb') || this.platform.is('desktop')) {
      this.router.navigate(['google-fit']);
     }
     else { 
      this.router.navigate(['home']);
     }
  }

  onSlideChange() {
    this.stopSpeak();
    this.currentSlideIndex = this.swiperRef?.nativeElement.swiper.activeIndex+1;

    if (this.swiperRef?.nativeElement.swiper.isEnd) {
      this.isLastSlide = true;
    }
    else {
      this.isLastSlide = false;
    }
  }

  swipeNext() {
    this.stopSpeak();
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  setSpeak(speak: any){
    let text;
    switch (speak) {
      case 1:
        text = this.translate.instant('intro.slider1_text')        
        break;
        case 2:
          text = this.translate.instant('intro.slider2_text')        
          break;
          case 3:
            text = this.translate.instant('intro.slider3_text')        
            break;
            case 4:
              text = this.translate.instant('intro.slider4_text')        
              break;
      
    }
    const textLength = text.length;
    const averageReadingSpeed = 10;
    const estimatedTime = textLength / averageReadingSpeed;
    this.showSpeak = true;
    let language = this.languageService.getCurrent()
    TextToSpeech.speak({
      text:text,
      lang: language,
    })
    setTimeout(() => {
      this.showSpeak = false; // Establecer showSpeak en false después del tiempo estimado
    }, estimatedTime * 750);
  }

  stopSpeak(){
    this.showSpeak = false;
    TextToSpeech.stop();
  }


}