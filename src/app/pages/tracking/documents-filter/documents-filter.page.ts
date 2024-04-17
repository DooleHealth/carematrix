import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { TranslateService } from '@ngx-translate/core';

export interface Filter {
  start_date?: string,
  end_date?: string,
  diagnosticTestTypes?: [],
}

@Component({
  selector: 'app-documents-filter',
  templateUrl: './documents-filter.page.html',
  styleUrls: ['./documents-filter.page.scss'],
  providers:[DatePipe, TranslateService]
})

export class DocumentsFilterPage implements OnInit {
  @Input()filter: Filter;
  toggle = false
  toggle2 = false
  listTestType =[]
  diagnosticTestTypes = []
  currentDate = new Date().toISOString()
  form: FormGroup;
  isLoading = false
  date: any;
  locale:string;
  start_date:string;
  end_date:string;

  isSubmited = false
  crossStartDate:boolean = false;
  crossEndDate:boolean = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private dooleService: DooleService,
    public datepipe: DatePipe,
    public router: Router,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public dateService: DateService
  ) { 
    this.date = this.dateService.getToday()
    this.locale = this.dateService.getLocale();
  }

  ngOnInit() {
    /* this.form = this.fb.group({
      start_date: [this.date, [Validators.required, this.checkDate.bind(this)]],
      end_date: [ this.date, [Validators.required, this.checkDate.bind(this)]],
      diagnosticTestTypes: [this.diagnosticTestTypes],
    }); */

    this.form = this.fb.group({
      start_date: [this.date, Validators.required],
      end_date: [this.date, Validators.required],
      diagnosticTestTypes: [this.diagnosticTestTypes],
    }, { validators: this.checkDate.bind(this) });

    this.getDiagnosticTestType()
    this.setFilter()
  }

  setFilter(){
    if(this.filter ){
      if(this.filter?.start_date){
        this.form.get('start_date').setValue(this.filter?.start_date)
        this.toggle = true
      }
      if(this.filter?.end_date){
        this.form.get('end_date').setValue(this.filter?.end_date)
        this.toggle = true
      }
       if(this.filter?.diagnosticTestTypes && this.filter?.diagnosticTestTypes.length > 0){
        console.log('[DocumentsFilterPage] setFilter()', this.filter?.diagnosticTestTypes);
        this.toggle2 = true
        this.filter?.diagnosticTestTypes.forEach(test =>{
          this.diagnosticTestTypes.push(test)
        })
       }
    }
  }

  setCheckedDiagnosticTest(){
    this.listTestType.forEach(test => {
      if(this.filter?.diagnosticTestTypes){
        let index = this.filter?.diagnosticTestTypes.findIndex(element => (element === test.id))
        if(index >= 0)  test['checked'] = true
        else  test['checked'] = false
      }else{
        test['checked'] = false
      }
    })
  }

  async getDiagnosticTestType(){
    console.log("submit");
    this.isLoading = true

    this.dooleService.getAPIdiagnosticTestTypesAvailable().subscribe(
      async (res: any) =>{
        console.log('[DocumentsFilterPage] getDiagnosticTestType()', await res);
        this.listTestType = res.diagnosticTestTypes
        this.setCheckedDiagnosticTest()
        this.isLoading = false
       },(err) => {
        this.isLoading = false
          console.log('[DocumentsFilterPage] getDiagnosticTestType() ERROR(' + err.code + '): ' + err.message);
          throw err;
      },
      () => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      });
  }

  linesNone(index){
    if(index === (this.listTestType.length -1)){
      return 'none'
    }
    return ''
  }

  actionCheckboxTestType(e, type){
    var isChecked = e.currentTarget.checked;
    if(isChecked)
    this.diagnosticTestTypes.push(type)
    else{
      var index =  this.diagnosticTestTypes.indexOf(type)
      if (index > -1)
      this.diagnosticTestTypes.splice(index, 1)
    }
    console.log('[DocumentsFilterPage] actionCheckboxTestType()', isChecked, this.diagnosticTestTypes);
  }


  submit(){
      let filter = this.isEmptyForm()? undefined:  this.form.value

      if(filter){
        this.isSubmittedFields(true);

        if(this.toggle === false){
          filter.start_date = null
          filter.end_date = null
        }

        if(this.toggle2 === false)
        filter.diagnosticTestTypes = []

        if(this.form.invalid){
          console.log(this.form.get('start_date').invalid)
          console.log(this.form.get('end_date').invalid)
          this.isSubmited = false
          return false;
        }

        this.modalCtrl.dismiss({error:null, action: 'add', filter: filter});

      } 

  }

  isEmptyForm(){
    let start_date = (this.form.get('start_date').value === null ||  this.form.get('start_date').value === '')? true:false
    let end_date = (this.form.get('end_date').value === null ||  this.form.get('end_date').value === '')? true:false
    if(start_date && end_date && this.diagnosticTestTypes.length == 0)
      return true
    else return false
  }

  close(){
    this.modalCtrl.dismiss({error:null});
  }

  changeFormatToDate(){
    let start_date =  this.form.get('start_date').value
    if(start_date !== null && start_date !== ''){
      var dateStart = new Date(start_date);
      let startDateTemp = this.datepipe.transform(dateStart, 'y-MM-dd');
      this.form.get('start_date').setValue(startDateTemp)
    }
  }

  changeFormatFromDate(){
    let end_date =  this.form.get('end_date').value
    if(end_date !== null && end_date !== ''){
      var dateEnd = new Date(end_date);
      let endDateTemp = this.datepipe.transform(dateEnd, 'y-MM-dd');
      this.form.get('end_date').setValue(endDateTemp)
    }
  }

  changeToggleDate(event){
    console.log('[DocumentsFilterPage] changeToggleDate()', event);
    if(!event.detail.checked){
      this.form.get('start_date').setValue(this.date)
      this.form.get('end_date').setValue(this.date)
      this.start_date = this.end_date = '';
    }else{
      this.start_date =  this.form.get('start_date').value
      this.end_date =   this.form.get('end_date').value
    }
  }

  changeToggleTestType(event){
    //console.log('[DocumentsFilterPage] changeToggleTestType()', event);
    if(event.detail.checked === false){
      this.listTestType.forEach(test => {
        test.checked = false
      });
      this.diagnosticTestTypes = []
      this.form.get('diagnosticTestTypes').setValue(this.diagnosticTestTypes)
      console.log('[DocumentsFilterPage] changeToggleTestType', this.diagnosticTestTypes);
    }
  }

  getStartDate(event){
    //console.log('[DocumentsFilterPage] getStartDate()', event);
    this.start_date = event.detail.value
  }

  getEndDate(event){
    //console.log('[DocumentsFilterPage] getEndDate()', event);
    this.end_date = event.detail.value
  }


  checkDates(group: FormGroup): ValidationErrors | null {
    const start_date = this.form.get('start_date').value;
    const end_date = this.form.get('end_date').value;
  
    if (start_date && end_date && start_date > end_date) {
      // Set end_date control as invalid
      this.form.get('end_date').setErrors({ dateInvalid: true });
      return { dateInvalid: true }; // Return error at form group level if needed
    } else {
      // Clear previous errors related to dateInvalid
      if (this.form.get('end_date').hasError('dateInvalid')) {
        this.form.get('end_date').updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }
    }
  
    return null; // No error
  }
  
  private checkDate(group: FormControl) {
    if(this.form !== null && this.form !== undefined) {
      const start_date = this.form.get('start_date').value;
      const end_date = this.form.get('end_date').value;

      if(start_date && end_date){
        let start = new Date(start_date).getTime();
        let end = new Date(end_date).getTime();
        console.log(`[ReminderAddPage] checkDate Start(${start}, End ${end})`);

        console.log(start <= end);

        if (start <= end) {
          this.form.get('end_date').setErrors(null);
          return null;
        } else {
          this.form.get('end_date').setErrors({ NotLess: true });
          return {NotLess: true};
        }
      }
    }
 }


 checkTreatmentDates(){
  console.log('[DrugsDetailPage] checkTreatmentDates()');
    let to_date = this.form.get('end_date').value
    let from_date = this.form.get('start_date').value

    if(new Date(from_date) > new Date(to_date) ){
      console.log("Data start mes gran que end")
      this.date = to_date
      this.form.get('end_date').setValue(from_date)
      console.log(this.form.value)
      this.crossEndDate = false;
    }
    else {
      this.crossEndDate = false;
    }
}


checkTreatmentDates2() {

  let to_date = this.form.get('end_date').value
    let from_date = this.form.get('start_date').value

  if (new Date(to_date) < new Date(from_date)){
    this.crossEndDate = true;
    let messagge = this.translate.instant('reminder.error_end_date')
    this.dooleService.presentAlert(messagge)
  }
  else {
    this.crossEndDate = false;
  }
}

isSubmittedFields(isSubmitted){
  this.isSubmittedDuration= isSubmitted;
  this.isSubmittedStartDate= isSubmitted;
}

getErrorEndDate() {
  if (this.form.get('end_date').hasError('required')) {
    return this.translate.instant("error_required");
  }
  if (this.form.get('end_date').hasError('NotLess')) {
    return this.translate.instant("reminder.error_end_date");
  }
  return '';
}

getErrorStartDate() {
  if (this.form.get('start_date').hasError('required')) {
    return this.translate.instant("error_required");
  }
  if (this.form.get('start_date').hasError('NotLess')) {
    return this.translate.instant("reminder.error_start_date");
  }
  return '';
}


}
