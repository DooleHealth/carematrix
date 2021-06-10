import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsFilterPageRoutingModule } from './documents-filter-routing.module';

import { DocumentsFilterPage } from './documents-filter.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DocumentsFilterPageRoutingModule
  ],
  declarations: [DocumentsFilterPage]
})
export class DocumentsFilterPageModule {}
