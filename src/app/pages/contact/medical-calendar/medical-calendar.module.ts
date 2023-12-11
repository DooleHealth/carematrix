import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';


import { MedicalCalendarPageRoutingModule } from './medical-calendar-routing.module';

import { MedicalCalendarPage } from './medical-calendar.page';
import { registerLocaleData } from '@angular/common';
import { NgCalendarModule } from 'ionic2-calendar';
import localeDe from '@angular/common/locales/de';
import { TranslateModule } from '@ngx-translate/core';
import {NgxPaginationModule} from 'ngx-pagination';

registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    MedicalCalendarPageRoutingModule,
    TranslateModule,
    NgCalendarModule,
    NgxPaginationModule
  ],
  declarations: [MedicalCalendarPage],
  providers: [DatePipe,
    { provide: LOCALE_ID, useValue: 'ca-ES' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MedicalCalendarPageModule {}
