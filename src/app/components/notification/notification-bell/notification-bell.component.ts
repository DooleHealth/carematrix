import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'],
})
export class NotificationBellComponent  implements OnInit {
  @Input() notification: any//notificationOpt;
  @Output() addToDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onGo: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  addToList($event, notification){
    this.addToDelete.emit({event: $event, notification: notification})
  }

  goPage(notification){
    this.onGo.emit(notification)
  }

}
