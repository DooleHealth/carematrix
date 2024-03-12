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
import { DateService } from 'src/app/services/date.service';
import { AddButtonComponent, AddButtonList, ListContentType, SCPContentType, SharedCarePlan, setStatusContentType } from 'src/app/models/shared-care-plan';
import { Router } from '@angular/router';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';
import { PermissionService } from 'src/app/services/permission.service';

export interface ListDiagnosticTests {
  date?: string;
  diagnosticTests?: any[];
  color?: string;
  ddMMyFormat?: string;
 
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
  listData: SCPContentType = ListContentType;
  
  listContent=[]
  addButton = AddButtonList;
  showButton: boolean = false;
  listDiagnostic:  ListDiagnosticTests[];
  diagnosticTests : Array<any>;
  forms: Array<any>;
  public showingForm;
  public hasToShowForm;
  public active;
  public id;
  public url;
  groupedElements: Array<any>;
  newGroupedElements: Array<any>;
  elementValues: Array<any>;
  isLoading = true
  loadingForms = false;
  loadingTests = false;
  loadingGraphics = false;
  segment = history.state?.segment ? history.state.segment : 'sharedcareplan';
  active_color= '#5250da'
  inactive_color= '#7F8C8D'
  filter: Filter;
  constructor(
    private dooleService: DooleService,
    private scpService: SharedCarePlanService,
    public authService: AuthenticationService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private dateService: DateService,
    public role: RolesService,
    public permissionService: PermissionService
  ) { }


  ngOnInit() {
   
  }

  ionViewWillEnter(){
    //this.setSegment()
    this.showButton= false;
    this.segmentChanged();
    this.fireEvent(null, 0)
  }

  getStatusContent(){
    this.showButton= false,
    console.log("asasd", this.listData)
   this.getPermission()
    this.scpService.getAPI_SCP_StatusContent().subscribe(
      async (res: any) =>{
        
        console.log('[TrackingPage] getStatusContent()', await res);
        this.listData.forEach(content => {
          setStatusContentType(res,content)
        })

        console.log('[TrackingPage] getStatusContent() this.listContent', this.listData);
       },(err) => {
          console.log('[TrackingPage] getStatusContent() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
  }

  getPermission() {
    const permissionFunctions = {
      goals: () => this.permissionService.canViewGoals,
      life_style_habits: () => this.getLifeStyleHabitsViews(),
      forms: () => this.permissionService.canViewForms,
      medication_plans: () => this.permissionService.canViewMedication || this.permissionService.canViewMedicationPlans,
      medical_procedures: () => this.permissionService.canViewMedicalProcedures,
      monitoring: () => this.permissionService.canViewMonitoring
    };
  
    this.listContent = this.listData.filter(item => {
      const permissionFunction = permissionFunctions[item.type];
      return permissionFunction && permissionFunction();
    });

  }
getLifeStyleHabitsViews(){

  const permissionsArray = [
    this.permissionService.canViewNews,
    this.permissionService.canViewAdvices,
    this.permissionService.canViewExercises,
    this.permissionService.canViewDiets,
    this.permissionService.canViewRecipes,
    this.permissionService.canViewGames,
    this.permissionService.canViewTestimonials,
    this.permissionService.canViewGoals,
  ];
  // Verificar si alguno de los valores en el array es true
   return permissionsArray.some(permiso => permiso === true);
}

  getDiagnosticTestsList(){
   this.showButton= true,
    console.log('[TrackingPage] getDiagnosticTestsList()' ,  this.filter);
    if(this.filter){
      this.getFilteredDiagnosticTests()
    }else{
      this.getDiagnosticTests();
    }
  }

  formatSelectedDate(date , format){
    return this.dateService.selectedDateFormat(date);
  }

  transformDate(date) {
    if (date != null) {
      return this.dateService.ddMMyFormat(date)
    } else {
      return ""
    }

  }

  setDayMonthYearTimeFormat(date){
    return this.dateService.getDayMonthYearFormat(date);

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
        this.listDiagnostic.push({date: diagnostic.data, diagnosticTests: list, color: color })
      }
      
    })
    console.log("list", this.listDiagnostic)
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

  async getElementsList() {
    this.loadingGraphics = true
    this.groupedElements = [];
    this.newGroupedElements = [];
    let params = { only_with_values: '0', grouped: '1', filter: 1 }
    //Activar filtro getAPIelementsList(true)
    this.dooleService.getAPIelementsList(params).subscribe(
      async (data: any) => {
        console.log('[TrackingPage] getElementsList()', await data);
          this.treeIterate(data?.elements)
          console.log('[TrackingPage] getElementsList() ', this.groupedElements);
        this.loadingGraphics = false
      }, (err) => {
        alert(`Error: ${err.code}, Message: ${err.message}`)
        console.log('[TrackingPage] getElementsList() ERROR(' + err.code + '): ' + err.message);
        this.loadingGraphics = false
        throw err;
      });

  }

  groupElements(elements) {
    elements.forEach((element) => {
      element['units'] = element?.element_unit?.abbreviation ? element?.element_unit?.abbreviation : '';
      element['value'] = element?.last_value?.value;
    })

    console.log('[DiaryPage] groupElements()', this.groupedElements);
  }

  treeIterate(obj) {
    console.log('[DiaryPage] groupElements()', obj);
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        console.log('[DiaryPage] groupElements()', property);
              let elements = obj[property]
              this.groupElements(elements)
              this.groupedElements.push({ group: property, elements: elements });
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
      case 'sharedcareplan':
        this.getStatusContent()
        break;
      default:
        this.getStatusContent()
        break;
    }
  }

  // setSegment(){
  //   if(!this.role?.component?.doc_diagnostic){
  //     this.segment = 'forms'
  //     if(!this.role?.component?.form){
  //         this.segment = 'graphics'
  //         if(!this.role?.component?.element){
  //         this.segment = ''
  //     }
  //     }
  //   }
  // }

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

      checkPermissions() {
        return this.permissionService.canViewGoals || this.permissionService.canViewNews || this.permissionService.canViewAdvices || 
               this.permissionService.canViewForms || this.permissionService.canViewExercises || this.permissionService.canViewDiets ||
               this.permissionService.canViewTestimonials || this.permissionService.canViewGames || this.permissionService.canViewMedication || this.permissionService.canViewMedicationPlans
               || this.permissionService.canViewMonitoring
      }

    

}


