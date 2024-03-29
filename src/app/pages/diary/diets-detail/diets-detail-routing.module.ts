import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietsDetailPage } from './diets-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DietsDetailPage
  },
  {
    path: 'recipe',
    loadChildren: () => import('./recipe/recipe.module').then( m => m.RecipePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietsDetailPageRoutingModule {}
