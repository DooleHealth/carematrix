import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietsPage } from './diets.page';

const routes: Routes = [
  {
    path: '',
    component: DietsPage
  },
  {
    path: 'diets-detail',
    loadChildren: () => import('../diets-detail/diets-detail.module').then( m => m.DietsDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietsPageRoutingModule {}
