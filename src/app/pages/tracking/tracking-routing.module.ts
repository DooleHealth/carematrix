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
  {
    path: 'informed-consent',
    loadChildren: () => import('./informed-consent/informed-consent.module').then( m => m.InformedConsentPageModule)
  },
  {
    path: 'lifestyle-habits',
    loadChildren: () => import('./lifestyle-habits/lifestyle-habits.module').then( m => m.LifestyleHabitsPageModule)
  },
  {
    path: 'form-list',
    loadChildren: () => import('./form-list/form-list.module').then( m => m.FormListPageModule)
  },
  {
    path: 'procedures',
    loadChildren: () => import('./procedures/procedures.module').then( m => m.ProceduresPageModule)
  },
  {
    path: 'monitoring',
    loadChildren: () => import('./monitoring/monitoring.module').then( m => m.MonitoringPageModule)
  },
  {
    path: 'testimonials',
    loadChildren: () => import('./testimonials/testimonials.module').then( m => m.TestimonialsPageModule)
  },
  {
    path: 'testimonials-details',
    loadChildren: () => import('./testimonials-details/testimonials-details.module').then( m => m.TestimonialsDetailsPageModule)
  },
  {
    path: 'answers',
    loadChildren: () => import('./answers/answers.module').then( m => m.AnswersPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingPageRoutingModule {}
