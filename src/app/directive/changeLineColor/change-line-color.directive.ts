import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[ChangeLineColor]'
})
export class ChangeLineColorDirective {
  @Input() timeOfDay: any;

  constructor( private elem: ElementRef) {
   
   }

   ngOnChanges() {
    
      let hour = new Date(this.timeOfDay).getHours();
      let now = new Date().getHours();
      const iconElement: HTMLIonIconElement = this.elem.nativeElement;
      if (hour > now) {
        iconElement.src ='/assets/icons/shared-care-plan/lineStroke.svg'
       // iconElement.src ='/assets/icons/shared-care-plan/ellipse5.svg'
      } 
  }

}
