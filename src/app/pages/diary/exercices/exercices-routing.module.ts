import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercicesComponent } from './exercices.component';



const routes: Routes = [
  {
    path: '',
    component: ExercicesComponent
  },
  {
    path: 'exercices-detail',
    loadChildren: () => import('../exercices-detail/exercices-detail.module').then( m => m.ExercicesDetailModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercicesRoutingModule {}
