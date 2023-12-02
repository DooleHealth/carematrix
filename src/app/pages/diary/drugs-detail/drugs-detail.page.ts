import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, IonPopover, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';

enum StatusMedicationCreated {
  CENTER = 0,
  USER = 1
}
@Component({
  selector: 'app-drugs-detail',
  templateUrl: './drugs-detail.page.html',
  styleUrls: ['./drugs-detail.page.scss'],
})

export class DrugsDetailPage implements OnInit {
  days = [{day1:1, disabled:false}, {day2:1, disabled:false}, {day3:1, disabled:false}, {day4:1, disabled:false}, {day5:1, disabled:false}, {day6:1, disabled:false}, {day7:1,disabled:false}]
  @ViewChild('datetimePopover') popover: IonPopover;
  @Input()drug : any
  @Input()id: any;
  drugID = history.state?.id; // 26;//   //23 //
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
  frequency = 'daily';
  frequencySeleted = 'daily';
  isInit = true;
  expanded = true;
  isInstant = false;
  maxYear : string;
  date:any;
  time:any;
  locale:string;
  modifyMedicationPlans:boolean = true;
  constructor(
    private dooleService: DooleService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private translate : TranslateService,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    public dateService: DateService
  ) {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    this.date = localISOTime// this.dateService.selectedDateFormat(localISOTime);
    this.locale = this.dateService.getLocale();
    this.time = localISOTime;
  }

