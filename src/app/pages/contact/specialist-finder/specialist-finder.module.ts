import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialistFinderPageRoutingModule } from './specialist-finder-routing.module';

import { SpecialistFinderPage } from './specialist-finder.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgCalendarModule } from 'ionic2-calendar';
import { MedicalCalendarPageModule } from '../medical-calendar/medical-calendar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SpecialistFinderPageRoutingModule,
    TranslateModule,
    NgCalendarModule,
    MedicalCalendarPageModule
  ],
  declarations: [SpecialistFinderPage],
  providers: [ DatePipe]

})
export class SpecialistFinderPageModule {}
