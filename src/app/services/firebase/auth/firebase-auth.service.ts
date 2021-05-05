import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from, of } from 'rxjs';
import { DataStore } from '../../../utils/shell/data-store';
import { FirebaseProfileModel } from './firebase-profile.model';
import { Platform } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';

import { User, auth } from 'firebase/app';
import { cfaSignIn, cfaSignOut } from 'capacitor-firebase-auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class FirebaseAuthService {

  currentUser: User;
  userProviderAdditionalInfo: any;
  profileDataStore: DataStore<FirebaseProfileModel>;
  redirectResult: Subject<any> = new Subject<any>();


  constructor(
    public angularFire: AngularFireAuth,
    public platform: Platform,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.angularFire.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          this.currentUser = user;
        } else {
          // No user is signed in.
          this.currentUser = null;
        }
      });

      if (!this.platform.is('capacitor')) {
        // when using signInWithRedirect, this listens for the redirect results
        this.angularFire.getRedirectResult()
        .then((result) => {
          // result.credential.accessToken gives you the Provider Access Token. You can use it to access the Provider API.
          if (result.user) {
            this.userProviderAdditionalInfo = result.additionalUserInfo.profile;
            this.redirectResult.next(result);
          }
        }, (error) => {
          this.redirectResult.next({error: error.code});
        });
      }
    }
  }

  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

  getPhotoURL(signInProviderId: string, photoURL: string): string {
    // Default imgs are too small and our app needs a bigger image
    switch (signInProviderId) {
      case 'facebook.com':
        return photoURL + '?height=400';
      case 'password':
        return 'https://s3-us-west-2.amazonaws.com/ionicthemes/otros/avatar-placeholder.png';
      case 'twitter.com':
        return photoURL.replace('_normal', '_400x400');
      case 'google.com':
        return photoURL.split('=')[0];
      default:
        return photoURL;
    }
  }

  signOut(): Observable<any> {
    if (this.platform.is('capacitor')) {
      return cfaSignOut();
    } else {
      return from(this.angularFire.signOut());
    }
  }

  signInWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFire.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.angularFire.createUserWithEmailAndPassword(email, password);
  }

  socialSignIn(providerName: string, scopes?: Array<string>): Observable<any> {
    if (this.platform.is('capacitor')) {
     
      return cfaSignIn(providerName);
    } else {
     
      const provider = new auth.OAuthProvider(providerName);
      //console.log("provider. ", provider);
      if (scopes) {
        scopes.forEach(scope => {
          provider.addScope(scope);
        });
      }

     
      if (this.platform.is('desktop')) {
        return from(this.angularFire.signInWithPopup(provider));
      } else {
        // web but not desktop, for example mobile PWA
        return from(this.angularFire.signInWithRedirect(provider));
      }
    }
  }

  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    //console.log("provider: ", provider);
    const scopes = ['profile', 'email'];
    return this.socialSignIn(provider.providerId, scopes);
  }

  signInWithTwitter() {
    const provider = new auth.TwitterAuthProvider();
    return this.socialSignIn(provider.providerId);
  }

  public getProfileDataSource(): Observable<FirebaseProfileModel> {
    // we need to do this differentiation because there is a bug in
    // platform capacitor ios when executing this.angularFire.user
    if (this.platform.is('capacitor')) {
      return of(this.setUserModelForProfile());
    } else {
      return this.angularFire.user
      .pipe(
        filter((user: User) => user != null),
        map((user: User) => {
          return this.setUserModelForProfile();
        })
      );
    }
  }

  private setUserModelForProfile(): FirebaseProfileModel {
    const userModel = new FirebaseProfileModel();
    const provierData = this.currentUser.providerData[0];
    const userData = this.userProviderAdditionalInfo ? this.userProviderAdditionalInfo : provierData;
    userModel.image = this.getPhotoURL(provierData.providerId, provierData.photoURL);
    userModel.name = userData.name || userData.displayName || 'What\'s your name?';
    userModel.role = 'How would you describe yourself?';
    userModel.description = userData.description || 'Anything else you would like to share with the world?';
    userModel.phoneNumber = userData.phoneNumber || 'Is there a number where I can reach you?';
    userModel.email = userData.email || 'Where can I send you emails?';
    userModel.provider = (provierData.providerId !== 'password') ? provierData.providerId : 'Credentials';

    return userModel;
  }

  public getProfileStore(dataSource: Observable<FirebaseProfileModel>): DataStore<FirebaseProfileModel> {
    // Initialize the model specifying that it is a shell model
    const shellModel: FirebaseProfileModel = new FirebaseProfileModel();
    this.profileDataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.profileDataStore.load(dataSource);
    return this.profileDataStore;
  }
}
