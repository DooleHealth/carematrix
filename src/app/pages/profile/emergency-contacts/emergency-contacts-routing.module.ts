import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyContactsPage } from './emergency-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyContactsPage
  },
  {
    path: 'detail-contact',
    loadChildren: () => import('./detail-contact/detail-contact.module').then( m => m.DetailContactPageModule)
  },
  {
    path: 'edit-contact',
    loadChildren: () => import('./edit-contact/edit-contact.module').then( m => m.EditContactPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyContactsPageRoutingModule {}
