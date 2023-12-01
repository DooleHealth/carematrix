import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoalState, SharedCarePlanGoal } from 'src/app/models/shared-care-plan';

enum CircleProgressColors {
  GREEN_SHADE = '#78C000', //'#C7E596',
  GREEN_TINT = '#C7E596', // '#27C100',
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
  constructor() { }

  ngOnInit() {
    this.setState()
    this.setPercent()
    this.getProgress()
    console.log('[ContentCircleProgressComponent] ngOnInit()', this.content);
  }

  goTo(type){
    this.redirect.emit({type: type})
  }

  setState(){
    this.state = new GoalState(this.content?.state)
    console.log('[ContentCircleProgressComponent] setState()', this.state);
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
