import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialistFinderPageRoutingModule } from './specialist-finder-routing.module';

import { SpecialistFinderPage } from './specialist-finder.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialistFinderPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SpecialistFinderPage]
})
export class SpecialistFinderPageModule {}
