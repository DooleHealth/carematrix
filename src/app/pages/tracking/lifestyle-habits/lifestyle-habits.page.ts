import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTypeIcons, ContentTypePath, ContentTypeTranslatedName, ListSCPLifeStyle, SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-lifestyle-habits',
  templateUrl: './lifestyle-habits.page.html',
  styleUrls: ['./lifestyle-habits.page.scss'],
})
export class LifestyleHabitsPage implements OnInit {
  listContent: SharedCarePlanLifeStyle [] = [];
  nameLifeStyle: string = ContentTypeTranslatedName.LifestyleHabits
  iconLifeStyle = ContentTypeIcons.LifestyleHabits
  isLoading = true

  constructor(
    private router: Router,
    public translate: TranslateService,
    public language: LanguageService
  ) {  
   }

  ngOnInit() {
    this.isLoading=true;
    this.listContent.push(...ListSCPLifeStyle)
    

    console.log(this.language.getCurrent());

    this.listContent.forEach(element => {
      element.traduction = element.title;
      element.title = this.translate.instant(element.traduction)
      element 
    }); 

  
  }

  ionViewWillEnter() {
    //console.log("aaa", ListSCPLifeStyle)
    //this.listContent.push(...ListSCPLifeStyle)
    

    console.log("LANG: " + this.language.getCurrent());

    this.listContent.forEach(element => {
      element.title = this.translate.instant(element.traduction)
    });
    this.isLoading= false;

  
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
        case NotificationsType.TESTIMONIALS:             
        this.router.navigate([ContentTypePath.Testimonials]);
        break;  
    }
  }

}
