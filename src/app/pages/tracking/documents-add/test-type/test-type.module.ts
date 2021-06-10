import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestTypePageRoutingModule } from './test-type-routing.module';

import { TestTypePage } from './test-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestTypePageRoutingModule
  ],
  declarations: [TestTypePage]
})
export class TestTypePageModule {}
