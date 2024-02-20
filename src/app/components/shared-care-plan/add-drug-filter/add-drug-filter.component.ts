import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-add-drug-filter',
  templateUrl: './add-drug-filter.component.html',
  styleUrls: ['./add-drug-filter.component.scss'],
})
export class AddDrugFilterComponent  implements OnInit {
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();
  drugs: any;
  constructor(
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    public dateService : DateService){}
  ngOnInit() {}

  filterList(event){
    
    if(event.target.value.length > 5 ){
    var query = event.target.value;
    this.dooleService.getAPIdrugsList(query).subscribe(json=>{
      if(json)
        this.drugs = json.drugs;
    },err => {
      console.log('[DiaryPage] getElementsList() ERROR(' + err.code + '): ' + err.message);
    });
  }
  };

  async getDrugsList(event){
   
 
      var query = "search=" + event.target.value;
      this.dooleService.getAPIdrugsList(query).subscribe(
        async (res: any) =>{
          console.log('[DrugAddPage] getDrugsList()', await res.drugs);
          if(res )
          this.drugs = res.drugs;
         },(err) => {
            console.log('[DrugAddPage] getDrugsList() ERROR(' + err.code + '): ' + err.message);
            alert( 'ERROR(' + err.code + '): ' + err.message)
            throw err;
        });
   
   
  }

  addMedicamento(drug){
    debugger
    console.log('[DrugAddPage] addMedicamento()', drug);
    this.drugs = [];
    this.dataUpdated.emit(drug);
   // this.modalCtrl.dismiss({error:null, action: 'add', drug: drug});
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
