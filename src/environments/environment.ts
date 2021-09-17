// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appShellConfig: {
    debug: false,
    networkDelay: 500
  },
  firebase: {
    apiKey: "AIzaSyDqlLbR0uBI7JM6XgCxL0vbLO8Mv1zfFrc",
    authDomain: "deneb-65a05.firebaseapp.com",
    databaseURL: "https://deneb-65a05-default-rtdb.firebaseio.com",
    projectId: "deneb-65a05",
    storageBucket: "deneb-65a05.appspot.com",
    messagingSenderId: "429887824166",
    appId: "1:429887824166:web:8ae6abb69c876697d121e7",
    measurementId: "G-QQ3CM8YL1S"

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
