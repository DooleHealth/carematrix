import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeColorDirective } from './changeNameColor/change-color.directive';
import { ChangeLineColorDirective } from './changeLineColor/change-line-color.directive';
import { ChangeIconColorDirective } from './changeIconColor/change-icon-color.directive';
import { ChangeColorCargiverDirective } from './changeColorCargiver/change-color-cargiver.directive';



@NgModule({
  declarations: [ChangeColorDirective, ChangeLineColorDirective, ChangeIconColorDirective, ChangeColorCargiverDirective],
  imports: [
    CommonModule
  ],
  exports: [ChangeColorDirective, ChangeLineColorDirective, ChangeIconColorDirective,ChangeColorCargiverDirective]
})
export class DirectiveModule { }
