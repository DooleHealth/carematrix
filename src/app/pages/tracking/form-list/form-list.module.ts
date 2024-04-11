import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListPageRoutingModule } from './form-list-routing.module';

import { FormListPage } from './form-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DirectiveModule } from 'src/app/directive/directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    FormListPageRoutingModule,
    DirectiveModule
  ],
  declarations: [FormListPage]
})
export class FormListPageModule {}
