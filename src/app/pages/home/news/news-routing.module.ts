import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: 'advices-detail',
    loadChildren: () => import('../advices-detail/advices-detail.module').then( m => m.AdvicesDetailPageModule)
  },
  {
    path: 'new-detail',
    loadChildren: () => import('../new-detail/new-detail.module').then( m => m.NewDetailPageModule)
  }, 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
