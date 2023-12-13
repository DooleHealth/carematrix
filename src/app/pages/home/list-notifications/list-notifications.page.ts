import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonInfiniteScroll } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { DateService } from 'src/app/services/date.service';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.page.html',
  styleUrls: ['./list-notifications.page.scss'],
})
export class ListNotificationsPage implements OnInit {
  @ViewChild(IonContent, {read: IonContent, static: false}) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  notifications = [];
  isLoading = true;
  checkedNotifications = []
  numNotification: number = 0;
  totalNotification: number = 0;
  allNotification: boolean = false
  lastPage = 0
  nextPage = 0
  currentPage = 0
  footerHidden: boolean;
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService,
    public alertController: AlertController,
    public router:Router,
    public dateService: DateService,
    private analyticsService: AnalyticsService,
    private _zone: NgZone,
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.lastPage = 0
    this.nextPage = 0
    this.currentPage = 0
    this.getNumNotification()
    this.getNotifications(true, true)
  }

  getNumNotification() {
    this.dooleService.getAPINotificationsCount().subscribe((res) => {
      console.log('[ListNotificationsPage] getNumNotification()',  res);
      if (res?.success) this.totalNotification = res?.notifications;
    });
  }

  getNotifications(isFirstLoad, withPaginate?, event?){
    let params = {withPaginate: withPaginate? 1:0}
    params['page'] = isFirstLoad? 0: this.nextPage
    this.nextPage = isFirstLoad? 0: this.nextPage
    if(this.nextPage > this.lastPage){
      console.log('[ListNotificationsPage] getNotifications() this.nextPage', this.nextPage);
      this.toggleInfiniteScroll()
      return;
    }
    console.log('[ListNotificationsPage] getNotifications() inicio');
    this.dooleService.getAPINotifications(params).subscribe(
      async (res: any) =>{
        console.log('[ListNotificationsPage] getNotifications()', await res);
        if(res.success){
          this.currentPage = res.currentPage
          this.nextPage =  res.nextPage? (this.currentPage) + 1 : (res.lastPage +1)
          this.lastPage =  res.lastPage
          this.numNotification = res.countNotifications
          //Se filtran las notificaciones de objetivos
           res.notifications = res.notifications.filter( n => n?.notification_origin_type !== "App\\Goalable")

          if(this.numNotification > 0){

            let listNotiAux = res.notifications
            listNotiAux?.forEach(n => {
                this.getTypeNotificatios(n)
                this.notifications.push(n)
            })

            if(this.currentPage <= 1){
              this.notifications = []
              this.notifications = listNotiAux
            }


            setTimeout(() => {
              this.infiniteScroll?.complete()
              this.allNotification = false;
            }, 1000);


          }
          else if(this.numNotification == 0 && res.nextPage == null && isFirstLoad == true){
            console.log('[ListNotificationsPage] getNotifications() autollamado');
            this.notifications = []
            this.notifications = res.notifications
            this.allNotification = false
          }
          else{
              if(res.nextPage != null && withPaginate){
                this.getNotifications(false, true)
                console.log('[ListNotificationsPage] getNotifications() autollamado');
              }
          }

        }
        this.isLoading = false
       },(err) => {
          console.log('[ListNotificationsPage] getNotifications() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getTypeNotificatios(notification){
    switch (notification.notification_origin_type) {
      case "App\\FormAnswer":
        notification['message'] = this.translate.instant('list_notifications.form')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.form_title? notification?.form_title : notification?.notification_origin?.form?.title
        notification['color'] = '#2356f9'
        notification['checked'] = false
        break;
      case "App\\LevelAccomplishment":
        notification['message'] = this.translate.instant('list_notifications.level')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['color'] = '#BDC3C7'
        notification['checked'] = false
        break;
      case "App\\DrugIntake":
        notification['message'] = this.translate.instant('list_notifications.drugintake')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification.drug_name
        notification['dose'] = notification?.notification_origin?.dose + ' ' +
          (notification?.notification_origin?.unit?.name? notification?.notification_origin?.unit?.name:this.translate.instant('drug.unit'))
        notification['color'] = '#5AC445'
        notification['checked'] = false
        break;
      case "App\\Agenda":
        //notification['message'] = this.translate.instant('list_notifications.visitonline')
        notification['message'] = this.translate.instant('list_notifications.agenda')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title
        notification['time'] = this.dateService.getCalendarDayTime(new Date(notification?.notification_origin?.start_date).getTime());
        notification['color'] = '#6950ce'
        notification['checked'] = false
        break;
      case "App\\Message":
        notification['message'] = this.translate.instant('list_notifications.message')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['color'] = '#25CAD0'
        notification['checked'] = false
        break;
      case "App\\Advice":
        notification['message'] = this.translate.instant('list_notifications.advice')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.name
        notification['color'] = '#2356f9'
        notification['checked'] = false
        break;
      case "App\\News":
        notification['message'] = this.translate.instant('list_notifications.news')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.subject
        notification['color'] = '#2356f9'
        notification['checked'] = false
        break;
      case "App\\Reminder":
        notification['message'] = this.translate.instant('list_notifications.reminder')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title
        notification['color'] = '#6950ce'
        notification['checked'] = false
        break;
      case "App\\ReminderExecution":
        notification['message'] = this.translate.instant('list_notifications.reminder')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title
        notification['color'] = '#6950ce'
        notification['checked'] = false
        break;
      case "App\\Exercise":
        notification['message'] = this.translate.instant('list_notifications.exercise')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.name
        notification['color'] = '#f53d3d'
        notification['checked'] = false
        break;
      case "App\\Diet":
        notification['message'] = this.translate.instant('list_notifications.diet')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.name
        notification['color'] = '#E67E22'
        notification['checked'] = false
        break;
      case "App\\GamePlay":
        notification['message'] = this.translate.instant('list_notifications.games')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.game?.title;
        notification['color'] = '#9B59B6'
        notification['checked'] = false
        break;
      case "App\\Game":
        notification['message'] = this.translate.instant('list_notifications.games')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title;
        notification['color'] = '#9B59B6'
        notification['checked'] = false
        break;
      case "App\\ProgramablePlay":
        notification['message'] = this.translate.instant('list_notifications.games')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.game?.title;
        notification['color'] = '#9B59B6'
        notification['checked'] = false
        break;
      case "App\\MedicalProcedure":
        notification['message'] = this.translate.instant('list_notifications.procedure')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title
        notification['time'] = this.dateService.getCalendarDayTime(new Date(notification?.notification_origin?.data).getTime());
        notification['color'] = '#EC7579'
        notification['checked'] = false
        break;
      case "App\\DiagnosticTest":
        notification['message'] = this.translate.instant('list_notifications.diagnostic')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title
        //notification['centro'] = 'En el ' + notification?.notification_origin?.originString
        //notification['time'] = this.dateService.getCalendarDayTime(new Date(notification?.notification_origin?.data).getTime());
        notification['color'] = '#1A8E92'
        notification['checked'] = false
        break;
      case "App\\ShareCarePlan":
        notification['message'] = this.translate.instant('shared_care_plan.new_scp_notification_title')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['title'] = notification?.notification_origin?.title
        //notification['centro'] = 'En el ' + notification?.notification_origin?.originString
        //notification['time'] = this.dateService.getCalendarDayTime(new Date(notification?.notification_origin?.data).getTime());
        notification['color'] = '#BA0186'
        notification['checked'] = false
        break;
      // case "App\\Goalable":
      //   notification['message'] = this.translate.instant('list_notifications.diagnostic')
      //   notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
      //   notification['title'] = notification?.notification_origin?.title
      //   //notification['centro'] = 'En el ' + notification?.notification_origin?.originString
      //   //notification['time'] = this.dateService.getCalendarDayTime(new Date(notification?.notification_origin?.data).getTime());
      //   notification['color'] = '#1A8E92'
      //   break;
      default:
        notification['message'] = this.translate.instant('list_notifications.default')
        notification['date'] = this.dateService.getCalendarDay2(new Date(notification?.created_at).getTime());
        notification['color'] = '#2356f9'
        notification['checked'] = false
        break;
    }
  }

  goPage(notification){
    console.log('[ListNotificationsPage] goPage(): ', notification)
    let data = notification.notification_origin;
    if(data == null) data = {id: notification.notification_origin_id}
    switch (notification.notification_origin_type) {
      case "App\\FormAnswer":
        this.setRead(notification.id)
        this.router.navigate([`/tracking/form`, {id: data.form_id}],{state:{data:null, formAnswer:data.id}}); //No se accede xq son formularios v1
        break;
      case "App\\LevelAccomplishment":
        this.setRead(notification.id)
        const dataA = {id: data.id, name: ''}
        this.router.navigate([`home/health-path/detail`] , { state: { challenge: dataA } });
        //this.router.navigate([`/home`]);
        break;
      case "App\\DrugIntake":
        this.setRead(notification.id)
        this._zone.run(() => {
          this.router.navigate([`/medication-details`], { state: { data: data, segment: 'medication' } });
        });
        break;
      case "App\\Agenda":
        this.setRead(notification.id)
        this.router.navigate([`/agenda/detail`],{state:{data:null, id: data.id}});
        break;
      case "App\\Message":
        this.setRead(notification.id)
        this.router.navigate([`/contact/chat/conversation`],{state:{data:null, chat:data.message_header_id, staff:null}}); //Falta información de staff, no cargan los mensajes
        break;
      case "App\\Advice":
        this.setRead(notification.id)
        this.router.navigate([`/advices/advices-detail`],{state:{data:null, id: data.id}}); //Bien
        break;
      case "App\\News":
        this.setRead(notification.id)
        this.router.navigate([`/new-detail`],{state:{data:null, id: data.id}}); //Bien
        break;
      case "App\\Reminder":
        this.setRead(notification.id)
        this.router.navigate([`/agenda/reminder`],{state:{data:null, id: data.id}}); //Bien
        break;
      case "App\\ReminderExecution":
      this.setRead(notification.id)
      this.router.navigate([`/agenda/reminder`],{state:{data:null, id: data.id}}); //Bien
      break;
      case "App\\Exercise":
        this.setRead(notification.id)
        //this.router.navigate([`/tracking/exercise`],{state:{data:null, id: data.id, programable_id: notification.notification_origin_id}}); //Bien
        this.router.navigate([`/exercices/exercices-detail`],{state:{data:null, id: data.id}});
        break;
      case "App\\Diet":
        this.setRead(notification.id)
        this.router.navigate([`/journal/diets-detail`],{state:{data:null, id:data.id}});
        break;
      case "App\\GamePlay":
        this.setRead(notification.id)
        if(data?.game?.form_id)
          this.router.navigate([`/tracking/form`, {id: data?.game?.form_id}],{state:{data:null, game_play_id: data?.id}});
        else
          this.router.navigate([`/journal/games-detail`],{state:{data:null, id:data.id, programable_id: notification.notification_origin_id, server_url: data?.game?.server_url}});
        break;
      case "App\\Game":
        this.setRead(notification.id)
        if(data?.game?.form_id)
          this.router.navigate([`/tracking/form`, {id: data?.game?.form_id}],{state:{data:null, game_play_id: data?.id}});
        else
          this.router.navigate([`/journal/games-detail`],{state:{data:null, id:data.id, programable_id: notification.notification_origin_id, server_url: data?.game?.server_url}});
        break;
      case "App\\MedicalProcedure":
        this.setRead(notification.id)
        let params = {
          byEpisode: notification?.byEpisode? 1:0,
          medical_procedure_id: notification?.notification_origin_id? notification?.notification_origin_id: null,
          episode_id: notification?.episode_id? notification?.episode_id: null
        }
        this.router.navigate([`/more/procedure-detail`],{state:{data:null, procedure:params}});
        break;
      case "App\\DiagnosticTest":
        this.setRead(notification.id)
        this.router.navigate([`/document-detail`],{state:{data:null, procedure:params}});
      case "App\\ShareCarePlan": 
        this.setRead(notification.id)
        this.router.navigate([`/tracking`],{state:{data:null, segment: 'sharedcareplan'  }});
        break;
      case "App\\ProgramablePlay":
        this.setRead(notification.id)
        this.router.navigate([`/home`],{state:{data:null, id:data.id}});
        break;
      default:
        this.router.navigate([`/home`],{state:{data:null, id:data.id}});
        break;
    }
  }

  setRead(id){
    console.log('[ListNotificationsPage] setRead():', id)
    let notification = {notification: id}
    this.dooleService.postAPINotificationRead(notification).subscribe((res)=>{
      if(res?.success)
      console.log('Se ha leido la notificación')
    })
  }

  setAllRead(){
    console.log('[ListNotificationsPage] setAllRead():', this.checkedNotifications)
    if(this.checkedNotifications?.length > 0){
      let notification = {notification: this.checkedNotifications}
      this.dooleService.postAPINotificationRead(notification).subscribe((res)=>{
        if(res?.success){
          console.log('Se ha leido la notificación')
          //Esto es para evitar refrescar toda la página
          if(this.allNotification){
            //Refresco el número de notificaciones
            this.getNumNotification()
            this.getNotifications(true, true)
            this.allNotification = false;
          }
          else
            this.deleteNotificationsList()

          this.checkedNotifications = []
        }
      })
    }
  }

  deleteNotificationsList(){
          this.notifications = this.notifications.filter(item => this.filterNotifications(item))
          this.totalNotification =   this.totalNotification - this.checkedNotifications.length
          //console.log('[ListNotificationsPage] deleteNotificationsList():',       this.notifications)
          this.allNotification = false
  }

  filterNotifications(item){
    const res = this.checkedNotifications.findIndex( e=> e === item.id)
    return (res < 0)? true: false;
  }

  addToList(event, notification){
    console.log('[ListNotificationsPage] addToList():', event)
    if(event?.detail?.checked){
        this.checkedNotifications.push(notification?.id)
    }else{
      this.checkedNotifications  = this.checkedNotifications.filter(item => item != notification?.id)
      //this.allNotification = event?.detail?.checked
    }
    console.log('[ListNotificationsPage] addToList():', this.checkedNotifications)
  }

  addAllNotificationList(event){

    this.allNotification = event?.detail?.checked
    //console.log('[ListNotificationsPage] allNotification:', this.allNotification)
    if(this.notifications.length > 0){
      this.notifications.forEach(item => {
        item['checked'] = event?.detail?.checked
        this.checkedNotifications.push(item['id'])
      } )
    }
  }

  async confirmDeleteNotifications(){
    let error = false
    console.log("this.checkedNotifications:",this.checkedNotifications)
    if(this.checkedNotifications.length === 0){
      error = true
    }
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      //mode: 'ios',
      //header: this.translate.instant('alert.header_atention'),
      message: this.translate.instant( error?
        'list_notifications.alert_delete_error_message':'list_notifications.alert_delete_message'),
      buttons: error?
      [
        {
          text: this.translate.instant("button.accept"),
          role: 'confirm',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[LandingPage] AlertConfirm Cancel');
          }
        }
      ]
        :
      [
        {
          text: this.translate.instant("button.cancel"),
          role: 'cancel',
          cssClass: 'warning',
          handler: (blah) => {
            console.log('[LandingPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("button.continue"),
          role: 'confirm',
          cssClass: 'primary',
          handler: (data) => {
              this.setAllRead()
          }
        }
      ]
    });

    await alert.present();
  }

  async onScroll(event: any) {
    const scrollElement = await this.content.getScrollElement(); // get scroll element
    this.footerHidden = ( scrollElement.scrollTop > scrollElement.clientHeight/(2) )? true:false;
  }

  scrollToBottom() {
    //console.log('[ConversationPage] scrollToBottom() contentArea' ,   this.content);
      setTimeout(() => {
          this.content.scrollToTop(300);
    }, 500);
  }



}
