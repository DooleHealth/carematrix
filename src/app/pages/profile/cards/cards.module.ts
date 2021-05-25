import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CardsPageRoutingModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
