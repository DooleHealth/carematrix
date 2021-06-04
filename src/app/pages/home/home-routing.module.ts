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
        loadChildren: () => import('../agenda/agenda.module').then( m => m.AgendaPageModule)
      },

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
