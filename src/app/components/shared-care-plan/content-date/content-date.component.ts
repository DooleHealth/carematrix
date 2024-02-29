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

  canDoForm:boolean = false;
  date: string;
  constructor(public dateService: DateService, private router: Router,
    public translate: TranslateService, public alertController: AlertController, public authService: AuthenticationService, public permissionService: PermissionService) {

  }

  ngOnInit() {
    this.canDoForm = this.authService?.user?.familyUnit == null && this.permissionService.canViewForms;

    console.log("que llego aca", this.content)
    this.setDate()
  }

  goTo(content){
    
    if(content != undefined){
      if (this.canDoForm && content.type === "forms") {
        if (content.showAlert) this.alertForm();
        else this.router.navigate([ContentTypePath.FormDetail, { id: content.form_id }], { state: { game_play_id: content.data?.game_play_id, form_programmation_id: content.form_programmation_id } });
      }
    
    else{
      this.redirect.emit({type: content})
    }
  }
    
  }

  setDate(){

    if(this.content?.date_intake != null){
      this.date = this.dateService.getFormatTime(this.content?.date_intake)
    }else{
      this.date = this.dateService.getFormatTime(this.content?.from_date)
    }
   
  }

  setFormatDate(date){
   return this.dateService.getDateMonDay(date)
  }

  changeTake(id,taked){
this.takeMedication.emit({id: id, taked: taked})

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
}
