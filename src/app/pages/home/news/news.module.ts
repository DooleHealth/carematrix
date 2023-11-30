import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewsPageRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    NewsPageRoutingModule
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [NewsPage]
})
export class NewsPageModule {}
