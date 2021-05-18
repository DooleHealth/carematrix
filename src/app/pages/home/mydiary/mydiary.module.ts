import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydiaryPageRoutingModule } from './mydiary-routing.module';

import { MydiaryPage } from './mydiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MydiaryPageRoutingModule
  ],
  declarations: [MydiaryPage]
})
export class MydiaryPageModule {}
