import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedCarePlanProcedure } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-content-date',
  templateUrl: './content-date.component.html',
  styleUrls: ['./content-date.component.scss'],
})
export class ContentDateComponent implements OnInit {
    @Input() content: SharedCarePlanProcedure
    @Output() redirect: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {}

  goTo(type){
    this.redirect.emit({type: type})
  }

}
