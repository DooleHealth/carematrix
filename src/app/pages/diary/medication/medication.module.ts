import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicationPageRoutingModule } from './medication-routing.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MedicationPage } from './medication.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddAddressPageModule } from './add-address/add-address.module';
import { DirectiveModule } from 'src/app/directive/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    MedicationPageRoutingModule,
    AddAddressPageModule,
    ReactiveFormsModule,
    DirectiveModule
    
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [MedicationPage]
})
export class MedicationPageModule {}
