import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialsDetailsPage } from './testimonials-details.page';

const routes: Routes = [
  {
    path: '',
    component: TestimonialsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestimonialsDetailsPageRoutingModule {}
