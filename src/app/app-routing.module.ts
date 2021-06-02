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
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/login/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/onboarding/intro/intro.module').then( m => m.IntroPageModule)
  },
  {

    path: 'goals',
    loadChildren: () => import('./pages/profile/goals/goals.module').then( m => m.GoalsPageModule)
  },
  {
    path: 'activity-goal',
    loadChildren: () => import('./pages/profile/activity-goal/activity-goal.module').then( m => m.ActivityGoalPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./pages/profile/personal/personal.module').then( m => m.PersonalPageModule)

  },
  {
    path: 'family-unit',
    loadChildren: () => import('./pages/profile/family-unit/family-unit.module').then( m => m.FamilyUnitPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/profile/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/profile/settings/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./pages/profile/cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },

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
