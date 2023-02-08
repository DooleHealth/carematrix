import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { Device } from '@ionic-native/device/ngx';
import { LocalizedDatePipe } from 'src/app/utils/localized-date.pipe';


const routes: Routes = [
  {
    path: '',
    component: LandingPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    LandingPageRoutingModule,
  ],
  providers:[Device,LocalizedDatePipe],
  declarations: [LandingPage]
})
export class LandingPageModule {}
