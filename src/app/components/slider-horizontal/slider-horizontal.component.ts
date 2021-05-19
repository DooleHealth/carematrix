import { Component, Input, OnInit } from '@angular/core';

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
  selector: 'app-slider-horizontal',
  templateUrl: './slider-horizontal.component.html',
  styleUrls: ['./slider-horizontal.component.scss'],
})
export class SliderHorizontalComponent implements OnInit {
  @Input()slidesType = 1;
  @Input() information: UserInformation;
  sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1.1,
    spaceBetween: 4,
    centeredSlides: false,
   };
  constructor() {  
  }

  ngOnInit() {
    if(this.information === undefined ){
      this.setUserInformation();
    }
  }

  setUserInformation(){
    let slider: SliderInfo = {
      title: 'CITA MEDICA', 
      subtitle: 'Dr Ricardo Sanchez',
      image: 'assets/images/logo.svg',
      icon: 'assets/icons/Agenda.svg', 
      description:'Plazo para reservar tu cita online abierto', 
      hour: 'Lunes, 15 Noviembre 15:00'
    }
     
      this.information = {
        title: 'Novedades y Consejos',
        bar: true,
       /*  textTitleButton: 'Ver todas', */
        content: [slider,slider,slider]
      }
  }

}
