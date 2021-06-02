import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRelationshipPage } from './list-relationship.page';

const routes: Routes = [
  {
    path: '',
    component: ListRelationshipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRelationshipPageRoutingModule {}
