import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvicesPageRoutingModule } from './advices-routing.module';

import { AdvicesPage } from './advices.page';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AdvicesPageRoutingModule,
    TranslateModule,
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [AdvicesPage]
})
export class AdvicesPageModule {}
