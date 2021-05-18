import { Component, Input, OnInit } from '@angular/core';

export interface UserInformation {
  title?: string;
  textTitleButton?: string;
  content?: Array<SliderInfo>;
}
export interface Appointment {
  doctorName?: string;
  date?: string;
}
export interface SliderInfo {
  title?: string;
  image?:string;
  icon?:string;
  description?:string;
  detail?: string;
  appointment?: Appointment
}

@Component({
  selector: 'app-slider-horizontal',
  templateUrl: './slider-horizontal.component.html',
  styleUrls: ['./slider-horizontal.component.scss'],
})
export class SliderHorizontalComponent implements OnInit {
  @Input()
  slidesType = 1;
  sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1.1,
    spaceBetween: 4,
    centeredSlides: false,
   };
   information: UserInformation;
  constructor() {  
    this.setUserInformation()
  }

  ngOnInit() {}

  setUserInformation(){
    let slider: SliderInfo = {
      title: 'CITA MEDICA', 
      image: 'assets/images/logo.svg',
      icon: 'assets/icons/Agenda.svg', 
      description:'Plazo para reservar tu cita online abierto', 
    }

    slider.appointment = {
      doctorName: 'Dr Ricardo Sanchez',
      date: 'Lunes, 15 Noviembre 15:00'
    }
     
      this.information = {
        title: 'Novedades y Consejos',
        textTitleButton: 'Ver todas',
        content: [slider,slider,slider]
      }
  }

}
