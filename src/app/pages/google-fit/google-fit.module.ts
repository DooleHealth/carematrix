import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleFitPageRoutingModule } from './google-fit-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { GoogleFitPage } from './google-fit.page';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleFitPageRoutingModule,
    TranslateModule,
  ],
  declarations: [GoogleFitPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoogleFitPageModule {}
