import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RequestVisitPageRoutingModule } from './request-visit-routing.module';
import { RequestVisitPage } from './request-visit.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { NgCalendarModule } from 'ionic2-calendar';
import { MedicalCalendarPageModule } from '../contact/medical-calendar/medical-calendar.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RequestVisitPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    NgCalendarModule,
    MedicalCalendarPageModule,
  ],
  providers:[Chooser,DatePipe,InAppBrowser],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RequestVisitPage]
})
export class RequestVisitPageModule {}
