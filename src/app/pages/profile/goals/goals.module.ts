import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalsPageRoutingModule } from './goals-routing.module';

import { GoalsPage } from './goals.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { DrugsDetailPageModule } from '../../diary/drugs-detail/drugs-detail.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GoalsPageRoutingModule,
    DrugsDetailPageModule
  ],
  declarations: [GoalsPage]
})
export class GoalsPageModule {}
