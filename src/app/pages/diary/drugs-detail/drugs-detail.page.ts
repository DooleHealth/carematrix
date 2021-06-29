import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-drugs-detail',
  templateUrl: './drugs-detail.page.html',
  styleUrls: ['./drugs-detail.page.scss'],
})
export class DrugsDetailPage implements OnInit {
  drug : any
  form: FormGroup;
  times = []
  isEditDrug = false
  isSubmited = false
  isSubmittedFromDate = false;
  isSubmittedToDate = false;
  isSubmittedDate = false;
  isSubmittedDosis = false;
  isSubmittedTimes = false;
  constructor(
    private dooleService: DooleService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private translate : TranslateService,
    public alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.drug = history.state.drug;
    let id = history.state.id;
    this.form = this.fb.group({
      from_date: ['', [Validators.required]],
      to_date: ['', [Validators.required]],
      //from_time: ['', [Validators.required]],
      alias: [''],
      dose: ['', [Validators.required]],
      drug: [],
      time: [''],
      addedByUser: ["1"],
      frequency: ["daily"],
    });
    if(this.drug)
    this.form.get('drug').setValue(this.drug.id)
    if(id){
      console.log('[DrugsDetailPage] ngOnInit()',this.drug);
      this.showDetailsDrug()
      this.isEditDrug = true
    }
  }

  showDetailsDrug(){
    this.form.get('from_date').setValue(this.drug.from_date)
    this.form.get('to_date').setValue(this.drug.to_date)
    this.form.get('dose').setValue(this.drug.dose)
    if(this.drug?.alias) this.form.get('alias').setValue(this.drug.alias)
  }

  isSubmittedFields(isSubmitted){
    this.isSubmittedFromDate = isSubmitted
    this.isSubmittedToDate = isSubmitted;
    this.isSubmittedDate= isSubmitted;
    this.isSubmittedDosis = isSubmitted;
    this.isSubmittedTimes = isSubmitted;   
  }

  submit(){
    console.log('[DrugsDetailPage] submit()',this.form.value);
    this.isSubmited = true
    this.isSubmittedFields(true)
    if(!this.form.valid || this.times.length <= 0){
      this.isSubmited = false
      return false;
    }
    if(this.isEditDrug){
      this.updateDrug()
    }else{
      this.saveDrug()
    }
  }

  saveDrug(){
    let times = this.form.get('time').value
    this.form.get('time').setValue(this.times)

    let from_date = this.form.get('from_date').value
    this.form.get('from_date').setValue(this.transformDate(from_date))

    let to_date = this.form.get('to_date').value
    this.form.get('to_date').setValue(this.transformDate(to_date))
    
    //console.log('[DrugsDetailPage] saveDrug()', this.form.value);
    this.dooleService.postAPIdrugIntake(this.form.value).subscribe(async json=>{
      console.log('[DrugsDetailPage] saveDrug()', await json);
      if(json.message){
        let message = this.translate.instant('medication.message_add_medication')
        this.showAlert(message)
      }
    },err => {
      console.log('[DrugsDetailPage] saveDrug() ERROR(' + err.code + '): ' + err.message); 
      throw err; 
    });

  }

  updateDrug(){
    this.form.get('time').setValue(this.times)

    let from_date = this.form.get('from_date').value
    this.form.get('from_date').setValue(this.transformDate(from_date))

    let to_date = this.form.get('to_date').value
    this.form.get('to_date').setValue(this.transformDate(to_date))
    
    //console.log('[DrugsDetailPage] updateDrug()', this.form.value);
    this.dooleService.putAPIdrugIntake(this.drug.id ,this.form.value).subscribe(async json=>{
      console.log('[DrugsDetailPage] updateDrug()', await json);
      if(json.message){
        let message = this.translate.instant('medication.message_edit_medication')
        this.showAlert(message)
      }
    },err => {
      console.log('[DrugsDetailPage] updateDrug() ERROR(' + err.code + '): ' + err.message); 
      throw err; 
    });

  }

  transformHour(date) {
    if( date instanceof Date)
    return this.datepipe.transform(date, 'HH:mm');
  }
  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  inputDate(){
    if(this.isSubmited) 
    return
    let time = this.form.get('time').value
    this.form.get('time').setValue('')
    if(time !== '' ){
      let date = new Date(time)
      let hour = this.transformHour(date)
      if ( this.times.indexOf( hour) == -1 ) // if hour is not repeated
      this.times.push(hour)
    }
  }

  checkTreatmentDates(){
    console.log('[DrugsDetailPage] checkTreatmentDates()');
      let to_date = this.form.get('to_date').value
      let from_date = this.form.get('from_date').value
      if(new Date(from_date) > new Date(to_date) ){
        let messagge = this.translate.instant('medication.message_error_treatment_date')
        this.dooleService.presentAlert(messagge)
        this.form.get('to_date').setValue('')
      }
  }

  removeTime(time){
    console.log("[DrugsDetailPage] removeTime() ", time);
    this.times.forEach((element, index) => {
      if (element == time)
        this.times.splice(index, 1);
    });

  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/journal')
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant("alert.header_confirmation"),
      message: this.translate.instant("medication.confirmation_delete_medication"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[DrugsDetailPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[DrugsDetailPage] AlertConfirm Okay');
            this.deleteDrug()
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteDrug(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.deleteAPIdrugIntake(this.drug.id).subscribe(
      async (res: any) =>{
        console.log('[DrugsDetailPage] deleteDrug()', await res);

        let message = this.translate.instant('medication.message_deleted_medication')
        this.showAlert(message)
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[DrugsDetailPage] deleteDrug() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

}
