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
  ,
  {
    path: 'advices-detail',
    loadChildren: () => import('../advices-detail/advices-detail.module').then( m => m.AdvicesDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvicesPageRoutingModule {}
