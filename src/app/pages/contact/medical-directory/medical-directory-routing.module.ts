import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalDirectoryPage } from './medical-directory.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalDirectoryPage
  }
  ,
  {
    path: 'bookings',
    loadChildren: () => import('../bookings/bookings.module').then( m => m.BookingsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalDirectoryPageRoutingModule {}
