import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProceduresPageRoutingModule } from './procedures-routing.module';

import { ProceduresPage } from './procedures.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ProceduresPageRoutingModule
  ],
  declarations: [ProceduresPage]
})
export class ProceduresPageModule {}
