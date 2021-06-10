import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestTypePage } from './test-type.page';

const routes: Routes = [
  {
    path: '',
    component: TestTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestTypePageRoutingModule {}
