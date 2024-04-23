import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-speak-record',
  templateUrl: './speak-record.component.html',
  styleUrls: ['./speak-record.component.scss'],
})
export class SpeakRecordComponent  implements OnInit {
  @Input() speak: any
  constructor() { }

  ngOnInit() {
    this.speakText()
  }

  speakText(){
    TextToSpeech.speak({
      text:this.speak,
    })
  }
}
