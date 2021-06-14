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
  graphics = []
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
    //this.getDiagnosticTests()
    this.getFormLists()
    this.applyFilter()
  }

  ionViewDidEnter(){
    console.log('[TrackingPage] ionViewDidEnter()');
    this.getDiagnosticTests();
    this.applyFilter()
  }

  ionViewWillEnter(){
    console.log('[TrackingPage] ionViewWillEnter()');
  }

  applyFilter(){
    this.filter = history.state.filter;
    console.log('[TrackingPage] applyFilter()' ,  this.filter);
    if(this.filter){
      this.getFilteredDiagnosticTests()
    }else{
      this.getDiagnosticTests();
    }
  }

  async getFilteredDiagnosticTests(){
    console.log('[TrackingPage] getFilteredDiagnosticTests()' ,  this.filter);
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.postAPIfilteredDiagnosticTest(this.filter).subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        let diagnosticTests = res.diagnosticTests
        if(diagnosticTests && diagnosticTests >0){
          this.diagnosticTests = []
          this.listDiagnostic = []
          this.orderDiagnosticsByDate(res)
        }
        loading.dismiss();
       },(err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
          loading.dismiss();
      });
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
        if(this.diagnosticTests )
        this.orderDiagnosticsByDate(res)
        loading.dismiss();
       },(err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
          loading.dismiss();
      });
  }


  getGraphics(){
    this.dooleService.getAPIgraphicsTracking().subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getGraphics()', await res); 
        this.graphics = res
       },(err) => { 
          console.log('[TrackingPage] getGraphics() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

/*   filterDiagnosticsByDate(){
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
  } */

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


  async getFormLists(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIformLists().subscribe(
      async (res: any) =>{
         this.forms = []
        console.log('[TrackingPage] getDiagnosticTests()', await res);
        this.forms = res.forms
        loading.dismiss();
       },async (err) => { 
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message); 
          //throw err; 
          loading.dismiss();
          let alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Se ha producido un error',
            buttons: [{
              text: 'Ok',
              handler: data => {
                this.navCtrl.pop();
              }
            }]
          });
          await alert.present();
      });
  }

  async openForm(form){
    const options: InAppBrowserOptions = {
      location: 'no',
      toolbar: 'yes'
    };

    await this.auth.getUserLocalstorage().then(value =>{
      this.auth.user = value
    })

    console.log('[TrackingPage] openForm()',  this.auth.user);

    //if(this.auth==undefined || this.auth.user== undefined){
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
/*     }else{
      var browserRef = this.iab.create(
        form.temporaryUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    } */

  }

}