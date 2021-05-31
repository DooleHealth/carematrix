import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsPage } from './cards.page';

const routes: Routes = [
  {
    path: '',
    component: CardsPage
  },
   {
    path: 'addCard',
    loadChildren: () => import('./add-health-card/add-health-card.module').then( m => m.AddHealthCardPageModule)
  },
  {
    path: 'detailCard',
    loadChildren: () => import('./detail-health-card/detail-health-card.module').then( m => m.DetailHealthCardPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsPageRoutingModule {}
