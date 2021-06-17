import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrugsDetailPage } from './drugs-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DrugsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrugsDetailPageRoutingModule {}
