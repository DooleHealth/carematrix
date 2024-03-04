import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ContentTypePath } from 'src/app/models/shared-care-plan';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { PermissionService } from 'src/app/services/permission.service';
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
    //this.getFormList();
    //this.locale = this.dateService.getLocale();
  }


  ionViewWillEnter() {
    this.canDoForm = this.authService?.user?.familyUnit == null && this.permissionService.canViewForms;
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
          type: "forms",
          description: "", //element.frequencyName,
          id: element.id,
          model_id: element.id,
          model: modelType,
          showAlert: this.showAlert(element.from_date),
          routerLink: null,
          hasFormAnswered: element.hasFormAnswered,
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
        if (this.permissionService.canViewForms) await this.getFormsListByDate()
        break;
      case 'forms':
        if (this.permissionService.canViewPlanningForms) await this.getFormList()
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
        
        if(res){
          this.listForms = []
         this.groupDiagnosticsByDate(res)


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
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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
          newForm.period = date;
          newForm.time = element.time;
          this.listForms.push(newForm);
          
        });
       
      }else{
        form.period = this.selectDayPeriod(form.formProgrammationTimes[0].time);
        form.time = form.formProgrammationTimes[0].time

      this.listForms.push(form);
      }
      


    });
    this.listForms.sort((a, b) => {
      // Convertir los valores de tiempo a objetos Date para comparar
      const timeA = new Date('1970-01-01 ' + a.time);
      const timeB = new Date('1970-01-01 ' + b.time);

      // Comparar los tiempos y devolver el resultado de la comparación
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }
      return 0;
    });
    console.log("[Form_listPage] groupDiagnosticsByDate()", this.listForms);
  }
 
  selectDayPeriod(time) {
    
    //let hour= new Date(time).getHours();
    let h = time.split(":"); //new Date(time).getHours()
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
  if (this.canDoForm && content.type === "forms") {
    if (content.showAlert) this.alertForm();
    else this.router.navigate([ContentTypePath.FormDetail, { id: content.form_id }], { state: { game_play_id: content.data?.game_play_id, form_programmation_id: content.id } });
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
  console.log("saber que devuelve el getLastName", isDifferent)
  return isDifferent;
}

    updateLastTimeString(name) {
      this.Lasttimestring = name;
     
    }
}