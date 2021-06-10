import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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
    //private navParams: NavParams,
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.getTestType()
  }

  getTestType(){
    this.dooleService.getAPIdiagnosticTestTypesAvailable().subscribe(
      async (res: any) =>{
        console.log('[TestTypePage] getTestType()', await res);
        this.listTestType = res.diagnosticTestTypes
        this.listTestTypeBackup = this.listTestType
       },(err) => { 
          console.log('[TestTypePage] getTestType() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
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

  async closeModal(text: any) {
    if(text)
    await this.modalController.dismiss(text);
    else
    await this.modalController.dismiss();
  }

}
