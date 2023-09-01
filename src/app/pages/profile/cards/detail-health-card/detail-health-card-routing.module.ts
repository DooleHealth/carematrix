import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailHealthCardPage } from './detail-health-card.page';

const routes: Routes = [
  {
    path: '',
    component: DetailHealthCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailHealthCardPageRoutingModule {}
