import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReminderAddPageRoutingModule } from './reminder-add-routing.module';

import { ReminderAddPage } from './reminder-add.page';
import { TranslateModule} from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    ReminderAddPageRoutingModule,
    TranslateModule
  ],
  declarations: [ReminderAddPage],
})
export class ReminderAddPageModule {}
