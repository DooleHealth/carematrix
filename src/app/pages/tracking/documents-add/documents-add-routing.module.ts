import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentsAddPage } from './documents-add.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsAddPageRoutingModule {}
