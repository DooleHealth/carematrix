import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

const TOKEN_KEY = 'token';
const DEVICE_TOKENS = 'tokens';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token
  private deviceTokens = []
  constructor(
    private encryptionService: EncryptionService
  ) { }

  // getToken(){
  //   return this.token
  // }

  // setToken(token){
  //   this.token = token;
  // }

  hasToken(): boolean {
    return this.token != undefined? true:false;
  }

  getAuthToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if(!token) return
    //console.log("[TokenService] getAuthToken()", token);
    const encryptedData = this.encryptionService.decryptData(token);
    return encryptedData;
  }

  setAuthToken(token) {
    const encryptedData = this.encryptionService.encryptData(token);
    localStorage.setItem(TOKEN_KEY, encryptedData);
  }

  removeAuthToken(){
    localStorage.removeItem(TOKEN_KEY)
  }

  saveAllTokenDevices(token){
    this.deviceTokens.push(token)
    const encryptedData = this.encryptionService.encryptData(this.deviceTokens);
    console.log("[TokenService] saveAllTokenDevices() ", encryptedData);
    localStorage.setItem(DEVICE_TOKENS,JSON.stringify(encryptedData))
  }

  getAllTokenDevices(){
    let list = JSON.parse(localStorage.getItem(DEVICE_TOKENS))
    if(!list) return
    console.log("[TokenService] getAllTokenDevices() ", list);
    const decryptedData = this.encryptionService.decryptData(list);
    this.deviceTokens = decryptedData? decryptedData:[]
    return this.deviceTokens
  }
}
