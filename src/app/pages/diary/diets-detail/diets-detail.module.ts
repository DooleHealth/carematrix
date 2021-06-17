import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietsDetailPageRoutingModule } from './diets-detail-routing.module';

import { DietsDetailPage } from './diets-detail.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietsDetailPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [DietsDetailPage]
})
export class DietsDetailPageModule {}
