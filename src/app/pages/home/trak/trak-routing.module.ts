import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrakPage } from './trak.page';

const routes: Routes = [
  {
    path: '',
    component: TrakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrakPageRoutingModule {}
