import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { DateService } from 'src/app/services/date.service';
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
  isLoading = false;
  locale;
  constructor(
    private dooleService: DooleService,
    public loadingCtrl: LoadingController,
    public sharedCarePlan:SharedCarePlanService, 
    private datePipe: DatePipe, 
    private dateService : DateService
  ) { }

  ngOnInit() {
    this.getFormList();
    this.locale = this.dateService.getLocale();
  }


  async getFormList(){
    this.sharedCarePlan.get_APi_ACP_forms().subscribe(
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


transformDate(date) {
  console.log("locale", this.locale)
 // return this.datePipe.transform(date, 'MMM d, y', this.locale);
  return this.dateService.ddMMyyyy(date)
}

showAlert(date){
  return this.dateService.isToday(new Date(date) )
}


adapterForView(list){
  list.forEach(element => {  
    let image = "" ;
    const temporaryUrl = element.media;
    if(temporaryUrl?.hasOwnProperty("temporaryUrl")){
          image = temporaryUrl.temporaryUrl
    }  
    
   // let show=this.IsAllowed(element.from_date);
    
  //Se adapta la respuesta de la API a lo que espera el componente  
    let data={
      img: image,
      title: element.title,
      from:  this.transformDate(element.from_date),
      to:  this.transformDate(element.to_date),
      form_id: element.form_id,
     // accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
      type: "App\\Form",
      description: "", //element.frequencyName,
      id:element.id,
      showAlert: this.showAlert(element.from_date)
    //  routerLink: ['form', { id: element?.id }]
    }


    console.log("cdata", data)
    this.items.push(data)
  })
}
handleRedirect(event: { type: string,  showAlertForm:boolean }) {   
  console.log("entro a la redireccion")     
 if(event.showAlertForm === true){

 }
}
}