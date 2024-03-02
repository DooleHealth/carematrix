import { Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from "@angular/common";
import { ContentTypePath } from '../models/shared-care-plan';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = [];
 
  constructor(
    private router: Router, 
    private location: Location,
    private _zone: NgZone,  
    private platform: Platform,) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("NavigationEnd", event.urlAfterRedirects);
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
 
  back(): void {
    this.history.forEach( (event, index) => {
      console.log("NavigationEnd", index, event);
    })

    let lastUrl = this.history.pop();

    this.history.forEach((event, index) => {
      console.log("NavigationEnd pop", index, event);
    })

    if (this.history?.length > 0) {
      this.location.back()
      //this.router.navigate([`${lastUrl}`]);
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  async close(modalCtrl?): Promise<void>  {
    const modal = await modalCtrl?.getTop();
    if (modal)
      await modal.dismiss({error:null});
    else this.back()
  }



  redirecPushNotification(data, notification?) {

    // console.log("DATA " + data)
    // console.log("Notification " + notification)

    switch (data.action) {
      case "ADVICE":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.AdvicesDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "AGENDA":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.AgendaDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "DIET":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.DietsDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "DRUGINTAKE":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.Medication], { state: { data: data, segment: 'medication' } });
        });
        break;
      case "EXERCISE":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.ExercisesDetail], { state: { data: data, id: data.id, programable_id: data.programable_play_id } });
        });
        break;
      case "FORM":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.FormDetail, { id: data.id }], { state: { data: data } });
        });
        break;
      case "GAME":
        this._zone.run(() => {
          if (data.type == 'form') {
            this.router.navigate([ContentTypePath.FormDetail, { id: data.form_id }], { state: { data: data, game_play_id: data?.game_play_id } });
          } else
            this.router.navigate([ContentTypePath.GamesDetail], { state: { data: data, id: data.id, server_url: data?.server_url } });
        });
        break;
      case "LEVELASSIGNED": //GOALS
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.Goals], { state: { data: data } });
        });
        break;
      case "MESSAGE":
        let staff;
        // Different payloads for ios and android
        if (this.platform.is('ios'))
          staff = data?.origin;
        else
          staff = data?.origin ? JSON.parse(data?.origin) : null;
        //console.log('staff: ', staff);
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.Message], { state: { data: data, chat: data.id, staff: staff, customData: data?.user_id } });
        });
        break;
      case "NEWS":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.NewsDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "REMINDER":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.ReminderDetail], { state: { data: data, id: data.id } });
        });
        break;
      case "SHARECAREPLAN":
        this._zone.run(() => {
          this.router.navigate([ContentTypePath.Home], { state: { data: data, openNotificationAlertDialog: true } });
        });
        break;
      case "VIDEOCALL":
        this._zone.run(() => {
        //  this.redirecToVideocall(notification)
        });
        break;
      default:
        console.error('Action on localNotificationActionPerformed not found, redirecting to videocall: ')
       // this.redirecToVideocall(notification)
        break;
    }
  }
}
