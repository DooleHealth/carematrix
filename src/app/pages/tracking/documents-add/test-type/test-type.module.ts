import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestTypePageRoutingModule } from './test-type-routing.module';

import { TestTypePage } from './test-type.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TestTypePageRoutingModule
  ],
  declarations: [TestTypePage]
})
export class TestTypePageModule {}
