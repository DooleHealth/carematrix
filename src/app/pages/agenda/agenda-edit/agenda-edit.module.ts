import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaEditPageRoutingModule } from './agenda-edit-routing.module';

import { AgendaEditPage } from './agenda-edit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AgendaEditPageRoutingModule
  ]
})
export class AgendaEditPageModule {}
