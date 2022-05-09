import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

export interface Filter {
  start_date?: string,
  end_date?: string,
  diagnosticTestTypes?: [],
}

@Component({
  selector: 'app-documents-filter',
  templateUrl: './documents-filter.page.html',
  styleUrls: ['./documents-filter.page.scss'],
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
  constructor(
    private fb: FormBuilder,
    private dooleService: DooleService,
    public datepipe: DatePipe,
    public router: Router,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      start_date: [],
      end_date: [],
      diagnosticTestTypes: [this.diagnosticTestTypes],
    });
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
        this.changeFormatFromDate()
        this.changeFormatToDate()
      }
      this.modalCtrl.dismiss({error:null, action: 'add', filter: filter});
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
      this.form.get('start_date').setValue('')
      this.form.get('end_date').setValue('')
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

}
