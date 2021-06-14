import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
    DocumentsFilterPageRoutingModule
  ],
  providers:[DatePipe],
  declarations: [DocumentsFilterPage]
})
export class DocumentsFilterPageModule {}
