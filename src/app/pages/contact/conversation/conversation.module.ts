import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversationPageRoutingModule } from './conversation-routing.module';

import { ConversationPage } from './conversation.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { MediaCapture } from '@awesome-cordova-plugins/media-capture/ngx';
import { Media } from '@awesome-cordova-plugins/media/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ConversationPageRoutingModule,
    TranslateModule,

  ],
  providers:[Chooser, MediaCapture, Media, DatePipe],
  declarations: [ConversationPage]
})
export class ConversationPageModule {}
