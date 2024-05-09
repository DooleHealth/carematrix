import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeColorDirective } from './changeNameColor/change-color.directive';
import { ChangeLineColorDirective } from './changeLineColor/change-line-color.directive';
import { ChangeIconColorDirective } from './changeIconColor/change-icon-color.directive';
import { ClickCounterDirective } from './clickCounter/click-counter.directive';
import { TestBackgroundDirective } from './testBackground/test-background.directive';



@NgModule({
  declarations: [ChangeColorDirective, ChangeLineColorDirective, ChangeIconColorDirective,ClickCounterDirective,TestBackgroundDirective],
  imports: [
    CommonModule
  ],
  exports: [ChangeColorDirective, ChangeLineColorDirective, ChangeIconColorDirective,ClickCounterDirective,TestBackgroundDirective]
})
export class DirectiveModule { }
