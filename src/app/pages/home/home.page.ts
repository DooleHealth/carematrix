import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild, Input, NgZone, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { User, Agenda, FamilyUnit } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { LanguageService } from 'src/app/services/language.service';
import { RolesService } from 'src/app/services/roles.service';
import { ElementsAddPage } from '../tracking/elements-add/elements-add.page';
import { NotificationService } from 'src/app/services/notification.service';
import { PusherNotificationService } from 'src/app/services/pusher/pusher-notification.service';
import { PusherAlarmService } from 'src/app/services/pusher/pusher-alarm.service';
import { PusherChallengeNotificationsService } from 'src/app/services/pusher/pusher-challenge-notifications.service';
import { AdvicesDetailPage } from './advices-detail/advices-detail.page';
import { NewDetailPage } from './new-detail/new-detail.page';
import { DateService } from 'src/app/services/date.service';
import { PdfPage } from '../pdf/pdf.page';
import { PusherConnectionService } from 'src/app/services/pusher/pusher-connection.service';
import Swiper, { SwiperOptions } from 'swiper';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { BehaviorSubject } from 'rxjs';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export interface UserInformation {
  title?: string;
  hour?: string;
}

export class ShowcaseShellUserModel extends ShellModel {
  id: string;
  name: string;
  image: string;
  type: string;
  data: User;
  constructor() {
    super();
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  dataStore: DataStore<Array<ShowcaseShellUserModel>>;
  data: Array<ShowcaseShellUserModel> & ShellModel;
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }
  pusherNotification = false;
  numNotification = 0;

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: 'disabled_swiper_button'
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true,
    dynamicMainBullets: 3,     dynamicBullets: true, },
    scrollbar: { draggable: true },
    direction: 'vertical',
    effect: 'slide',

    loop: true,
  };
  WAIT_TIME = 10 //10 minutes
  userDoole: any = {}
  goals: any = []
  diets: any = []
  drugs: any = []
  challenges = [];
  games = []
  header = false;
  listFamilyUnit: FamilyUnit[] = [];
  isLoading = false
  activity: any = []
  appointment: Agenda[] = []
  showGoogleFit = false;
  advices: any = []
  date
  loading: boolean = true;
  isFirstTime = true;
  currentIndexDrug = 0
  currentIndexGame = 0
  currentIndexDiet = 0
  viewAllDiets: boolean = false;
  sliderConfig = {
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: false,
  };
  sliderConfigHorizontal = {
    initialSlide: 0,
    slidesPerView: 1.1,
    spaceBetween: 0,
    centeredSlides: false,
  };


  sliderConfigHorizontalOneSlide = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
  };

  sliderHealthPathConfig = this.sliderConfigHorizontal;
  sliderAdvicesConfig = this.sliderConfigHorizontal;
  slides$ = new BehaviorSubject<string[]>(['']);
  @ViewChild('sliderGoals') sliderGoals: Swiper;
  @ViewChild('sliderDiet') sliderDiet: Swiper;
  @ViewChild('sliderDrug') sliderDrug: Swiper;
  @ViewChild('sliderGames') sliderGames: Swiper;
  @ViewChild('sliderPhysical') sliderPhysical: Swiper;
  @ViewChild('tabs') tabs: TabsComponent;

  infoDiet: UserInformation
  infoDrugs: UserInformation
  infoGames: UserInformation
  infoActivity: UserInformation
  infoGoals: UserInformation

  showDrugPager = true
  challengeProgressBarValue;
  public greeting = '';
  userInfo: any;
  pushNotification: any = history.state?.push
  constructor(
    public router: Router,
    public platform: Platform,
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private health: Health,
    private iab: InAppBrowser,
    private auth: AuthenticationService,
    private ngZone: NgZone,
    public translate: TranslateService,
    public alertController: AlertController,
    private languageService: LanguageService,
    private nav: NavController,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public role: RolesService,
    private pusherNotifications: PusherNotificationService,
    private pusherAlarms: PusherAlarmService,
    private pusherChallenge: PusherChallengeNotificationsService,
    private pusherConnection: PusherConnectionService,
    public dateService : DateService
  ) {
    // this.analyticsService.setScreenName('home','[HomePage]')
  }

  async ngOnInit() {

    this.initPushers()
    this.date = this.transformDate(Date.now(), 'yyyy-MM-dd')
    //this.date = this.dateService.yyyyMMddFormat(Date.now());
    this.checkHealthAccess();
    this.activateAllNotifications(1)
    this.slides$.next(
      Array.from({ length: 600 }).map((el, index) => `Slide ${index + 1}`)
    );

  }


  ionViewWillEnter() {
    if (this.pushNotification)
      this.openModal(this.pushNotification, true);

    this.getUserInformation()
    this.getNumNotification();
    if(!this.pusherConnection?.isConnectedPusher()){
      //console.log('[HomePage] ionViewWillEnter() this.userDoole: ', this.authService?.user?.idUser);
      const token = this.authService.getAuthToken()
      this.pusherConnection.subscribePusher(token, this.authService?.user?.idUser)
      this.initPushers()
    }

  }

  ionViewDidEnter() {
    setTimeout(() => this.setTimerSlider(), 3000);

  }

  initPushers(){
    this.pusherAlarms.init()
    this.pusherChallenge.init()
    const channel = this.pusherNotifications.init();
    if(channel)
    channel.bind(this.pusherNotifications.NAME_BIND, ({ data }) => {
      console.log('[HomePage] initPushers()',  data);
      this.getNumNotification();
    });
  }

  checkHealthAccess() {
    if (this.platform.is('cordova')) {
      this.health.isAvailable()
        .then((available: boolean) => {
          //console.log(available);
          this.showGoogleFit = !available;
          this.health.requestAuthorization([
            'distance', 'steps', 'heart_rate', 'activity', 'weight', ,'oxygen_saturation' //,'blood_glucose','blood_pressure'//, read and write permissions
          ])
            .then(res => {
              //console.log(res);
              this.syncData(30);
              //setTimeout(()=>this.confirmAllNotification(), 500);
            })
            .catch(e => {
              console.log(e)
              //setTimeout(()=>this.confirmAllNotification(), 100);
            });
        })
        .catch(e => {
          console.log(e)
          //setTimeout(()=>this.confirmAllNotification(), 500);
        });
    }
  }

  setAnalyticsUserProperty() {
    // if(this.userDoole?.age)
    // this.analyticsService.setProperty('Edad', this.userDoole.age)
    // if(this.userDoole?.language?.name)
    // this.analyticsService.setProperty('Idioma', this.userDoole.language.name)
    // this.analyticsService.setProperty('gender', this.userDoole.gender)
  }

  // activatePusherNotification(){
  //   const channel = this.pusherNotifications?.init();
  //   console.log('[HomePage] activatePusherNotification() channel ',  channel);
  //   if(channel)
  //   channel?.bind(NAME_BIND, ({ data }) => {
  //     console.log('[HomePage] activatePusherNotification()',  data);
  //     this.getNumNotification();
  //   });
  // }

  getNumNotification() {
    this.dooleService.getAPINotificationsCount().subscribe((res) => {
      if (res?.success) this.numNotification = res?.notifications;
      if (this.numNotification == 0) this.pusherNotification = false;
      else this.pusherNotification = true;
    });
  }

  getValue(object, key) {
    var k, temp;
    if (key in object) return object[key];                // if found return value
    for (k in object) {                                   // iterate keys
      if (object[k] && typeof object[k] === 'object') { // check not null and object
        temp = this.getValue(object[k], key);              // get sub value, if exists
        if (temp !== null) return temp;               // if not null return value
      }
    }
    return null;
  }
  async getUserInformation() {
    this.isLoading = true
    //let date2 = this.dateService.ddMMyyyy(Date.now());
    let date2 = this.transformDate(this.date, 'dd-MM-yyyy')
    let date = { date: date2, from_date: this.date, to_date: this.date }
    console.log("DATE: ", date);
    let tempAdvices;
    let tempChallenges;
    this.dooleService.getAPIinformationSummary(date).subscribe(
      async (res: any) => {
        await res;

        console.log('[HomePage] getUserInformation()', res);

        tempChallenges = res.data?.challenges;
        tempChallenges = tempChallenges?.filter(function (obj) {
          return !obj.completed;
        });

        if (tempChallenges?.length == 1)
          this.sliderHealthPathConfig = this.sliderConfigHorizontalOneSlide;

        this.challenges = tempChallenges;

        this.userDoole = res.data?.profile;


        this.greeting = this.translate.instant('home.hello') +', ' + this.userDoole?.first_name;
        this.appointment = res.data?.agenda;

        if (this.role.component.advices)
          tempAdvices = res.data?.advices;

        if (this.role.component.news)
          res.data?.news.forEach(element => {
            element['new'] = true
            tempAdvices.push(element)
          });

        tempAdvices = tempAdvices.filter(advice => (!this.getStatusable(advice?.statusable, 'hide')))
        console.log(' this.tempAdvices ', tempAdvices.length);
        if (tempAdvices.length == 1) {
          this.sliderAdvicesConfig = this.sliderConfigHorizontalOneSlide;
          console.log(' this.sliderAdvicesConfig ', this.sliderAdvicesConfig);
        }

        this.advices = tempAdvices;

        if (res.data?.goals) {
          this.goals = res.data?.goals
          this.infoGoals = {
            title: this.goals[0]?.typeString + ' ' + this.goals[0]?.element?.element_unit?.abbreviation
          }

          // Get the latest value of the element-goal
          this.goals.forEach(goal => {
            let element_last_value = goal?.element?.element_last_value // Get the element group
            if (element_last_value?.value)
              this.getGoalLastValue(element_last_value, goal)
            else
              goal.last_value_text = this.translate.instant('home.goals_no_data');
          });
        }

        //diets
        this.treeIterateDiets(res.data?.dietaryIntake.dietIntakes)
        this.searchIndexDiet()
        this.slideDietChange()
        // this.sliderDiet?.slideTo(this.currentIndexDiet)

        //Elements
        this.activity = []
        let elements = res?.data.elements
        if (elements?.eg) {
          this.treeIterate(elements?.eg, '');
          // this.sliderPhysical?.slideTo(0)
          this.slideActivityChange()
        }

        //Games
        if (res.data.gamePlays) {
          this.games = res.data.gamePlays
          this.games.sort(function (a, b) {
            return a.scheduled_date.localeCompare(b.scheduled_date);
          })
          this.searchIndexDGame()
          this.slideGamesChange()
          // this.sliderGames?.slideTo(this.currentIndexDrug)
        }
        //this.drugs = res.data.drugIntakes.drugIntakes
        this.getDrugIntake()
        this.userInfo = res?.data;
        this.isLoading = false

        //Analytics
        //console.log('[HomePage] getUserInformation()', this.userDoole);
        //this.setAnalyticsUserProperty()
      }, (err) => {
        console.log('***** ERROR ' + err);
        this.isLoading = false

        throw err;

      });
  }

  setTimerSlider() {
    this.slideGamesChange()
    this.searchIndexDGame()
    this.slideDrugChange()
    this.searchIndexDrug()
    this.slideDietChange()
    this.searchIndexDiet()
    this.slideActivityChange()
    // this.sliderDiet?.slideTo(this.currentIndexDiet)
    // this.sliderGames?.slideTo(this.currentIndexDrug)
    // this.sliderPhysical?.slideTo(this.currentIndexDiet)
    // this.sliderDrug?.slideTo(this.currentIndexDrug)
  }

  treeIterateDiets(obj) {
    this.diets = []
    for (var property in obj) {
      //console.log('[DiaryPage] treeIterateDiets()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          //console.log('[DiaryPage] treeIterateDiets()', obj[property]);
          this.diets.push({ date: property, items: obj[property] })
          //this.treeIterate(obj[property], stack + '.' + property);
        }
      }
    }

    console.log('[DiaryPage]  this.diets()', this.diets);
  }

  treeIterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {

          this.treeIterate(obj[property], stack + '.' + property);
        } else {
          if (property == "group") {
            obj['is_child'] = stack.includes('childs');
            if (obj?.elements.length > 0)
              this.activity.push(obj);

          }

        }
      }
    }
  }

  getStatusable(list, type) {
    if (list?.length > 0) {
      let statu = list.find(status => (status?.type == type));
      return statu ? true : false
    }
    else return false
  }

  getGoalLastValue(element_goal, goal) {


    goal.last_value = parseFloat(element_goal?.value);
    goal.value1 = parseFloat(goal?.value1)
    goal.last_value_date = element_goal?.date_value;

    switch (goal.goalType) {

      case '=':
        goal = this.equal(goal);
        break;
      case 'a<x<b':
        goal = this.inBetween(goal);
        break;
      case '<':
        goal = this.lessThan(goal);
        break;
      case '<=':
        goal = this.lessOrEqualThan(goal);
        break;
      case '>':
        goal = this.greaterThan(goal);
        break;
      case '=>':
        goal = this.greaterOrEqualThan(goal);
        break;
      default:
        break;
    }
    goal.last_value_text = goal.last_value + ' ' + goal.element?.element_unit?.abbreviation

  }

  inBetween(goal) {
    goal.value2 = parseFloat(goal?.value2);
    goal.reversed = false;
    if (goal.last_value >= goal.value1 && goal.last_value <= goal.value2) {
      goal = this.goalAchieved(goal);
    } else if (goal.last_value >= goal.value1 && goal.last_value >= goal.value2) {
      goal.reversed = true;
      goal = this.getGoalProgress(goal, goal.value2)
    } else if (goal.last_value <= goal.value1 && goal.last_value >= goal.value2) {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  goalAchieved(goal) {
    goal.goal_percentage = 100;
    goal.progress_bar_value = 1;
    goal.progress_bar_color = this.getProgressBarClass(goal.progress_bar_value, goal.reversed);

    return goal
  }

  getGoalProgress(goal, target) {
    if (goal.last_value <= target) {
      goal.goal_percentage = this.getGoalPercentage(goal.last_value, target);
      goal.progress_bar_value = this.convertToDecimal(goal.goal_percentage);
    } else if (goal.last_value > target) {
      goal.goal_percentage = this.getGoalPercentage(goal.last_value, target);
      goal.progress_bar_value = this.getProgressBarValue(goal);
    }

    goal.progress_bar_color = this.getProgressBarClass(goal.progress_bar_value, goal.reversed);

    return goal;
  }

  getProgressBarValue(goal) {
    let progress_bar_value;
    if (goal.goalType == 'a<x<b') {
      let percentage = 100 - (parseFloat(goal.goal_percentage) - 100);
      progress_bar_value = this.convertToDecimal(percentage)
    } else if (goal.goalType == '>' || goal.goalType == '=>')
      progress_bar_value = this.convertToDecimal(goal.goal_percentage)
    else if (goal.goalType == '<' || goal.goalType == '<=') {
      let percentage = 100 - (parseFloat(goal.goal_percentage) - 100);
      progress_bar_value = this.convertToDecimal(percentage)
    } else if (goal.goalType == '=') {
      if (goal.last_value > goal.value1) {
        goal.reversed = true;
        let percentage = 100 - (parseFloat(goal.goal_percentage) - 100);
        progress_bar_value = this.convertToDecimal(percentage)
      } else {
        goal.reversed = false;
        progress_bar_value = this.convertToDecimal(goal.goal_percentage)
      }

    } else
      progress_bar_value = this.convertToDecimal(goal.goal_percentage);

    return progress_bar_value;

  }

  getGoalPercentage(last_value, value) {
    return (last_value * 100) / value;

  }

  getProgress(goal) {
    return goal.last_value <= goal.value1 ? 1 : this.convertToDecimal(goal.goal_percentage);
  }

  equal(goal) {
    if (goal.last_value == goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  lessThan(goal) {

    goal.reversed = true;
    if (goal.last_value < goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  greaterOrEqualThan(goal) {

    goal.reversed = false;
    if (goal.last_value >= goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }

    return goal;
  }

  lessOrEqualThan(goal) {

    goal.reversed = true;
    if (goal.last_value <= goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  greaterThan(goal) {

    goal.reversed = false;
    if (goal.last_value > goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }

    return goal;
  }

  convertToDecimal(numberVal) {
    if (numberVal < 10)
      return (numberVal / 10).toFixed(2);
    else if (numberVal < 100)
      return (numberVal / 100).toFixed(2);
    else
      return (numberVal / 1000).toFixed(2);

  }


  getProgressBarClass(percentage, isReversed) {

    let cssClass: string;
    if (isReversed)
      cssClass = this.reversedProgressBarClass(percentage);
    else
      cssClass = this.progressBarClass(percentage);

    return cssClass
  }

  progressBarClass(value) {

    if (value < 0.50)
      return 'my-buffer-progress_red'
    else if (value > 0.49 && value < 0.75)
      return 'my-buffer-progress_orange'
    else
      return 'my-buffer-progress_green'

  }

  reversedProgressBarClass(value) {

    if (1 > value && value < 0.50)
      return 'my-buffer-progress_red'
    else if (value >= 0.50 && value <= 0.75)
      return 'my-buffer-progress_orange'
    else
      return 'my-buffer-progress_green'
  }

  getDateElementGoal(last_value_date) {
    if (last_value_date)
      return this.translate.instant('element.field_date') + ': ' + this.formatDate(last_value_date)
    else ''
  }



  getDrugIntake() {
    this.dooleService.getAPIdrugIntakeByDate({ date: this.date }).subscribe((res) => {
      console.log('[HomePage] getDrugIntake()', res);
      this.drugs = res.drugIntakes;
      this.filterDrugsByStatus()
      this.searchIndexDrug()
      // this.sliderDrug?.slideTo(this.currentIndexDrug)
      this.slideDrugChange()
    })
  }



  syncData(days) {

    let startDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    let endDate = new Date(); // now
    console.log('dataType: steps');
    this.health.queryAggregated({
      startDate,
      endDate,
      dataType: 'steps',
      bucket: 'day'
    }).then(data => {
      this.postHealth('steps', data);
    });

    console.log('dataType: distance');
    this.health.queryAggregated({
      startDate,
      endDate,
      dataType: 'distance',
      bucket: 'day'
    }).then(data => {
      this.postHealth('distance', data);

    }).catch(error => {
      console.error(error);
      throw error;
    });

    console.log('dataType: heart_rate');
    this.health.query({
      startDate,
      endDate,
      dataType: 'heart_rate',
    }).then(data => {
      this.postHealth('heart_rate', data);
    }).catch(error => {
      console.error(error);
      throw error;
    });

    console.log('dataType: weight');
    this.health.query({
      startDate,
      endDate,
      dataType: 'weight',
    }).then(data => {
      this.postHealth('weight', data);
    }).catch(error => {
      console.error(error);
      throw error;
    });

    // console.log('dataType: body_temperature');
    //  this.health.query({
    //    startDate,
    //    endDate,
    //    dataType: 'body_temperature',
    //  }).then(data => {
    //    this.postHealth('temperature', data);
    //  }).catch(error => {
    //    console.error(error);
    //   throw error;
    // });

    console.log('dataType: oxygen_saturation');
    this.health.query({
      startDate,
      endDate,
      dataType: 'oxygen_saturation',
    }).then(data => {
      this.postHealth('oxygen_saturation', data);

    }).catch(error => {
      console.error(error);
      throw error;
    });

    // console.log('dataType: blood_glucose');
    // this.health.query({
    //   startDate,
    //   endDate,
    //   dataType: 'blood_glucose',
    // }).then(data => {
    //   this.postHealth('blood_glucose', data);
    // }).catch(error => {
    //   console.error(error);
    //   throw error;
    // });

    // console.log('dataType: blood_pressure');
    // this.health.query({
    //   startDate,
    //   endDate,
    //   dataType: 'blood_pressure',
    // }).then(data => {
    //   this.postHealth('blood_pressure', data);
    // }).catch(error => {
    //   console.error(error);
    //   throw error;
    // });

  }

  //envia post amb dades de salut a api
  postHealth(type, data) {
    const postData = {
      type: type,
      vals: JSON.stringify(data),
    };
    this.dooleService.post('user/element/sync', postData).subscribe(
      async (data) => {
        console.log("postHealth: ", data);
      },

      (error) => {
        // Called when error
        console.log('error: ', error);
        throw error;
      },
      () => {
        // Called when operation is complete (both success and error)
        // loading.dismiss();
      });
  }

  actionCloseAdvice(slide) {
    console.log('[HomePage] actionCloseAdvice()', slide.name);
    let model = (slide.new) ? 'News' : 'Advice'
    let params = {
      model: model,
      id: slide.id,
      type: 'hide',
      status: 1
    }
    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) => {
        if (res.success) {
          this.advices = this.advices.filter(advice => (advice?.id != slide.id))
        }
      }
    )
  }

  actionSeeAllAdvices() {
    //console.log('[HomePage] actionCloseAdvice()');
  }

  actionRegisterAdvice(slide) {
    //console.log('[HomePage] actionRegisterAdvice()', slide.name);
  }

  actionCloseAppointment(slide) {
    //console.log('[HomePage] actionCloseAppointment()', slide.title);
    slide.hide = true
    this.appointment = this.appointment.filter(slide => slide.hide == false)
  }

  actionDetailAppointment(slide) {
    //console.log('[HomePage] actionDetailAppointment()', slide.name);
  }

  actionButtonDrugs(slide) {
    //console.log('[HomePage] actionButtonDrugs()', slide.name);
  }

  slideGoalChange() {
    // if (this.goals !== undefined && this.goals?.length > 0)
      // this.sliderGoals?.getActiveIndex().then(index => {
      //   //console.log('[HomePage] slideGoalChange()', index);
      //   let slider = this.goals[index]
      //   console.log('[HomePage] slideGoalChange()', slider);
      //   this.infoGoals = {
      //     title: slider?.typeString + ' ' + slider?.element?.element_unit?.abbreviation
      //   }
      // });
  }

  slideDietChange() {
    // if (this.diets !== undefined && this.diets?.length > 0)
      // this.sliderDiet?.getActiveIndex().then(index => {
      //   //console.log('[HomePage] slideDietChange()', index);
      //   let slider = this.diets[index]
      //   let hour = slider?.date.split(' ')[1]
      //   this.infoDiet = {
      //     title: slider?.items,
      //     hour: hour?.split(':')[0] + ':' + hour.split(':')[1]
      //   }
      // });
  }

  slideDrugChange(event?) {
    console.log('[HomePage] slideDrugChange()', event);
    if (this.drugs !== undefined && this.drugs?.length > 0) {
      // this.sliderDrug?.getActiveIndex().then(index => {
      //   //console.log('[HomePage] slideDrugChange()', index);
      //   let slider = this.drugs[index]
      //   this.infoDrugs = {
      //     title: slider?.name,
      //     hour: slider?.hour_intake
      //   }
      // });
    } else {
      this.infoDrugs = null;
    }

    /*     event.target.isEnd().then(isEnd => {
          this.showDrugPager = !isEnd;
        }); */

  }

  slideGamesChange() {
    // if (this.games !== undefined && this.games?.length > 0)
      // this.sliderGames?.getActiveIndex().then(index => {
      //   //console.log('[HomePage] slideGamesChange()', index);
      //   let slider = this.games[index]
      //   let hour = slider?.scheduled_date.split(' ')[1]
      //   this.infoGames = {
      //     title: slider?.name,
      //     hour: hour.split(':')[0] + ':' + hour.split(':')[1]
      //   }
      // });
  }

  slideActivityChange() {
    // this.sliderPhysical?.getActiveIndex().then(index => {
    //   let slider = this.activity[index]
    //   this.infoActivity = {
    //     title: slider?.group
    //   }

    // });
  }

  changeTake(id, taked) {
    taked = (taked == "0") ? "1" : "0";
    var dict = [];
    dict.push({
      key: "date",
      value: ""
    });
    this.dooleService.postAPIchangeStatedrugIntake(id, taked).subscribe(json => {
      //console.log('[HomePage] changeTake()',  json);
      this.getDrugIntake()
    }, (err) => {
      //console.log('[HomePage] changeTake() ERROR(' + err.code + '): ' + err.message);
      alert('ERROR(' + err.code + '): ' + err.message)
      throw err;
    });
  }

  filterDrugsByStatus() {
    if (this.drugs !== undefined && this.drugs?.length > 0) {
      this.drugs = this.drugs.filter(drug => drug.forgotten != 0)
    }
  }

  searchIndexDrug() {
    if (this.drugs !== undefined && this.drugs?.length > 0) {
      let drug = this.drugs?.find(element =>
        ((this.hourToMinutes(element.hour_intake) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.drugs.indexOf(drug);
      //console.log('[HomePage] searchIndexDrug()', drug, index);
      this.currentIndexDrug = (index > -1) ? index : 0
    }
  }

  searchIndexDGame() {
    if (this.games !== undefined && this.games?.length > 0) {
      let game = this.games?.find(element =>
        ((this.hourToMinutes(element.scheduled_date.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.games.indexOf(game);
      this.currentIndexDrug = (index > -1) ? index : 0
    }
  }

  searchIndexDiet() {
    if (this.diets !== undefined && this.diets?.length > 0) {
      let diet = this.diets?.find(element =>
        ((this.hourToMinutes(element.date.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.diets.indexOf(diet);
      this.currentIndexDiet = (index > -1) ? index : 0
    }
  }

  hourToMinutes(hour) {
    let minutes = hour.split(':')
    return (Number(minutes[0])) * 60 + (Number(minutes[1]))
  }

  doRefresh(event) {
    //console.log('Begin async operation');

    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  isLess(value) {
    if (value <= 3)
      return true
    return false
  }

  async actionButtonGames(item) {
    var browser: any;
    if (item.game_type == "html5") {
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location: 'no',
        toolbar: 'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes',
        hidden: 'no',
      }

      await this.auth.getUserLocalstorage().then(value => {
        this.auth.user = value
      })

      if (item.url?.startsWith("http")) {
        this.header = true
        item.url = item.url + "?user=" + this.auth.user.idUser + "&game=" + item.id;
        browser = this.iab.create(item.url, '_blank', iosoption);
        browser.on('exit').subscribe(event => {
          this.ngZone.run(() => {
            //console.log("anim complete");
            this.header = false
          });
        });
      }
      else {
        browser = this.iab.create(item.url, '_system', iosoption);
      }
    }

    if (item.game_type == "form") {
      // const options: InAppBrowserOptions = {
      //   location: 'no',
      //   toolbar: 'yes'
      // };

      // var pageContent = '<html><head></head><body><form id="loginForm" action="https://covid.doole.io/formAnswer/fill/'+item.form_id+'" method="post" enctype="multipart/form-data">' +
      //   '<input type="hidden" name="idForm" value="'+item.form_id+'">' +
      //   '<input type="hidden" name="user_id" value="'+this.auth.user.idUser+'">' +
      //   '<input type="hidden" name="secret" value="'+this.auth.user.secret+'">' +
      //   '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
      // var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
      // var browserRef = this.iab.create(
      //   pageContentUrl,
      //   "_blank",
      //   "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      // );
      //this.nav.navigateForward('/tracking/form', { state: {id: item.id} });
      this.nav.navigateForward(['/tracking/form', { id: item.form_id }]);
    }

  }

  sortDate(games) {
    //console.log('Async operation has ended' ,games);
    return games.sort(function (a, b) {
      if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1]) > this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
        return 1;
      if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1]) < this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
        return -1;
      return 0;
    })

  }

  formatSelectedDate(date) {

    return this.dateService.formatDateLongFormat(date);
    //return datePipe.transform(date, 'EEEE, d MMMM HH:mm');
  }

  formatDate(d) {
    if (d) {
      var auxdate = d.split(' ')
      //let date = new Date(auxdate[0]);
      d = d.replace(' ', 'T')
      let date0 = new Date(d).toUTCString();
      let date = new Date(date0);
      let time = auxdate[1];
      date.setHours(time?.substring(0, 2));
      date.setMinutes(time?.substring(3, 5));

      return this.dateService.ddMMyyyyHHmm(date);
    }
  }

  transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }

  goDetailRecipe(e) {
    let id = e.item.id
    if (e.item_type === 'App\\Receipt')
      this.nav.navigateForward("/journal/diets-detail/recipe", { state: { id: id } });
  }

  async confirmAllNotification() {
    const notification = localStorage.getItem('allNotification');
    if (JSON.parse(notification))
      return

    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('home.enable_notifications'),
      message: this.translate.instant('home.message_enable_notifications'),
      buttons: [
        {
          text: this.translate.instant("button.cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('[LandingPage] AlertConfirm Cancel');
            localStorage.setItem('allNotification', 'true');
            this.activateAllNotifications(0)
          }
        }, {
          text: this.translate.instant("button.ok"),
          handler: (data) => {
            localStorage.setItem('allNotification', 'true')
            this.activateAllNotifications(1)
          }
        }
      ]
    });

    await alert.present();
  }

  activateAllNotifications(factor) {
    const notification = localStorage.getItem('allNotification');
    if (JSON.parse(notification))
      return

    console.log('[HomePage] activateAllNotifications()');
    let params = { active: 'all', value: factor }
    this.dooleService.postAPIConfiguration(params).subscribe((res) => {
      localStorage.setItem('allNotification', 'true');
    })

  }

  async addElement(slide) {
    console.log('addElement()', slide);
    const modal = await this.modalCtrl.create({
      component: ElementsAddPage,
      componentProps: { id: slide?.element_id, nameElement: slide?.element?.name, units: slide.element?.element_unit?.abbreviation },
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('addElement()', result);

        if (result?.data?.error) {
          // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        } else if (result?.data?.action == 'add') {
          this.notification.displayToastSuccessful()
          this.getUserInformation()
        }
      });

    await modal.present();
  }

  async openModal(slide, isAdvice) {
    console.log('AdviceDEtailModal()', slide);
    const modal = await this.modalCtrl.create({
      component: isAdvice ? AdvicesDetailPage : NewDetailPage,
      componentProps: { id: slide?.id },
    });

    // isModalShowing: FLAG to control IF and WHEN the challenge notification will be shown
    this.pusherChallenge.isModalShowing = true;

    modal.onDidDismiss().then((result) => {
        console.log('showAdvices()', result);

        this.pusherChallenge.isModalShowing = false;
        if (this.pusherChallenge?.pendingNotification?.show) {
          this.pusherChallenge.presentChallengeNotification();
          this.getUserInformation();
        }

      });

    await modal.present();
  }

  async openPDF() {
    const modal = await this.modalCtrl.create({
      component: PdfPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  onSwiper(event){

  }

  onSlideChange(){

  }

}
