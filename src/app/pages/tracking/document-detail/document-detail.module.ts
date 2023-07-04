import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentDetailPageRoutingModule } from './document-detail-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DocumentDetailPage } from './document-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentsAddPageModule } from '../documents-add/documents-add.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ShareModule } from 'src/app/shared/share/share.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ShareModule,
    DocumentDetailPageRoutingModule,
    DocumentsAddPageModule
  ],
  providers: [ InAppBrowser],
  declarations: [DocumentDetailPage]
})
export class DocumentDetailPageModule {}
