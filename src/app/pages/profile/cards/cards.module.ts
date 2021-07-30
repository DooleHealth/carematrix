import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';
import { AddHealthCardPageModule } from './add-health-card/add-health-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CardsPageRoutingModule,
    AddHealthCardPageModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
