import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { VideoComponent } from 'src/app/components/video/video.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OpentokService } from 'src/app/services/opentok.service';
import { ElementsAddPage } from '../../tracking/elements-add/elements-add.page';
import { AgendaEditPage } from '../agenda-edit/agenda-edit.page';
import { ReminderAddPage } from '../reminder-add/reminder-add.page';
import { VideocallIframePage } from '../videocall-iframe/videocall-iframe.page';

@Component({
  selector: 'app-agenda-detail',
  templateUrl: './agenda-detail.page.html',
  styleUrls: ['./agenda-detail.page.scss'],
})
export class AgendaDetailPage implements OnInit {
  private data: any = history.state?.data;
  event: any = {}
  id: any = {}
  coordenadas: any = {}
  tokboxSession: any;
  disabled : string;
  isSaving: boolean;
  isLoading: boolean = true;
  public lat: string;
  public lon: string;
  cord: any = {}
  enableReminder = false;

  constructor(
    private router: Router,
    private dooleService: DooleService,
    private translate : TranslateService,
    public datepipe: DatePipe, 
    public alertController: AlertController,
    public nav: NavController,
    private iab: InAppBrowser, 
    private auth: AuthenticationService,
    private opentokService: OpentokService,
    private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private calendar: Calendar,
    public alertCtrl: AlertController,
    public notification: NotificationService,
    private languageService: LanguageService,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.disabled = Capacitor.isNative? 'disabled': '';
    this.event = history.state.event;  
    this.id = (this.event)? history.state.event.id: history.state.id;  
    if(this.id)
      this.getDetailAgenda();

    console.log('[AgendaDetailPage] ngOnInit()', this.event);
  }

  // TODO: remove (agenda detail in state.event)
  getDetailAgenda(){ 
    this.isLoading = true;
  
    this.dooleService.getAPIagendaID(this.id).subscribe(
      async (res: any) =>{
        console.log('[AgendaDetailPage] getDetailAgenda()', await res);
        if(res.agenda){
         
          this.event = res.agenda
          this.coordenadas = this.event.center_location
          this.cord = this.coordenadas[0]
          this.lon = this.cord?.longitude
          this.lat = this.cord?.latitude
          this.opentokService.agendaId$ = this.event?.id;
          console.log(this.event);
          let date = new Date(this.event.start_date_iso8601).toDateString()
          let today = new Date().toDateString()
          if(date !== today)
          this.enableReminder = true
        }

       },(err) => { 
          console.log('[AgendaDetailPage] getDetailAgenda() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      },()=>{
        this.isLoading = false;
      });
  }

  getVideocallToken(){
    this.dooleService.getAPIvideocall(this.event?.id).subscribe(
      async (data) => {
        if(data.result){
          this.tokboxSession = await data;
          this.opentokService.token$ = this.tokboxSession.token;
          this.opentokService.sessionId$ = this.tokboxSession.sessionId;
          this.opentokService.apiKey$ = this.tokboxSession.tokboxAPI;
          this.openVideocallModal();
          console.log("this.tokboxSession: ", this.tokboxSession);
        }else{
          let message = this.translate.instant('agenda.error_alert_message_get_token')
          alert(message)
        }       
      },
      (error) => {
        // Called when error
        alert( 'ERROR(' + error.code + '): ' + error.message)
        console.log("error: ", error);
        throw error;
      });
    
  }

  async deleteReminder(){
    this.isSaving = !this.isSaving;
    this.dooleService.deleteAPIaddAgenda(this.event.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] deleteReminder()', await res);
        if(res.success){
          let message = this.translate.instant("appointment.message_deleted_appointment")
          this.notification.showSuccess(message);
          this.nav.navigateBack('/agenda');
          //this.showAlert(message)
        }else{
          let message = this.translate.instant("appointment.error_message_delete_appointment")
          alert(message)
        }

       },(err) => { 
       
          console.log('[ReminderAddPage] deleteReminder() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isSaving = !this.isSaving;
      };
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant("alert.header_confirmation"),
      message: this.translate.instant("appointment.confirmation_delete_appointment"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[AddHealthCardPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_ok"),
          handler: () => {
            console.log('[AddHealthCardPage] AlertConfirm Okay');
            this.deleteReminder()
          }
        }
      ]
    });

    await alert.present();
  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/agenda')
  }


  actionIntrucction( instruction){
    //instruction.reminderable_type = null
    console.log('[AgendaPage] actionIntrucction()',  instruction);
    let id
    switch (instruction.reminderable_type) {
      case "App\\Element":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        //this.nav.navigateForward("elements-add", { state: {id:id} });
        this.addElement(id)
        break;
      case  "App\\Advice":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.nav.navigateForward("advices-detail", { state: {id:id} });
        break;
      case  "App\\Diet":
        id = instruction.reminderable_id
        console.log('[AgendaPage] actionIntrucction()',  id);
        this.nav.navigateForward("journal/diets-detail", { state: {id:id} });
        break;
      case  "App\\Form":
        id = instruction.reminderable_id
        this.nav.navigateForward(['/tracking/form', {id: id}] );
        break;
      case  "App\\Agenda":
        id = instruction.reminderable_id
        this.nav.navigateForward("agenda/reminder", { state: {id:id} });
        break;
    
      default:
        id = instruction.reminderable_id
        if(instruction.reminderable_id == null && instruction.reminder_origin_type == "App\\Agenda"){
            id = instruction?.id
            if(id)
            this.nav.navigateForward("agenda/reminder", { state: {id:id} });
        }
        break;
    }
  }

  async openForm(id){
    const options: InAppBrowserOptions = {
      location: 'no',
      toolbar: 'yes'
    };

    console.log('[AgendaPage] openForm()',  this.auth.user);

    if(this.auth !==undefined || this.auth.user !== undefined){
      var pageContent = '<html><head></head><body><form id="loginForm" action="https://covid.doole.io/formAnswer/fill/'+id+'" method="post" enctype="multipart/form-data">' +
        '<input type="hidden" name="idForm" value="'+id+'">' +
        '<input type="hidden" name="user_id" value="'+this.auth.user.idUser+'">' +
        '<input type="hidden" name="secret" value="'+this.auth.user.secret+'">' +
        '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
      var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
      var browserRef = this.iab.create(
        pageContentUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }else{
      var browserRef = this.iab.create(
        /* form.temporaryUrl */null,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    }

  }

  formatSelectedDate(date){
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM yyyy, HH:mm');
  }

  openFile(media){
    console.log("media", media);
    window.open(media.temporaryUrl, "");
  }

  async startDooleVideocall(){

    const modal = await this.modalCtrl.create({
      component: VideoComponent,
      componentProps: { },
    });

    modal.onDidDismiss().then((result) => {
    });

    await modal.present();

  }

  share(){
    let header = `${this.translate.instant('appointment.header_appointment')} \n`
    let title = (this.event?.title)? `${this.translate.instant('appointment.field_title')}: ${this.event?.title}\n`:''
    let date = (this.event?.start_date)? `${this.translate.instant('appointment.field_date')}: ${this.event?.start_date}\n`:''
    let description = (this.event?.description)? `${this.translate.instant('appointment.description')}: ${this.event?.description}\n`:''
    var msg = `${header} ${title} ${date} ${description}`;
    this.socialSharing.share(msg, null, null, null);
  }

  addCalendar(agenda){

    var startDate = new Date(agenda.start_date_iso8601);
    var endDate = new Date(agenda.start_date_iso8601);
 
    this.calendar.createEventInteractively(agenda.title,agenda.site,"",startDate,endDate).then(
      async (msg) => {
        console.log("msg: ", msg);
        let txt = this.translate.instant('reminder.message_added_reminder');
        this.notification.showSuccess(txt);
      },
      (err) => { console.log(err); }
    )
  }

  async addReminder(){
    const modal = await this.modalCtrl.create({
      component: ReminderAddPage,
      componentProps: { typeId: undefined, type: undefined, origin_id: this.event?.id/* isNewReminder:true */ },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {

        if(result?.data['error']){
         //TODO: handle error message
        }
        else if(result?.data?.action == 'add'){
          this.getDetailAgenda();
        }
    });
    await modal.present();
  }

  async editAgenda(event){
    const modal = await this.modalCtrl.create({
      component: AgendaEditPage,
      componentProps: {event: event },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {

        if(result?.data['action'] === 'update'){
          if(this.event?.id)
          this.getDetailAgenda();
         }
        if(result?.data['error']){
        //TODO: handle error message
        }
    });

    await modal.present();

  }

  async addElement(id){
    const modal = await this.modalCtrl.create({
      component: ElementsAddPage,
      componentProps: {id: id },
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        if(result?.data['action'] === 'add'){
          // if(this.event?.id)
          // this.getDetailAgenda();
          this.notification.displayToastSuccessful()
         }
        if(result?.data['error']){
        //TODO: handle error message
        }
    });
    await modal.present();
  }

  getName(m){
    if(m?.name && m?.name !== "")
      return m.name
    else if(m?.file_name)
      return m?.file_name.split('/').pop();
    else if(m?.file)
      return m?.file.split('/').pop();
      //Solo pruebas
      else if(m?.name == null)
      return 'desconocido'
   }

   async openVideocallModal(){
    const modal = await this.modalCtrl.create({
      component: VideoComponent,
      componentProps: {},
    });
   
    await modal.present();

  }

  async openVideocallIframeModal(){


    const modal = await this.modalCtrl.create({
      component: VideocallIframePage,
      componentProps: {"id": this.opentokService.agendaId$}
    });
    
    return await modal.present();

  }


  startVideoCall(){
    // VOIP calls for IOS
   
    this.getVideocallToken();
    
  }

   backButton(){
    if(this.data)
    this.router.navigate([`/home`]);
  }


}
