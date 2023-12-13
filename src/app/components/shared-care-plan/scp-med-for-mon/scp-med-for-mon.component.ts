import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SharedCarePlanLifeStyle, medication } from 'src/app/models/shared-care-plan';
import { DateService } from 'src/app/services/date.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-scp-med-for-mon',
  templateUrl: './scp-med-for-mon.component.html',
  styleUrls: ['./scp-med-for-mon.component.scss'],
})
export class ScpMedForMonComponent  implements OnInit {
  @Input() content: medication
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
   routerLink: any[];
  getrouter;
  public isButtonEnabled = false;
  constructor(
    public translate: TranslateService, public alertController: AlertController, public sharedCarePlan:SharedCarePlanService, public dateService: DateService
  ) { }

  ngOnInit() {
   // this.getrouter=this.getRouterLink()
  }

  async goTo(type: any, form_id: any,  showAlerts) {   
      // If routerLink is not null, emit the redirect event
      this.redirect.emit({ type: type, form_id,  showAlerts });
    }
 
  

  async getRouterLink(type: string, form_id: any): Promise<any[]> {    
 
    if (type === "App\\Form") {  
      return ['form', { id: form_id }];
     
    } if(type === "App\\Monitoring") {
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
  let model= this.content?.model;
  let model_id= this.content.model_id; 

  this.translate.get('info.button').subscribe(
   
    async button => {
      // value is our translated string
      const alert = await this.alertController.create({
        cssClass: "alertClass",
        header: this.translate.instant('medication.accepted_rejected'),
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
              let type= "acepted"              
              this.sharedCarePlan.post_API_ACP_declined_acepted(model,model_id,type).subscribe()
              // Lógica para manejar aceptar
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
    header: this.translate.instant('medication.rejected'),
    inputs: [
      {
        label: 'Option 1',
        type: 'radio',
        value: 'red',
      },
      {
        label: 'Option 2',
        type: 'radio',
        value: 'blue',
      },{
        label: 'Option 3',
        type: 'radio',
        value: 'other',
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
          console.log('Botón Aceptar presionado', data.campoInput);
         // const comentsInput = document.getElementById('campoInput') as HTMLTextAreaElement;
          let comments = data.campoInput || '';
          if(comments != ''){
            await this.sharedCarePlan.post_API_ACP_declined_acepted(model, model_id, type, comments).toPromise();
            this.alertSendReject()}


}
}
]
}); 

alert.addEventListener('ionChange', (event) => {
  const selectedValue = (event.target as HTMLInputElement).value;
  const campoInput = alert.inputs.find(input => input.name === 'campoInput');

  // Enable campoInput if 'other' is selected, otherwise disable it
  console.log("ssssss")
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
