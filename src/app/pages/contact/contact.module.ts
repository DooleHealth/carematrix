import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import {NgxPaginationModule} from 'ngx-pagination';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    ContactPageRoutingModule,
    NgxPaginationModule
  ],
  
  declarations: [ContactPage],
  providers: [Chooser, CallNumber]
})
export class ContactPageModule {}
