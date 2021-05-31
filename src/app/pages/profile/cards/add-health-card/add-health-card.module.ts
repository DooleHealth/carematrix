import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHealthCardPageRoutingModule } from './add-health-card-routing.module';

import { AddHealthCardPage } from './add-health-card.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    AddHealthCardPageRoutingModule
  ],
  declarations: [AddHealthCardPage]
})
export class AddHealthCardPageModule {}
