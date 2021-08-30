import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// Init for the web
import "@capacitor-community/firebase-analytics";
 
import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics, Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  analyticsEnabled = true;
  constructor( private router: Router) {
    // this.initFb();
    // this.router.events.pipe(
    //   filter((e: RouterEvent) => e instanceof NavigationEnd),
    // ).subscribe((e: RouterEvent) => {
    //   console.log('route changed: ', e.url);
    //   this.setScreenName(e.url)
    // });
  }

  async initFb() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebase);
    }
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
