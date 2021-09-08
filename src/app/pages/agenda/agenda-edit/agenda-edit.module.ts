import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaEditPageRoutingModule } from './agenda-edit-routing.module';

import { AgendaEditPage } from './agenda-edit.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { Chooser } from '@ionic-native/chooser/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AgendaEditPageRoutingModule,
    ComponentsModule,
  ],
  providers:[Chooser,InAppBrowser]
})
export class AgendaEditPageModule {}
