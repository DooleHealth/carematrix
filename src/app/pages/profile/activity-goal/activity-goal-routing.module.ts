import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityGoalPage } from './activity-goal.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityGoalPageRoutingModule {}
