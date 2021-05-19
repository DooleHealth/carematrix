import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialPage } from './initial.page';

const routes: Routes = [
  {
    path: '',
    component: InitialPage
  },
  {
    path: 'profile',
    loadChildren: () => import('../../profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitialPageRoutingModule {}
