import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvicesDetailPage } from './advices-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AdvicesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvicesDetailPageRoutingModule {}
