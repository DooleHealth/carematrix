import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvicesDetailPageRoutingModule } from './advices-detail-routing.module';

import { AdvicesDetailPage } from './advices-detail.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvicesDetailPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [AdvicesDetailPage]
})
export class AdvicesDetailPageModule {}
