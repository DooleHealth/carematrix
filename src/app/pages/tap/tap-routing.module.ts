import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapPage } from './tap.page';

const routes: Routes = [
  {
    path: '',
    component: TapPage,
    children: [
      {
       path: 'home',
       loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
     },
     {
       path: 'agenda',
       loadChildren: () => import('../agenda/agenda.module').then( m => m.AgendaPageModule)
     },
     {
      path: 'tracking',
      loadChildren: () => import('../tracking/tracking.module').then( m => m.TrackingPageModule)
     },
     {
      path: 'diary',
      loadChildren: () => import('../diary/diary.module').then( m => m.DiaryPageModule)
     },

   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapPageRoutingModule {}
