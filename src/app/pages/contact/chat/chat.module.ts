import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChatPage } from './chat.page';
import { ShellModule } from 'src/app/utils/shell/shell.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ChatPageRoutingModule,
    ShellModule
  ],
  providers: [DatePipe] ,
  declarations: [ChatPage]
})
export class ChatPageModule {}
