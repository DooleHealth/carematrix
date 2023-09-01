import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMyContactsPageRoutingModule } from './list-my-contacts-routing.module';

import { ListMyContactsPage } from './list-my-contacts.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ListMyContactsPageRoutingModule
  ],
  declarations: [ListMyContactsPage]
})
export class ListMyContactsPageModule {}
