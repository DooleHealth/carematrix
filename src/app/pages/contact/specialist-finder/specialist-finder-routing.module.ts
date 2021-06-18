import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistFinderPage } from './specialist-finder.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialistFinderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistFinderPageRoutingModule {}
