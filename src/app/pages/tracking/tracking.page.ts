import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { DomSanitizer } from "@angular/platform-browser";
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DocumentsAddPage } from './documents-add/documents-add.page';
import { DocumentsFilterPage } from './documents-filter/documents-filter.page';
import { ElementsAddPage } from './elements-add/elements-add.page';
import { mergeMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { ActivatedRoute } from '@angular/router';

export interface ListDiagnosticTests {
  date?: string;
  diagnosticTests?: any[];
  color?: string
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
  public showingForm;
  public hasToShowForm;
  public active;
  public id;
  public url;
  groupedElements: any = [];
  elementValues: any = [];
  isLoading = false
  segment = 'documents'
  active_color= '#3498DB'
  inactive_color= '#7F8C8D'
  filter: Filter;
  constructor(
    private dooleService: DooleService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private constants: Constants,
    private iab: InAppBrowser, 
    private auth: AuthenticationService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    console.log('[TrackingPage] ngOnInit()');
    this.segmentChanged()
    this.fireEvent(null, 0) 

  }

  ionViewDidEnter(){
    console.log('[TrackingPage] ionViewDidEnter()');
    this.segmentChanged();
    this.getFormList()
  }

  getDiagnosticTestsList(){
    //this.filter = history.state.filter;
    console.log('[TrackingPage] getDiagnosticTestsList()' ,  this.filter);
    if(this.filter){
      this.getFilteredDiagnosticTests()
    }else{
      this.getDiagnosticTests();
    }
  }

  formatSelectedDate(date , format){
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    let day = datePipe.transform(date, format);
    return day[0].toUpperCase() + day.slice(1);
  }

  async getFilteredDiagnosticTests(){
    console.log('[TrackingPage] getFilteredDiagnosticTests()' ,  this.filter);
    this.isLoading = true
    this.dooleService.getAPIfilteredDiagnosticTest(this.filter).subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getFilteredDiagnosticTests()', await res);
        let diagnosticTests = res.diagnosticTests
        if(diagnosticTests && diagnosticTests.length >0){
          this.diagnosticTests = []
          this.listDiagnostic = []
          this.groupDiagnosticsByDate(res)
          this.filter = null
        }
        this.isLoading = false
       },(err) => { 
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[TrackingPage] getFilteredDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }


  async getDiagnosticTests(){
    this.isLoading = true
    this.dooleService.getAPIdiagnosticTests().subscribe(
      async (res: any) =>{
        this.diagnosticTests = []
        this.listDiagnostic = []
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.diagnosticTests = res.diagnosticTests
        if(this.diagnosticTests )
        this.groupDiagnosticsByDate(res)
        this.isLoading = false
       },(err) => { 
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  groupDiagnosticsByDate(list){
    let diagnosticTests = list.diagnosticTests
    diagnosticTests.forEach( (diagnostic, index) =>{
      let date = diagnostic.date_european
      if(index == 0 || date !== diagnosticTests[index-1].date_european){
        let list = diagnosticTests.filter( event => 
          (event.date_european == date)
        )
        let color = (index == 0)? this.active_color: this.inactive_color
        this.listDiagnostic.push({date: diagnostic.data, diagnosticTests: list, color: color}) 
      } 
    })
    console.log('[TrackingPage] groupDiagnosticsByDate()', this.listDiagnostic);
  }


  async getFormList(){
    this.isLoading = true
    this.dooleService.getAPIformLists().subscribe(
      async (res: any) =>{
         this.forms = []
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.forms = res.forms
        this.isLoading = false
        // this.hasToShowForm = formData.showForm;
        // this.active = formData.active;
       },async (err) => { 
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  async getElementsList(){
    this.isLoading = true
    this.groupedElements = [];
    this.elementValues = [];
    this.dooleService.getAPIelementsList().subscribe(
      async (data: any) =>{
        console.log('[TrackingPage] getElementsList()', await data); 
        if(data.eg){
          // Iterate elements in the tree searching for element groups
          this.treeIterate(data.eg, '');
          // Order grouped elements by Name
          this.groupedElements.sort(function(a,b){
            return a.group.localeCompare(b.group);
          })
          this.elementValues = data.elementValues;
        }
        this.isLoading = false
       },(err) => { 
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[TrackingPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  treeIterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          this.treeIterate(obj[property], stack + '.' + property);
        } else {
          if(property=="group"){
            obj['is_child'] = stack.includes('childs');
            this.groupedElements.push(obj);
          }
        }
      }
    }
  }

  segmentChanged(){
    console.log(this.segment);
    switch (this.segment) {
      case 'documents':
        this.getDiagnosticTestsList()
        break;
      case 'forms':
        this.getFormList()
        break;
      case 'graphics':
        this.getElementsList()
        break;
      default:
        this.getDiagnosticTestsList()
        break;
    }
  }

  fireEvent(e, i){
    this.listDiagnostic.forEach( (diagnostic, index) =>{
      if(index == i)
      diagnostic.color = this.active_color
      else
      diagnostic.color = this.inactive_color
    })
  }

async addDocument(){
  const modal = await this.modalCtrl.create({
    component:  DocumentsAddPage,
    componentProps: { },
    cssClass: "modal-custom-class"
  });

  modal.onDidDismiss()
    .then((result) => {
      console.log('addDocument()', result);     
      if(result?.data?.error){
       // let message = this.translate.instant('landing.message_wrong_credentials')
        //this.dooleService.presentAlert(message)
      }else if(result?.data?.action == 'add'){
        this.notification.displayToastSuccessful()
        this.getDiagnosticTestsList()     
      }
    });

    await modal.present();

  }

  async addElement(){
    const modal = await this.modalCtrl.create({
      component:  ElementsAddPage,
      componentProps: { },
    });
  
    modal.onDidDismiss()
      .then((result) => {
        console.log('addElement()', result);
       
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'add'){
          this.notification.displayToastSuccessful()
        }
      });
  
      await modal.present(); 
    }

    async addFilters(){
      const modal = await this.modalCtrl.create({
        component:  DocumentsFilterPage,
        componentProps: { },
        cssClass: "modal-custom-class"
      });
    
      modal.onDidDismiss()
        .then((result) => {
          console.log('addFilters()', result);     
          if(result?.data?.error){
           // let message = this.translate.instant('landing.message_wrong_credentials')
            //this.dooleService.presentAlert(message)
          }else if(result?.data?.action == 'add'){
            this.filter = result?.data?.filter;
            this.getFilteredDiagnosticTests()    
          }
        });
    
        await modal.present();
    
      }

}