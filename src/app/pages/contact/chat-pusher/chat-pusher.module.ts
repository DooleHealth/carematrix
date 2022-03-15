import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPusherPageRoutingModule } from './chat-pusher-routing.module';

import { ChatPusherPage } from './chat-pusher.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ChatPusherPageRoutingModule
  ],
  declarations: [ChatPusherPage]
})
export class ChatPusherPageModule {}
