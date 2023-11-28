import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ExercicesDetailComponent } from './exercices-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ExercicesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercicesDetailPageRoutingModule {}
