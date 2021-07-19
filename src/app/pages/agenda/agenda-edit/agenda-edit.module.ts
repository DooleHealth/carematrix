import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaEditPageRoutingModule } from './agenda-edit-routing.module';

import { AgendaEditPage } from './agenda-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaEditPageRoutingModule
  ],
  declarations: [AgendaEditPage]
})
export class AgendaEditPageModule {}
