import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalDirectoryPageRoutingModule } from './medical-directory-routing.module';

import { MedicalDirectoryPage } from './medical-directory.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalDirectoryPageRoutingModule, 
    TranslateModule,
  ],
  declarations: [MedicalDirectoryPage]
})
export class MedicalDirectoryPageModule {}
