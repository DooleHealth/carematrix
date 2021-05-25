import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const { Camera } = Plugins;
@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.page.html',
  styleUrls: ['./report-problem.page.scss'],
  providers: [Chooser],
})
export class ReportProblemPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  patient_files: Array<{ name: string, file: string, type: string }> = [];
  form: FormGroup;
  file: any;
  file64: SafeResourceUrl;
  constructor(
    private translate: TranslateService,
    private dooleService: DooleService,
    private chooser: Chooser,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      category: [''],
      description: ['', [Validators.required]],
      auto: [''],
    });
  }

   async addFile() {

    this.chooser.getFile().then(async file => {
      //console.log(file ? file : 'canceled');
      if (file) {

        //console.log("file", file);
        //console.log(" base64result.split(',')[1] ", file.dataURI.split(',')[1]);

        this.patient_files.push({ name: file.name, file: file.dataURI.split(',')[1], type: file.mediaType })
      }
    }).catch((error: any) => {
      console.error(error)
    });
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    }).catch((e) => {
      console.log('cancelled');

    });

    if (image) {
      this.file64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + `image/${image.format}` + ';base64,' + image.base64String)
      this.patient_files.push({ name: Date.now() + '.' + image.format, file: image.base64String, type: image.format })
      this.form.patchValue({
        auto: 'data:' + `image/${image.format}` + ';base64,' + image.base64String
      });
    }
  }

  sendProblemReport(){

  }

  openFile(file){
    this.patient_files.length
  }

  removeFile(file){

  }

  uploadFileFromBrowser(event){

  }

}
