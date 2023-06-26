import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmFormPageRoutingModule } from './alarm-form-routing.module';

import { AlarmFormPage } from './alarm-form.page';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    TranslateModule,
    AlarmFormPageRoutingModule,
    ShareModule
  ],
  declarations: [AlarmFormPage]
})
export class AlarmFormPageModule {}
