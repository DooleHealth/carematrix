import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugAddPage } from './drug-add.page';

const routes: Routes = [
  {
    path: '',
    component: DrugAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugAddPageRoutingModule {}
