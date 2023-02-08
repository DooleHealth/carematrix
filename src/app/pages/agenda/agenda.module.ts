import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TranslateModule } from '@ngx-translate/core';
import { AgendaEditPage } from './agenda-edit/agenda-edit.page';
import { AgendaEditPageModule } from './agenda-edit/agenda-edit.module';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    AgendaPageRoutingModule,
    AgendaEditPageModule,
    TranslateModule,
    NgCalendarModule
  ],
  declarations: [AgendaPage, AgendaEditPage],
  exports:[AgendaEditPage],
  providers: [ DatePipe]
})
export class AgendaPageModule {}
