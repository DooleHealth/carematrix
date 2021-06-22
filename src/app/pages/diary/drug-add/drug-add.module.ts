import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrugAddPageRoutingModule } from './drug-add-routing.module';

import { DrugAddPage } from './drug-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrugAddPageRoutingModule
  ],
  declarations: [DrugAddPage]
})
export class DrugAddPageModule {}
