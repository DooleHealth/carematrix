import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingPageRoutingModule } from './tracking-routing.module';

import { TrackingPage } from './tracking.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ElementsAddPageModule } from './elements-add/elements-add.module';
import { DocumentsAddPageModule } from './documents-add/documents-add.module';
import { DocumentsFilterPageModule } from './documents-filter/documents-filter.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ShareModule,
    ComponentsModule,
    TrackingPageRoutingModule,
    ElementsAddPageModule,
    DocumentsAddPageModule,
    DocumentsFilterPageModule
  ],
  providers: [ InAppBrowser],
  declarations: [TrackingPage]
})
export class TrackingPageModule {}
