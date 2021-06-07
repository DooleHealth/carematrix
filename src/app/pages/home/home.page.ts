import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { User, Goal, Diet, Drug, PhysicalActivity, Game, Agenda, Advice } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

export interface UserInformation {
  title?: string;
  hour?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userDoole : User
  goals: Goal[] =[]
  diets: Diet[] =[]
  drugs: Drug[] =[]
  games: Game[] =[]
  activity: PhysicalActivity[] =[]
  appointment: Agenda[] =[]
  advices: Advice[] =[]
  userImage:string = 'assets/icons/user_icon.svg'
   sliderConfig = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: false,
   };
   sliderConfigHorizontal = {
    initialSlide: 0,
    slidesPerView: 1.1,
    spaceBetween: 4,
    centeredSlides: false,
   };
   @ViewChild('sliderGoals') sliderGoals: IonSlides;
   @ViewChild('sliderDiet') sliderDiet: IonSlides;
   @ViewChild('sliderDrug') sliderDrug: IonSlides;
   @ViewChild('sliderGames') sliderGames: IonSlides;
   @ViewChild('sliderPhysical') sliderPhysical: IonSlides;

   infoDiet: UserInformation
   infoDrugs: UserInformation
  constructor(
    public router:Router,
    private dooleService: DooleService
  ) { }

  async ngOnInit() { 
    await this.getUserInformation()
    
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
        this.appointment = this.userDoole.agendas
        this.advices = this.userDoole.advices
        this.diets = this.userDoole.diets
        this.drugs = this.userDoole.drugs
        this.games = this.userDoole.games
        //this.activity = this.userDoole.physical
        this.activity.push({name:'456 Cal'})
        this.slideDietChange()
        this.slideDrugChange()
       },(err) => { 
          console.log('[HomePage] getUserInformation() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  actionCloseAdvice(slide){
    console.log('[HomePage] actionCloseAdvice()', slide.name);
  }

  actionRegisterAdvice(slide){
    console.log('[HomePage] actionRegisterAdvice()', slide.name);
  }

  actionCloseAppointment(slide){
    console.log('[HomePage] actionCloseAppointment()', slide.name);
  }

  actionDetailAppointment(slide){
    console.log('[HomePage] actionDetailAppointment()', slide.name);
  }

  actionButtonDrugs(slide){
    console.log('[HomePage] actionButtonDrugs()', slide.name);
  }

  actionButtonGames(slide){
    console.log('[HomePage] actionButtonDrugs()', slide.name);
  }

  slideGoalChange() {		    
		this.sliderGoals.getActiveIndex().then(index => {      
      console.log('[HomePage] slideGoalChange()', index);
      let slider = this.goals[index]
    });
  }

  slideDietChange(){	   
		this.sliderDiet.getActiveIndex().then(index => {      
      console.log('[HomePage] slideDietChange()', index);
      let slider = this.diets[index]
      this.infoDiet = {
        title: slider.name,
        hour: slider.hour
      }
    });
  }

  slideDrugChange(){	   
		this.sliderDiet.getActiveIndex().then(index => {      
      console.log('[HomePage] slideDrugChange()', index);
      let slider = this.drugs[index]
      this.infoDrugs = {
        title: slider.name,
        hour: slider.hour_intake
      }
    });
  }

  slideGamesChange(){
    this.sliderGames.getActiveIndex().then(index => {      
      console.log('[HomePage] slideGamesChange()', index);
      let slider = this.drugs[index]
    });
  }
  slideActivityChange(){
    this.sliderPhysical.getActiveIndex().then(index => {      
      console.log('[HomePage] slideActivityChange()', index);
      let slider = this.drugs[index]
    });
  }



}
