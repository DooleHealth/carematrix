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
  },
  {
    path: 'list-my-contacts',
    loadChildren: () => import('./list-my-contacts/list-my-contacts.module').then( m => m.ListMyContactsPageModule)
  },
  {
    path: 'list-relationship',
    loadChildren: () => import('./list-relationship/list-relationship.module').then( m => m.ListRelationshipPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyContactsPageRoutingModule {}
