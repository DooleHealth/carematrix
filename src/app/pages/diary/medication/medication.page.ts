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
     let dat = [{
            "id": 551,
            "from_date": "2022-02-16 00:00:00",
            "to_date": "2022-11-02 14:45:00",
            "frequency": "daily",
            "frequencyName": "Cada día",
            "last_accepted_or_declined": "null",
            /*"last_accepted_or_declined": {
              "id": 10792,
              "user_id": 470,
              "target_type": "App\\MedicationPlan",
              "target_id": 551,
              "type": "declined",
              "value": "Lo he rechazado desde API",
              "date": "2023-11-28 15:21:56",
              "created_at": "2023-11-28T14:21:56.000000Z",
              "updated_at": "2023-11-28T14:21:56.000000Z",
              "deleted_at": null
            },*/
            "drug": {
              "id": 470,
              "name": "AMOXICILINA/ACIDO CLAVULANICO NORMON 875 mg/125 mg POLVO PARA SUSPENSION ORAL EN SOBRES EFG , 500 sobres"
            }
          }];
    this.adapterForView(dat)
    
    /*
    this.dooleService.getAPImedicationAlls().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadData()', await data);
        if(data){
          let dat : {
            "id": 551,
            "from_date": "2022-02-16 00:00:00",
            "to_date": "2022-10-02 14:45:00",
            "frequency": "daily",
            "frequencyName": "Cada día",
            "last_accepted_or_declined": {
              "id": 10792,
              "user_id": 470,
              "target_type": "App\\MedicationPlan",
              "target_id": 551,
              "type": "declined",
              "value": "Lo he rechazado desde API",
              "date": "2023-11-28 15:21:56",
              "created_at": "2023-11-28T14:21:56.000000Z",
              "updated_at": "2023-11-28T14:21:56.000000Z",
              "deleted_at": null
            },
            "drug": {
              "id": 470,
              "name": "AMOXICILINA/ACIDO CLAVULANICO NORMON 875 mg/125 mg POLVO PARA SUSPENSION ORAL EN SOBRES EFG , 500 sobres"
            }
          }
          this.adapterForView(dat)
         /* this.items = this.exerLifeStyle.adapterForView(
            data.medication, // JSON
            'cover',  //img
            'name',   //title
            'id')     //id*/
     /*    }
        
      /* },(err) => {
          console.log('[MedicationPage] loadData() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      }, ()=>{
        this.loadingList = false
      });
*/
  }

  
  goTo(){  
    console.log("prueba") 
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
      if(datos.length){
        return false;
      }else{
        return true;
      }
    }
  

    adapterForView(list){
      list.forEach(element => {       
      //Se adapta la respuesta de la API a lo que espera el componente  
        let data={
          img: element.cover,
          title: element.drug.name,
          //from: this.transformDate(element.from_date),
         // to: this.transformDate(element.to_date),
         from: element.from_date,
          to: element.to_date,
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "medication",
          description:  element.frequencyName,
          id:element.id,
          //routerlink: "new-detail"
        }
        this.items.push(data)
      })
    }


  }
