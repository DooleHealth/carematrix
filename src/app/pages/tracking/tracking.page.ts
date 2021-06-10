import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
export interface ListDiagnosticTests {
  date?: string;
  diagnosticTests?: any[];
}
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {
  listDiagnostic: ListDiagnosticTests[] = []
  diagnosticTests = []
  forms = []
  graphics = []
  segment = 'documents'
  constructor(
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.getDiagnosticTests()
    //this.getForms()
  }

  getDiagnosticTests(){
    this.dooleService.getAPIdiagnosticTests().subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.diagnosticTests = res.diagnosticTests
        this.filterDiagnosticsByDate()
       },(err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
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

}