import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Advice, Agenda, Diet, Drug, Game, Goal, User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';

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
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {
  PATH_USERDATA= '/user/informationUser'
  userDoole : User
  dietInfo: UserInformation
  DrugInfo: UserInformation
  private onDestroy$ = new Subject();

  constructor(public router:Router,
    private dooleService: DooleService) { }

  ngOnInit() {  
    this.showInformation()
  }

/*   public ngOnDestroy() {
    // Unsubscribe all subscriptions of this component.
    this.onDestroy$.next();
  } */

  showInformation(){
    this. getAll()
    //this.getUserInformation()
    
  }

  getUserInformation(){
    this.dooleService.getAPIhomeInitial('/user/informationUser')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( data =>{
        console.log(`[InitialPage] getUserInformation()`, data);

        this.userDoole = data as User
        this.dietInfo =  this.showDiets( this.userDoole )
       // this.showDrugs(this.userDoole)
      })
  }

  getAll(){
    this.dooleService.getAPIhome(this.PATH_USERDATA).subscribe(
      async (res: any) =>{
        console.log('[InitialPage] getAll()', await res);
        this.userDoole = res as User
        this.dietInfo =  this.showDiets( this.userDoole )
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


  showDiets(user: User): UserInformation{
    let sliders = []
    let diet:UserInformation = {
      title: 'Tu Dia',
      subtitle: 'Almuerzo',
      icon: 'assets/icons/Agenda.svg',
      hour: '12:00',
    }
    user.diets.forEach((diet) => {
        let slider = {
          tilte: diet.name,
          hour: diet.hour
        }      
        sliders.push(slider)
        console.log('[InitialPage] showParamsDiets()', slider);
    })
    diet.content = sliders
    console.log('[InitialPage] showParamsDiets()', diet);
    return diet
  }

  showAdvices(){

  }

  showAgenda(){

  }

  showGames(){

  }

  showGoals(){

  }

  showDrugs(user: User){
    let sliders = []
    this.DrugInfo = {
      subtitle: 'Medication',
      icon: 'assets/icons/Agenda.svg',
    };
/*     user.drugs.forEach((diet) => {
        let slider = {
          tilte: diet.name,
          hour: diet.
        } ;     
        sliders.push(slider)
        
    })  */
    this.DrugInfo.content = sliders
    console.log('[InitialPage] showParamsDiets()', this.DrugInfo);
    return this.DrugInfo
  }

}
