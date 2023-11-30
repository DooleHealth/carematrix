import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-scp-med-for-mon',
  templateUrl: './scp-med-for-mon.component.html',
  styleUrls: ['./scp-med-for-mon.component.scss'],
})
export class ScpMedForMonComponent  implements OnInit {
  @Input() content: SharedCarePlanLifeStyle
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  goTo(type: any){   
    this.redirect.emit({type: type})
}
}
