import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DooleService } from 'src/app/services/doole.service';
export interface ListDiagnosticTests {
  date?: string;
  diagnosticTests?: any[];
}
export interface Filter {
  start_date?: string,
  end_date?: number,
  testTypes?: [],
  profesional?: [],
  sources?: [],
}
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  listDiagnostic:  ListDiagnosticTests[] = []
  diagnosticTests = []
  forms = []
  graphics = []
  segment = 'documents'
  filter: Filter;
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    console.log('[TrackingPage] ngOnInit()');
    this.getDiagnosticTests()
    this.getForms()
    this.applyFilter()
  }

  ionViewDidEnter(){
    console.log('[TrackingPage] ionViewDidEnter()');
    this.getDiagnosticTests();
    this.applyFilter()
  }

  applyFilter(){
    this.filter = history.state.filter;
    console.log('[TrackingPage] applyFilter()' ,  this.filter);
    if(this.filter){
      this.getFilteredDiagnosticTests()
    }
  }

  getFilteredDiagnosticTests(){
    console.log('[TrackingPage] getFilteredDiagnosticTests()' ,  this.filter);
  }


  async getDiagnosticTests(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIdiagnosticTests().subscribe(
      async (res: any) =>{
        this.diagnosticTests = []
        this.listDiagnostic = []
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.diagnosticTests = res.diagnosticTests
        //this.filterDiagnosticsByDate()
        this.orderDiagnosticsByDate(res)
        loading.dismiss();
       },(err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
          loading.dismiss();
      });
  }

  getForms(){
    this.dooleService.getAPIformsTracking().subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getForms()', await res);
        this.forms = res
       },(err) => { 
          console.log('[TrackingPage] getForms() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  getGraphics(){
    this.dooleService.getAPIformsTracking().subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getGraphics()', await res); 
        this.graphics = res
       },(err) => { 
          console.log('[TrackingPage] getGraphics() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  filterDiagnosticsByDate(){
    this.diagnosticTests.forEach( (diagnostic, index) =>{
      let date = diagnostic.date_european
      if(index == 0 || date !== this.diagnosticTests[index-1].date_european){
        let list = this.diagnosticTests.filter( event => 
          (event.date_european == date)
        )
        this.listDiagnostic.push({date: diagnostic.data, diagnosticTests: list}) 
      } 
    })
    console.log('[TrackingPage] filterDiagnosticsByDate()', this.listDiagnostic);
  }

  orderDiagnosticsByDate(list){
    let diagnosticTests = list.diagnosticTests
    diagnosticTests.forEach( (diagnostic, index) =>{
      let date = diagnostic.date_european
      if(index == 0 || date !== diagnosticTests[index-1].date_european){
        let list = diagnosticTests.filter( event => 
          (event.date_european == date)
        )
        this.listDiagnostic.push({date: diagnostic.data, diagnosticTests: list}) 
      } 
    })
    console.log('[TrackingPage] filterDiagnosticsByDate()', this.listDiagnostic);
  }

}