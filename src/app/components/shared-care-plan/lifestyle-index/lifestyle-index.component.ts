import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-lifestyle-index',
  templateUrl: './lifestyle-index.component.html',
  styleUrls: ['./lifestyle-index.component.scss'],
})
export class LifestyleIndexComponent  implements OnInit {
  @Input() content: SharedCarePlanLifeStyle
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  goTo(type: any){   
    this.redirect.emit({type: type})
}

}
