import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { FormPage } from './form.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FormPageRoutingModule,
    TranslateModule  ],
  declarations: [FormPage]
})
export class FormPageModule {}
