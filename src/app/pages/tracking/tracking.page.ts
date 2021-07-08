import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  groupedElements: any = [];
  elementValues: any = [];
  isLoading = false
  segment = 'documents'
  filter: Filter;
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl:NavController,
    private iab: InAppBrowser, 
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    console.log('[TrackingPage] ngOnInit()');
    this.segmentChanged()
  }

  ionViewDidEnter(){
    console.log('[TrackingPage] ionViewDidEnter()');
    this.segmentChanged()
  }

  ionViewWillEnter(){
    console.log('[TrackingPage] ionViewWillEnter()');
  }

  getDiagnosticTestsList(){
    this.filter = history.state.filter;
    console.log('[TrackingPage] getDiagnosticTestsList()' ,  this.filter);
    if(this.filter){
      this.getFilteredDiagnosticTests()
    }else{
      this.getDiagnosticTests();
    }
  }

  async getFilteredDiagnosticTests(){
    console.log('[TrackingPage] getFilteredDiagnosticTests()' ,  this.filter);
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIfilteredDiagnosticTest(this.filter).subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getFilteredDiagnosticTests()', await res);
        let diagnosticTests = res.diagnosticTests
        if(diagnosticTests && diagnosticTests.length >0){
          this.diagnosticTests = []
          this.listDiagnostic = []
          this.groupDiagnosticsByDate(res)
        }
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[TrackingPage] getFilteredDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
      });
  }


  async getDiagnosticTests(){
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIdiagnosticTests().subscribe(
      async (res: any) =>{
        this.diagnosticTests = []
        this.listDiagnostic = []
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.diagnosticTests = res.diagnosticTests
        if(this.diagnosticTests )
        this.groupDiagnosticsByDate(res)
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
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
        this.listDiagnostic.push({date: diagnostic.data, diagnosticTests: list}) 
      } 
    })
    console.log('[TrackingPage] groupDiagnosticsByDate()', this.listDiagnostic);
  }


  async getFormList(){
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIformLists().subscribe(
      async (res: any) =>{
         this.forms = []
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.forms = res.forms
        loading.dismiss();
        this.isLoading = false
       },async (err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
      });
  }

  async openForm(form){
    const options: InAppBrowserOptions = {
      location: 'no',
      toolbar: 'yes'
    };

    console.log('[TrackingPage] openForm()',  this.auth.user);

    if(this.auth !==undefined || this.auth.user !== undefined){
      var pageContent = '<html><head></head><body><form id="loginForm" action="https://covid.doole.io/formAnswer/fill/'+form.id+'" method="post" enctype="multipart/form-data">' +
        '<input type="hidden" name="idForm" value="'+form.id+'">' +
        '<input type="hidden" name="user_id" value="'+this.auth.user.idUser+'">' +
        '<input type="hidden" name="secret" value="'+this.auth.user.secret+'">' +
        '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
      var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
      var browserRef = this.iab.create(
        pageContentUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }else{
      var browserRef = this.iab.create(
        form.temporaryUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }

  }

  async getElementsList(){
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
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
        //console.log('[TrackingPage] getElementsList()',  this.groupedElements);
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[TrackingPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
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

}