import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicationPage } from './medication.page';

const routes: Routes = [
  {
    path: '',
    component: MedicationPage
  },
  
  {
    path: 'diets-detail',
    loadChildren: () => import('../diets-detail/diets-detail.module').then( m => m.DietsDetailPageModule)
  },
  {
    path: 'drugs-detail',
    loadChildren: () => import('../drugs-detail/drugs-detail.module').then( m => m.DrugsDetailPageModule)
  },
  {
    path: 'drug-add',
    loadChildren: () => import('../drug-add/drug-add.module').then( m => m.DrugAddPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationPageRoutingModule {}