  ngOnInit() {
    this.id = this.drugID? this.drugID:this.id
    console.log('[DrugsDetailPage] ngOnInit() id: ',this.id);
    this.form = this.fb.group({
      from_date: [this.date, [Validators.required]],
      to_date: [this.date, [Validators.required]],
      alias: [''],
      dose: ['', [Validators.required]],
      drug: [],
      time: [this.time],
      addedByUser: ["1"],
      frequency: ['instant'],
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
    if(!this.isEditDrug) this.isInit = false
  }

  showDetailsDrug(){
    this.form.get('from_date').setValue(this.drug?.from_date)
    this.form.get('to_date').setValue(this.drug?.to_date)
    this.form.get('dose').setValue(this.drug?.dose)
    if(this.drug?.alias) this.form.get('alias').setValue(this.drug?.alias)

  }

  isSubmittedFields(isSubmitted){
    this.isSubmittedFromDate = isSubmitted
    this.isSubmittedToDate = isSubmitted;
    this.isSubmittedDate= isSubmitted;
    this.isSubmittedDosis = isSubmitted;
    this.isSubmittedTimes = isSubmitted;
  }

  expandItem(): void {
      this.expanded = !this.expanded
  }

  submit(){
    //console.log('[DrugsDetailPage] submit()',this.form.value);

    if(this.isInstant){
      this.isSubmittedDosis = true;
      let error = this.form.get('dose').errors
      console.log('[DrugsDetailPage] saveDrug()', error);
      if(error?.required)
      return
    }
    else{

      this.isSubmited = true
      this.isSubmittedFields(true)
      if(!this.form.valid || this.times.length <= 0){
        this.isSubmited = false
        return false;
      }
    }


    if(this.isEditDrug){
      this.updateDrug()
    }else{
      this.saveDrug()
    }
  }

  setFields(){
    if(this.isInstant){ // Instant medication
      const date = new Date()
      return {
        from_date: this.transformDate(date),
        to_date: this.transformDate(date),
        alias: '',
        dose: this.form.get('dose').value,
        drug: this.drug.id,
        time: [this.transformHour(date)],
        addedByUser: '1',
        frequency: 'instant',
        day1: 1,
        day2: 1,
        day3: 1,
        day4: 1,
        day5: 1,
        day6: 1,
        day7: 1,
      }
    }
    else{ //Medication Plan
      this.form.get('time').setValue(this.times)

      let from_date = this.form.get('from_date').value
      this.form.get('from_date').setValue(this.transformDate(from_date))

      let to_date = this.form.get('to_date').value
      this.form.get('to_date').setValue(this.transformDate(to_date))

      let f = this.form.get('frequency').value
      if(f !== 'daily')
      this.form.get('frequency').setValue('daily');

      return this.form.value
    }

  }

  saveDrug(){

    const form = this.setFields()

    console.log('[DrugsDetailPage] saveDrug()', form);

    this.dooleService.postAPImedicationPlan(form).subscribe(async json=>{
      console.log('[DrugsDetailPage] saveDrug()', await json);
      if(json.success){
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

  snapshot(){
    this.isInstant = !this.isInstant
  }

  updateDrug(){
    this.isLoading = true;
    const form = this.setFields()
    console.log('[DrugsDetailPage] updateDrug()', form);

    this.dooleService.putAPImedicationPlan(this.drug.medication_plan_id , form).subscribe(async json=>{
      console.log('[DrugsDetailPage] updateDrug()', await json);
      if(json.success){
        this.modalCtrl.dismiss({error:null, action: 'update'});
      }else{
        let message = this.translate.instant('medication.error_message_edit_medication')
        alert(message)
      }
      this.isLoading = false
    },err => {
      this.isLoading = false
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

  formatDate(d){
    if(d === undefined || d === null)
    return
    var auxdate = d.split(' ')
    //let date = new Date(auxdate[0]);
    d = d.replace(' ', 'T')
    let date0 = new Date(d).toUTCString();
    let date = new Date(date0);
    let time = auxdate[1];
    date.setHours(time.substring(0,2));
    date.setMinutes(time.substring(3,5));
    return date.toISOString();
  }

  inputTimes(event){
    console.log('[DrugsDetailPage] this.time()', event);
    console.log('[DrugsDetailPage] this.time()', this.time);
    if(this.isSubmited)
    return
    let time = this.form.get('time').value
    console.log('[DrugsDetailPage] time()', time);
    //this.form.get('time').setValue('')
    if(time && time !== '' ){
      let date = new Date(time)
      let hour = this.transformHour(date)
      console.log('[DrugsDetailPage] hour', hour);
      if ( this.times.indexOf( hour) == -1 ) // if hour is not repeated
      this.times.push(hour)
    }
  }

  closeTimeAlert(event){
    console.log('[DrugsDetailPage] this.time()', event);
    this.popover.dismiss()
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
    const medication_plan_id = this.drug?.medication_plan_id? this.drug.medication_plan_id: this.id
    console.log('[DrugsDetailPage] getMedicationPlan()', medication_plan_id);
    this.dooleService.getAPImedicationPlan(medication_plan_id).subscribe(
      async (res: any) =>{
        console.log('[DrugsDetailPage] getMedicationPlan()', await res);
        if(res.success){
          let medicationPlan = res.medicationPlan

          this.modifyMedicationPlans =  this.getStateModifyMedication(medicationPlan?.origin)

          let from_date = medicationPlan.from_date
          this.form.get('from_date').setValue(this.formatDate(from_date))

          let to_date = medicationPlan.to_date
          this.form.get('to_date').setValue(this.formatDate(to_date))
          
          if(medicationPlan?.alias) 
          this.form.get('alias').setValue(medicationPlan.alias)

          if(medicationPlan.frequency) {
            this.form.get('frequency').setValue(medicationPlan?.frequency)
            this.frequencySeleted = medicationPlan.frequency
          }


          this.setDaysMedicationPlan(medicationPlan)
          this.gettingDay()

          let plan = medicationPlan.medication_plan_times
          plan.forEach(element => {
            let hour = element.time.split(':')
            this.times.push(`${hour[0]}:${hour[1]}`)
          });
          this.isInit = false

        }
       },(err) => {
          console.log('[DrugsDetailPage] getMedicationPlan() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      });
  }

  setDaysMedicationPlan(medicationPlan:any){
    for (let index = 1; index < 8; index++) {
      this.form.get(`day${index}`).setValue( medicationPlan[`day${index}`] )   
      if(this.modifyMedicationPlans === false)  {
        if( medicationPlan[`day${index}`] === 0)
        this.form.get(`day${index}`)?.disable()
      }   
    }
  }

  selectedFrequency(){
    let fq = this.form.get('frequency').value
    //console.log('[DrugsDetailPage] isChangedSelect()', fq);
    switch (fq) {
      case 'daily':
        if(this.isSubmited)
        return
        let dialy = [0,1,2,3,4,5,6]
        this.settingDayForm(dialy)
        this.frequencySeleted = fq
        break;
      case '1week':
        if(this.isSubmited)
          return
          this.settingBackupDay()
          this.frequencySeleted = fq
        break;
      case 'custom':
        if(this.isSubmited)
          return
          this.settingBackupDay()
          this.frequencySeleted = fq
        break;
      default:
        this.settingBackupDay()
        this.frequencySeleted = fq
        break;
    }

  }

  getStateModifyMedication(state){
      if(state === StatusMedicationCreated.CENTER) return false
      if(state === StatusMedicationCreated.USER) return true
      return true;
  }

  settingBackupDay(){
    if(!this.isInit)
    this.days.forEach((day, i) =>{
      let value =  day['day'+(i +1)]? 1:0
      this.form.get('day'+(i+1)).setValue(value)
    })
    //console.log('[DrugsDetailPage] settingBackupDay() day', this.days);
  }

  settingDayForm(index){
    for(let i =1; i <=7; i++){
      this.form.get('day'+(i)).setValue(0)
    }
    if(index.length > 0)
    index.forEach(i => {
      this.form.get('day'+(i+1)).setValue(1)
    });
  }

  setDay(event, day, i){
    if(!this.isInit){
      let value = (event.detail.checked)? 1: 0
      if(this.form.get('frequency').value == 'custom')
      day['day'+(i +1)] = value
      //console.log('[DrugsDetailPage] setDay()',day);
      this.form.get('day'+(i+1)).setValue(value)
    }
  }

  gettingDay(){
    let ceros = 1
    this.days.forEach((day, i) =>{
      let d = this.form.get('day'+(i+1)).value? 1:0
      day['day'+(i +1)] = d
      if(d==0) ceros =0
      if(this.modifyMedicationPlans === false)  day.disabled = true
    })
    console.log('[DrugsDetailPage] gettingDay() day', this.days);
    if(ceros==0) this.form.get('frequency').setValue('custom')
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
