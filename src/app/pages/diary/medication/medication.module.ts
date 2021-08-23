import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationPageRoutingModule } from './medication-routing.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MedicationPage } from './medication.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    MedicationPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [MedicationPage]
})
export class MedicationPageModule {}
