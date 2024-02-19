import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestVisitPage } from './request-visit.page';

const routes: Routes = [
  {
    path: '',
    component: RequestVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RequestVisitPageRoutingModule {}
