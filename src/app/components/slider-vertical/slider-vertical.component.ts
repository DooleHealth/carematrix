import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export interface UserInformation {
  title?: string;
  subtitle?: string;
  icon?: string;
  hour?: string;
  content?: Array<SliderInfo>;
}
export interface SliderInfo {
  title?: string;
  image?:string;
  icon?:string;
  description?:string;
  hour?: string;
  porcentaje?: number;
}
@Component({
  selector: 'app-slider-vertical',
  templateUrl: './slider-vertical.component.html',
  styleUrls: ['./slider-vertical.component.scss'],
})
export class SliderVerticalComponent implements OnInit {
  @Input()
  information: UserInformation;
  isTitle = true;
  isHour = true;
  sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
   };
   title: string;
  constructor() {
/*      if(this.information === undefined )
    this.setUserInformation(); */
   }

  ngOnInit() {}

  setUserInformation(){
    let slider: SliderInfo = {
      title: 'Medicación', 
      image: 'assets/images/logo.svg',
      icon: 'assets/icons/Agenda.svg', 
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

  isDefinedHour(title:string) {
    if(title !== null && title !== undefined){
      this.information.hour = title;
      return this.isHour = true;
    }
    else return this.isHour = false
  }

}
