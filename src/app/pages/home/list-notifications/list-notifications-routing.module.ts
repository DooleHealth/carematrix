import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNotificationsPage } from './list-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: ListNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListNotificationsPageRoutingModule {}
