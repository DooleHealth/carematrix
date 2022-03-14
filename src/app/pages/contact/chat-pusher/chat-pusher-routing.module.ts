import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPusherPage } from './chat-pusher.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPusherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPusherPageRoutingModule {}
