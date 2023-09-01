import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    Preferences.migrate();
  }

  saveFirstTimeLoad(val): void {
    Preferences.set({ key: 'firstTime', value: val});
  }
  saveFirstTimeLoad2(val): void {
    Preferences.set({key:'firstTime2', value:val});
  }

  async isFirstTimeLoad() {
    const result = await Preferences.get({ key: 'firstTime' });
    if (result == null) {       //si no hay valor previo
      return true;              //retornamos true
    }

    return JSON.parse(result.value);

  }

  async isFirstTimeLoad2() {
    const result = await Preferences.get({ key: 'firstTime2' });
    if (result == null) {       //si no hay valor previo
      return true;              //retornamos true
    }

    return JSON.parse(result.value);

  }

}
