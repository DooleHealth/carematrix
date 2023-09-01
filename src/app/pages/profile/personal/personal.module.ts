import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalPageRoutingModule } from './personal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PersonalPage } from './personal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    TranslateModule,
    PersonalPageRoutingModule
  ],
  declarations: [PersonalPage],
  providers: [ DatePipe,
  ]
})
export class PersonalPageModule {}
