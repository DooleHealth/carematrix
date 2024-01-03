import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { ContentTypePath, GoalState, GoalStateType, SharedCarePlanLifeStyle, medication } from 'src/app/models/shared-care-plan';
import { DateService } from 'src/app/services/date.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-scp-med-for-mon',
  templateUrl: './scp-med-for-mon.component.html',
  styleUrls: ['./scp-med-for-mon.component.scss'],
})
export class ScpMedForMonComponent  implements OnInit {

  @Input() segment: string;

  @Input() content: medication
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();
  routerLink: any[];
  getrouter;
  other= false;
  state: GoalState;
  isPending: boolean = true;
  public isButtonEnabled = false;
  constructor(
    public translate: TranslateService, public alertController: AlertController, public sharedCarePlan:SharedCarePlanService, public dateService: DateService
  ) { }

  ngOnInit() {
    console.log('[ScpMedForMonComponent] ngOnInit()', this.content);
    if(this.content.type === this.segment){
      this.state = new GoalState(this.content?.state)
      this.isPending = this.state?.state === GoalStateType.PENDING? true:false
    }


  }

  async goTo(type: any, form_id: any,  showAlerts) { 
   
      if(this.other != true){
       // if (type === "App\\Form") {  
        this.other = false;
      this.redirect.emit({ type: type, form_id,  showAlerts });
     // }
    }else{
      if (type != "App\\Form") { 
      this.redirect.emit({ type: type, form_id,  showAlerts });
    }
  }
      // If routerLink is not null, emit the redirect event
     
    }
 
  

  async getRouterLink(type: string, id: any): Promise<any[]> {    
 
    if (type === "form") {  
      return [ContentTypePath.FormDetail, { id: id }];
    } 
    else if (type === 'exercises') {
      return [ContentTypePath.ExercisesDetail, { id: id }];
    }
    if(type === "App\\Monitoring") {
      return ["activity-goal"]
    } 
}

async alertForm(){

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


async presentAlert() {
  this.other= true;
  let model= this.content?.model;
  let model_id= this.content.model_id; 

  this.translate.get('info.button').subscribe(
   
    async button => {
      // value is our translated string
      const alert = await this.alertController.create({
        cssClass: "alertClass",
        header: this.translate.instant(this.segment+'.accepted_rejected'),
        buttons: [
          {
            text: this.translate.instant(this.segment+'.button_rejected'), 
            cssClass: "boton-reject",
            handler: () => {
              // Lógica para rechazar                         
              
              this.dismissAndRejectAlert(model, model_id);
            }
          },
          {
            text: this.translate.instant(this.segment+'.button_accepted'), 
            cssClass: "boton-accepted",
            handler: () => {
              let type= "accepted"            
              this.sharedCarePlan.post_API_ACP_declined_acepted(model,model_id,type).subscribe(              
                async (data: any) =>{
                  if(data){
                    this.dataUpdated.emit();
                  }
                  
                }
                
              )
             
            }
          }
        ]
      });
  
      await alert.present();
    });
  
}

 async showAlertForm() {

 }
 
async dismissAndRejectAlert(model, model_id) {
  let type= "declined"   
  const alert = await this.alertController.create({
    cssClass: 'alertClass',
    header: this.translate.instant(this.segment+'.rejected'),
    inputs: [
      {
        label: this.translate.instant(this.segment+'.rejectd_option1'),
        type: 'radio',
        value:  this.translate.instant(this.segment+'.rejectd_option1'),
        name: 'rejectOption',
        checked: true
      },
      {
        label: this.translate.instant(this.segment+'.rejectd_option2'),
        type: 'radio',
        value:  this.translate.instant(this.segment+'.rejectd_option2'),
        name: 'rejectOption'
      },{
        label: this.translate.instant(this.segment+'.rejectd_option3'),
        type: 'radio',
        value:  this.translate.instant(this.segment+'.rejectd_option3'),
        name: 'rejectOption'
      },
      {
        name: 'campoInput',
        id: 'campoInput',
        type: 'textarea',
        disabled: true,
        placeholder: this.translate.instant(this.segment+'.placeholder'),
        cssClass: 'custom-textarea'
      }
    ],
    buttons: [
      {
        text: this.translate.instant('alert.button_cancel'), 
        role: 'cancel',
        
        cssClass: 'secondary',
        handler: () => {
          console.log('Botón Cancelar presionado');
          this.other= false;
        }
      },
      {
        text: this.translate.instant('alert.button_send'), 
        id: "sendButtons",
        
       // disabled: !this.isButtonEnabled,
        handler: async (data) => {
          console.log('[ScpMedForMonComponent] presentAlert()', data); 
          if(data === undefined) 
          return false
          this.alertSendReject()
                  
            await this.sharedCarePlan.post_API_ACP_declined_acepted(model, model_id, type, data).subscribe(
              
              async (data: any) =>{
                
                if(data){
                  this.dataUpdated.emit();
                  this.other= false;
                }
                
              }
              
            )
           


}
}
]
}); 

alert.addEventListener('ionChange', (event) => {
  const selectedValue = (event.target as HTMLInputElement).value;
  const campoInput = alert.inputs.find(input => input.name === 'campoInput');

  // Enable campoInput if 'other' is selected, otherwise disable it
  campoInput.disabled = selectedValue !== 'other';
});

  // Cerrar el primer alert antes de mostrar el segundo
  const firstAlert = document.querySelector('ion-alert');
  if (firstAlert) {
    await firstAlert.dismiss();
  }

  await alert.present();
}

async alertSendReject(){

  this.translate.get('info.button').subscribe(
    async button => {
      // value is our translated string
      const alert = await this.alertController.create({
        cssClass: "alertClass",
        header: this.translate.instant(this.segment+'.rejectd_send'),
        // subHeader: 'Subtitle',
      //  message: this.translate.instant('medication.alert_forms'),
        buttons: [button]
      });

      await alert.present();
    });


}

}
