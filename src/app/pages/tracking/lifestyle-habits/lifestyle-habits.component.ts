import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-lifestyle-habits',
  templateUrl: './lifestyle-habits.component.html',
  styleUrls: ['./lifestyle-habits.component.scss'],
})
export class LifestyleHabitsComponent  implements OnInit {


  listContent: Array<SharedCarePlanLifeStyle> = [];
  exampleContent: SharedCarePlanLifeStyle [] = [
  {img: 'assets/images/news.png', title: 'News', description: 'Stay up to date and informed', type:"news"},
  {img: 'assets/images/advices.png', title: 'Advices', description: 'Health recommendations', type:"advices"},
  {img: 'assets/images/exercices.png', title: 'Exercices', description: 'Experiences similar to yours', type:"exercices"},
  {img: 'assets/images/games.png', title: 'Games', description: 'Experiences similar to yours', type:"games"},
  {img: 'assets/images/diets.png', title: 'Diets', description: 'Improve your diet', type:"diets"},

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
      case 'news':           
      this.router.navigate(['/news']);
      break;
      case 'advices':           
      this.router.navigate(['/advices']);
      break;
      case 'exercices':           
      this.router.navigate(['/exercices']);
      break;
      case 'games':           
      this.router.navigate(['/journal']);
      break;
      case 'diets':           
        this.router.navigate(['/diets']);
        break;     
    }
  }
}
