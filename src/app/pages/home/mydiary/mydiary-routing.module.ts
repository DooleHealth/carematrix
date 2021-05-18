import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydiaryPage } from './mydiary.page';

const routes: Routes = [
  {
    path: '',
    component: MydiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydiaryPageRoutingModule {}
