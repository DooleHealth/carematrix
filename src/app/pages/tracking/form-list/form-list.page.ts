import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  forms: Array<any>;
  items = [];
  isLoading = false
  constructor(
    private dooleService: DooleService,
    public loadingCtrl: LoadingController,
    public sharedCarePlan:SharedCarePlanService,  
  ) { }

  ngOnInit() {
    this.getFormList();
  }


  async getFormList(){
let id=  localStorage.getItem('userId');
    this.sharedCarePlan.get_APi_ACP_forms(id).subscribe(
      async (res: any) =>{
        console.log("formularios", res)
        this.forms = []
        this.forms = res
        this.adapterForView(this.forms)
       },async (err) => {
          alert(`Error: ${err.code }, Message: ${err.message}`)
          console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message);
          throw err;
      });
}


adapterForView(list){
  list.forEach(element => {       
  //Se adapta la respuesta de la API a lo que espera el componente  
    let data={
      img: element.temporaryUrl,
      title: element.title,
      from: "",//element.from_date,
      to:  "",//element.to_date,
     // accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
      type: "App\\Form",
      description: "", //element.frequencyName,
      id:element.id,
      routerLink: ['form', { id: element?.id }]
    }


    console.log("cdata", data)
    this.items.push(data)
  })
}

}
