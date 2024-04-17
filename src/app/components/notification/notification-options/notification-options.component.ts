import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { notificationOpt } from '../notification-options';

@Component({
  selector: 'notification-options',
  templateUrl: './notification-options.component.html',
  styleUrls: ['./notification-options.component.scss'],
})
export class NotificationOptionsComponent  implements OnInit {
  @Input() notification: notificationOpt;
  @Input() lines: string = 'inset';
  @Input() appAndMail: boolean = true;
  @Output() setNotification: EventEmitter<any> = new EventEmitter<any>();
  @Output() onExpand: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}


  changeNotificationApp(notification, event){
    notification.on_app = event?.detail?.checked
    if(typeof notification.app === 'string') {
      let params = {
        name: notification.app,
        value: notification.on_app
      }
      this.sendConfigution(params)
    }else{
      notification.app.forEach(item => {
        let params = {
          name: item,
          value: notification.on_app
        }
        this.sendConfigution(params)
      })
    }
    console.log(`[SettingsPage] changeNotificationApp: `, notification);
  }

  changeNotificationMail(notification, event){
    notification.on_mail = event?.detail?.checked
    if(typeof notification.mail === 'string') {
      let params = {
        name: notification.mail,
        value: notification.on_mail
      }
      this.sendConfigution(params)
    }else{
      notification.mail.forEach(item => {
        let params = {
          name: item,
          value: notification.on_mail
        }
        this.sendConfigution(params)
      })
    }
    console.log(`[SettingsPage] changeNotificationMail: `, notification);
  }

  changeStateOptionsNoti(notification){
    //notification.item_expanded = !notification.item_expanded
    this.onExpand.emit(notification)
  }

  sendConfigution(params: { name: any; value: any; }) {
    this.setNotification.emit(params);
  }

  changeNotificationAll(notification, event){
    this.changeNotificationApp(notification, event)
    this.changeNotificationMail(notification, event)
  }
  
}
