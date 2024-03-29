import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietsDetailPageRoutingModule } from './diets-detail-routing.module';

import { DietsDetailPage } from './diets-detail.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ShareModule,
    DietsDetailPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [DietsDetailPage]
})
export class DietsDetailPageModule {}
