import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalState, GoalStateType, SharedCarePlanGoal } from 'src/app/models/shared-care-plan';
import { DateService } from 'src/app/services/date.service';

enum CircleProgressColors {
  GREEN_SHADE = '#27C100',
  GREEN_TINT = '#C7E596', 
  MALVA_SHADE = '#BA0186',
  MALVA_TINT = '#FFE0F5'
}

@Component({
  selector: 'scp-content-circle-progress',
  templateUrl: './content-circle-progress.component.html',
  styleUrls: ['./content-circle-progress.component.scss'],
})
export class ContentCircleProgressComponent  implements OnInit {
  @Input() content: SharedCarePlanGoal
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  outerProgreesColor = CircleProgressColors.MALVA_SHADE;
  innerProgreesColor = CircleProgressColors.MALVA_TINT;
  percent: number;
  state: GoalState;
  isShowProgrress = true;
  constructor(public dateService:DateService) { }

  ngOnInit() {
    this.setState()
    this.setPercent()
    this.setDate()
    this.getProgress()

    console.log('[ContentCircleProgressComponent] ngOnInit()', this.content);
  }

  goTo(type){
    this.redirect.emit({type: type})
  }

  setState(){
    this.state = new GoalState(this.content?.state)
    if(this.state.state === GoalStateType.PENDING)
      this.isShowProgrress = false
  }

  setDate(){
    this.content.date = this.dateService.selectedDateFormat2(this.content?.date)
  }

  getProgress(){
    if(this.percent == 100){
      this.outerProgreesColor =  CircleProgressColors.GREEN_SHADE;
      this.innerProgreesColor =  CircleProgressColors.GREEN_SHADE;
    }
  }

  setPercent(){
    const percent = this.content?.percentage
    if(typeof percent === 'string')
      this.percent = Number(percent) 
    else  if(typeof percent === 'number')
      this.percent = percent
  }

}
