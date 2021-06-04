import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryPageRoutingModule } from './diary-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DiaryPage } from './diary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DiaryPageRoutingModule
  ],
  declarations: [DiaryPage]
})
export class DiaryPageModule {}
