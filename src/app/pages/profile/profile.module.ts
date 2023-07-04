import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilePage } from './profile.page';
import { ReportProblemPageModule } from './report-problem/report-problem.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { PatientsPageModule } from './patients/patients.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProfilePageRoutingModule,
    ReportProblemPageModule,
    PatientsPageModule,
    ComponentsModule
  ],
  providers: [ InAppBrowser,DatePipe, InAppBrowser, AppVersion],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
