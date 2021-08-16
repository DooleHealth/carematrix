import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingPage } from './tracking.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingPage
  },
  {
    path: 'document-detail:id',
    loadChildren: () => import('./document-detail/document-detail.module').then( m => m.DocumentDetailPageModule)
  },
  {
    path: 'documents-filter',
    loadChildren: () => import('./documents-filter/documents-filter.module').then( m => m.DocumentsFilterPageModule)
  },
  {
    path: 'documents-add',
    loadChildren: () => import('./documents-add/documents-add.module').then( m => m.DocumentsAddPageModule)
  },
  {
    path: 'activity-goal',
    loadChildren: () => import('../profile/activity-goal/activity-goal.module').then( m => m.ActivityGoalPageModule)
  },
  {
    path: 'elements-add',
    loadChildren: () => import('./elements-add/elements-add.module').then( m => m.ElementsAddPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingPageRoutingModule {}
