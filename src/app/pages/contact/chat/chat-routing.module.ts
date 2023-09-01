import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  },
  {
    path: 'conversation',
    loadChildren: () => import('../conversation/conversation.module').then( m => m.ConversationPageModule)
  }
  ,
  {
    path: 'medical-directory',
    loadChildren: () => import('../medical-directory/medical-directory.module').then( m => m.MedicalDirectoryPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
