import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { User, Goal, Diet } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userDoole : User
  goals: Goal[] =[]
  diets: Diet[] =[]
  userImage:string = 'assets/icons/user_icon.svg'
   sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: false,
   };
   @ViewChild('slider') slider: IonSlides;
  constructor(
    public router:Router,
    private dooleService: DooleService
  ) { }

  ngOnInit() { 
    this.getUserInformation()
  }
  userImg(){
    if( this.userDoole !== undefined && this.userDoole.image !== undefined 
      && this.userDoole.image !== '')
      this.userImage = this.userDoole.image;
  }

  getUserInformation(){
    this.dooleService.getAPIinformationUser().subscribe(
      async (res: any) =>{
        //console.log('[HomePage] getUserInformation()', await res);
        this.userDoole = res as User
        this.userImg()
        this.goals = this.userDoole.goals
        this.diets = this.userDoole.diets
       },(err) => { 
          console.log('[HomePage] getUserInformation() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }
  slideChange() {		    
/* 		this.slider.getActiveIndex().then(index => {      
      console.log('[SliderVerticalComponent] ionSlideTouchEnd()', index);
      let slider = this.information.content[index]
      this.isDefinedHour(slider.hour)
      this.changeNameDiet(slider.title)
    }); */
  }


}
