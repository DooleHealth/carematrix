import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationDetailPageRoutingModule } from './medication-detail-routing.module';

import { MedicationDetailPage } from './medication-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/shared/share/share.module';
import { DrugsDetailPageModule } from '../drugs-detail/drugs-detail.module';
import { DrugAddPageModule } from '../drug-add/drug-add.module';
import { ElementsAddPageModule } from '../../tracking/elements-add/elements-add.module';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ShareModule,
    MedicationDetailPageRoutingModule,
    DrugsDetailPageModule,
    DrugAddPageModule,
    ElementsAddPageModule,
   
  ],
  declarations: [MedicationDetailPage]
})
export class MedicationDetailPageModule {}
