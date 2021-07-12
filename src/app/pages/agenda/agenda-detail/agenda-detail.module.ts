import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaDetailPageRoutingModule } from './agenda-detail-routing.module';

import { AgendaDetailPage } from './agenda-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AgendaDetailPageRoutingModule,
    TranslateModule,
  ],
  providers: [ InAppBrowser],
  declarations: [AgendaDetailPage]
})
export class AgendaDetailPageModule {}
