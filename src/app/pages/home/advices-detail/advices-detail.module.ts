import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvicesDetailPageRoutingModule } from './advices-detail-routing.module';

import { AdvicesDetailPage } from './advices-detail.page';
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
    AdvicesDetailPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [AdvicesDetailPage]
})
export class AdvicesDetailPageModule {}
