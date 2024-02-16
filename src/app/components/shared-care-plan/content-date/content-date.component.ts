import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedCarePlanProcedure } from 'src/app/models/shared-care-plan';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-content-date',
  templateUrl: './content-date.component.html',
  styleUrls: ['./content-date.component.scss'],
})
export class ContentDateComponent implements OnInit {
  @Input() content: any
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  date: string;
  constructor(public dateService: DateService) {

  }

  ngOnInit() {
    console.log("que llego aca", this.content)
    this.setDate()
  }

  goTo(type){
    this.redirect.emit({type: type})
  }

  setDate(){
    this.date = this.dateService.getFormatTime(this.content?.date_intake)
  }

}
