import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactPage } from './contact.page';

const routes: Routes = [
  {
    path: '',
    component: ContactPage
  }
  ,
  {
    path: 'medical-directory',
    loadChildren: () => import('./medical-directory/medical-directory.module').then( m => m.MedicalDirectoryPageModule)
  }
  ,
  {
    path: 'specialist-finder',
    loadChildren: () => import('./specialist-finder/specialist-finder.module').then( m => m.SpecialistFinderPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactPageRoutingModule {}
