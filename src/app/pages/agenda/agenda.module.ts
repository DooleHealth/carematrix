import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';

import { NgCalendarModule  } from 'ionic2-calendar';
 
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { CalModalPageModule } from './cal-modal/cal-modal.module';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [AgendaPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ]
})
export class AgendaPageModule {}
