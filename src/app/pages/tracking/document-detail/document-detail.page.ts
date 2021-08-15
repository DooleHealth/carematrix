
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DocumentsAddPage } from '../documents-add/documents-add.page';
export interface ItemDiagnostic {
  expanded?: boolean;
  elements?: any[];
}
@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.page.html',
  styleUrls: ['./document-detail.page.scss'],
})
export class DocumentDetailPage implements OnInit {
  public items: ItemDiagnostic[] = [];
  private id;
  private document: any;
  diagnosticTest = [];
  diagnosticTestType = [];
  groupedElements: any = [];
  elementValues: any = [];
  mediaFiles: any;
  isLoading = false
  constructor(
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private languageService: LanguageService,
  ) {
  }


  ngOnInit() {
    this.id = history.state.id;
    console.log('[DocumentDetailPage] ngOnInit()', this.id);
    if(this.id)
    this.getDiagnosticData()
  }


  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  addItems(){
    console.log('[DocumentDetailPage] expandItems()');
    this.groupedElements.forEach(element => {
      this.items.push({expanded: false, elements: element })
    });
  }

  formatSelectedDate(date){
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'dd MMM yyy');
  }

  async getDiagnosticData(){
    this.isLoading = true
    this.dooleService.getAPIdiagnosticTestID(this.id).subscribe(
      async (res: any) =>{
        console.log('[TrackingPage] getDiagnosticData()', await res);
        if(res.success)
        this.document = res
        this.diagnosticTest = res.diagnosticTest
        this.diagnosticTestType = res.diagnosticTest.diagnostic_test_type
        if (res.diagnosticTest.media) {
          this.mediaFiles = res.diagnosticTest.media;
        }
        if (res.elements) {
          // Iterate elements in the tree searching for element groups
          this.treeIterate(res.elements, '');
          // Order data by group Name
          this.groupedElements.sort(function (a, b) {
            return a.group.localeCompare(b.group);
          })
          this.addItems()
        }

        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[TrackingPage] getDiagnosticData() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };
  }

  treeIterate(obj, stack) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
              this.treeIterate(obj[property], stack + '.' + property);
            } else {
                if(property=="group")
                  this.groupedElements.push(obj);
            }
        }
    }
  }


/*   async getData() {
    this.authService.get('user/diagnosticTest/' + this.id).subscribe(
      async (json) => {

        await this.getTypes();

        console.log('getData: ', await json);
        console.log('this.id : ', this.id);

        this.diagnosticTest = json.diagnosticTest;
        this.diagnosticTestType = json.diagnosticTestType;

        console.log("this.diagnosticTest.diagnostic_test_type_id ", this.diagnosticTestType.id);
        if (json.diagnosticTest.media) {
          this.mediaFiles = json.diagnosticTest.media;
        }

        // Iterate elements in the tree searching for element groups
        this.treeIterate(json.elements, '');

        // Order data by group Name
        this.groupedElements.sort(function (a, b) {
          return a.group.localeCompare(b.group);
        })

        this.elementValues = json.elementValues;

        let values = {
          type: this.diagnosticTestType.name,
          title: this.diagnosticTest.title,
          date: this.diagnosticTestType.created_at,
          description: this.diagnosticTest.description,
          images: [this.images]
        }

        //this.form.patchValue(values);

      },
      (error) => {
        // Called when error
        console.log("error: ", error);
        throw new HttpErrorResponse(error);
      },
      () => {
        // Called when operation is complete (both success and error)
      });
  } */

  openFile(media){
    console.log("media", media);
    window.open(media.temporaryUrl, "");
  }

  async editDiagnosticTest(){
    const modal = await this.modalCtrl.create({
      component:  DocumentsAddPage,
      componentProps: { test: this.document},
      cssClass: "modal-custom-class"
    });
  
    modal.onDidDismiss()
      .then((result) => {
        console.log('addDocument()', result);     
        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action == 'add' || result?.data?.action == 'update'){
          this.notification.displayToastSuccessful()
          this.getDiagnosticData()    
        }else if(result?.data?.action == 'delete'){
          this.notification.displayToastSuccessful()
        }
      });
  
      await modal.present();
  }

}
