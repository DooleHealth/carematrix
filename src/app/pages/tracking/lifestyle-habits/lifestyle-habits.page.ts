import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTypeIcons, ContentTypePath, ContentTypeTranslatedName, ListSCPLifeStyle, SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';
import { NotificationsType } from 'src/app/models/notifications/notification-options';

@Component({
  selector: 'app-lifestyle-habits',
  templateUrl: './lifestyle-habits.page.html',
  styleUrls: ['./lifestyle-habits.page.scss'],
})
export class LifestyleHabitsPage implements OnInit {
  listContent: SharedCarePlanLifeStyle [] = [];
  nameLifeStyle: string = ContentTypeTranslatedName.LifestyleHabits
  iconLifeStyle = ContentTypeIcons.LifestyleHabits
  constructor(
    private router: Router
  ) {  
   }

  ngOnInit() {
    this.listContent.push(...ListSCPLifeStyle)
  }

  handleRedirect(event: { type: string }) {   
    console.log("entro a la redireccion")     
    switch (event.type) {
      case NotificationsType.NEWS:           
      this.router.navigate([ContentTypePath.News]);
      break;
      case NotificationsType.ADVICES:           
      this.router.navigate([ContentTypePath.Advices]);
      break;
      case NotificationsType.EXERCISES:             
      this.router.navigate([ContentTypePath.Exercises]);
      break;
      case NotificationsType.GAMES:              
      this.router.navigate([ContentTypePath.Games]);
      break;
      case NotificationsType.DIETS:             
        this.router.navigate([ContentTypePath.Diets]);
        break;     
    }
  }

}
