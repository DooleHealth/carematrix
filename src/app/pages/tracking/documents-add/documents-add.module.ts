import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsAddPageRoutingModule } from './documents-add-routing.module';

import { DocumentsAddPage } from './documents-add.page';
import { TranslateModule } from '@ngx-translate/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    DocumentsAddPageRoutingModule,
    ComponentsModule,
  ],
  providers:[DatePipe,Chooser],
  declarations: [DocumentsAddPage]
})
export class DocumentsAddPageModule {}
