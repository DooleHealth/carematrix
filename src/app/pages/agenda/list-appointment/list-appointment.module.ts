import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAppointmentPageRoutingModule } from './list-appointment-routing.module';

import { ListAppointmentPage } from './list-appointment.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ListAppointmentPageRoutingModule
  ],
  declarations: [ListAppointmentPage]
})
export class ListAppointmentPageModule {}
