import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformedConsentPageRoutingModule } from './informed-consent-routing.module';

import { InformedConsentPage } from './informed-consent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformedConsentPageRoutingModule
  ],
  declarations: [InformedConsentPage]
})
export class InformedConsentPageModule {}
