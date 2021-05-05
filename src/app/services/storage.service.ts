import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  saveFirstTimeLoad(val): void {
    this.storage.set('firstTime', val);
  }
  saveFirstTimeLoad2(val): void {
    this.storage.set('firstTime2', val);
  }


  isFirstTimeLoad(): Promise<boolean>  {
    return this.storage.get("firstTime").then((result) => {
      if (result == null) {       //si no hay valor previo
        return true;              //retornamos true
      }

      return result;              //si hay valor guardado, devolvemos el valor
    }).catch((err) => {
      return false;               //en caso de error, retornamos false
    });
  }

isFirstTimeLoad2(): Promise<boolean>  {
  return this.storage.get("firstTime2").then((result) => {
    if (result == null) {       //si no hay valor previo
      return true;              //retornamos true
    }

    return result;              //si hay valor guardado, devolvemos el valor
  }).catch((err) => {
    return false;               //en caso de error, retornamos false
  });
}
}
