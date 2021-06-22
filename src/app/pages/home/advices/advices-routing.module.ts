import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvicesPage } from './advices.page';

const routes: Routes = [
  {
    path: '',
    component: AdvicesPage
  }
  ,
  {
    path: 'diets-detail',
    loadChildren: () => import('../../diary/diets-detail/diets-detail.module').then( m => m.DietsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvicesPageRoutingModule {}
