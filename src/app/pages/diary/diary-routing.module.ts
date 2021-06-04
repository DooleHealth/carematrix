import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiaryPage } from './diary.page';

const routes: Routes = [
  {
    path: '',
    component: DiaryPage
  },
  {
    path: 'activity-goal',
    loadChildren: () => import('../profile/activity-goal/activity-goal.module').then( m => m.ActivityGoalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryPageRoutingModule {}
