import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { IonSlides } from '@ionic/angular';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slider: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    autoplay:true
   };
  constructor(public router:Router) { }

  ngOnInit() {
    this.splashScreen();
  }

  ionViewDidEnter(){

  }

  splashScreen(){
    console.log('[HomePage] splashScreen()');
/*     SplashScreen.show(
      {
        showDuration: 3000,
        autoHide: true
      }
    ) */
    setTimeout(()=>{
      this.slideOpts.autoplay = false;
    },6000)

  }

}
