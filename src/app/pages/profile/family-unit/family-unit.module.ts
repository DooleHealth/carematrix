import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilyUnitPageRoutingModule } from './family-unit-routing.module';

import { FamilyUnitPage } from './family-unit.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    FamilyUnitPageRoutingModule
  ],
  declarations: [FamilyUnitPage]
})
export class FamilyUnitPageModule {}
