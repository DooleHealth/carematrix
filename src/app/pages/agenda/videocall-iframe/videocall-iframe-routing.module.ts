import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideocallIframePage } from './videocall-iframe.page';

const routes: Routes = [
  {
    path: '',
    component: VideocallIframePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideocallIframePageRoutingModule {}
