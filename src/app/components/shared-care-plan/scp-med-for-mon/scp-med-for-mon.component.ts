import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SharedCarePlanLifeStyle, medication } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-scp-med-for-mon',
  templateUrl: './scp-med-for-mon.component.html',
  styleUrls: ['./scp-med-for-mon.component.scss'],
})
export class ScpMedForMonComponent  implements OnInit {
  @Input() content: medication
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public translate: TranslateService, public alertController: AlertController
  ) { }

  ngOnInit() {}

  goTo(type: any){   
    this.redirect.emit({type: type})   
}

async presentAlert() {
      
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
              this.dismissAndRejectAlert();
            }
          },
          {
            text: this.translate.instant('medication.button_accepted'), 
            cssClass: "boton-accepted",
            handler: () => {
              // Lógica para manejar aceptar
            }
          }
        ]
      });
  
      await alert.present();
    });
  
}


 
async dismissAndRejectAlert() {
  const alert = await this.alertController.create({
    cssClass: 'alertClass',
    header: this.translate.instant('medication.rejected'),
    inputs: [
      {
        name: 'campoInput',
        type: 'textarea',
        placeholder: 'Escribe algo aquí',
        cssClass: 'custom-textarea'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Botón Cancelar presionado');
        }
      },
      {
        text: 'Aceptar',
        handler: (data) => {
          console.log('Botón Aceptar presionado', data.campoInput);
          // enviar a la api, lo que se escribe ademas de el id del medicamento que viene por el content.id
        }
      }
    ]
  });

  // Cerrar el primer alert antes de mostrar el segundo
  const firstAlert = document.querySelector('ion-alert');
  if (firstAlert) {
    await firstAlert.dismiss();
  }

  await alert.present();
}
}
