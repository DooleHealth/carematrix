import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';


import { MedicalCalendarPageRoutingModule } from './medical-calendar-routing.module';

import { MedicalCalendarPage } from './medical-calendar.page';
import { registerLocaleData } from '@angular/common';
import { NgCalendarModule } from 'ionic2-calendar';
import localeDe from '@angular/common/locales/de';
import { TranslateModule } from '@ngx-translate/core';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MedicalCalendarPageRoutingModule,
    TranslateModule,
    NgCalendarModule
  ],
  declarations: [MedicalCalendarPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'ca-ES' }
  ]
})
export class MedicalCalendarPageModule {}
