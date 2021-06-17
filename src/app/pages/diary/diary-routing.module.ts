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
  },
  {
    path: 'diets-detail',
    loadChildren: () => import('./diets-detail/diets-detail.module').then( m => m.DietsDetailPageModule)
  },
  {
    path: 'drugs-detail',
    loadChildren: () => import('./drugs-detail/drugs-detail.module').then( m => m.DrugsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiaryPageRoutingModule {}
