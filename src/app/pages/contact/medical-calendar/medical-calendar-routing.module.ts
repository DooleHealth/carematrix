import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalCalendarPage } from './medical-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule],
})
export class MedicalCalendarPageRoutingModule {}
