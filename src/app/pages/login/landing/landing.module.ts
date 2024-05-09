import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { LocalizedDatePipe } from 'src/app/utils/localized-date.pipe';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { DirectiveModule } from 'src/app/directive/directive.module';

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
    DirectiveModule
  ],
  providers:[Device,LocalizedDatePipe,AppVersion],
  declarations: [LandingPage]
})
export class LandingPageModule {}
