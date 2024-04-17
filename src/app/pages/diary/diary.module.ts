import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiaryPageRoutingModule } from './diary-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DiaryPage } from './diary.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { DrugsDetailPageModule } from './drugs-detail/drugs-detail.module';
import { DrugAddPageModule } from './drug-add/drug-add.module';
import { ElementsAddPageModule } from '../tracking/elements-add/elements-add.module';
import { ShareModule } from 'src/app/shared/share/share.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DirectiveModule } from 'src/app/directive/directive.module';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ShareModule,
    DiaryPageRoutingModule,
    DrugsDetailPageModule,
    DrugAddPageModule,
    ElementsAddPageModule,
    DirectiveModule
    

  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [DiaryPage]
})
export class DiaryPageModule {}
