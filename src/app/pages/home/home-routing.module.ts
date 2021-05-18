import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
       {
        path: 'initial',
        loadChildren: () => import('./initial/initial.module').then( m => m.InitialPageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'follow',
        loadChildren: () => import('./follow/follow.module').then( m => m.FollowPageModule)
      },
      {
        path: 'mydiary',
        loadChildren: () => import('./mydiary/mydiary.module').then( m => m.MydiaryPageModule)
      },
/*       {
        path: 'home',
        redirectTo: 'home/initial',
        pathMatch: 'full'
      } */
    ]
  },
  {
    path: 'home',
    redirectTo: 'home/initial',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
