import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalDirectoryPage } from './medical-directory.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalDirectoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalDirectoryPageRoutingModule {}
