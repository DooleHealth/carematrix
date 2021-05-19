import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, throwError } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Advice, Agenda, Diet, Drug, Game, Goal, User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';

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
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {
  PATH_USERDATA= '/user/informationUser'
  userDoole : User
  dietInfo: UserInformation ={}
  drugInfo: UserInformation ={}
  playInfo: UserInformation ={}
  activityInfo: UserInformation ={}
  goalInfo: UserInformation ={}
  advicesInfo: UserInformation ={}
  appointment: UserInformation ={}
  username:string = 'New User'
  userImage:string = 'assets/icons/user_icon.svg'

  private onDestroy$ = new Subject();

  constructor(public router:Router,
    private dooleService: DooleService) { }

  ngOnInit() {  
    this.showInformation()
  }

  showInformation(){
    this. getAll()
    //this.getUserInformation()
    //this.userImg()
    
  }

  userImg(){
    if( this.userDoole.image !== null && this.userDoole.image !== undefined 
      && this.userDoole.image !== '')
      this.userImage = this.userDoole.image;
      this.username = this.userDoole.username
  }

  getUserInformation(){
    this.dooleService.getAPIhomeInitial('/user/informationUser')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( data =>{
        console.log(`[InitialPage] getUserInformation()`, data);

        this.userDoole = data as User
       // this.showDrugs(this.userDoole)
      })
  }

  getAll(){
    this.dooleService.getAPIhome(this.PATH_USERDATA).subscribe(
      async (res: any) =>{
        //console.log('[InitialPage] getAll()', await res);
        this.userDoole = res as User
        this.userImg()
        this.showGoals()
        this.showDiets()
        this.showDrugs()
        this.showGames()
        this.showPhysical()
        this.showAgenda()
        this.showAdvices()
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


   showDiets() {
    let sliders = []
    this.dietInfo.title = 'Tu Dia'
    this.dietInfo.subtitle = 'Almuerzo',
    this.dietInfo.icon = 'assets/icons/apple-diet.svg'
    this.dietInfo.hour = '00:00'
    this.dietInfo.color = '#E67E22'
    this.userDoole.diets. forEach((diet) => {
        let slider = {
          title: diet.name,
          hour: diet.hour,
          description: diet.description
        }      
        sliders.push(slider as SliderInfo)
    })
    this.dietInfo.content = sliders
  //  console.log('[InitialPage] showDiets() diet', this.dietInfo);
  }

  showGames(){
    let sliders = []
    this.playInfo.subtitle = 'Juegos'
    this.playInfo.icon = 'assets/icons/game.svg'
    this.playInfo.color = '#9B59B6'
    this.userDoole.games.forEach((game)=>{
      let slider:SliderInfo = {}
      slider.description = game.name
      sliders.push(slider)
    })
    this.playInfo.content = sliders
  //  console.log('[InitialPage] showGames()', this.playInfo);
  }

  showGoals(){
    let sliders = []
    this.goalInfo.title = 'Tu Objetivo'
    this.goalInfo.subtitle = 'Tu Objetivo Diario'
    this.goalInfo.icon = 'assets/icons/goals.svg'
    this.goalInfo.color = '#F39C12'
    this.goalInfo.bar = true
    this.userDoole.goals.forEach((goal)=>{
      let slider:SliderInfo = {}
      slider.description = goal.description
      slider.porcentage = goal.steps
      sliders.push(slider)
    })
    this.goalInfo.content = sliders
   // console.log('[InitialPage] showGames()', this.goalInfo);
  }

  showDrugs(){
    let sliders = []
    this.drugInfo.subtitle = 'Medication'
    this.drugInfo.icon = 'assets/icons/medication.svg'
    this.drugInfo.hour = '00:00'
    this.drugInfo.color = '#2ECC71'
    this.userDoole.drugs.forEach((drug) => {
        let slider = {
          title: drug.name,
          hour: drug.hour_intake,
          description: drug.name
        }      
        sliders.push(slider)
        
    })  
    this.drugInfo.content = sliders
   // console.log('[InitialPage] showParamsDiets()', this.drugInfo);
    //return this.DrugInfo
  }

  showPhysical(){
    let sliders = []
    this.activityInfo.subtitle = 'Actividad Física'
    this.activityInfo.icon = 'assets/icons/fire.svg'
    this.activityInfo.color = '#E74C3C'
    let slider: SliderInfo = {}
    slider.title = ''
    slider.description = '456 Cal'
    sliders.push(slider);
    sliders.push(slider)
    this.activityInfo.content = sliders
  }

  showAdvices(){
    let sliders = []
    this.advicesInfo.title = 'Novedades y Concejos'
    this.advicesInfo.bar = true
    let listAvices = this.userDoole.advices as Advice[];
    listAvices.forEach((advice ) => {
        let slider: SliderInfo = {}
        slider.title = advice.name
        slider.description = advice.description
        slider.image = advice.image
        sliders.push(slider)
    })
    this.advicesInfo.content = sliders
    console.log('[InitialPage] showAdvices()', this.advicesInfo);
  }

  showAgenda(){
    let sliders = []
    this.appointment.title = 'Recordatorios'
    this.appointment.bar = false
    let listAgenda = this.userDoole.agendas as Agenda[];
    console.log('[InitialPage] showAgenda() 1', listAgenda);
    listAgenda.forEach((agenda ) => {
      let slider: SliderInfo = {}
      slider.title = agenda.title
      slider.subtitle = agenda.doctor
      slider.hour = agenda.start_date
      sliders.push(slider)
  }) 
  this.appointment.content = sliders
  console.log('[InitialPage] showParamsDiets()', this.appointment);
  }

}
