import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietsPageRoutingModule } from './diets-routing.module';

import { DietsPage } from './diets.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
ComponentsModule,
    TranslateModule,
    DietsPageRoutingModule
  ],
  declarations: [DietsPage]
})
export class DietsPageModule {}
