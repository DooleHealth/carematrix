import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideocallIframePageRoutingModule } from './videocall-iframe-routing.module';

import { VideocallIframePage } from './videocall-iframe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideocallIframePageRoutingModule
  ],
  declarations: [VideocallIframePage]
})
export class VideocallIframePageModule {}
