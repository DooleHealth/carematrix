import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailHealthCardPageRoutingModule } from './detail-health-card-routing.module';

import { DetailHealthCardPage } from './detail-health-card.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddHealthCardPageModule } from '../add-health-card/add-health-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DetailHealthCardPageRoutingModule,
    AddHealthCardPageModule
  ],
  declarations: [DetailHealthCardPage]
})
export class DetailHealthCardPageModule {}
