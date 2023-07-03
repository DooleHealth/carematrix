import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly secretKey: string = 'D001E-APP';
  constructor() { }

  encryptData(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey
    ).toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): any {

    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      this.secretKey
    );

    try {
      const data = decryptedData.toString(CryptoJS.enc.Utf8);
      return JSON.parse(data);
  } catch (e) {
      return encryptedData
  }






  }
}
