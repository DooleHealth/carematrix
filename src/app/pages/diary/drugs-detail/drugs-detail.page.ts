import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-drugs-detail',
  templateUrl: './drugs-detail.page.html',
  styleUrls: ['./drugs-detail.page.scss'],
})
export class DrugsDetailPage implements OnInit {
  days = [{day1:1}, {day2:1}, {day3:1}, {day4:1}, {day5:1}, {day6:1}, {day7:1}]
  @Input()drug : any
  @Input()id: any;
  form: FormGroup;
  times = []
  isLoading = false
  isEditDrug = false
  isSubmited = false
  isSubmittedFromDate = false;
  isSubmittedToDate = false;
  isSubmittedDate = false;
  isSubmittedDosis = false;
  isSubmittedTimes = false;
  frequency = '1week';
  frequencySeleted = 'daily';
  isInit = true;
  constructor(
    private dooleService: DooleService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private translate : TranslateService,
    public alertController: AlertController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      from_date: ['', [Validators.required]],
      to_date: ['', [Validators.required]],
      //from_time: ['', [Validators.required]],
      alias: [''],
      dose: ['', [Validators.required]],
      drug: [],
      time: [''],
      addedByUser: ["1"],
      frequency: ['daily'],
      day1: [1],
      day2: [1],
      day3: [1],
      day4: [1],
      day5: [1],
      day6: [1],
      day7: [1],
    });
    if(this.drug)
    this.form.get('drug').setValue(this.drug.id)
    if(this.id){
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
    //let times = this.form.get('time').value
    this.form.get('time').setValue(this.times)

    let from_date = this.form.get('from_date').value
    this.form.get('from_date').setValue(this.transformDate(from_date))

    let to_date = this.form.get('to_date').value
    this.form.get('to_date').setValue(this.transformDate(to_date))

    let f = this.form.get('frequency').value
    if(f== 'custom')
    this.form.get('frequency').setValue('1week');
    
    //console.log('[DrugsDetailPage] saveDrug()', this.form.value);
    this.dooleService.postAPIdrugIntake(this.form.value).subscribe(async json=>{
      console.log('[DrugsDetailPage] saveDrug()', await json);
      if(json.message){
        this.modalCtrl.dismiss({error:null, action: 'add'});
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

    let f = this.form.get('frequency').value
    if(f== 'custom')
    this.form.get('frequency').setValue('1week');

    //console.log('[DrugsDetailPage] updateDrug()', this.form.value);
    this.dooleService.putAPIdrugIntake(this.drug.id ,this.form.value).subscribe(async json=>{
      console.log('[DrugsDetailPage] updateDrug()', await json);
      if(json.message){
        this.modalCtrl.dismiss({error:null, action: 'update'});
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

/*   showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/journal')
  } */

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
    this.isLoading = true
    this.dooleService.deleteAPImedicationPlan(this.drug.medication_plan_id).subscribe(
      async (res: any) =>{
        console.log('[DrugsDetailPage] deleteDrug()', await res);
        if(res.success){
          this.modalCtrl.dismiss({error:null, action: 'update'});
        }
        else{
          let message = this.translate.instant('medication.error_message_deleted_medication')
          alert(message)
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
        alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[DrugsDetailPage] deleteDrug() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
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

          if(medicationPlan.frequency) {
            this.form.get('frequency').setValue(medicationPlan?.frequency)
            this.frequencySeleted = medicationPlan.frequency
          }

          let plan = medicationPlan.medication_plan_times
          plan.forEach(element => {            
            let hour = element.time.split(':')
            this.times.push(`${hour[0]}:${hour[1]}`)
          });

          if(medicationPlan.day1) this.form.get('day1').setValue( medicationPlan.day1 )
          if(medicationPlan.day2) this.form.get('day2').setValue( medicationPlan.day2 )
          if(medicationPlan.day3) this.form.get('day3').setValue( medicationPlan.day3 )
          if(medicationPlan.day4) this.form.get('day4').setValue( medicationPlan.day4 )
          if(medicationPlan.day5) this.form.get('day5').setValue( medicationPlan.day5 )
          if(medicationPlan.day6) this.form.get('day6').setValue( medicationPlan.day6 )
          if(medicationPlan.day7) this.form.get('day7').setValue( medicationPlan.day7 )
        }
       },(err) => { 
          console.log('[DiaryPage] getMedicationPlan() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      });
  }

  selectedFrequency(event){
    if(this.frequencySeleted === '1week' && this.frequency === '1week' && this.isInit && this.isEditDrug){
      this.frequency =  'custom'
      this.isInit = false
    }
  }

  isChangedSelect(event){
    let fq = this.form.get('frequency').value
    console.log('[AddHealthCardPage] isChangedSelect()', fq, event);
    switch (fq) {
      case 'daily':
        let dialy = [0,1,2,3,4,5,6]
        this.settingDay(dialy)
        this.frequencySeleted = fq
        break;
      case '1week':
        if(this.isSubmited || (this.isInit&&this.isEditDrug)) return
        this.showDays()
        break;
      default:
        this.showDays()
        break;
    }

  }

  settingDay(index){
    this.days.forEach((day, i) =>{
      day['day'+(i +1)] = 0
      this.form.get('day'+(i+1)).setValue(0)
    })
    if(index.length > 0)
    index.forEach(i => {
      let day = this.days[i]
      day['day'+(i +1)] = 1
      this.form.get('day'+(i+1)).setValue(1)
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
            console.log('Cancel clicked', this.form.get('frequency').value);
            if(this.frequencySeleted == 'daily')
            this.form.get('frequency').setValue(this.frequencySeleted)
            this.frequency = (this.form.get('frequency').value == '1week')? 'custom': '1week'
          }
        },
        {
          text: 'ok',
          handler: data => {
            console.log('Ok clicked', data);
            this.settingDay(data)
            this.frequency = (this.form.get('frequency').value == '1week')? 'custom': '1week'
            this.frequencySeleted = this.frequency
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

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
