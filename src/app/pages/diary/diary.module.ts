import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryPageRoutingModule } from './diary-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DiaryPage } from './diary.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DiaryPageRoutingModule
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [DiaryPage]
})
export class DiaryPageModule {}
