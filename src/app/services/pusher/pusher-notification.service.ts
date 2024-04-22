import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicSafeString, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DietsDetailPage } from 'src/app/pages/diary/diets-detail/diets-detail.page';
import { AdvicesDetailPage } from 'src/app/pages/home/advices-detail/advices-detail.page';
import { NewDetailPage } from 'src/app/pages/home/new-detail/new-detail.page';
import { AuthenticationService } from '../authentication.service';
import { PusherChallengeNotificationsService } from './pusher-challenge-notifications.service';
import { ContentTypePath } from 'src/app/models/shared-care-plan';


declare const Pusher: any;
//const NAME_BIND =  'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated'

@Injectable({
  providedIn: 'root'
})
export class PusherNotificationService {
  readonly NOTIFICATION_BIND =  'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated'
  readonly ASSIGNED_LEVEL_TYPE = "App\\Notifications\\Level\\NewLevelAssignedNotification"
  readonly SHARED_CARE_PLAN_TYPE = "App\\Notifications\\SharedCarePlanAddContentNotification"
  readonly VISIT_ONLINE_TYPE ="App\\Notifications\\VisitOnlineNotification"
  readonly CHANEL = 'private-App.User.';
  //readonly CHANEL = 'private-NewLevelAssignedNotification.';
  idUser:string;
  nameChanel:string;
  channel;
  handlerMessage = '';
  roleMessage = '';
  pusher
  isScpAlertOpened = false
  constructor(
    private alertController: AlertController,
    private authService: AuthenticationService,
    public translate: TranslateService,
    private router: Router,
    private modalCtrl: ModalController,
    private pusherChallenge: PusherChallengeNotificationsService,
    private _zone: NgZone,) {
  }

  public subscribeChannel(pusherService, idUser:string){
    this.idUser = idUser
    this.nameChanel = this.CHANEL + this.idUser
    console.log('[PusherNotificationService] this.nameChanel ()', this.nameChanel);
    this.pusher = pusherService
    this.channel = this.pusher.subscribe(this.nameChanel)
    console.log('[PusherNotificationService] subscribeChannel()',  this.channel);
  }

  public unsubscribePusher(){
    this.channel = this.pusher?.unsubscribe(this.nameChanel)
  }

  public init(){
    return this.channel;
   }

   public initAssignedLevel() {
    this.channel?.bind(this.NOTIFICATION_BIND, (data) => {
      console.log('[PusherNotificationService] getPusher()',  data);
      if (data.type === this.ASSIGNED_LEVEL_TYPE) {
        if (!this.isScpAlertOpened) {
          this.openScpNotificationDialog()
        }
        else {
          this.isScpAlertOpened = false
        }
      }
      if(data.type === this.VISIT_ONLINE_TYPE) {
        //this.openVideocallNotificationDialog(data)
      }

      if(data.type === this.SHARED_CARE_PLAN_TYPE) {
        //this.openVideocallNotificationDialog(data)
      }
    });
  }


  public async openVideocallNotificationDialog(dataVideocall:any) {
    let message = `
    <ion-row>
      <ion-col size="4" class="text-align-left" style="padding: 0px; display:flex; align-items:center; justify-content:center">
      <ion-thumbnail style="--size:60px; --border-radius:60px">
        <img src=`+ dataVideocall?.staff?.temporaryUrl + ` alt=""
        /> </ion-thumbnail>
      </ion-col>
        <ion-col size="8" class="text-align-left" style="padding: 0px; height: 103px; display:flex; align-items:center " >
          <h1>`+ dataVideocall?.message + `</h1>
      </ion-col>
    </ion-row>`;

    const alert = await this.alertController.create({
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      cssClass: "videocall-alert",

      message: new IonicSafeString(message),
      buttons: [
        {
          text: this.translate.instant('notifications.cancel'),
          role: 'cancel',
        },

        {
          
          text: this.translate.instant('notifications.join'),
          role: 'accept',
          handler: () => {
            this.router.navigate(['/agenda/videocall'], { state: { id: dataVideocall.agenda } });
          }
        },
      ],
    });

    await alert.present();

    await alert.onDidDismiss();
  
}

  public async openScpNotificationDialog() {

    
    if (!this.isScpAlertOpened) {
      this.isScpAlertOpened = true;
      let message = `
      <ion-row>
        <ion-col class="text-align-center" style="padding: 0px" >
          <img src="${'../../assets/images/shared-care-plan/goal-notification.svg'}" alt="photo" style='width: -webkit-fill-available' /> 
          <h1>`+ this.translate.instant('shared_care_plan.new_scp_notification_title') + `</h1>
          <ion-text> <p>`+ this.translate.instant('shared_care_plan.new_scp_notification_msg') + ` </p> </ion-text>
        </ion-col>
      </ion-row>`;

      const alert = await this.alertController.create({
        mode: 'ios',
        animated: true,
        backdropDismiss: false,
        cssClass: "scp-home-alert",

        message: new IonicSafeString(message),
        buttons: [
          {
            text: this.translate.instant('shared_care_plan.new_scp_alert_cancel'),
            role: 'cancel',
            handler: () => {
              this.isScpAlertOpened = false;
            }
          },

          {
            text: this.translate.instant('shared_care_plan.new_scp_alert_review'),
            role: 'accept',
            handler: () => {
              this.isScpAlertOpened = false;
              this.router.navigate([ContentTypePath.Goals]);
            }
          },
        ],
      });

      
      await alert.present();

      await alert.onDidDismiss();
      
    }
  }
  
async presentPromoteNotification(data) {

  let [message,component] = this.getNotificationMessage(data)

  if(message){
    message = `<ion-row><ion-col class="text-align-center"><img src="assets/images/duly_reading.gif" class="card-alert"></img><ion-text>`+ message +`</ion-text></ion-col></ion-row>`;

    const alert = await this.alertController.create({
      cssClass:'challenge-alert',
      message: message,
      buttons: [
        {
          text: this.translate.instant('alert.button_not_now'),
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: this.translate.instant('alert.button_ok'),
          role: 'confirm',
          handler: () => {
            this.openModal(data, component);
          },
        }
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
  }else
    console.error("Notification type not found");

}

public getNotificationMessage(data){

  let message = '';
  let component= null;

  switch (data?.type){
    case "App\\Notifications\\AdviceCreated":
      message = this.translate.instant('health_path.advice') + '<b>' + data?.advice?.name + '</b>'
      component = AdvicesDetailPage;
      break;
    case "App\\Notifications\\NewsNotification":
        message = this.translate.instant('health_path.news') + '<b>' + data?.news?.name + '</b>'
        component = NewDetailPage;
        break;
    case "App\\Notifications\\DietCreated":
      message = this.translate.instant('health_path.diet') + '<b>' + data?.diet?.name+ '</b>'
      component = DietsDetailPage;
      break;
    case "App\\Notifications\\GameCreated":
      message = this.translate.instant('health_path.game') + '<b>' + data?.game?.name+ '</b>'
      break;

    default:
      break;
  }
  return [message,component];

}

async openModal(data, pageComponent) {

  console.log('model component:', pageComponent);
  const modal = await this.modalCtrl.create({
    component: pageComponent,
    componentProps: { id: data?.model_id },
    cssClass: "modal-custom-class"
  });

  await modal.present();
}
}

