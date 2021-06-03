import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsFilterPage } from './documents-filter.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentsFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsFilterPageRoutingModule {}
