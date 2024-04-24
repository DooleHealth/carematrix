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
  isLoading = false
  constructor(
    private modalCtrl: ModalController,
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.getTestType()
  }

  async getTestType(){
    console.log("submit");
    this.isLoading = true

    this.dooleService.getAPIdiagnosticTestTypesAvailable().subscribe(
      async (res: any) =>{
        console.log('[TestTypePage] getTestType()', await res);
        this.listTestTypeBackup = res.diagnosticTestTypes
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[TestTypePage] getTestType() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      },
      () => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      });
  }

  async filterList(evt) {
    console.log('[TestTypePage] filterList()');
    this.listTestType = this.listTestTypeBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
        this.listTestType = [];
        return;
    }

    this.listTestType = this.listTestType.filter(test => {
        if (test.name) {
            return test.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });
}

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: TestTypePage,
      cssClass: "modal-custom-class"
    });
    return await modal.present();
  }

  async closeModal(test?: any) {
    if(test)
    await this.modalCtrl.dismiss(test);
    else
    await this.modalCtrl.dismiss();
  }

}
