import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedCarePlan } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'scp-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent  implements OnInit {
  @Input() content: SharedCarePlan
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  goTo(type){
      this.redirect.emit({type: type})
  }
    
}
