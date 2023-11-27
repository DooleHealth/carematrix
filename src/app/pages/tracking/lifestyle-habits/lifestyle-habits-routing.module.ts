import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LifestyleHabitsComponent } from './lifestyle-habits.component';


const routes: Routes = [
  {
    path: '',
    component: LifestyleHabitsComponent
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifestyleRoutingModule {}
