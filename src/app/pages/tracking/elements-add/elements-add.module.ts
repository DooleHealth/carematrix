import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementsAddPageRoutingModule } from './elements-add-routing.module';

import { ElementsAddPage } from './elements-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    ElementsAddPageRoutingModule
  ],
  declarations: [ElementsAddPage]
})
export class ElementsAddPageModule {}
