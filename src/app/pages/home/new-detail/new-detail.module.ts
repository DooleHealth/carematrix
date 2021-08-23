import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDetailPageRoutingModule } from './new-detail-routing.module';

import { NewDetailPage } from './new-detail.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDetailPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [NewDetailPage]
})
export class NewDetailPageModule {}
