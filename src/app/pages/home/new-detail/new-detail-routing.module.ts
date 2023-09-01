import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NewDetailPage } from './new-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NewDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule.forChild()],
  exports: [RouterModule,TranslateModule],
})
export class NewDetailPageRoutingModule {}
