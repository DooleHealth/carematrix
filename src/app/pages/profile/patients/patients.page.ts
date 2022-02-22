import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  patients = []
  patientsBackup = []
  isLoading = false
  constructor(
    private dooleService: DooleService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.getListPatient()
  }

  async filterList(evt) {
    console.log('[PatientsPage] filterList()');
    this.patients = this.patientsBackup;
    const searchTerm = evt.srcElement.value;
    if (!searchTerm){
      //this.getListPatient()
      return
    }
    this.patients = this.patients.filter(element => {
      if (element.name && searchTerm) {
        return (element.name .toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  getListPatient(){
    this.isLoading = true
    this.dooleService.getAPIpatients().subscribe(res=>{
      console.log('[DiaryPage] filterListNews()', res); 
      this.patients = []
      if(res.success)
      this.patients = res.patients
      this.patientsBackup = res.patients
      this.isLoading = false
    },err => {
      console.log('[DiaryPage] filterListNews() ERROR(' + err.code + '): ' + err.message); 
    });
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }
}
