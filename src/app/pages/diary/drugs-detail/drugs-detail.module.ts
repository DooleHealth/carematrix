import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugsDetailPageRoutingModule } from './drugs-detail-routing.module';

import { DrugsDetailPage } from './drugs-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
   /*  NgxPaginationModule, */
    DrugsDetailPageRoutingModule,
  ],
  providers:[DatePipe],
  declarations: [DrugsDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DrugsDetailPageModule {}
