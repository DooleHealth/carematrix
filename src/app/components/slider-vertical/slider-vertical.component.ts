import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
export interface UserInformation {
  title?: string;
  subtitle?: string;
  icon?: string;
  hour?: string;
  color?: string;
  bar?:boolean;
  content?: SliderInfo[];
}
export interface SliderInfo {
  title?: string;
  subtitle?: string;
  image?:string;
  icon?:string;
  description?:string;
  hour?: string;
  porcentage?: number;
}
@Component({
  selector: 'app-slider-vertical',
  templateUrl: './slider-vertical.component.html',
  styleUrls: ['./slider-vertical.component.scss'],
})
export class SliderVerticalComponent implements OnInit {
  @Input() information2: UserInformation;
  information: UserInformation;
  isTitle = true;
  isHour = true;
  sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: false,
   };
   @ViewChild('slider') slider: IonSlides;
  constructor() {
   }

  ngOnInit() {
    if(this.information2 !== undefined ){
    //  console.log('[SliderVerticalComponent] ngOnInit()', this.information2);
      this.information = this.information2
    }else
    this.setUserInformation(); 
  }

  setUserInformation(){
    let slider: SliderInfo = {
      title: 'Medicación', 
      image: 'assets/images/logo.svg',
      icon: 'assets/images/logo.svg', 
      description:'Plazo para reservar tu cita online abierto', 
    }
     
      this.information = {
        title: 'Tu objetivo',
        subtitle: 'Tu objetivo',
        icon: 'assets/icons/Agenda.svg',
        hour: '12:00',
        content: [slider,slider,slider]
      }
  }

  isDefinedTitle() {
    let title = this.information.title
    if(title !== null && title !== undefined)
     return this.isTitle = true;
    else return this.isTitle = false
  }


  isDefinedHour(hour:string) {
    console.log('[SliderVerticalComponent] isDefinedHour()', hour);
    if(hour !== null && hour !== undefined){
      this.information.hour = hour;
      return this.isHour = true;
    }
    else return this.isHour = false
  }

  slideChange() {		    
		this.slider.getActiveIndex().then(index => {      
      console.log('[SliderVerticalComponent] ionSlideTouchEnd()', index);
      let slider = this.information.content[index]
      this.isDefinedHour(slider.hour)
      this.changeNameDiet(slider.title)
    });
  }

  changeNameDiet(nameDiet){
    console.log('[SliderVerticalComponent] isDefinedHour()', nameDiet);
    if(this.information.title !== 'Tu Dia')
    return
    if(nameDiet !== null && nameDiet !== undefined){
      this.information.subtitle = nameDiet;
    }
  }

}
