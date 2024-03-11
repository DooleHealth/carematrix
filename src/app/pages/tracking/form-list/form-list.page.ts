import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Form } from 'src/app/models/form';
import { ContentTypePath } from 'src/app/models/shared-care-plan';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { PermissionService } from 'src/app/services/permission.service';
import { RolesService } from 'src/app/services/roles.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';

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
  canDoForm:boolean = false
  constructor(
    private dooleService: DooleService,
    public loadingCtrl: LoadingController,
    public sharedCarePlan: SharedCarePlanService,
    private datePipe: DatePipe,
    private dateService: DateService,
    public translate: TranslateService, public alertController: AlertController,
    private router: Router,
    public role: RolesService,
    public authService: AuthenticationService,
    public permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.segment = 'today'
  }


  ionViewWillEnter() {
    this.canDoForm = (this.authService?.user?.familyUnit == undefined || this.authService?.user?.familyUnit == null) && this.permissionService.canViewForms;
    this.getCurrentDate();
    this.getFormsListByDate();
  }


  async getFormList() {
    this.items = [] 
    this.isLoading = true; 
    this.sharedCarePlan.get_APi_ACP_forms().subscribe(
      async (res: any) => {
        console.log("[FormListPage] getFormList(): ", res)
        this.forms = []
        this.forms = res
        this.adapterForView(this.forms)
        this.isLoading = false;
      }, async (err) => {
        //alert(`Error: ${err.code}, Message: ${err.message}`)
        console.error('[FormListPage] getFormList() ERROR(' + err.code + '): ' + err.message);
        this.isLoading = false;
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
      list.forEach(element => {
        
        let image = "";
        let isAnswers= false;
        const temporaryUrl = element.media;
        if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
          image = temporaryUrl.temporaryUrl
        }

        // let show=this.IsAllowed(element.from_date);

        //Se adapta la respuesta de la API a lo que espera el componente  

        if (element?.formAnswers) {
          if(element.formAnswers.length > 0){
            isAnswers= true;
          }
        }
        

        let modelType = element.content_type.replace(/App\\/, '')
        let data = {
          img: image,
          title: element.title,
          from: this.transformDate(element.from_date),
          to: this.transformDate(element.to_date),
          form_id: element.form_id,
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "forms",
          description: "", //element.frequencyName,
          id: element.id,
          model_id: element.id,
          model: modelType,
          showAlert: this.showAlert(element.from_date),
          routerLink: null,
          hasFormAnswered: element.hasFormAnswered,
          canViewFormAnswered: element.canViewFormAnswered,
          frequency: element.frequency,
          state: element?.last_accepted_or_declined?.type,
          form_programmation_id: element.formProgrammationTimes[0].form_programmation_id
        }
        this.items.push(data)
      })
    }
  }

  handleRedirect(event: { type: string, form_id: string, showAlerts: boolean }) {
    if (event.showAlerts === true) {
      this.alertForm();
    } else {
      this.router.navigate([`/tracking/form`, { id: event.form_id }], { state: { data: null } });
    }
  }

  accepterOrDecline(datos){
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
    this.items = []
    switch (this.segment) {
      case 'today':
        //await this.getDietList()
        if (this.permissionService.canViewForms) await this.getFormsListByDate()
        break;
      case 'forms':
        if (this.permissionService.canViewForms) await this.getFormList()
        break;
      default:
        console.log('[FormListPage] segmentChanged() Segment not found');
        break;
    }
  }
  
  async getFormsListByDate(){
    this.isLoading = true;
    let date  =  this.dateService.transformDateyyyyMMdd(this.date)
    const params = {date: date, grouped_by_times: true}
    this.dooleService.getAPIFormsByDate(params).subscribe(
      async (res: any) =>{
        console.log('[FormListPage] getFormsListByDate()', await res);
        
        if(res){
          this.listForms = []
          this.groupDiagnosticsByDate(res)
          this.isLoading = false;
        }

       },(err) => {
          console.error('[FormListPage] getFormsListByDate() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false;
          throw err;
      }, ()=>{
      });
  }

  groupDiagnosticsByDate(forms) {
      
    forms.forEach((form) => {
      
      form.type= "forms";
      const temporaryUrl = form.media;
      if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
        form.image = temporaryUrl.temporaryUrl
      }
      

      if(form.formProgrammationTimes.length > 1){
        form.formProgrammationTimes.forEach(element => {
          
          let newForm = { ...form };
          let date = this.selectDayPeriod(element.time);
          newForm.status = element.status;
          newForm.period = date;
          newForm.time = element.time;
          newForm.form_answer_id = element.form_answer_id;
          newForm.programmation_id = element.id;
          this.listForms.push(newForm);
          
        });
       
      }else{
        form.period = this.selectDayPeriod(form.formProgrammationTimes[0].time);
        form.time = form.formProgrammationTimes[0].time
        form.form_answer_id = form.formProgrammationTimes[0].form_answer_id
        form.status = form.formProgrammationTimes[0].status
        form.programmation_id = form.formProgrammationTimes[0].id
      this.listForms.push(form);
      }
      


    });

    this.listForms = Form.sortFormsByTimes(this.listForms)

  }
 
  selectDayPeriod(time) {
    let h = time.split(":");
    let hour = Number(h[0]);
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
  let times = time.split(':')  //new Date(time).getHours()
 // let minute = Number(h[1])
  let hour = Number(times[0])
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

goTo(content){
  console.log('[FormListPage] goTo() ', content)
  if (this.canDoForm && content.type === "forms") {
    if (content.showAlert) this.alertForm();
    else this.router.navigate([ContentTypePath.FormDetail, { id: content.form_id }], { state: { game_play_id: content.data?.game_play_id, form_programmation_id: content.id, form_answer_id: content?.form_answer_id } });
  }
}



getPeriodTime(name) {
  if (!this.Lasttimestring) {
      this.Lasttimestring = name; // Si Lasttimestring está vacío, establece su valor al primer elemento
      return true; // Siempre muestra el primer elemento
  }
  const isDifferent = name !== this.Lasttimestring;
  if (isDifferent) {
      this.updateLastTimeString(name);
  }

  return isDifferent;
}

    updateLastTimeString(name) {
      this.Lasttimestring = name;
     
    }
}