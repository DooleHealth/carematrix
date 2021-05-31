import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailHealthCardPageRoutingModule } from './detail-health-card-routing.module';

import { DetailHealthCardPage } from './detail-health-card.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DetailHealthCardPageRoutingModule
  ],
  declarations: [DetailHealthCardPage]
})
export class DetailHealthCardPageModule {}
