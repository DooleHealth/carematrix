import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListNotificationsPageRoutingModule } from './list-notifications-routing.module';

import { ListNotificationsPage } from './list-notifications.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ListNotificationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListNotificationsPage]
})
export class ListNotificationsPageModule {}
