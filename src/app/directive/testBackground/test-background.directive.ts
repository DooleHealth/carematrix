import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';

@Directive({
  selector: '[appTestBackground]'
})
export class TestBackgroundDirective {
  isTest=true;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private endpoints: ChangeEndpointsService,) {

      console.log("TESTT!!!")
      if (this.isTest) {
        this.renderer.setStyle(this.el.nativeElement, '--ion-background-color', 'rgba(255, 165, 0, 0.5)');
      } else {
        this.renderer.removeStyle(this.el.nativeElement, '--ion-background-color');
      }
   

   }

}