import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

export interface Filter {
  start_date?: string,
  end_date?: number,
  testTypes?: [],
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
  testTypes = []
  filter: Filter
  currentDate = new Date().toISOString()
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dooleService: DooleService,
    public datepipe: DatePipe,
    private loadingController: LoadingController,
    public router: Router,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      start_date: [],
      end_date: [],
      testTypes: [this.testTypes],
    });
    this.getTestType()
  }

  async getTestType(){
    console.log("submit");
    const loading = await this.loadingController.create();
    await loading.present();

    this.dooleService.getAPIdiagnosticTestTypesAvailable().subscribe(
      async (res: any) =>{
        console.log('[DocumentsFilterPage] getTestType()', await res);
        this.listTestType = res.diagnosticTestTypes
        this.listTestTypeBackup = this.listTestType
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[DocumentsFilterPage] getTestType() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      },
      () => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
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
    this.testTypes.push(type)
    else{
      var index =  this.testTypes.indexOf(type)
      if (index > -1)
      this.testTypes.splice(index, 1)
    }
    console.log('[DocumentsFilterPage] actionCheckboxTestType()', isChecked, this.testTypes);
  }


  submit(){
      this.form.get('testTypes').setValue(this.testTypes)

      let start_date =  this.form.get('start_date').value
      if(start_date !== null){
        var dateStart = new Date(start_date.split('T')[0]);
        let startDateTemp = this.datepipe.transform(dateStart, 'dd/MM/y');
        this.form.get('start_date').setValue(start_date)
      }


      let end_date =  this.form.get('end_date').value
      if(end_date !== null){
        var dateEnd = new Date(end_date.split('T')[0]);
        let endDateTemp = this.datepipe.transform(dateEnd, 'dd/MM/y');
        this.form.get('end_date').setValue(endDateTemp)
      }

      //console.log('[DocumentsFilterPage] submit()', this.form.value);

      //this. router.navigate(['app/tracking', {filter: this.form.value}])
      this.navCtrl.navigateBack('app/tracking')
  }

}
