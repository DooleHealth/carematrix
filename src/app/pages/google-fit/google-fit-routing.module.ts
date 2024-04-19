import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleFitPage } from './google-fit.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleFitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleFitPageRoutingModule {}
