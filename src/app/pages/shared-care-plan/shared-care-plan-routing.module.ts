import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedCarePlanPage } from './shared-care-plan.page';

const routes: Routes = [
  {
    path: '',
    component: SharedCarePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedCarePlanPageRoutingModule {}
