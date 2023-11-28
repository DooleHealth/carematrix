import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifestyleHabitsPage } from './lifestyle-habits.page';

const routes: Routes = [
  {
    path: '',
    component: LifestyleHabitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifestyleHabitsPageRoutingModule {}
