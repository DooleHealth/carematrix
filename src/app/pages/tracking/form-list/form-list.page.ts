import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  forms: Array<any>;
  items = [];
  isLoading = false;
  locale;
  constructor(
    private dooleService: DooleService,
    public loadingCtrl: LoadingController,
    public sharedCarePlan: SharedCarePlanService,
    private datePipe: DatePipe,
    private dateService: DateService,
    public translate: TranslateService, public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getFormList();
    this.locale = this.dateService.getLocale();
  }


  async getFormList() {
    this.sharedCarePlan.get_APi_ACP_forms().subscribe(
      async (res: any) => {
        console.log("formularios", res)
        this.forms = []
        this.forms = res
        this.adapterForView(this.forms)
      }, async (err) => {
        alert(`Error: ${err.code}, Message: ${err.message}`)
        console.log('[TrackingPage] getDiagnosticTests() ERROR(' + err.code + '): ' + err.message);
        throw err;
      });
  }


  transformDate(date) {
    if (date != null) {
      return this.dateService.ddMMyFormat(date)
    } else {
      return ""
    }

  }

  showAlert(date) {
    return this.dateService.isToday(new Date(date))
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

  adapterForView(list) {
    if (Array.isArray(list)) {

      list.forEach(element => {
        let image = "";
        const temporaryUrl = element.media;
        if (temporaryUrl?.hasOwnProperty("temporaryUrl")) {
          image = temporaryUrl.temporaryUrl
        }

        // let show=this.IsAllowed(element.from_date);

        //Se adapta la respuesta de la API a lo que espera el componente  
        let data = {
          img: image,
          title: element.title,
          from: this.transformDate(element.from_date),
          to: this.transformDate(element.to_date),
          form_id: element.form_id,
          accepted: this.accepterOrDecline(element.last_accepted_or_declined), 
          type: "App\\Form",
          description: "", //element.frequencyName,
          id: element.id,
          showAlert: this.showAlert(element.from_date),
          routerLink: null,
          state: element?.last_accepted_or_declined?.type
        }


        console.log("cdata", data)
        this.items.push(data)
      })
    }
  }
  handleRedirect(event: { type: string, form_id: string, showAlerts: boolean }) {
    console.log("entro a la redireccion")
    if (event.showAlerts === true) {
      this.alertForm();
    } else {
      this.router.navigate([`/tracking/form`, { id: event.form_id }], { state: { data: null } });
    }
  }

  accepterOrDecline(datos){
    if(datos === null || datos === undefined){
      return false;
    }else{
      return true;
    }
  }
}