import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-drug-add',
  templateUrl: './drug-add.page.html',
  styleUrls: ['./drug-add.page.scss'],
})
export class DrugAddPage implements OnInit {
  drugs: any;
  constructor(
    private dooleService: DooleService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  filterList(event){
    var query = event.target.value;
    this.dooleService.getAPIdrugsList(query).subscribe(json=>{
      if(json)
        this.drugs = json.drugs;
    },err => {
      console.log('[DiaryPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
    });
  };

  async getDrugsList(event){
    var query = "search=" + event.target.value;
    this.dooleService.getAPIdrugsList(query).subscribe(
      async (res: any) =>{
        console.log('[DrugAddPage] getDrugsList()', await res);
        if(res )
        this.drugs = res.drugs;
       },(err) => { 
          console.log('[DrugAddPage] getDrugsList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      });
  }

  addMedicamento(drug){
    console.log('[DrugAddPage] addMedicamento()', drug);
    this.modalCtrl.dismiss({error:null, action: 'add', drug: drug});
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
