import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationsType } from 'src/app/shared/classes/notification-options';
import { Router } from '@angular/router';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  @Input()event: any;
  items = []
  isLoading:boolean = true
  id:any
  isSubmitted = false;
  loading : any;
  loadingList : any;

  public lifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    private router: Router,
    private datePipe: DatePipe,
    public sharedCarePlan:SharedCarePlanService, 
    public dateService: DateService,

  ) {
    this.lifeStyle = new LifeStyle( NotificationsType.MEDICATIONS, "medication")
  }

  ngOnInit() {
    console.log("mostrar")
   this.loadData()
  }


 async loadData(){
    console.log('hola');
    this.items = []   
    let id=  localStorage.getItem('userId');
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
        this.loadingList = false
      });

  }

  
  goTo(){  
    this.router.navigate(['/medication-details']);
    //this.router.navigate(['/medication-details']);
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
      return this.datePipe.transform(date, 'MMM d');
    }

    accepterOrDecline(datos){
      if(datos === null){
        return false;
      }else{
        return true;
      }
    }
  

    adapterForView(list){
      list.forEach(element => {       
      //Se adapta la respuesta de la API a lo que espera el componente  
        let data={
          img: element.cover.temporaryUrl,
          title: element.drup_name,
          from:  this.transformDate(element.start_date),  //(element.start_date),
          to: element.to_date,
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "medication",
          description:  element.frequency,
          id:element.id,
          model_id:element.model_id,
          model:element.model
          //routerlink: "new-detail"
        }
        this.items.push(data)
      })
    }


  }
