import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsAddPageRoutingModule } from './documents-add-routing.module';

import { DocumentsAddPage } from './documents-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DocumentsAddPageRoutingModule
  ],
  declarations: [DocumentsAddPage]
})
export class DocumentsAddPageModule {}
