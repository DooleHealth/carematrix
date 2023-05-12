import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Init for the web
import "@capacitor-community/firebase-analytics";
import {FirebaseAnalytics} from '@capacitor-community/firebase-analytics';
import {Device} from '@capacitor/device';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsEnabled = true;
  constructor( private router: Router) {
    this.initFb();
  }

  async initFb() {

    if ((await (Device.getInfo())).platform == 'web') {
      console.log("initializeFirebase: ", environment.firebase)
      await FirebaseAnalytics.initializeFirebase(environment.firebase);
    }

    this.toggleAnalytics();
  }

  async setUser(userId) {
    // Use Firebase Auth uid
    FirebaseAnalytics.setUserId({
      userId: userId,
    });
  }

  setProperty(property, value) {
    FirebaseAnalytics.setUserProperty({
      name: property,
      value: value,
    });
  }

  logEvent(name: string, params: Object) {
    FirebaseAnalytics.logEvent({
      name: name,
      params: params
    });
  }

  setScreenName(screenName, nameOverride?) {
    FirebaseAnalytics.setScreenName({
      screenName: screenName,
      nameOverride: nameOverride,
    });
  }

  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });
  }

}
