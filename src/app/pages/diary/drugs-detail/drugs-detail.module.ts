import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugsDetailPageRoutingModule } from './drugs-detail-routing.module';

import { DrugsDetailPage } from './drugs-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
   /*  NgxPaginationModule, */
    DrugsDetailPageRoutingModule
  ],
  providers:[DatePipe],
  declarations: [DrugsDetailPage]
})
export class DrugsDetailPageModule {}
