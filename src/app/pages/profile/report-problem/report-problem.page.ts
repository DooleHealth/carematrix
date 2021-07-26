import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { CameraResultType, CameraSource, Capacitor, Plugins } from '@capacitor/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';

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
  numFile = 0;
  private images : any = [];
  private imagesTemp : any = [];

  isSubmittedCategory = false;
  isSubmittedDescription = false;

  constructor(
    private translate: TranslateService,
    public router: Router,
    private dooleService: DooleService,
    private fb: FormBuilder,
    public platform: Platform,
    public file: File,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      /* category: ['', [Validators.required]], */
      description: ['', [Validators.required]],
      images:[this.images]
    });
  }

  isSubmittedFields(isSubmitted){
    //this.isSubmittedCategory = isSubmitted
    this.isSubmittedDescription = isSubmitted;
  }

  placeholderDescription(){
    if(this.isSubmittedDescription && this.form.get('description').invalid){
      return ''
    }else{
      return this.translate.instant('report_problem.placeholderDescription' )
    }

  }

/*   async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source
    }).catch((e) => {
      console.log('cancelled');

    });

    if (image) {
      console.log("image: ", image);
      var fileUri = Capacitor.convertFileSrc(image.dataUrl);
      var filename= Date.now() //new Date().getTime(); 
      this.saveBase64(fileUri,filename.toString()).then((file)=>{
        this.patient_files.push({ name: filename + '.' + image.format, file: file, type: image.format })
        this.numFile = this.patient_files.length;
      })

    }
  }  */

   async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source
    }).catch((error:any)=>{
      console.log(error);
    });

    if(image){
      console.log("image: ", image);
      var fileUri = Capacitor.convertFileSrc(image.dataUrl);
      console.log("addImage - savePicture fileUri: ", fileUri);

      this.savePicture(fileUri)
      this.patient_files.push({ name: Date.now() + '.' + image.format, file: fileUri, type: image.format })
      this.numFile = this.patient_files.length;

    }else{
      console.log("no image");
    }
  } 

  async selectImageSource(){
    // Only allow file selection inside a browser
    if (!this.platform.is('hybrid')) {
      this.fileInput.nativeElement.click();
    }else{
      this.addImage(CameraSource.Photos);
    }
  }

  async uploadFileFromBrowser(event: EventTarget) {
    const eventObj: MSInputMethodContext = event as MSInputMethodContext;
    const target: HTMLInputElement = eventObj.target as HTMLInputElement;
    const file = target.files[0];
    
    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    const result = await toBase64(file).catch(e => Error(e));
    
    var base64result = result as string;
    //console.log(" base64result.split(',')[1] ", base64result.split(',')[1]);
   // this.images.push(base64result)
    this.patient_files.push({ name: file.name, file: base64result, type: file.type })
        this.numFile = this.patient_files.length;
  }

  openFile(file){
    console.log("[ReportProblemPage] openFile: ", file);
  }


  removeFile(name: string) {
    console.log("[ReportProblemPage] removeFile: ", name);
    this.patient_files.forEach((element, index) => {
      if (element.name == name)
        this.patient_files.splice(index, 1);
    });
    this.numFile = this.patient_files.length;
  }

  async submit(){
    this.isSubmittedFields(true);
    if(this.form.invalid)
      return
    await this.sendProblemReport()

  }

    // Save new diagnostic test
  async sendProblemReport(){
      console.log('[ReportProblemPage] sendProblemReport()');
      const loading = await this.loadingController.create();
      await loading.present();
  
/*       let category = this.form.get('category').value; 
      this.form.get('category').setValue(category); */
  
      let description = this.form.get('description').value
      this.form.get('description').setValue(description);

      this.imagesTemp.forEach(item => {
        this.images.push(item.file);   
      });

/*       this.patient_files.forEach(item => {
        this.images.push(item.file);   
      }); */
      this.form.get('images').setValue(this.images);
  
      console.log("data:", this.images);
      this.dooleService.postAPIReportProblem( this.form.value).subscribe(
          async (data) => {
            console.log("data:", data);
            if(data)
            this.presentAlert(this.translate.instant("report_problem.alert_successful_response"));
            else
            this.presentAlert(this.translate.instant("report_problem.alert_no_successful_response"));
          },
          (error) => {
            // Called when error
            loading.dismiss();
            console.log("error: ", error);
            throw new HttpErrorResponse(error);
          },
          () => {
            // Called when operation is complete (both success and error)
            loading.dismiss();
          });
    }


    enableButtonAddFile(){
      if(this.patient_files.length >= 6 || this.form.invalid){
          return true;
      }
      return false
    }

    goBacktoProfile(){
      if(this.form.valid 
        || this.form.get('images').value.length > 0){
        console.log("[ReportProblemPage] goBacktoProfile()", this.form.value);
        this.presentAlertConfirm();
      }else{
          this.router.navigateByUrl('/profile')
      }
    }

    async presentAlertConfirm() {
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        header: this.translate.instant("report_problem.title_report_problem"),
        message: this.translate.instant("report_problem.alert_confirm_exit"),
        buttons: [
          {
            text: this.translate.instant("alert.button_cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: this.translate.instant("alert.button_ok"),
            handler: () => {
              console.log('Confirm Okay');
              this.router.navigateByUrl('/profile')
            }
          }
        ]
      });
  
      await alert.present();
    }


    async presentAlert(message) {
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        message: message,
        buttons: [{
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigateByUrl('/profile');
          }
        }],
        backdropDismiss: false
      });
  
      await alert.present();
    }

/*     async saveFile(data){
      const loading = await this.loadingController.create();
      await loading.present();
      this.dooleService.uploadFile(data).then( res =>{
        let isSuccess = (res as any).success
        if(isSuccess)
        this.presentAlert(this.translate.instant("report_problem.alert_successful_response"));
        else
        this.presentAlert(this.translate.instant("report_problem.alert_no_successful_response"));
      }).catch(err => {
        console.log("Error uploadFile: ", err);
        loading.dismiss();
        this.presentAlert(err);
      }).finally(() => {
        loading.dismiss();
      })
    } */

    async savePicture(fileUri){
      console.log("[ReportProblemPage] savePicture() fileUri: ",fileUri);
      var filename=new Date().getTime();
      this.saveBase64(fileUri,filename.toString()).then(res => {
        console.log("savePicture() saveBase64 res: ",res);
        this.dooleService.uploadFile(res).then(data => {
          console.log("savePicture() uploadFile res: ",res);
          this.imagesTemp.push(data)
        }).catch(err => {
          console.log("Error uploadFile: ", err);
        }).finally(() => {

        })
       
      });
  
    }


    public saveBase64(base64:string, name:string):Promise<string>{
      return new Promise((resolve, reject)=>{
        var realData = base64.split(",")[1]
        let blob=this.b64toBlob(realData, 'image/jpeg');
  
        this.file.writeFile(this.file.cacheDirectory, name, blob)
        .then(()=>{
          resolve(this.file.cacheDirectory+name);
        })
        .catch((err)=>{
          console.log(err);
          console.log('error writing blob');
          reject(err);
        })
      })
    }
  
    b64toBlob(b64Data, contentType) {
      contentType = contentType || '';
      var sliceSize = 512;
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
  
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
  
    var blob = new Blob(byteArrays, {type: contentType});
    console.log("this is bob: ", blob);
    return blob;
    }


}
