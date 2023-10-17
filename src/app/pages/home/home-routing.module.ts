import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'health-path',
    loadChildren: () => import('./health-path/health-path.module').then( m => m.HealthPathPageModule)
  },
  {
    path: 'list-notifications',
    loadChildren: () => import('./list-notifications/list-notifications.module').then( m => m.ListNotificationsPageModule)
  },
  {
    path: 'trak',
    loadChildren: () => import('./trak/trak.module').then( m => m.TrakPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
