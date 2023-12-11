import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingsPageRoutingModule } from './bookings-routing.module';

import { BookingsPage } from './bookings.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgCalendarModule } from 'ionic2-calendar';
import { MedicalCalendarPageModule } from '../medical-calendar/medical-calendar.module';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookingsPageRoutingModule,
    TranslateModule,
    NgCalendarModule,
    MedicalCalendarPageModule,
    ComponentsModule,
  ],
  declarations: [BookingsPage],
  providers:[Chooser,DatePipe,InAppBrowser],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class BookingsPageModule {}
