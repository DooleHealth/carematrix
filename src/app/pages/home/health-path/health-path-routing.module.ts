import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthPathPage } from './health-path.page';

const routes: Routes = [
  {
    path: '',
    component: HealthPathPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthPathPageRoutingModule {}
