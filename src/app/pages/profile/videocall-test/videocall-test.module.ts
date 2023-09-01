import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideocallTestPageRoutingModule } from './videocall-test-routing.module';

import { VideocallTestPage } from './videocall-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideocallTestPageRoutingModule
  ],
  declarations: [VideocallTestPage]
})
export class VideocallTestPageModule {}
