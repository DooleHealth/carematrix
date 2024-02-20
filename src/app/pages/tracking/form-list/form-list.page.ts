import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  segment = "today"
  forms: Array<any>;
  items = [];
  isLoading = false;
  locale;
  listForms=[];
  date = Date.now();
  isDateInPast = false;
  currentDate;
  Lasttimestring;
  lastName;
  constructor(
    private dooleService: DooleService,
    public loadingCtrl: LoadingController,
    public sharedCarePlan: SharedCarePlanService,
    private datePipe: DatePipe,
    private dateService: DateService,
    public translate: TranslateService, public alertController: AlertController,
    private router: Router,
    public role: RolesService,
  ) { }

  ngOnInit() {
    //this.getFormList();
    //this.locale = this.dateService.getLocale();
  }


  ionViewWillEnter() {
    //this.getFormList();
    this.getCurrentDate();
    this.setSegment();
    this.getFormsListByDate();
    this.locale = this.dateService.getLocale();
  }

  setSegment(){
    if(!this.role?.component?.diet){
      this.segment = 'today'
      if(!this.role?.component?.drug){
          this.segment = 'forms'
      }
    }
  }
  async getFormList() {
    this.items = [] 
    this.isLoading = true; 
    this.sharedCarePlan.get_APi_ACP_forms().subscribe(
      async (res: any) => {
        console.log("formularios", res)
        this.forms = []
        this.forms = res
        this.adapterForView(this.forms)
      }, async (err) => {
        alert(`Error: ${err.code}, Message: ${err.message}`)
        console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message);
        throw err;
      }, ()=>{
        this.isLoading = false
      });
  }


  transformDate(date) {
    if (date != null) {
      return this.dateService.ddMMyFormat(date)
    } else {
      return ""
    }

  }

  showAlert(date) {
    return this.dateService.isToday(new Date(date))
  }

  async alertForm() {

    this.translate.get('info.button').subscribe(
      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: this.translate.instant('form.alert_title'),
          // subHeader: 'Subtitle',
          message: this.translate.instant('form.alert_forms'),
          buttons: [button]
        });

        await alert.present();
      });


  }

  adapterForView(list) {
    if (Array.isArray(list)) {


      console.log(list);
      list.forEach(element => {
        let image = "";
        let isAnswers= false;
        const temporaryUrl = element.media;
        if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
          image = temporaryUrl.temporaryUrl
        }

        // let show=this.IsAllowed(element.from_date);

        //Se adapta la respuesta de la API a lo que espera el componente  

        console.log(element.last_accepted_or_declined);
        if(element.formAnswers.length > 0){
          isAnswers= true;
        }

        let modelType = element.content_type.replace(/App\\/, '')
        console.log(modelType)
        let data = {
          img: image,
          title: element.title,
          from: this.transformDate(element.from_date),
          to: this.transformDate(element.to_date),
          form_id: element.form_id,
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "form",
          description: "", //element.frequencyName,
          id: element.id,
          model_id: element.id,
          model: modelType,
          showAlert: this.showAlert(element.from_date),
          routerLink: null,
          isAnswers: isAnswers,
          frequency: element.frequency,
          state: element?.last_accepted_or_declined?.type,
          form_programmation_id: element.formProgrammationTimes[0].form_programmation_id
        }
        this.items.push(data)
      })
    }
    console.log(this.items);
  }
  handleRedirect(event: { type: string, form_id: string, showAlerts: boolean }) {
    console.log("entro a la redireccion")
    if (event.showAlerts === true) {
      this.alertForm();
    } else {
      this.router.navigate([`/tracking/form`, { id: event.form_id }], { state: { data: null } });
    }
  }

  accepterOrDecline(datos){
    console.log(datos)
    if(datos === null || datos === undefined){
      return false;
    }else{
      return true;
    }
  }


  loaderAgain(event: { type: string }) {  
    this.getFormList()
  }
  
  async segmentChanged($event?){
    console.log('[DiaryPage] segmentChanged()', this.segment);
    console.log('[DiaryPage] event()', $event);
    this.items = []
    switch (this.segment) {
      case 'today':
        //await this.getDietList()
        await this.getFormsListByDate()
        break;
      case 'forms':
        await this.getFormList()
        break;
      default:
        console.log('Segment not found');
        break;
    }
  }
  
  async getFormsListByDate(){

    console.log('[Form_listPage] getFormsListByDate()');
    let date  = this.transformDate2(this.date)
    const params = {date: date, grouped_by_times: true}
    this.dooleService.getAPIFormsByDate(params).subscribe(
      async (res: any) =>{
        console.log('[Form_listPage] getFormsListByDate()', await res);
        
        if(res.success){
          this.listForms = []
         
         // this.listForms = res.forms;
          //this.items = res.dietIntakes
          console.log('[Form_listPage] getFormsListByDate(dietIntakes)', await this.listForms);
         this.groupDiagnosticsByDate(res.forms)


          console.log("VERIFY DIETS")
        }

       },(err) => {
          console.log('[Form_listPage] getFormsListByDate() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)

          throw err;
      }, ()=>{
      });
  }
  
  transformDate2(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  groupDiagnosticsByDate(forms) {
      
    forms.forEach((form) => {
      let date = this.selectDayPeriod(form.from_date);
      form.period = date;
      this.listForms.push(form);
    });
    console.log("[Form_listPage] groupDiagnosticsByDate()", this.listForms);
  }
  
  selectDayPeriod(time) {
    
    let hour= new Date(time).getHours();
    //let h = time.split(":"); //new Date(time).getHours()
   // let hour = Number(h[0]);
    if (hour >= 6 && hour < 12) {
      return this.translate.instant("diary.morning");
    }
    if (hour == 12) {
      return this.translate.instant("diary.noon");
    }
    if (hour >= 13 && hour < 20) {
      return this.translate.instant("diary.aftenoon");
    }
    if (hour >= 20 && hour < 24) {
      return this.translate.instant("diary.night");
    }
    if (hour == 24 || hour == 0) {
      return this.translate.instant("diary.midnight");
    }
    if (hour > 0 && hour < 6) {
      return this.translate.instant("diary.dawning");
    }
    return this.translate.instant("diary.all_day");
  }


  /**TODAYS */

  getDateInPast(name, date){
    
    this.getIsDateInPast(date);
    if(name !== this.Lasttimestring){
      this.Lasttimestring = name;
      return true
    }else{
      this.Lasttimestring = name;
      return false
    }
  }

  getIsDateInPast(date){
    
    const dateToCompare = new Date(date);
    this.isDateInPast = dateToCompare < this.currentDate;
    return this.isDateInPast

  }

  getCurrentDate() {    
    // Obtener la fecha actual en el mismo formato que content.date
    this.currentDate = new Date();
    // ... Realizar cualquier formato necesario para que coincida con content.date
    return this.currentDate;
}

selectTime(time){
      
  let timeMeals;
  let hour = new Date(time).getHours()// time.split(':')  //new Date(time).getHours()
 // let minute = Number(h[1])
 // let hour = Number(h[0]) + minute/60
  if(hour >= 6  && hour <= 12){
    timeMeals= this.translate.instant("diary.morning");
  }
  if (hour == 12) {
    timeMeals= this.translate.instant("diary.noon");
  }
  if(hour >= 13 && hour < 20) {
    timeMeals=  this.translate.instant("diary.aftenoon");
  }
  if (hour >= 20 && hour < 24) {
    timeMeals= this.translate.instant("diary.night");
  }
  if (hour == 24 || hour == 0) {
    timeMeals=  this.translate.instant("diary.midnight");
  }
  if (hour > 0 && hour < 6) {
    timeMeals=  this.translate.instant("diary.dawning");
  }
 // timeMeals=  this.translate.instant("diary.all_day");

 return timeMeals
 
     
  
}


}