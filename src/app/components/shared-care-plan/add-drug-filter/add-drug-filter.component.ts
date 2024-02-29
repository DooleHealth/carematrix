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
  @Output() dataInteractions: EventEmitter<any> = new EventEmitter<any>();
  @Output() drugUpdated: EventEmitter<any> = new EventEmitter<any>();
  drugs: any;
  interactions;
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
          this.drugs = [];
        
      
         },(err) => {
            console.log('[DrugAddPage] getDrugsList() ERROR(' + err.code + '): ' + err.message);
            alert( 'ERROR(' + err.code + '): ' + err.message)
            throw err;
        });
   
   
  }

  addMedicamento(drug){
    console.log('[DrugAddPage] addMedicamento()', drug);
    this.interactions= [];
     /**ESTA ES LA API PARA SABER SI TIENE INTERACCCIONES O NO EL MEDICAMENTO */
     this.dooleService.getAPIdrugsListInteraction(drug.id).subscribe(
      async (res: any) =>{
        debugger
        if(res != null){
          let arrayValue = res
          arrayValue.interactions.forEach(element => {
             this.interactions.push(element);
          });
          
        }
        this.drugUpdated.emit(this.drugs);
        this.dataInteractions.emit(this.interactions);
        console.log("drug interaction", res)
        this.drugs=[]

      }
     )
     
   
   // this.modalCtrl.dismiss({error:null, action: 'add', drug: drug});
  }

  close() {
    this.modalCtrl.dismiss({error:null});
  }

}
