import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilyUnitPage } from './family-unit.page';

const routes: Routes = [
  {
    path: '',
    component: FamilyUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyUnitPageRoutingModule {}
