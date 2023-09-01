import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportProblemPageRoutingModule } from './report-problem-routing.module';

import { ReportProblemPage } from './report-problem.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    ComponentsModule,
    ReportProblemPageRoutingModule
  ],
  declarations: [ReportProblemPage]
})
export class ReportProblemPageModule {}
