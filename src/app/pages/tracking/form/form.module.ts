import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { FormPage } from './form.page';
import { TranslateModule } from '@ngx-translate/core';
import { AlarmFormPageModule } from './alarm-form/alarm-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FormPageRoutingModule,
    AlarmFormPageModule,
    TranslateModule  ],
  declarations: [FormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormPageModule {}
