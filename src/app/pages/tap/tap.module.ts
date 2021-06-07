import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TapPageRoutingModule } from './tap-routing.module';

import { TapPage } from './tap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TapPageRoutingModule
  ],
  declarations: [TapPage]
})
export class TapPageModule {}
