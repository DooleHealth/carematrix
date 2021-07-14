import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';

import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { TranslateModule } from '@ngx-translate/core';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AgendaPageRoutingModule,
    TranslateModule,
    NgCalendarModule
  ],
  declarations: [AgendaPage],
  providers: [ DatePipe,
    { provide: LOCALE_ID, useValue: 'ca-ES' }
  ]
})
export class AgendaPageModule {}
