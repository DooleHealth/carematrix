import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { Router } from '@angular/router';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';
import { DateService } from 'src/app/services/date.service';
import { RolesService } from 'src/app/services/roles.service';
import { AddButtonList, ContentTypePath } from 'src/app/models/shared-care-plan';
import { DrugAddPage } from '../drug-add/drug-add.page';
import { DrugsDetailPage } from '../drugs-detail/drugs-detail.page';
import { PermissionService } from 'src/app/services/permission.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  segment = "today"
  @Input()event: any;
  items = []
  isLoading:boolean = true
  id:any
  isSubmitted = false;
  isDateInPast = false;
  currentDate;
  Lasttimestring="";
  lastName;
  date = Date.now();
  listDrugIntakes = [];
  listDrug = [];
  addButton = AddButtonList;
  CanDoMedication: boolean
  public lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    private router: Router,
    public role: RolesService,
    private datePipe: DatePipe,
    public sharedCarePlan:SharedCarePlanService, 
    public dateService: DateService,
    public permissionService: PermissionService,
    public authService: AuthenticationService,

  ) {
    this.lifeStyle = new LifeStyle( NotificationsType.MEDICATIONS, "medication")
  }

  ngOnInit() {
    this.CanDoMedication = this.authService?.user?.familyUnit == null && this.permissionService.canViewGoals;
    this.items = []
    this.listDrugIntakes = []
  }

  ionViewWillEnter(){
   this.getCurrentDate();
   this.segmentChanged()
  }

  loaderAgain(event: { type: string }) {  
    this.loadData()
  }


 async loadData(){

    this.items = [] 
    this.isLoading = true; 
   // this.adapterForView(aaa),
   // this.isLoading = false
    this.sharedCarePlan.get_APi_ACP_medication().subscribe( 
   // this.dooleService.getAPImedicationAlls().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadData()', await data);
        if(data){   

          this.adapterForView(data)
         /* this.items = this.exerLifeStyle.adapterForView(
            data.medication, // JSON
            'cover',  //img
            'name',   //title
            'id')     //id*/
         }
        
       },(err) => {
          console.log('[MedicationPage] loadData() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      }, ()=>{
        this.isLoading = false
      });

  }

    async presentAlert() {

      this.translate.get('info.button').subscribe(
        async button => {
          // value is our translated string
          const alert = await this.alertController.create({
            cssClass: "alertClass",
            header: this.translate.instant('info.title'),
            // subHeader: 'Subtitle',
            //message: this.messages.message,
            buttons: [button]
          });

          await alert.present();
        });

    }

   
   
    transformDate(date) {
          if(date != null){
            return this.datePipe.transform(date, 'dd-MM-yyyy');
      }else{
        return ""
      }
   
    }

    accepterOrDecline(datos){
      if(datos === null){
        return false;
      }else{
        return true;
      }
    }
  

    adapterForView(list){
      if(list.length > 0)
      list.forEach(element => {  
         
      //Se adapta la respuesta de la API a lo que espera el componente  
        let data={
          img: element.cover.temporaryUrl,
          title: element.drup_name,
          from:  this.transformDate(element.from_date),
          to:  this.transformDate(element.to_date),
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "medication",// NotificationsType.MEDICATIONS,
          description:  element.frequency_string,
          id:element.id,
          model_id:element.model_id,
          model:element.model,
          state: element?.last_accepted_or_declined?.type
        }
        console.log("sss", data)
        this.items.push(data)
      })
    }


    async segmentChanged($event?){
      console.log('[MedicationPage] segmentChanged()', this.segment, $event);
      this.items = []
      switch (this.segment) {
        case 'today':
          await this.getDrugIntakeList()
          break;
        case 'medication':
          await this.loadData()
          break;
        default:
          console.log('Segment not found');
          break;
      }
    }

    updateLastName(time) {
      const meal = this.selectMealTime(time);
      if (this.lastName !== meal) {
        this.lastName = meal;
      }
      return meal
    }

    selectMealTime(time){
      
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
  
   
getPeriod(name) {
  if (!this.Lasttimestring) {
      this.Lasttimestring = name; // Si Lasttimestring está vacío, establece su valor al primer elemento
      return true; // Siempre muestra el primer elemento
  }
  const isDifferent = name !== this.Lasttimestring;
  if (isDifferent) {
      this.updateLastTimeString(name);
  }
  //console.log("saber que devuelve el getLastName", isDifferent)
  return isDifferent;
}

    updateLastTimeString(name) {
      this.Lasttimestring = name;
     
    }
    getIsDateInPast(date){
      this.isDateInPast = new Date(date) < this.currentDate;
      return this.isDateInPast
    }

    async getDrugIntakeList() {
      let formattedDate = this.transformDate(this.date);
      let date = { date: formattedDate };
      this.dooleService.getAPIdrugIntakeByDate(date).subscribe(
        async (res: any) => {
          console.log("[MedicationPage] getDrugIntakeList()", await res);
          this.listDrugIntakes = [];
          let list = res?.drugIntakes;
          if (list) {
            console.log("[MedicationPage] getDrugIntakeList() listDrugIntakes", this.listDrugIntakes);
            list = this.sortDate(list);
            this.groupDiagnosticsByDate(list);
          }
        },
        (err) => {
          console.log(
            "[MedicationPage] getDrugIntakeList() ERROR(" +
              err.code +
              "): " +
              err.message
          );
          throw err;
        },
        () => {
         // this.isLoadingDrugs = false;
        }
      );
    }


    sortDate(drugs) {
      return drugs.sort(function (a, b) {
        if (a.hour_intake > b.hour_intake) return 1;
        if (a.hour_intake < b.hour_intake) return -1;
        return 0;
      });
    }

    groupDiagnosticsByDate(drugs){
      drugs.forEach( (drug, index) =>{
        drug.item_type = "medication"
        let date = this.selectDayPeriod(drug.hour_intake)
        if(index == 0 || date !== this.selectDayPeriod(drugs[index-1].hour_intake)){
          let list = drugs.filter( event =>
            (this.selectDayPeriod(event.hour_intake) === date)
          )
          this.listDrugIntakes.push({date: date, itemDrugs: list})
        }
      })
      console.log('[MedicationPage] groupDiagnosticsByDate()', this.listDrugIntakes);
    }


    // groupDrugByDate(drugs) {
      
    //   drugs.forEach((drug) => {
    //     let date = this.selectDayPeriod(drug.hour_intake);
    //     drug.period = date;
    //     drug.item_type = "medication"
    //     this.items.push(drug);
    //   });

    //   console.log("[MedicationPage] groupDiagnosticsByDate()", this.items);
     
    // }
    
    selectDayPeriod(time) {
      let h = time.split(":"); //new Date(time).getHours()
      let hour = Number(h[0]) + Number(h[1]/60);
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


    changeTake(event){
    let taked = event.taked;
    let id= event.id;
          taked=(taked=="0") ? "1" : "0";
          var dict = [];
          dict.push({
              key:   "date",
              value: ""
          });
          this.dooleService.postAPIchangeStatedrugIntake(id,taked).subscribe(json=>{
            console.log('[MedicationPage] changeTake()',  json);
            this.getDrugIntakeList()
          },(err) => {
            console.log('[MedicationPage] changeTake() ERROR(' + err.code + '): ' + err.message);
            alert( 'ERROR(' + err.code + '): ' + err.message)
            throw err;
        });
        }

        getCurrentDate() {    
          // Obtener la fecha actual en el mismo formato que content.date
          this.currentDate = new Date();
          // ... Realizar cualquier formato necesario para que coincida con content.date
          return this.currentDate;
      }



  async addDrugPlan(drug, id){
    console.log('[MedicationPage] addDrugPlan()',  drug);
    const modal = await this.modalCtrl.create({
      component:  DrugsDetailPage,
      componentProps: { drug: drug, id: id},
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('addDrugPlan()', result);

        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action !== undefined){
          this.notification.displayToastSuccessful()
          this.segmentChanged()
        }
      });

      await modal.present();
    }

  
  }
