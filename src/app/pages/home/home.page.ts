import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { VideoComponent } from 'src/app/components/video/video.component';
import { User, Goal, Diet, Drug, PhysicalActivity, Game, Agenda, Advice } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { OpentokService } from 'src/app/services/opentok.service';

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
  currentIndexDrug = 0
   sliderConfig = {
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
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private datePipe: DatePipe,
  ) { }

  async ngOnInit() { 
    this.getUserInformation()  
  }

  ionViewDidEnter(){
    console.log('[HomePage] ionViewDidEnter()');
  }

  async getUserInformation(){
    let formattedDate = this.transformDate(Date.now())
    let date = {date: formattedDate}

    this.dooleService.getAPIgames().subscribe((res)=>{
      this.games = res.games;
    });

    this.dooleService.getAPIgoals().subscribe((res)=>{
      this.goals = res.goals;
    });
    
    this.dooleService.getAPIappointmentAgenda().subscribe((res)=>{
      console.log(res);
      this.appointment = res.agenda;
    });

    this.dooleService.getAPIlistAdvices().subscribe((res)=>{
      this.advices = res.advices;
    })

    this.dooleService.getAPIlistDietsByDate({}).subscribe((res)=>{
      this.diets = res.diets;
      this.slideDietChange()
    })

    this.dooleService.getAPIdrugIntakeByDate(date).subscribe((res)=>{
      this.drugs = res.drugIntakes;
      this.filterDrugsByStatus()
      this.searchIndexDrug()
      this.slideDrugChange()
      this.sliderDrug.slideTo(this.currentIndexDrug)
    })

    this.activity.push({name:'456 Cal'})

    //this.activity = this.userDoole.physica
    // this.dooleService.getAPIinformationUser().subscribe(
    //   async (res: any) =>{
    //     //console.log('[HomePage] getUserInformation()', await res);
    //     this.userDoole = res as User
    //     this.goals = this.userDoole.goals
    //     this.appointment = this.userDoole.agendas
    //     this.advices = this.userDoole.advices
    //     this.diets = this.userDoole.diets
    //     this.drugs = this.userDoole.drugs
    //     this.games = this.userDoole.games
    //     //this.activity = this.userDoole.physical
    //     this.activity.push({name:'456 Cal'})
    //     this.slideDietChange()
    //     this.slideDrugChange()

    //    },(err) => { 
    //       console.log('[HomePage] getUserInformation() ERROR(' + err.code + '): ' + err.message); 
    //       throw err; 
    //   });
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  actionSeeAllAdvices(){
    console.log('[HomePage] actionCloseAdvice()');
  }

  actionCloseAdvice(slide){
    console.log('[HomePage] actionCloseAdvice()', slide.name);
  }

  actionRegisterAdvice(slide){
    console.log('[HomePage] actionRegisterAdvice()', slide.name);
  }

  actionCloseAppointment(slide){
    console.log('[HomePage] actionCloseAppointment()', slide.title);
    slide.hide = true
    this.appointment = this.appointment.filter( slide => slide.hide == false)
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
        title: slider?.name,
        hour: slider?.hour
      }
    });
  }

  slideDrugChange(){	   
		this.sliderDrug.getActiveIndex().then(index => {      
      console.log('[HomePage] slideDrugChange()', index);
      let slider = this.drugs[index]
      this.infoDrugs = {
        title: slider?.name,
        hour: slider?.hour_intake
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

  changeTake(id,taked){  
    taked=(taked=="0") ? "1" : "0";
    var dict = [];
    dict.push({
        key:   "date",
        value: ""
    });
    this.dooleService.postAPIchangeStatedrugIntake(id,taked).subscribe(json=>{
      console.log('[HomePage] changeTake()',  json);
      this.getUserInformation()
    },(err) => { 
      console.log('[HomePage] changeTake() ERROR(' + err.code + '): ' + err.message); 
      alert( 'ERROR(' + err.code + '): ' + err.message)
      throw err; 
    });
  }

  filterDrugsByStatus(){
    this.drugs = this.drugs.filter( drug => drug.forgotten != 0)
  }

  searchIndexDrug(){
    this.drugs.forEach((element, index) => {
      if((new Date(element.date_intake).getMilliseconds) >= (new Date().getMilliseconds)){
        console.log('[HomePage] searchIndexDrug() index',  index);
         this.currentIndexDrug = index
         return
      }
    });
  }

 
}
