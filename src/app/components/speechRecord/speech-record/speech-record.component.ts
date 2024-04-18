import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-speech-record',
  templateUrl: './speech-record.component.html',
  styleUrls: ['./speech-record.component.scss'],
})
export class SpeechRecordComponent  implements OnInit {
  recoding= false;
  myText = "";
  opcion= 5;
  @Output() record: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadList: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  async starRecognition(){
    const {available} = await SpeechRecognition.available();
  
    if(available){
      this.recoding= true; 
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: 'es-ES',
  
  
      });
      SpeechRecognition.addListener('partialResults', (data: any)=>{
        console.log("partialResults was fired", data.matches);
        if(data.matches && data.matches.length > 0){
          this.myText = data.matches[0];
          this.record.emit(this.myText);
          this.changeDetectorRef.detectChanges();
        }
        
        //android
       /* if(data.value && data.value.length > 0){
          this.myText = data.value[0];
          this.changeDetectorRef.detectChanges();
        }
      */
      })
    }
  
  }
  
  async stopRecognition(){
    this.recoding = false;
    await SpeechRecognition.stop();
  }

  async filterList(event){
    
    this.record.emit(event.srcElement.value);
  }

  async getList(){
    
    this.loadList.emit();
  }

}
