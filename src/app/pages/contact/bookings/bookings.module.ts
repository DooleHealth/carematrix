import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { TranslateModule } from '@ngx-translate/core';
import { MedicalCalendarPage } from '../medical-calendar/medical-calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { MedicalCalendarPageModule } from '../medical-calendar/medical-calendar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookingsPageRoutingModule,
    TranslateModule,
    NgCalendarModule,
    MedicalCalendarPageModule
   
  ],
  declarations: [BookingsPage],
  providers: [ DatePipe]
 
})
export class BookingsPageModule {}
