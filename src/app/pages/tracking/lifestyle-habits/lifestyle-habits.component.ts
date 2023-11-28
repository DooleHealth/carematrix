import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';
import { NotificationsType } from 'src/app/shared/classes/notification-options';

@Component({
  selector: 'app-lifestyle-habits',
  templateUrl: './lifestyle-habits.component.html',
  styleUrls: ['./lifestyle-habits.component.scss'],
})
export class LifestyleHabitsComponent  implements OnInit {


  listContent: Array<SharedCarePlanLifeStyle> = [];
  exampleContent: SharedCarePlanLifeStyle [] = [
  {img: 'assets/images/shared-care-plan/news.png', title: 'News',  type: NotificationsType.NEWS, id:""},
  {img: 'assets/images/shared-care-plan/advices.png', title: 'Advices',  type: NotificationsType.ADVICES, id:""},
  {img: 'assets/images/shared-care-plan/exercices.png', title: 'Exercises',  type:NotificationsType.EXERCISES, id:""},
  {img: 'assets/images/shared-care-plan/games.png', title: 'Games',  type:NotificationsType.GAMES, id:""},
  {img: 'assets/images/shared-care-plan/diets.png', title: 'Diets',  type:NotificationsType.DIETS, id:""},

] 

  constructor(
    private router: Router
  ) {  
   }

  ngOnInit() {
    this.listContent.push(...this.exampleContent)
  }

  handleRedirect(event: { type: string }) {   
    console.log("entro a la redireccion")     
    switch (event.type) {
      case NotificationsType.NEWS:           
      this.router.navigate(['/news']);
      break;
      case NotificationsType.ADVICES:           
      this.router.navigate(['/advices']);
      break;
      case NotificationsType.EXERCISES:             
      this.router.navigate(['/exercices']);
      break;
      case NotificationsType.GAMES:              
      this.router.navigate(['/journal']);
      break;
      case NotificationsType.DIETS:             
        this.router.navigate(['/diets']);
        break;     
    }
  }
}
