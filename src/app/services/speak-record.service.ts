import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root'
})
export class SpeakRecordService {

  constructor() { }

  speakText(speak: any){
    TextToSpeech.speak({
      text:speak
    })
    return "a"
  }
}
