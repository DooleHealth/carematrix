import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FirebaseAuthService } from './services/firebase/auth/firebase-auth.service';

import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/login/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'legal',
    loadChildren: () => import('./pages/login/legal/legal.module').then( m => m.LegalPageModule)
  },
  {
    path: 'sms',
    loadChildren: () => import('./pages/login/sms/sms.module').then( m => m.SmsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // This value is required for server-side rendering to work.
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  exports: [RouterModule],
  providers: [FirebaseAuthService, AuthenticationService]
})
export class AppRoutingModule {}
