import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ElementsAddPageModule } from '../tracking/elements-add/elements-add.module';
import { AdvicesDetailPageModule } from './advices-detail/advices-detail.module';
import { NewDetailPageModule } from './new-detail/new-detail.module';
import { DietsDetailPageModule } from '../diary/diets-detail/diets-detail.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfPageModule } from '../pdf/pdf.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    HomePageRoutingModule,
    ElementsAddPageModule,
    AdvicesDetailPageModule,
    NewDetailPageModule,
    PdfViewerModule,
    DietsDetailPageModule,
    PdfPageModule

  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [HomePage,
    ]
})
export class HomePageModule {}
