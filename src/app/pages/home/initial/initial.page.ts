import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Advice, Agenda, Diet, Drug, Game, Goal } from 'src/app/models/user';
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
  PATH_ADVICES = 'user/advices'
  PATH_DIETS = 'user/diets'
  PATH_DRUGS = 'user/drugIntake/date'
  PATH_AGENDA = 'user/agenda'
  PATH_GAMES = 'user/games'
  PATH_GOALS = 'user/element/goals'

  advices: Advice[];
  diets: Diet[];
  agendas: Agenda[];
  games: Game[];
  drugs: Drug[];
  goals: Goal[]

  dietInfo: UserInformation;
  private onDestroy$ = new Subject();

  constructor(public router:Router,
    private authService: AuthenticationService,
    private dooleService: DooleService) { }

  ngOnInit() {  
   // this.showInformation()
  }

/*   public ngOnDestroy() {
    // Unsubscribe all subscriptions of this component.
    this.onDestroy$.next();
  } */

  showInformation(){
    //this.getAllInformation();
    this.getDAta()
/*     this.getAdvices()
    this.getAgenda()
    this.getGames();
    this.postDrugs() */
  }

  getAllInformation(){
    this.dooleService.getAPIhomeInitial(this.PATH_DIETS)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe( async data =>{
        console.log(`[InitialPage] getAllInformation()`, await data as any);
        this.showParamsDiets( data as Diet[])
      })
  }

  async getDiets(){
    this.dooleService.getAPIhomeInitial(this.PATH_DIETS).subscribe(async (res) => { 
      console.log('[InitialPage] getDiets()', await res);
      return res;
    }, async (error) => {
     console.log('[InitialPage] getDiets() ERROR', await error);
     throw error;
   });
  }

  getDAta(){
    console.log('[InitialPage] getDAta()');
    this.dooleService.getAPIhome(this.PATH_DIETS).then((data) =>{
      console.log('[InitialPage] getDAta()', data);
    }).catch((err) => { 
      console.log('getDAta ERROR(' + err.code + '): ' + err.message); 
    });
  }

  showParamsDiets(res: Diet[]){
    console.log('[InitialPage] showParamsDiets()');
    res.forEach( data => {
      let slider: SliderInfo = {
        description: data.name,
        image:  data.image
      }
      this.dietInfo.content.push(slider)
    })
    this.dietInfo = {
      title: 'Tu Dia',
      subtitle: 'Almuerzo'
    }
    console.log('[InitialPage] showParamsDiets()', this.dietInfo);
  }

  getAdvices(){
    this.dooleService.getAPIhomeInitial(this.PATH_ADVICES).subscribe(async (res) => {
      console.log('[InitialPage] getAdvices()', await res);
      this.advices = res as Advice[]
    }, async (error) => {
     console.log('[InitialPage] getAdvices() ERROR', await error);
     throw error;
   });
  }

  getAgenda(){
    this.dooleService.getAPIhomeInitial(this.PATH_AGENDA).subscribe(async (res) => {
      console.log('[InitialPage] getAgenda()', await res);
      this.agendas = res as Agenda[]
    }, async (error) => {
     console.log('[InitialPage] getAgenda() ERROR', await error);
     throw error;
   });
  }

  getGames(){
    this.dooleService.getAPIhomeInitial(this.PATH_GAMES).subscribe(async (res) => {
      console.log('[InitialPage] getGames()', await res);
      this.games = res as Game[]
    }, async (error) => {
     console.log('[InitialPage] getGames() ERROR', await error);
     throw error;
   });
  }

  getGoals(){
    this.dooleService.getAPIhomeInitial(this.PATH_GOALS).subscribe(async (res) => {
      console.log('[InitialPage] getGames()', await res);
      this.goals = res as Goal[]
    }, async (error) => {
     console.log('[InitialPage] getGames() ERROR', await error);
     throw error;
   });
  }

  postDrugs(){
    let date = '2021-05-17'
    this.dooleService.postAPIhomeInitial(this.PATH_DRUGS, {date: date}).subscribe(async (res) => {
      console.log('[InitialPage] getGames()', await res);
      this.drugs = res as Drug[]
    }, async (error) => {
     console.log('[InitialPage] getGames() ERROR', await error);
     throw error;
   });
  }

}
