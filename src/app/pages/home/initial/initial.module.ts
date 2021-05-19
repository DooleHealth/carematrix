import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialPageRoutingModule } from './initial-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { InitialPage } from './initial.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    InitialPageRoutingModule
  ],
  declarations: [InitialPage]
})
export class InitialPageModule {}
