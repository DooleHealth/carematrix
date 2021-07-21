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
  days = [{day1:false}, {day2:false}, {day3:false}, {day4:false}, {day5:false}, {day6:false}, {day7:false}]
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
  frequency;
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
      //days: [this.days],
    });
    if(this.drug)
    this.form.get('drug').setValue(this.drug.id)
    if(id){
      console.log('[DrugsDetailPage] ngOnInit()',this.drug);
      this.showDetailsDrug()
      this.getMedicationPlan()
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

    this.form.get('frequency').setValue('daily')
    
    //console.log('[DrugsDetailPage] saveDrug()', this.form.value);
    this.dooleService.postAPIdrugIntake(this.form.value).subscribe(async json=>{
      console.log('[DrugsDetailPage] saveDrug()', await json);
      if(json.message){
        let message = this.translate.instant('medication.message_add_medication')
        this.showAlert(message)
      }else{
        let message = this.translate.instant('medication.error_message_add_medication')
        alert(message)
      }
    },err => {
      alert(`Error: ${err.code }, Message: ${err.message}`)
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

    this.form.get('frequency').setValue('daily')

  
    //console.log('[DrugsDetailPage] updateDrug()', this.form.value);
    this.dooleService.putAPIdrugIntake(this.drug.id ,this.form.value).subscribe(async json=>{
      console.log('[DrugsDetailPage] updateDrug()', await json);
      if(json.message){
        let message = this.translate.instant('medication.message_edit_medication')
        this.showAlert(message)
      }else{
        let message = this.translate.instant('medication.error_message_edit_medication')
        alert(message)
      }
    },err => {
      alert(`Error: ${err.code }, Message: ${err.message}`)
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
    this.dooleService.deleteAPImedicationPlan(this.drug.medication_plan_id).subscribe(
      async (res: any) =>{
        console.log('[DrugsDetailPage] deleteDrug()', await res);
        if(res.success){
          let message = this.translate.instant('medication.message_deleted_medication')
          this.showAlert(message)
        }
        else{
          let message = this.translate.instant('medication.error_message_deleted_medication')
          alert(message)
        }
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
        alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[DrugsDetailPage] deleteDrug() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  async getMedicationPlan(){
    console.log('[DiaryPage] getMedicationPlan()');
    this.dooleService.getAPImedicationPlan(this.drug.medication_plan_id).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getMedicationPlan()', await res);
        if(res.success){
          let medicationPlan = res.medicationPlan
          let from_date = medicationPlan.from_date
          this.form.get('from_date').setValue(this.transformDate(from_date))     
          let to_date = medicationPlan.to_date
          this.form.get('to_date').setValue(this.transformDate(to_date))

          let plan = medicationPlan.medication_plan_times
          plan.forEach(element => {            
            let hour = element.time.split(':')
            this.times.push(`${hour[0]}:${hour[1]}`)
          });
        }
       },(err) => { 
          console.log('[DiaryPage] getMedicationPlan() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      });
  }

  selectedFrequency(event){
    let fq = Number(this.form.get('frequency').value)
    console.log('[AddHealthCardPage] selectedFrequency()', fq);
    switch (fq) {
      case 0:
        let index = new Date().getDay()
        this.settingDay([index -1])
        this.frequency = 'day'
        //this.form.get('frequency').setValue('day');
        break;
      case 1:
        let dialy = [0,1,2,3,4,5,6]
        this.settingDay(dialy)
        this.frequency = 'daily'
        //this.form.get('frequency').setValue('daily');
        break;
      case 2:
        let five = [0,1,2,3,4]
        this.settingDay(five)
        this.frequency = 'mom_fri'
        //this.form.get('frequency').setValue('mom_fri');
        break;
      case 3:
        this.showDays()
        //this.form.get('frequency').setValue('custom');
        break;

      default:
        break;
    }
  }

  settingDay(index){
    this.days.forEach((day, i) =>{
      day['day'+(i +1)] = false
     // console.log('[AddHealthCardPage] selectedFrequency() day', index);
    })
    if(index.length > 0)
    index.forEach(i => {
      let day = this.days[i]
      day['day'+(i +1)] = true
    });
    console.log('[AddHealthCardPage] settingDay() day', this.days);
  
  }

  async showDays() {
    let alert = this.alertController.create({
      header: this.translate.instant("reminder.wwek_day"),
      inputs: this.addDaysToAlert(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok',
          handler: data => {
            console.log('Ok clicked', data);
            this.settingDay(data)
            this.frequency = 'custom'
          }
        }
      ]
    });
    (await alert).present();
  }


  addDaysToAlert(){
    let days_week = []
    this.days.forEach((day, i)=>{
      days_week.push(
        {
          type: 'checkbox',
          label: this.translate.instant('reminder.day.day'+(i+1)),
          value: i,
          checked: day['day'+(i +1)]

        }
      )
    })
    return days_week
  }

}
