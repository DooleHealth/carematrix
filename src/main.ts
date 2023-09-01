import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FirebaseAppCheck } from '@capacitor-firebase/app-check';

if (environment.production) {
  enableProdMode();

  // Security - App Integrity
  try {

    const getToken = async () => {
      const { token  } = await FirebaseAppCheck.getToken({
        forceRefresh: false,
      });
      return token;
    };

    console.log('getToken', { getToken });
    const setTokenAutoRefreshEnabled = async () => {
      await FirebaseAppCheck.setTokenAutoRefreshEnabled({ enabled: true });
    };

    const addTokenChangedListener = async () => {
      await FirebaseAppCheck.addListener('tokenChanged', event => {
        console.log('tokenChanged', { event });
      });
    };

    const removeAllListeners = async () => {
      await FirebaseAppCheck.removeAllListeners();
    };


  } catch (err) {
    // log any errors
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});


// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);