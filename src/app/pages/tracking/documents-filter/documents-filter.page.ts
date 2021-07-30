import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

export interface Filter {
  start_date?: string,
  end_date?: string,
  diagnosticTestTypes?: [],
  profesional?: [],
  sources?: [],
}

@Component({
  selector: 'app-documents-filter',
  templateUrl: './documents-filter.page.html',
  styleUrls: ['./documents-filter.page.scss'],
})
export class DocumentsFilterPage implements OnInit {
// toggle = Boolean(true)
  listTestType =[]
  listTestTypeBackup = []
  diagnosticTestTypes = []
  filter: Filter
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
  }

  async getDiagnosticTestType(){
    console.log("submit");
    this.isLoading = true

    this.dooleService.getAPIdiagnosticTestTypesAvailable().subscribe(
      async (res: any) =>{
        console.log('[DocumentsFilterPage] getDiagnosticTestType()', await res);
        this.listTestType = res.diagnosticTestTypes
        this.listTestTypeBackup = this.listTestType
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

  async filterList(evt) {
    console.log('[DocumentsFilterPage] filterList()');
    this.listTestType = this.listTestTypeBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.listTestType = this.listTestType.filter(test => {
      if (test.name && searchTerm) {
        return (test.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
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
     // this.form.get('diagnosticTestTypes').setValue(this.diagnosticTestTypes)
      console.log('[DocumentsFilterPage] submit()', this.form.value);
      this.modalCtrl.dismiss({error:null, action: 'add', filter: this.form.value});
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

  changeFormatToDate(){
    let start_date =  this.form.get('start_date').value
    if(start_date !== null){
      var dateStart = new Date(start_date);
      let startDateTemp = this.datepipe.transform(dateStart, 'y-MM-dd');
      this.form.get('start_date').setValue(startDateTemp)
    }
  }

  changeFormatFromDate(){
    let end_date =  this.form.get('end_date').value
    if(end_date !== null){
      var dateEnd = new Date(end_date);
      let endDateTemp = this.datepipe.transform(dateEnd, 'y-MM-dd');
      this.form.get('end_date').setValue(endDateTemp)
    }
  }

}
