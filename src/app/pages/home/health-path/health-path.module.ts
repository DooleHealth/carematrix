import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthPathPageRoutingModule } from './health-path-routing.module';

import { HealthPathPage } from './health-path.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HealthPathPageRoutingModule
  ],
  declarations: [HealthPathPage]
})
export class HealthPathPageModule {}
