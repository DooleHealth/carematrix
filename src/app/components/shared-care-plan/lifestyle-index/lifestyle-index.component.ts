import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GoalState, GoalStateType, SharedCarePlanLifeStyle } from 'src/app/models/shared-care-plan';
import { DateService } from 'src/app/services/date.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';

@Component({
  selector: 'app-lifestyle-index',
  templateUrl: './lifestyle-index.component.html',
  styleUrls: ['./lifestyle-index.component.scss'],
})
export class LifestyleIndexComponent  implements OnInit {
  @Input() content: SharedCarePlanLifeStyle
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();
  state: GoalState;
  alert: boolean = false;
  isPending: boolean = true;
  constructor(
    public translate: TranslateService, public alertController: AlertController,public dateService: DateService, public sharedCarePlan:SharedCarePlanService,
  ) {
   
  }

  ngOnInit() {
    console.log(this.content)    
  }

  goTo(type: any){ 
      this.redirect.emit({type: type})
   
}
async presentAlert(event: Event) {
  this.alert = true;
  let model= ""; //this.content?.model;
  let model_id= "";//this.content.model_id; 

  this.translate.get('info.button').subscribe(
   
    async button => {
      // value is our translated string
      const alert = await this.alertController.create({
        cssClass: "alertClass",
        header: this.translate.instant('medication.accepted_rejectedExercises'),
        buttons: [
          {
            text: this.translate.instant('medication.button_rejected'), 
            cssClass: "boton-reject",
            handler: () => {
              // Lógica para rechazar                         
             
              this.dismissAndRejectAlert(model, model_id);
            }
          },
          {
            text: this.translate.instant('medication.button_accepted'), 
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
   // event.stopPropagation();
}

async dismissAndRejectAlert(model, model_id) {
  let type= "declined"   
  const alert = await this.alertController.create({
    cssClass: 'alertClass',
    header: this.translate.instant('medication.rejected'),
    inputs: [
      {
        label: this.translate.instant('medication.rejectd_option1'),
        type: 'radio',
        value:  this.translate.instant('medication.rejectd_option1'),
        name: 'rejectOption'
      },
      {
        label: this.translate.instant('medication.rejectd_option2E'),
        type: 'radio',
        value:  this.translate.instant('medication.rejectd_option2E'),
        name: 'rejectOption'
      },{
        label: this.translate.instant('medication.rejectd_option3'),
        type: 'radio',
        value:  this.translate.instant('medication.rejectd_option3'),
        name: 'rejectOption'
      },
      {
        name: 'campoInput',
        id: 'campoInput',
        type: 'textarea',
        disabled: true,
        placeholder: this.translate.instant('medication.placeholder'),
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
        header: this.translate.instant('medication.rejectd_send'),
        // subHeader: 'Subtitle',
      //  message: this.translate.instant('medication.alert_forms'),
        buttons: [button]
      });

      await alert.present();
    });


}
}
