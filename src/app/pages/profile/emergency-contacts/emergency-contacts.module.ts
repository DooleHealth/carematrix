import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyContactsPageRoutingModule } from './emergency-contacts-routing.module';

import { EmergencyContactsPage } from './emergency-contacts.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EmergencyContactsPageRoutingModule
  ],
  declarations: [EmergencyContactsPage]
})
export class EmergencyContactsPageModule {}
