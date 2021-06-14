import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-test-type',
  templateUrl: './test-type.page.html',
  styleUrls: ['./test-type.page.scss'],
})
export class TestTypePage implements OnInit {
  listTestType =[]
  listTestTypeBackup = []
  constructor(
    private modalController: ModalController,
    private dooleService: DooleService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getTestType()
  }

  async getTestType(){
    console.log("submit");
    const loading = await this.loadingController.create();
    await loading.present();

    this.dooleService.getAPIdiagnosticTestTypesAvailable().subscribe(
      async (res: any) =>{
        console.log('[TestTypePage] getTestType()', await res);
        this.listTestType = res.diagnosticTestTypes
        this.listTestTypeBackup = this.listTestType
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[TestTypePage] getTestType() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      },
      () => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      });
  }

  async filterList(evt) {
    console.log('[TestTypePage] filterList()');
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

  async presentModal() {
    const modal = await this.modalController.create({
      component: TestTypePage
    });
    return await modal.present();
  }

  async closeModal(test?: any) {
    if(test)
    await this.modalController.dismiss(test);
    else
    await this.modalController.dismiss();
  }

}
