import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDetailPageRoutingModule } from './new-detail-routing.module';

import { NewDetailPage } from './new-detail.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ShareModule,
    NewDetailPageRoutingModule
  ],
  providers: [ InAppBrowser],
  declarations: [NewDetailPage],
  exports:[TranslateModule]
})
export class NewDetailPageModule {}
