import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DocumentsAddPage } from './documents-add/documents-add.page';
import { DocumentsFilterPage } from './documents-filter/documents-filter.page';
import { ElementsAddPage } from './elements-add/elements-add.page';
import { RolesService } from 'src/app/services/roles.service';

export interface ListDiagnosticTests {
  date?: string;
  diagnosticTests?: any[];
  color?: string
}
export interface Filter {
  start_date?: string,
  end_date?: string,
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
  listDiagnostic:  ListDiagnosticTests[];
  diagnosticTests : Array<any>; 
  forms: Array<any>; 
  public showingForm;
  public hasToShowForm;
  public active;
  public id;
  public url;
  groupedElements: Array<any>; 
  elementValues: Array<any>; 
  isLoading = true
  loadingForms = false;
  loadingTests = false;
  loadingGraphics = false;
  segment = history.state?.segment ? history.state.segment : 'documents';
  active_color= '#3498DB'
  inactive_color= '#7F8C8D'
  filter: Filter;
  constructor(
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private domSanitizer: DomSanitizer,
    public role: RolesService
  ) { }


  ngOnInit() {
  }

  ionViewWillEnter(){
    this.setSegment()
    this.segmentChanged();
    this.fireEvent(null, 0) 
  }

  getDiagnosticTestsList(){
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
      this.loadingTests = true
      this.dooleService.getAPIfilteredDiagnosticTest(this.filter).subscribe(
        async (res: any) =>{
          console.log('[TrackingPage] getFilteredDiagnosticTests()', await res);
          let diagnosticTests = res.diagnosticTests
          if(diagnosticTests && diagnosticTests?.length >=0){
            this.diagnosticTests = []
            this.listDiagnostic = []
            this.groupDiagnosticsByDate(res)
            //this.filter = null
          }
          this.loadingTests = false
         },(err) => { 
            alert(`Error: ${err.code }, Message: ${err.message}`)
            console.log('[TrackingPage] getFilteredDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
            this.loadingTests = false
            throw err; 
        });
    
  }

  async getDiagnosticTests(){
      this.loadingTests = true
      this.dooleService.getAPIdiagnosticTests().subscribe(
        async (res: any) =>{
          if(await res.success){
            this.diagnosticTests = []
            this.listDiagnostic = []
            this.diagnosticTests =  res.diagnosticTests
            if(this.diagnosticTests?.length > 0 )
              this.groupDiagnosticsByDate(res)
           
          }
          
          this.loadingTests = false;
         
          
         },(err) => { 
            alert(`Error: ${err.code }, Message: ${err.message}`)
            console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
            this.loadingTests = false
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
    this.loadingTests = false
  }


  async getFormList(){
      this.loadingForms = true
      this.dooleService.getAPIformLists().subscribe(
        async (res: any) =>{
           this.forms = []
          //console.log('[TrackingPage] getDiagnosticTests()', await res);
          this.forms = res.forms
          this.loadingForms = false
         },async (err) => { 
            alert(`Error: ${err.code }, Message: ${err.message}`)
            console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
            this.loadingForms = false
            throw err; 
        });
  }

  async getElementsList(){
      this.loadingGraphics = true
      this.groupedElements = [];
      this.elementValues = [];
      this.dooleService.getAPIelementsList().subscribe(
        async (data: any) =>{
          console.log('[TrackingPage] getElementsList()', await data); 
          if(data.eg){
            // Iterate elements in the tree searching for element groups
            this.treeIterate(data.eg, '');
            // Order grouped elements by Name
            this.groupedElements?.sort(function(a,b){
              return a.group.localeCompare(b.group);
            })
            this.elementValues = data.elementValues;
          }
          this.loadingGraphics = false
         },(err) => { 
            alert(`Error: ${err.code }, Message: ${err.message}`)
            console.log('[TrackingPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
            this.loadingGraphics = false
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
            if(obj?.elements.length>0)
            this.groupedElements.push(obj);
          }
        }
      }
    }
  }

  segmentChanged(event?){
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

  setSegment(){
    if(!this.role?.component?.doc_diagnostic){
      this.segment = 'forms'
      if(!this.role?.component?.form){
          this.segment = 'graphics'
          if(!this.role?.component?.element){
          this.segment = ''
      }
      }
    }
  }

  fireEvent(e, i){
    this.listDiagnostic?.forEach( (diagnostic, index) =>{
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
          this.getElementsList()
        }
      });
  
      await modal.present(); 
    }

    async addFilters(){
      const modal = await this.modalCtrl.create({
        component:  DocumentsFilterPage,
        componentProps: { filter: this.filter},
        cssClass: "modal-custom-class"
      });
    
      modal.onDidDismiss()
        .then((result) => {
          console.log('[TrackingPage] addFilters()', result);     
          if(result?.data?.error){
          }else if(result?.data?.action == 'add'){
            this.filter = result?.data?.filter;
            if(this.filter?.start_date)
            this.filter.start_date = this.filter?.start_date?.split('T')[0]
            if(this.filter?.end_date)
            this.filter.end_date = this.filter?.end_date?.split('T')[0]
            this.getDiagnosticTestsList()
          }
        });
    
        await modal.present();
    
      }

}