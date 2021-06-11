import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentDetailPageRoutingModule } from './document-detail-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DocumentDetailPage } from './document-detail.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    DocumentDetailPageRoutingModule
  ],
  declarations: [DocumentDetailPage]
})
export class DocumentDetailPageModule {}
