import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPusherPageRoutingModule } from './chat-pusher-routing.module';

import { ChatPusherPage } from './chat-pusher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPusherPageRoutingModule
  ],
  declarations: [ChatPusherPage]
})
export class ChatPusherPageModule {}
