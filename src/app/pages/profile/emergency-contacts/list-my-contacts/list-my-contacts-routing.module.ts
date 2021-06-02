import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMyContactsPage } from './list-my-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ListMyContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMyContactsPageRoutingModule {}
