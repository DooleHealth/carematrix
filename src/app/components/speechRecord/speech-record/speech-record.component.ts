import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-speech-record',
  templateUrl: './speech-record.component.html',
  styleUrls: ['./speech-record.component.scss'],
})
export class SpeechRecordComponent implements OnInit {
  recoding = false;
  myText = "";
  @Input() type: any
  @Output() record: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadList: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public platform: Platform,
    private alertController: AlertController,
    public translate: TranslateService,
  ) { }

  ngOnInit() { }

  async starRecognition() {
    // this.showAlertRecord()
    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recoding = true;
      this.showAlertRecord();
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: 'es-ES',


      });
      SpeechRecognition.addListener('partialResults', (data: any) => {
        console.log("partialResults was fired", data.matches);
          if (data.matches && data.matches.length > 0) {
            this.myText = data.matches[0];
            this.record.emit(this.myText);
            this.changeDetectorRef.detectChanges();
          }
      })
    }

  }

  async stopRecognition() {
    this.recoding = false;
    await SpeechRecognition.stop();
  }

  async filterList(event) {

    this.record.emit(event.srcElement.value);
  }

  async getList() {

    this.loadList.emit();
  }

  async showAlertRecord() {
    const alert = await this.alertController.create({
      cssClass: 'alertRecord',
      header: this.translate.instant('alert.recording'),
      message: `
        <div class="alert-content">
          <img src="/assets/images/mic.gif" alt="GIF" id="micImage" style="max-width: 100%;">
        </div>
      `,
    })




    alert.onDidDismiss().then(() => {
      // Aquí puedes realizar la operación que desees
      console.log('El usuario cerró la alerta. Se puede hacer la operación aquí.');
      // Por ejemplo, puedes llamar a una función que realice la operación
      this.stopRecognition();
    });

    await alert.present();
    debugger
    // Obtener el elemento del GIF dentro del alerta
    const micImage = document.getElementById('micImage');
    if (micImage) {
      // Adjuntar evento click al elemento del GIF
      micImage.addEventListener('click', () => {
        console.log('El usuario hizo clic en el GIF dentro del alerta.');
        // Aquí puedes realizar la operación que desees cuando el usuario hace clic en el GIF
        this.stopRecognition();
        // También puedes cerrar el alerta después de hacer clic en el GIF si lo deseas
        alert.dismiss();
      });
    }
  }

}
