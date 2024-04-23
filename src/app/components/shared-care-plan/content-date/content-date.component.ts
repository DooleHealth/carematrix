import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ContentTypePath, SharedCarePlanProcedure } from 'src/app/models/shared-care-plan';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DateService } from 'src/app/services/date.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-content-date',
  templateUrl: './content-date.component.html',
  styleUrls: ['./content-date.component.scss'],
})
export class ContentDateComponent implements OnInit {
  @Input() content: any
  @Output() redirect: EventEmitter<any> = new EventEmitter<any>();
  @Output() takeMedication: EventEmitter<any> = new EventEmitter<any>();

  date: string;
  dates= [];
  constructor(public dateService: DateService, private router: Router,
    public translate: TranslateService, public alertController: AlertController, public authService: AuthenticationService, public permissionService: PermissionService) {

  }

  ngOnInit() {
   
    this.setDate()
   
  }

  goTo(content){

    if(content?.type === 'forms') {
      if (content?.status != 1) {
        this.redirect.emit({type: content})
      }
      else {
        this.alertForm();
      }
    } 
    else {
      this.redirect.emit({type: content})
    }
  }

  async alertForm() {

    this.translate.get('info.button').subscribe(
      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: this.translate.instant('form.alert_form_answered'),
          // subHeader: 'Subtitle',
          message: this.translate.instant('form.alert_forms'),
          buttons: [button]
        });

        await alert.present();
      });


  }

    

  setDate(){
    if(this.content?.date_intake != null){
      this.date = this.dateService.getFormatTime(this.content?.date_intake)
    }else{  
        let [hour, minute, second] = this.content.time.split(':').map(Number);   
        let fecha: Date = new Date();
                fecha.setHours(hour);
                fecha.setMinutes(minute);
                fecha.setSeconds(second);
                this.date=this.dateService.getFormatTime(fecha) 
    }
   
  }



  setFormatDate(date){
   return this.dateService.getDateMonDay(date)
  }

  changeTake(id,taked){
    this.takeMedication.emit({id: id, taked: taked})
  }


}
