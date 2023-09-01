import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaDetailPageRoutingModule } from './agenda-detail-routing.module';

import { AgendaDetailPage } from './agenda-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ComponentsModule } from 'src/app/components/components.module';
import { ElementsAddPageModule } from '../../tracking/elements-add/elements-add.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AgendaDetailPageRoutingModule,
    ElementsAddPageModule,
    ReactiveFormsModule,
    TranslateModule,
    ShareModule
  ],
  providers: [InAppBrowser],
  declarations: [AgendaDetailPage]
})
export class AgendaDetailPageModule {}
