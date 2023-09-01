import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-alarm-form',
  templateUrl: './alarm-form.page.html',
  styleUrls: ['./alarm-form.page.scss'],
})
export class AlarmFormPage implements OnInit {
  goalsAssetsAlarms = ['assets/icons/icon_information.svg', 'assets/icons/icon_atencion.svg', 'assets/icons/icon_warning.svg']
  color = ['#0097b3','#E43A3F','#fa9804','#5fb5b6']
  @Input()data: any;
  @Input()result: boolean;
  @Input()source: string;
  alarms : any = [];
  formRedirect: string;
  formRedirectId = [];
  formTitle: string;
  messageAnswer :string;
  imgAnswer = "assets/icons/icon_exito.svg"
  score
  constructor(
    private modalCtrl: ModalController,
    private translate: TranslateService,
  ) {
    this.messageAnswer = this.translate.instant('form.send_success');
   }

  ngOnInit() {
    //console.log('[InfoFormPage] ngOnInit()');
    if(this.data){
      this.formRedirect = this.data.formRedirect;
      this.formRedirectId = this.data.formRedirectId;
      this.formTitle = this.data.formTitle;
      this.score = this.data.score;
      this.getScreenMessage()
    }
    if(!this.result){
      this.messageAnswer = this.translate.instant('form.send_error');
      this.imgAnswer = "assets/icons/icon_cerrar_rojo.svg";
    }
  }

  getScreenMessage(){
    if(Array.isArray(this.data?.alarms) && this.data?.alarms.length > 0 )
    this.data?.alarms.forEach(alarm => {
      alarm.screenMessage = alarm.screenMessage //.replace(/<\/?[^>]+(>|$)/g, "")
      switch (alarm.color) {
        case 'danger':
          alarm['src'] = this.goalsAssetsAlarms[1];
          alarm['colorHex'] = this.color[1]
          break;
        case 'warning':
          alarm['src'] = this.goalsAssetsAlarms[2];
          alarm['colorHex'] = this.color[2]
          break;
        default:
          alarm['src'] = this.goalsAssetsAlarms[0];
          alarm['colorHex'] = this.color[0]
          break;
      }

      this.alarms.push(alarm) ;
    });
  }

  goFormRedirect(){
    console.log('[InfoFormPage] close()');
    this.modalCtrl.dismiss({formRedirect: this.formRedirect});
  }

  close() {
    console.log('[InfoFormPage] close()');
    this.modalCtrl.dismiss({error:null});
  }

}
