import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitoringPageRoutingModule } from './monitoring-routing.module';

import { MonitoringPage } from './monitoring.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MonitoringPageRoutingModule
  ],
  declarations: [MonitoringPage]
})
export class MonitoringPageModule {}
