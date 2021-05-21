import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyUnitPageRoutingModule } from './family-unit-routing.module';

import { FamilyUnitPage } from './family-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilyUnitPageRoutingModule
  ],
  declarations: [FamilyUnitPage]
})
export class FamilyUnitPageModule {}
