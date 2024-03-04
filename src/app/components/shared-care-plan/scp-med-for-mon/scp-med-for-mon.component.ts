import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsType } from 'src/app/models/notifications/notification-options';
import { ContentTypePath, GoalState, GoalStateType, SharedCarePlanLifeStyle, medication } from 'src/app/models/shared-care-plan';
import { DateService } from 'src/app/services/date.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-scp-med-for-mon',
  templateUrl: './scp-med-for-mon.component.html',
  styleUrls: ['./scp-med-for-mon.component.scss'],
})
export class ScpMedForMonComponent implements OnInit {

  @Input() segment: string;
  @Input() content: medication
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();

  canDoForm:boolean = false;


  routerLink: any[];
  getrouter;
  other = false;
  state: GoalState;
  isPending: boolean = true;
  public isButtonEnabled = false;
  constructor(
    public translate: TranslateService, public alertController: AlertController, public sharedCarePlan: SharedCarePlanService, public dateService: DateService,
    private router: Router,public authService: AuthenticationService, public permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.canDoForm = this.authService?.user?.familyUnit == null && this.permissionService.canViewForms;

    console.log('[ScpMedForMonComponent] ngOnInit()', this.content);
    if (this.content.type === this.segment) {
      this.state = new GoalState(this.content?.state)
      this.isPending = this.state?.state === GoalStateType.PENDING ? true : false
    }


  }

  async goTo(content:any) {
    if (this.canDoForm && content.type == "forms") {
      if (content.showAlert) this.alertForm();
      else this.router.navigate([ContentTypePath.FormDetail, { id: content.form_id }], { state: { game_play_id: content.data?.game_play_id, form_programmation_id: content.form_programmation_id } });
    }

    if (content.type == "Exercises") {
      this.router.navigate([ContentTypePath.ExercisesDetail], { state: {id: content.id, programable_id: content.programable_id}});
    }
    
    if (content.type == "App\\Monitoring") {
      this.router.navigate([`/activity-goal`], { state: { id: content.form_id, header: content.title }});
    }

    this.redirect.emit({type: content})
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


  async presentAlert() {
    this.other = true;
    let model = this.content?.model;
    let model_id = this.content.model_id;

    this.translate.get('info.button').subscribe(

      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: this.translate.instant(this.segment + '.accepted_rejected'),
          buttons: [
            {
              text: this.translate.instant(this.segment + '.button_rejected'),
              cssClass: "boton-reject",
              handler: () => {
                // Lógica para rechazar                         

                this.dismissAndRejectAlert(model, model_id);
              }
            },
            {
              text: this.translate.instant(this.segment + '.button_accepted'),
              cssClass: "boton-accepted",
              handler: () => {
                let type = "accepted"
                this.sharedCarePlan.post_API_ACP_declined_acepted(model, model_id, type).subscribe(
                  async (data: any) => {
                    if (data) {
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
    let type = "declined"
    const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: this.translate.instant(this.segment + '.rejected'),
      inputs: [
        {
          label: this.translate.instant(this.segment + '.rejectd_option1'),
          type: 'radio',
          value: this.translate.instant(this.segment + '.rejectd_option1'),
          name: 'rejectOption',
          checked: true
        },
        {
          label: this.translate.instant(this.segment + '.rejectd_option2'),
          type: 'radio',
          value: this.translate.instant(this.segment + '.rejectd_option2'),
          name: 'rejectOption'
        }, {
          label: this.translate.instant(this.segment + '.rejectd_option3'),
          type: 'radio',
          value: this.translate.instant(this.segment + '.rejectd_option3'),
          name: 'rejectOption'
        },
        {
          name: 'campoInput',
          id: 'campoInput',
          type: 'textarea',
          disabled: true,
          placeholder: this.translate.instant(this.segment + '.placeholder'),
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
            this.other = false;
          }
        },
        {
          text: this.translate.instant('alert.button_send'),
          id: "sendButtons",

          // disabled: !this.isButtonEnabled,
          handler: async (data) => {
            console.log('[ScpMedForMonComponent] presentAlert()', data);
            if (data === undefined)
              return false
            this.alertSendReject()

            await this.sharedCarePlan.post_API_ACP_declined_acepted(model, model_id, type, data).subscribe(

              async (data: any) => {

                if (data) {
                  this.dataUpdated.emit();
                  this.other = false;
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

  async alertSendReject() {

    this.translate.get('info.button').subscribe(
      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: this.translate.instant(this.segment + '.rejectd_send'),
          // subHeader: 'Subtitle',
          //  message: this.translate.instant('medication.alert_forms'),
          buttons: [button]
        });

        await alert.present();
      });


  }


  SeeAnswers(event: any, content: any){
    event.stopPropagation();
    this.router.navigate(['/tracking/answers'], {state:{id: content.form_id, title: content.title}});
      }
     

      handleImageError(event: any, contentType: string) {
        if (contentType === 'forms') {
          event.target.src = '/assets/images/shared-care-plan/forms.png';
        } else if (contentType === 'Exercises') {
          event.target.src = '/assets/images/shared-care-plan/exercises.png';
        } else if (contentType === 'App\\Monitoring') {
          event.target.src = '/assets/images/shared-care-plan/healthcharts.png';
        }
        else{
          event.target.src = '/assets/images/shared-care-plan/medication.png';
        }
      }

      transformDate(date) {
  
        if (date != null) {
          return this.dateService.formatDateLongFormat(date)
        } else {
          return ""
        }
      
      }
}
