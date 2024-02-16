import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestimonialsDetailsPageRoutingModule } from './testimonials-details-routing.module';

import { TestimonialsDetailsPage } from './testimonials-details.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    TestimonialsDetailsPageRoutingModule
  ],
  declarations: [TestimonialsDetailsPage]
})
export class TestimonialsDetailsPageModule {}
