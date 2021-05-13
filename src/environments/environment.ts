// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appShellConfig: {
    debug: false,
    networkDelay: 500
  },
  firebase : {
    apiKey: "AIzaSyDcd9Q5boJJ46VGoGn1MYAN3BOJp6EaCv8",
    authDomain: "covid-39b96.firebaseapp.com",
    databaseURL: "https://covid-39b96.firebaseio.com/",
    projectId: "covid-39b96",
    storageBucket: "covid-39b96.appspot.com",
    messagingSenderId: "344383195320",
    //appId: "1:1094231160196:web:11d4eecd087e565cbed9d1",
    //measurementId: "G-4SW50F4HMH"

/*     apiKey: "AIzaSyCg7GGDmwXpVjEaA1KodELEvk8mORKw6XM",
    authDomain: "mgc-doole.firebaseapp.com",
    databaseURL: "https://mgc-doole.firebaseio.com",
    projectId: "mgc-doole",
    storageBucket: "mgc-doole.appspot.com",
    messagingSenderId: "1094231160196",
    appId: "1:1094231160196:web:11d4eecd087e565cbed9d1",
    measurementId: "G-4SW50F4HMH" */

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
