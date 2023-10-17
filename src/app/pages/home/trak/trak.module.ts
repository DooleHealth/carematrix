import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrakPageRoutingModule } from './trak-routing.module';

import { TrakPage } from './trak.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    TrakPageRoutingModule
  ],
  declarations: [TrakPage],
  exports:[TranslateModule]
})
export class TrakPageModule {}
