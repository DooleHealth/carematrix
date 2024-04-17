import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialsPage } from './testimonials.page';

const routes: Routes = [
  {
    path: '',
    component: TestimonialsPage
  },
  {
    path: 'testimonials-detail',
    loadChildren: () => import('../testimonials-details/testimonials-details.module').then( m => m.TestimonialsDetailsPageModule)
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialsPageRoutingModule {}
