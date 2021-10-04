import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideocallTestPage } from './videocall-test.page';

const routes: Routes = [
  {
    path: '',
    component: VideocallTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideocallTestPageRoutingModule {}
