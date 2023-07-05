import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MedicalCalendarPage } from '../medical-calendar/medical-calendar.page';

@Component({
  selector: 'app-specialist-finder',
  templateUrl: './specialist-finder.page.html',
  styleUrls: ['./specialist-finder.page.scss'],
})
export class SpecialistFinderPage implements OnInit {
  staff = history.state?.staff;
  staffId = this.staff?.id;
  selectedDate: string;
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files: Array<{ name: string, file: string, type: string }> = [];
  constructor(private modalCtrl: ModalController, public datepipe: DatePipe, private actionSheetCtrl: ActionSheetController, private translate: TranslateService) { }

  ngOnInit() {
  }

  async openCalendarModal() {
    const modal = await this.modalCtrl.create({
      component: MedicalCalendarPage,
      componentProps: { id: this.staffId },
    });

    modal.onDidDismiss()
      .then((result) => {

        if(result.data['date']){
          this.selectedDate = this.transformDate(result.data['date']) ;
          //this.form.get('date').setValue(this.transformDate(this.selectedDate))
          console.log("openCalendarModal() selectedDate: ", this.selectedDate);
        }
    });

    await modal.present();
  }


  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }


  async selectImageSource() {
    const buttons = [
      {
        text: this.translate.instant('Cámara'),
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: this.translate.instant('videocall.pictures'),
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      },
      {
        text: this.translate.instant('videocall.choose-file'),
        icon: 'document',
        handler: () => {
          this.addFile();
        }
      }
    ];

    // Only allow file selection inside a browser

    // if (Capacitor.getPlatform() == 'web') {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    //}

    const actionSheet = await this.actionSheetCtrl.create({
      buttons
    });
    await actionSheet.present();
  }
  addFile() {
    throw new Error('Method not implemented.');
  }
  addImage(Camera: CameraSource) {
    throw new Error('Method not implemented.');
  }
  openFile(file) {
    throw new Error('Method not implemented.');
  }
  removeFile(name: string) {
    console.log("removeFile: ", name);
    this.files.forEach((element, index) => {
      if (element.name == name)
        this.files.splice(index, 1);
    });
  }


  async uploadFileFromBrowser(event: EventTarget) {
    const eventObj: any = event as any;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file: File = target.files[0];
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const result = await toBase64(file).catch(e => Error(e));
    var base64result = result as string;
    //console.log(" base64result.split(',')[1] ", base64result.split(',')[1]);
    this.files.push({ name: file.name, file: base64result.split(',')[1], type: file.type })

  }
}
