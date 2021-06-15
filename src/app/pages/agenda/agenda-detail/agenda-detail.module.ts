import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaDetailPageRoutingModule } from './agenda-detail-routing.module';

import { AgendaDetailPage } from './agenda-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaDetailPageRoutingModule,
    TranslateModule,
  ],
  declarations: [AgendaDetailPage]
})
export class AgendaDetailPageModule {}
