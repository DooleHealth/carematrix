import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPageRoutingModule } from './personal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalPage } from './personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PersonalPageRoutingModule
  ],
  declarations: [PersonalPage]
})
export class PersonalPageModule {}
