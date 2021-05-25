import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHealthCardPage } from './add-health-card.page';

const routes: Routes = [
  {
    path: '',
    component: AddHealthCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHealthCardPageRoutingModule {}
