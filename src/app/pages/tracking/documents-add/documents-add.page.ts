import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { TestTypePage } from './test-type/test-type.page';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-documents-add',
  templateUrl: './documents-add.page.html',
  styleUrls: ['./documents-add.page.scss'],
})
export class DocumentsAddPage implements OnInit {
  NUM_YEAR = 10
  @Input() test: any;
  dateMax:any;
  isEdit = false;
  diagnosticTest;
  media: any = [];
  form: FormGroup;
  typeTest
  public processing:boolean=false;
  currentDate
  isSubmittedType = false;
  isSubmittedTitle = false;
  isSubmittedDate = false;
  @ViewChild('uploadFile') uploadFile: FileUploadComponent;
  isLoading: boolean;
  date: any;
  locale:string;
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private dooleService: DooleService,
    private modalController: ModalController,
    private translate : TranslateService,
    public platform: Platform,
    public datepipe: DatePipe,
    public navController: NavController,
    public dateService: DateService,
    private modalCtrl: ModalController,
    public alertController: AlertController,

  ) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.date = localISOTime// this.dateService.selectedDateFormat(localISOTime);
    this.locale = this.dateService.getLocale();
   }

  ngOnInit() {
    console.log("[DocumentsAddPage] ngOnInit()");
    this.dateMax = (new Date(Date.now()).getFullYear()) + this.NUM_YEAR
    console.log("[DocumentsAddPage] ngOnInit()", this.dateMax);
    //this.currentDate = new Date().toISOString()
    this.form = this.fb.group({
      private: [false, [Validators.required]],
      type: ['', [Validators.required]],
      title: ['', [Validators.required]],
      date: [this.date, [Validators.required]],
      description: [''],
    });

    this.showDiagnosticTest()
  }

  showDiagnosticTest(){
    if(this.test?.success){
      this.isEdit = true
      this.diagnosticTest = this.test.diagnosticTest;
      this.form.get('private').setValue(this.diagnosticTest.private)
      this.typeTest = this.test.diagnosticTest.diagnostic_test_type;
      this.form.get('type').setValue(this.typeTest.name)
      this.form.get('title').setValue(this.diagnosticTest.title)
      this.form.get('date').setValue(this.diagnosticTest.data)
      this.form.get('description').setValue(this.diagnosticTest.description)
      this.media = this.test.diagnosticTest.media
    }
  }


  isSubmittedFields(isSubmitted){
    this.isSubmittedType = isSubmitted
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDate= isSubmitted;
  }
  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  }

  // Save new diagnostic test
  async submit() {
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return
    console.log("submit");
    let date = this.form.get('date').value;
    var current = new Date(date)
    let data_prestacio = this.dateService.ddMMyyyyFormat(current);
    this.form.get('date').setValue(data_prestacio);

    let private_test = this.form.get('private').value ? 1 : 0;
    this.form.get('private').setValue(private_test);

    let typeId = this.typeTest.id
    this.form.get('type').setValue(typeId);

    if(this.isEdit)
      this.updateDiagnosticTest()
    else
      this.createDiagnosticTest()
  }

  createDiagnosticTest(){
    this.isLoading = true
    return this.dooleService.postAPIdiagnosticTest(this.form.value).subscribe(
      async (data) => {
        console.log("[DocumentsAddPage] createDiagnosticTest() data:", data);
        if(data){
          if(this.uploadFile.isEmptyFiles()){
            this.modalCtrl.dismiss({error:null, action: 'add'});
          }else{
            this.uploadFile.uploadFiles(data.diagnosticTest.id, 'DiagnosticTest').subscribe(res =>{
              if(res.success)
                this.modalCtrl.dismiss({error:null, action: 'add'});
              else{
                  let message = this.translate.instant('bookings.error_upload_files')
                  this.modalCtrl.dismiss({error:message});
              }
            })
          }
          this.isLoading = false
        }else{
          let message = this.translate.instant('documents_add.error_alert_message')
          this.modalCtrl.dismiss({error:message});
          this.isLoading = false
        }
      },
      (error) => {
        // Called when error
        //alert( 'ERROR(' + error.code + '): ' + error.message)
        this.isLoading = false
        this.modalCtrl.dismiss({error: 'ERROR(' + error.code + '): ' + error.message});
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      });
  }

  updateDiagnosticTest(){
    this.isLoading = true
    this.dooleService.putAPIdiagnosticTest(this.diagnosticTest.id, this.form.value).subscribe(
      async (data) => {
        console.log("[DocumentsAddPage] updateDiagnosticTest() data:", data);
        if(data.success){
          if(this.uploadFile.isEmptyFiles()){
            console.log("[DocumentsAddPage] isEmptyFiles()", data);
            this.modalCtrl.dismiss({error: null, action: 'update'});
          }else{
            this.uploadFile.uploadFiles(data.diagnosticTest.id, 'DiagnosticTest').subscribe(res =>{
                if(res.success){
                    this.modalCtrl.dismiss({error: null, action: 'update'});
                }
                else{
                    let message = this.translate.instant('bookings.error_upload_files')
                    this.modalCtrl.dismiss({error:message});
                }
            })
          }
        }
        else{
          let message = this.translate.instant('documents_add.error_alert_message')
          this.modalCtrl.dismiss({error:message});
        }
        this.isLoading = false
      },
      (error) => {
        // Called when error
        //alert( 'ERROR(' + error.code + '): ' + error.message)
        this.modalCtrl.dismiss({error: 'ERROR(' + error.code + '): ' + error.message});
        this.isLoading = false
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      });
  }

  deleteDiagnosticTest(){
    this.isLoading = true
    this.dooleService.deleteAPIdiagnosticTest(this.diagnosticTest.id).subscribe(
      async (data) => {
        console.log("data:", data);
        if(data)
        this.modalCtrl.dismiss({error:null, action: 'delete'});
        else{
          let message = this.translate.instant('documents_add.error_alert_message')
          this.modalCtrl.dismiss({error:message});
        }
        this.router.navigateByUrl('/tracking')
        this.isLoading = false
      },
      (error) => {
        // Called when error
        //alert( 'ERROR(' + error.code + '): ' + error.message)
        this.modalCtrl.dismiss({error: 'ERROR(' + error.code + '): ' + error.message});
        console.log("error: ", error);
        this.isLoading = false
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
        this.modalCtrl.dismiss({error:null});
        this.isLoading = false
      });
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TestTypePage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data !== undefined) {
        this.typeTest = dataReturned.data;
        this.form.get('type').setValue(this.typeTest.name)
      }
    });

    return await modal.present();
  }


  changePlaceholder(){
    let placeholder = this.translate.instant('placeholder_select')
    if(this.isSubmittedType && this.form.get('type').invalid)
    placeholder = ''
    return placeholder
  }

  async presentAlertConfirm() {
    let message = this.translate.instant("documents_add.delete_document")
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      //header: this.translate.instant("alert.header_confirmation"),
      message: message,
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[DocumentsAddPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[DocumentsAddPage] AlertConfirm Okay');
            this.deleteDiagnosticTest()
          }
        }
      ]
    });

    await alert.present();
  }

  enableButtonAddFile(){
    return this.isLoading
  }

}
