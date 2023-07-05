import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFormD]'
})
export class FormDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
