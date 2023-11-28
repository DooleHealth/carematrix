import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesPage } from './games.page';



const routes: Routes = [
  {
    path: '',
    component: GamesPage
  },
  {
    path: 'games-detail',
    loadChildren: () => import('../games-detail/games-detail.module').then( m => m.GamesDetailPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
