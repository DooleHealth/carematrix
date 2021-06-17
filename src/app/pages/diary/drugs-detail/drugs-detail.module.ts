import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugsDetailPageRoutingModule } from './drugs-detail-routing.module';

import { DrugsDetailPage } from './drugs-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugsDetailPageRoutingModule
  ],
  declarations: [DrugsDetailPage]
})
export class DrugsDetailPageModule {}
