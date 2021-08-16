import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { FirebaseAuthService } from './services/firebase/auth/firebase-auth.service';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { VideoComponent } from './components/video/video.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReminderAddPage } from './pages/agenda/reminder-add/reminder-add.page';
import { ReminderAddPageModule } from './pages/agenda/reminder-add/reminder-add.module';

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
    path: 'tracking',
    loadChildren: () => import('./pages/tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'document-detail',
    loadChildren: () => import('./pages/tracking/document-detail/document-detail.module').then( m => m.DocumentDetailPageModule)
  },
  {
    path: 'documents-filter',
    loadChildren: () => import('./pages/tracking/documents-filter/documents-filter.module').then( m => m.DocumentsFilterPageModule)
  },
  {
    path: 'documents-add',
    loadChildren: () => import('./pages/tracking/documents-add/documents-add.module').then( m => m.DocumentsAddPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  {
   path: 'tracking',
   loadChildren: () => import('./pages/tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
   path: 'journal',
   loadChildren: () => import('./pages/diary/diary.module').then( m => m.DiaryPageModule)
  },
  {
    path: 'elements-add',
    loadChildren: () => import('./pages/tracking/elements-add/elements-add.module').then( m => m.ElementsAddPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'doctors',
    loadChildren: () => import('./pages/contact/doctors/doctors.module').then( m => m.DoctorsPageModule)
  },
  
  {
    path: 'medical-directory',
    loadChildren: () => import('./pages/contact/medical-directory/medical-directory.module').then( m => m.MedicalDirectoryPageModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./pages/contact/bookings/bookings.module').then( m => m.BookingsPageModule)
  },
  {
    path: 'specialist-finder',
    loadChildren: () => import('./pages/contact/specialist-finder/specialist-finder.module').then( m => m.SpecialistFinderPageModule)
  },
  {
    path: 'medical-calendar',
    loadChildren: () => import('./pages/contact/medical-calendar/medical-calendar.module').then( m => m.MedicalCalendarPageModule)
  },
  {
    path: 'advices',
    loadChildren: () => import('./pages/home/advices/advices.module').then( m => m.AdvicesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'video', component: VideoComponent },
  {
    path: 'advices-detail',
    loadChildren: () => import('./pages/home/advices-detail/advices-detail.module').then( m => m.AdvicesDetailPageModule)
  },
  {
    path: 'new-detail',
    loadChildren: () => import('./pages/home/new-detail/new-detail.module').then( m => m.NewDetailPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/tracking/form/form.module').then( m => m.FormPageModule)
  },


];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { enableTracing: true, preloadingStrategy: PreloadAllModules,  initialNavigation: 'enabled',
    // scrollPositionRestoration: 'enabled',
    // anchorScrolling: 'enabled'}),
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
  providers: [FirebaseAuthService, AuthenticationService],
 

})
export class AppRoutingModule {}
