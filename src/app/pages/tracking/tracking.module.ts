import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingPageRoutingModule } from './tracking-routing.module';

import { TrackingPage } from './tracking.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    TrackingPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [TrackingPage]
})
export class TrackingPageModule {}
