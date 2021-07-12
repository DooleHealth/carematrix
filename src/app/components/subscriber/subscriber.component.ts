import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
//import *  as OT from '@opentok/client';
declare let OT: any;

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss'],
})
export class SubscriberComponent {
  @ViewChild('subscriberDiv', { static: true }) subscriberDiv: ElementRef;
  @Input() session: any;
  @Input() stream:any;
  constructor() { }
  subscribe(): void {
    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {
      insertMode: "append",
      width: "100%",
      height: "100%"
    }, (err) => {
      if (err) {
        alert(err.message);
      }
    });
  }
}
