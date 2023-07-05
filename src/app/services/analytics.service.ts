import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Init for the web
import "@capacitor-community/firebase-analytics";
import {FirebaseAnalytics} from '@capacitor-community/firebase-analytics';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsEnabled = true;
  constructor( public platform: Platform,) {
    this.initFb();
  }

  async initFb() {

    if (this.platform.is('mobileweb')){
      console.log("initializeFirebase: ", environment.firebase)
      await FirebaseAnalytics.initializeFirebase(environment.firebase);
    }


    this.toggleAnalytics();
  }

  setUserId(userId) {
    const setUserId = async () => {
      await FirebaseAnalytics.setUserId({
        userId: userId,
      });
    }

    return setUserId;
  }

  setProperty(property, value) {
    const setUserProperty = async () => {
      await FirebaseAnalytics.setUserProperty({
        name: property,
        value: value,
      });
    };

    return setUserProperty
  }

  logEvent(name: string, params: Object) {
    const logEvent = async () => {
      await FirebaseAnalytics.logEvent({
        name: name,
        params: params
      });
    }

    return logEvent
  }

  async setScreenName(screenName, nameOverride?) {
    await FirebaseAnalytics.setScreenName({
      screenName: screenName,
      nameOverride: nameOverride,
    });
  }

  async toggleAnalytics() {
    const setCollectionEnabled = async () => {
      await FirebaseAnalytics.setCollectionEnabled({
        enabled: this.analyticsEnabled,
      });
    }

    return setCollectionEnabled;

  }

}
