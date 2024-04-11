import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[ChangeColor]'
})
export class ChangeColorDirective {
  @Input() timeOfDay: any;

  constructor( private elem: ElementRef) {
   // elem.nativeElement.style.color= "blue"
   }

   ngOnChanges() {
      let hour = new Date(this.timeOfDay).getHours();
      let now = new Date().getHours();
      if (hour > now) {
        this.elem.nativeElement.style.color = "#575757";
      } 
  }
}
