import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestimonialsPageRoutingModule } from './testimonials-routing.module';

import { TestimonialsPage } from './testimonials.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    TestimonialsPageRoutingModule
  ],
  declarations: [TestimonialsPage]
})
export class TestimonialsPageModule {}
