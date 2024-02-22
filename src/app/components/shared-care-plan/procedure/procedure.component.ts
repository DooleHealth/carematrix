import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedCarePlan } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss'],
})
export class ProcedureComponent  implements OnInit {
  @Input() content: SharedCarePlan
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public translate: TranslateService) { }

  ngOnInit() {}

  goTo(type){
      this.redirect.emit({type: type})
  }
}
