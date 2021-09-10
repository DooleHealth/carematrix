import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chooser } from '@ionic-native/chooser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.page.html',
  styleUrls: ['./report-problem.page.scss'],
  providers: [Chooser],
})
export class ReportProblemPage implements OnInit {
  @ViewChild('uploadFile') uploadFile: FileUploadComponent;
  form: FormGroup;
  numFile = 0;
  private images : any = [];
  isSubmittedCategory = false;
  isSubmittedDescription = false;
  isLoading = false
  constructor(
    private translate: TranslateService,
    public router: Router,
    private dooleService: DooleService,
    private fb: FormBuilder,
    public platform: Platform,
    private alertController: AlertController,
    private modalCtrl: ModalController,
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

  async submit(){
    this.isSubmittedFields(true);
    if(this.form.invalid)
      return
    await this.sendProblemReport()

  }

    // Save new diagnostic test
  async sendProblemReport(){
      console.log('[ReportProblemPage] sendProblemReport()');
      this.isLoading = true
/*       let category = this.form.get('category').value; 
      this.form.get('category').setValue(category); */
  
      let description = this.form.get('description').value
      this.form.get('description').setValue(description);

      if(this.uploadFile.files.length > 0)
      this.uploadFile.files.forEach(element => {
        this.images.push(element.file)
      });
      this.dooleService.postAPIReportProblem( this.form.value).subscribe(
          async (data) => {
            console.log("data:", data);
            if(data)
            this.modalCtrl.dismiss({error:null, action: 'add'});
            else
            this.presentAlert(this.translate.instant("report_problem.alert_no_successful_response"));
          },
          (error) => {
            // Called when error
            this.isLoading = false
            console.log("error: ", error);
            throw new HttpErrorResponse(error);
          },
          () => {
            // Called when operation is complete (both success and error)
            this.isLoading = false
          });
    }


    enableButtonAddFile(){
      this.numFile = this.uploadFile.files.length
      if(this.numFile >= 6)
      this.uploadFile.enableButtonAddFile = true
      else this.uploadFile.enableButtonAddFile = false
    }

    goBacktoProfile(){
      if(this.form.valid 
        || this.form.get('images').value.length > 0){
        console.log("[ReportProblemPage] goBacktoProfile()", this.form.value);
        this.presentAlertConfirm();
      }else{
          //this.router.navigateByUrl('/profile')
          this.close()
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
              //this.router.navigateByUrl('/profile')
              this.close()
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
            //this.router.navigateByUrl('/profile');
            this.close()
          }
        }],
        backdropDismiss: false
      });
  
      await alert.present();
    }

    close() {
      this.modalCtrl.dismiss({error:null});
    }


}
