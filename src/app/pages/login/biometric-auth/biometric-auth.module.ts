import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiometricAuthPageRoutingModule } from './biometric-auth-routing.module';

import { BiometricAuthPage } from './biometric-auth.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BiometricAuthPageRoutingModule
  ],
  declarations: [BiometricAuthPage]
})
export class BiometricAuthPageModule {}
