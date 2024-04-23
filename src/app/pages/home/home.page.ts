import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Input, NgZone, HostBinding, ApplicationRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { IonicSafeString, ModalController, NavController, Platform } from '@ionic/angular';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { User, Goal, Diet, Drug, PhysicalActivity, Game, Agenda, Advice, FamilyUnit } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { LanguageService } from 'src/app/services/language.service';
import { ElementsAddPage } from '../tracking/elements-add/elements-add.page';
import { NotificationService } from 'src/app/services/notification.service';
import { PusherAlarmService } from 'src/app/services/pusher/pusher-alarm.service';
import { PusherNotificationService } from 'src/app/services/pusher/pusher-notification.service';
import { ExceptionCode } from '@capacitor/core';
import { PusherConnectionService } from 'src/app/services/pusher/pusher-connection.service';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { ACCESS_TYPE, SharedCarePlanPrescribedApps } from 'src/app/models/shared-care-plan';
import { NativeMarket } from "@capacitor-community/native-market";
import { HttpParams } from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { SharedCarePlanService } from 'src/app/services/shared-care-plan/shared-care-plan.service';
import { PrescribedAppsAdapter } from 'src/app/models/shared-care-plan/scp-adapters';
import { ContentTypePath } from 'src/app/models/shared-care-plan';
import { ShowIframeComponent } from 'src/app/components/shared-care-plan/show-iframe/show-iframe.component';
import { Preferences } from '@capacitor/preferences';
import { PermissionService } from 'src/app/services/permission.service';
import { Form } from 'src/app/models/form';
import { PusherChallengeNotificationsService } from 'src/app/services/pusher/pusher-challenge-notifications.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

const ALL_NOTICATION = 'allNotification'
export interface UserInformation {
  title?: string;
  hour?: string;
  image?: string;
  frequency?: string;
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
})
export class HomePage implements OnInit {
  first_name = ''
  public greeting = '';
  pusherNotification = false;
  numNotification = 0;
  goalsColor = ['assets/icons/hpc/icon_check_verde.svg', 'assets/icons/hpc/icon_check_naranja.svg', 'assets/icons/hpc/icon_check_rojo.svg', 'assets/icons/hpc/icon_check_primary.svg']
  dataStore: DataStore<Array<ShowcaseShellUserModel>>;
  data: Array<ShowcaseShellUserModel> & ShellModel;
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }
  WAIT_TIME = 10 //10 minutes
  MAX_GOAL_SLIDER = 3
  userDoole: any = {}
  userImage: string
  goals: any = []
  gamesdiets: any = []
  exercises: any = []
  forms: any = []
  diets: any = []
  challenges: any = [];
  dietsNoMenu: any = []
  drugs: any = []
  games = []
  header = false;
  listFamilyUnit: FamilyUnit[] = [];
  isLoading = false
  isLoadingNumNotifications = false;
  activity: any = []
  appointment: Agenda[] = []
  showGoogleFit = false;
  advices: any = []
  procedures: any = []
  date
  healtDate
  loading: boolean = true;
  isFirstTime = true;



  currentIndexForm = 0
  currentIndexExercise = 0
  currentIndexDrug = 0
  currentIndexGame = 0
  currentIndexDiet = 0
  currentIndexGoal = 0

  sliderGoalConfig: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  sliderConfigVertical: SwiperOptions = {
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  sliderConfigVerticalOneSlide: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: true,
    pagination: true,
  };

  sliderConfigHorizontal: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1.1,
    spaceBetween: 0,
    centeredSlides: false,
  };

  sliderConfigHorizontalOneSlide: SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
  };

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
    effect: 'slide',
    loop: false,

  };

  configVertical: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true, dynamicMainBullets: 3, dynamicBullets: true, },
    scrollbar: { draggable: true },
    effect: 'slide',
    loop: false,
    direction: 'vertical'
  };

  //Horizontal
  sliderAdvicesConfigHorizontal = this.sliderConfigHorizontal;
  sliderProceduresConfigHorizontal = this.sliderConfigHorizontal;
  sliderChallengesConfigHorizontal = this.sliderConfigHorizontal;

  sliderAgendasConfigHorizontal = this.sliderConfigHorizontal;
  //vertical
  sliderGoalsConfigVertical: any = this.sliderGoalConfig;
  sliderDietsConfigVertical: any = this.sliderConfigVertical;
  sliderExercisesConfigVertical: any = this.sliderConfigVertical;
  sliderGamesConfigVertical: any = this.sliderConfigVertical;
  sliderDrugsConfigVertical: any = this.sliderConfigVertical;
  sliderPhysicalConfigVertical: any = this.sliderConfigVertical;
  sliderFormsConfigVertical: any = this.sliderConfigVertical;

  @ViewChild('sliderGoals') sliderGoals: ElementRef | undefined;
  @ViewChild('sliderPhysical') sliderPhysical: ElementRef | undefined;
  @ViewChild('sliderDrug') sliderDrug: ElementRef | undefined;
  @ViewChild('sliderDiet') sliderDiet: ElementRef | undefined;
  @ViewChild('sliderGame') sliderGames: ElementRef | undefined;
  @ViewChild('sliderForms') sliderForms: ElementRef | undefined;
  @ViewChild('sliderExercises') sliderExercises: ElementRef | undefined;

  //@ViewChild('tabs') tabs: TabsComponent;

  infoDiet: UserInformation
  infoForms: UserInformation
  infoExercises: UserInformation
  infoDrugs: UserInformation
  infoGames: UserInformation
  infoActivity: UserInformation
  infoGoals: UserInformation

  textGoals = ''
  prescribedApps: SharedCarePlanPrescribedApps[] = [];
  scpProcedures: PrescribedAppsAdapter;
  safeUrl;


  private dataShareCarePlanNotification: any = history.state?.data;
  private openNotificationAlertDialog: any = history.state?.openNotificationAlertDialog;

  caregiverSelected = '';
  changeColorCargiver = "";

  dayPhrase: string;
  datePhraseReaded: Date = null;
  canReadPhrase: boolean = false;


  public results: any[] = [];
  activateFocus: boolean = false;

  canDoForm: boolean = false
  constructor(
    public router: Router,
    public platform: Platform,
    private dooleService: DooleService,
    private scpService: SharedCarePlanService,
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private health: Health,
    private iab: InAppBrowser,
    private ngZone: NgZone,
    public translate: TranslateService,
    public alertController: AlertController,
    private analyticsService: AnalyticsService,
    private languageService: LanguageService,
    private nav: NavController,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    private pusherAlarms: PusherAlarmService,
    private pusherNotifications: PusherNotificationService,
    private pusherChallenge: PusherChallengeNotificationsService,
    private appRef: ApplicationRef,
    private pusherConnection: PusherConnectionService,
    private constants: Constants,
    public permissionService: PermissionService,
    // public speechRecognition: SpeechRecognition;



  ) {
    this.scpProcedures = new PrescribedAppsAdapter(this.platform);
    SpeechRecognition.requestPermissions();

  }




  async ngOnInit() {
    this.date = this.transformDate(Date.now(), 'yyyy-MM-dd')

    if (this.platform.is('android')) this.checkHealthAccessAndroid();
    if (this.platform.is('ios')) this.checkHealthAccessiOS();

    this.checkStorageNotification();
    this.initPushers()
  }


  async ionViewWillEnter() {



    this.canDoForm = (this.authService?.user?.familyUnit == undefined || this.authService?.user?.familyUnit == null) && this.permissionService.canViewForms;
    this.activateFocus = false;
    this.openNotificationAlertDialog = history.state?.openNotificationAlertDialog;
    console.log('[HomePage] ionViewWillEnter()' + this.openNotificationAlertDialog);

    if (this.getDatedayPhraseReaded()) this.datePhraseReaded = await this.getDatedayPhraseReaded();


    console.log(this.datePhraseReaded)

    this.getUserInformation()
    this.getNumNotification();

    this.update()


    if (!this.pusherConnection?.isConnectedPusher()) {
      const token = this.authService.getAuthToken()
      this.pusherConnection.subscribePusher(token, this.authService?.user?.idUser)
      this.initPushers()
    }

    if (this.openNotificationAlertDialog) {
      this.pusherNotifications.openScpNotificationDialog();
    }
  }




  initPushers() {
    this.pusherAlarms?.init()
    this.pusherChallenge.init()
    const channel = this.pusherNotifications.init();

    if (channel)
      channel.bind(this.pusherNotifications.NOTIFICATION_BIND, ({ data }) => {
        console.log('[HomePage] initPushers()', data);
        this.getNumNotification();
      });

    this.pusherNotifications.initAssignedLevel()
  }



  activatePusherNotification() {
    const channel = this.pusherNotifications?.init();
    console.log('[HomePage] activatePusherNotification() channel ', channel);
    if (channel)
      channel?.bind(this.pusherNotifications.NOTIFICATION_BIND, ({ data }) => {
        console.log('[HomePage] activatePusherNotification()', data);
        this.getNumNotification();
      });
  }

  getNumNotification() {
    this.isLoadingNumNotifications = true;
    this.dooleService.getAPINotificationsCount().subscribe((res) => {
      console.log('[HomePage] getNumNotification()', res);
      if (res?.success) this.numNotification = res?.notifications;
      if (this.numNotification == 0) this.pusherNotification = false;
      else this.pusherNotification = true;

      this.isLoadingNumNotifications = false;
    });
  }

  update() {
    this.appRef.tick();
    console.log('[HomePage] update() cambio ');
  }

  checkHealthAccessAndroid() {
    if (this.platform.is("cordova")) {

      this.health
          .isAvailable()
          .then((available: boolean) => {
            this.health.promptInstallFit()
              this.health
              .requestAuthorization([
                {
                  read : ['distance', 'steps', 'heart_rate', 'activity', 'weight', "blood_glucose"] // Read permission 
                }
              ])
              .then((res) => {
                this.syncData(30);
                this.showGoogleFit = !available;
              })
              .catch((e) => {
                console.log(e);
              });
          })
          .catch((e) => {
            console.log(e);
          });
    }
  }

  checkHealthAccessiOS() {
    if (this.platform.is("cordova")) {
      this.health
        .isAvailable()
        .then((available: boolean) => {
          //if has granted physical activity granted after intro
          //check if physical activity is granted by user
          this.health
              .requestAuthorization([
                {
                  read : ['distance', 'steps', 'heart_rate', 'activity', 'weight',  "blood_glucose"] // Read permission 
                }
              ])
              .then((res) => {
                //this.authService.setShowGoogleFitLocalstorage()
                this.syncData(30);
              })
              .catch((e) => {
                //this.presentAlertConfirm();
                console.log(e);
              });
        })
        .catch((e) => {
          console.log(e);
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
    this.isLoading = true;

    try {
      await Promise.all([
        this.getDayPhrase(),
        this.getFamilyUnitData(),
        this.getUserImage(),
        this.getPersonalInformation(),
        this.getChallenges(),

        this.getFormsList(),
        this.getAdvicesList(),
        this.getExercisesList(),
        (this.drugs = [], this.getDrugIntake()),
        this.getDietList(),
        this.getGoalImformation(),
        this.getGamesList(),
        this.getElementsList(),
        this.getallAgenda(),
        this.getProcedures(),
        // Add other asynchronous calls as needed
      ]);

    } catch (error) {
      console.error('Error fetching user information:', error);
    } finally {

      console.log('Entro sense esperar');

      this.isLoading = false;
    }

  }


  async getDayPhrase() {
    try {

      console.log(this.datePhraseReaded)
      if (this.datePhraseReaded !== null) {
        if (this.hasMoreThanOneDayPassed(this.datePhraseReaded, new Date())) {
          const res: any = await new Promise((resolve, reject) => {
            this.dooleService.getAPIDayPhrase().subscribe(
              (data: any) => {
                console.log('[HomePage] getDayPhrase()', data);
                resolve(data);
              },
              (error) => {
                console.log('[HomePage] getDayPhrase() ERROR(' + error.code + '): ' + error.message);
                reject(error);
              }
            );
          });

          this.dayPhrase = res.dayPrase.phrase;

          if (this.dayPhrase != null) {
            this.openAICoachMessage(this.dayPhrase)
            this.setDateDayPhraseReaded(new Date());
          }
        }
        else {
          console.log("cant read")
          this.canReadPhrase = false;
        }

      }
      else {

        console.log("Entro per aqui")
        const res: any = await new Promise((resolve, reject) => {
          this.dooleService.getAPIDayPhrase().subscribe(
            (data: any) => {
              console.log('[HomePage] getDayPhrase()', data);
              resolve(data);
            },
            (error) => {
              console.log('[HomePage] getDayPhrase() ERROR(' + error.code + '): ' + error.message);
              reject(error);
            }
          );
        });

        this.dayPhrase = res.dayPrase.phrase;

        //this.dayPhrase = "Your health is your greatest wealth, and every food choice is an opportunity to strengthen it. With the power of your decisions, you can manage diabetes and live a full and healthy life. Every bite counts towards a brighter future!"
        if (this.dayPhrase != null) {
          this.openAICoachMessage(this.dayPhrase)
          this.setDateDayPhraseReaded(new Date());
        }
      }


    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching user image:', error);
      throw error;
    }
  }


  hasMoreThanOneDayPassed(date1: Date, date2: Date): boolean {
    // Calculate the difference in time between the two dates
    const differenceInTime = Math.abs(date2.getTime() - date1.getTime());

    // Calculate the number of days between the two dates
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    // Check if the difference is greater than 1 day
    return differenceInDays >= 1;
  }

  async getFamilyUnitData() {

    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIFamilyUnit().subscribe(
          (data: any) => {
            console.log('[HomePage] getFamilyUnitData()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getFamilyUnitData() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      this.listFamilyUnit = res;

      console.log(this.listFamilyUnit)


      //this.results = [...this.listFamilyUnit];

      console.log(this.listFamilyUnit)

    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching user image:', error);
      throw error;
    }
  }

  async returnUser() {

    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      //mode: 'ios',
      header: this.translate.instant("home.back_caregiver"),
      message: this.translate.instant("setting.family_unit.msg_alert_change_perfil"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'warning',
          handler: (blah) => {
            this.onCancel()
            console.log('[LandingPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_change"),
          role: 'confirm',
          cssClass: 'secondary',
          handler: (data) => {
            this.authService.isFamily = false;
            this.pusherConnection.unsubscribePusher()
            console.log(this.authService.user.familyUnit)
            Preferences.remove({ key: this.authService.user.familyUnit }).then((val) => { });
            this.authService.setUserFamilyId(null).then((val) => {
              this.ngZone.run(() => {
                this.isLoading = true;
                this.changeColorCargiver = "";
                this.permissionService.resetPermissions();
                this.ionViewWillEnter()

                const root = document.documentElement;
                //const ionContent = document.querySelector('ion-content');
                //ionContent.style.backgroundColor = 'rgba(236, 221, 254, 1)';
                //root.style.setProperty('--default-bkg', '#ECDDFE' ? 'rgba(236, 221, 254, 1)' : '#ECDDFE');
                root.style.setProperty('--carguiverBackground', '#EFEFEF' ? 'rgba(239,239,239)' : '#EFEFEF');
              });
            });
          }
        }
      ]
    });

    await alert.present();



  }

  async onCaregiverSelect(event: any) {
    console.log(event.detail.value)


    this.caregiverSelected = '';
    this.caregiverSelected = this.results[event.detail.value];


    this.alertCaregiver(this.caregiverSelected);

  }

  async alertCaregiver(caregiverSelected) {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      //mode: 'ios',
      header: caregiverSelected?.name,
      message: this.translate.instant("setting.family_unit.msg_alert_change_perfil"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'warning',
          handler: (blah) => {
            this.onCancel()
            console.log('[LandingPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("alert.button_change"),
          role: 'confirm',
          cssClass: 'secondary',
          handler: (data) => {
            this.changeUser(caregiverSelected)
            this.changeColorCargiver = this.caregiverSelected;
            const root = document.documentElement;
            //const ionContent = document.querySelector('ion-content');
            //ionContent.style.backgroundColor = 'rgba(236, 221, 254, 1)';
            root.style.setProperty('--carguiverBackground', '#ECDDFE' ? 'rgba(236, 221, 254, 1)' : '#ECDDFE');

          }
        }
      ]
    });

    await alert.present();
  }

  changeUser(user?) {
    console.log('[FamilyUnitPage] changeUser() Cuenta de:', user);
    this.authService.setFamilyUnit(user).then((val) => {
      this.ngZone.run(() => {
        this.isLoading = true;

        /*  user.permissionsName = [
           "canViewGoals",
           "canManageGoals",
           "canViewForms",
           "canViewAnswerForms",
           "canViewExercises",
           "canViewDiets",
           "canViewRecipes",
           "canViewGames",
           "canViewMonitoring",
           "canManageMonitoring",
           "canViewAdvices",
           "canViewMedicalProcedures",
           "canViewNew",
           "canViewTestimonials",
           "canViewMedicalTests",
           "canManageMedicalTests",
           "canViewMedication",
           "canManageMedication",
           "canViewMedicationPlans",
           "canViewPlanningForm",
           "canViewEvents",
           "canManageEvents",
           "canManageMessages",
           "canSeeMedicalVisits",
           "canManageRequesVisit",
           "canSeeCenters", 
           "colorCargiver"
         ]*/

        this.permissionService.setPermissions(user.permissionsName);
        this.pusherConnection.unsubscribePusher()
        this.ionViewWillEnter()


      });
    });


  }

  async getUserImage() {
    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIUserImage().subscribe(
          (data: any) => {
            console.log('[HomePage] getUserImage()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getUserImage() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      this.userImage = res.temporary_url;
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching user image:', error);
      throw error;
    }
  }


  async getPersonalInformation() {
    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIuserProfile().subscribe(
          (data: any) => {
            console.log('[HomePage] getPersonalInformation()', data)
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getPersonalInformation() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      this.userDoole = res.user;
      this.first_name = this.userDoole?.first_name?.split(' ')[0];

      this.greeting = this.translate.instant('home.hello') + ', ' + "<b>" + this.first_name + "</b>";


    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching personal information:', error);
      throw error;
    }
  }


  async getAdvicesList() {
    try {
      let params = {
        tags: 1,
        interactions: 1,
        readingTime: 1
      }
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIlistAdvices(params).subscribe(
          (data: any) => {
            console.log('[HomePage] getAdvicesList()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getAdvicesList() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });


      if (res?.goals?.length > 0) {
        this.setGoalsSlider(res.goals);
      }

      if (res.advices.length > 0) this.setAdvicesSlider(res.advices/* , res.news */);

      //this.getNewsList(res.advices);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching advices list:', error);
      throw error;
    }
  }


  async getNewsList(advices) {
    try {
      let params = {
        tags: 1,
        interactions: 1,
        readingTime: 1
      }
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIlistNews(params).subscribe(
          (data: any) => {
            console.log('[HomePage] getNewsList()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getNewsList() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      //this.setAdvicesSlider(advices, res.news);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching news list:', error);
      alert('ERROR(' + error.code + '): ' + error.message);
      throw error;
    }
  }


  async getGoalImformation() {
    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIgoals().subscribe(
          (data: any) => {
            console.log('[HomePage] getGoalImformation()', data);
            resolve(data);
          },
          (error) => {
            console.log('getGoalImformation() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      if (res?.goals?.length > 0) {
        this.setGoalsSlider(res.goals);
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching goal information:', error);
      throw error;
    }
  }


  async getElementsList() {
    try {
      const params = { filter: '1' };
      const data: any = await new Promise((resolve, reject) => {
        this.scpService.get_APi_ACP_monitoring().subscribe(
          //this.dooleService.getAPIelementsListByDate(params).subscribe(
          (response: any) => {
            console.log('[TrackingPage] getElementsList()', response);
            resolve(response);
          },
          (error) => {
            alert(`Error: ${error.code}, Message: ${error.message}`);
            console.log('[TrackingPage] getElementsList() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      this.setPhysicalSlider(data);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching elements list:', error);
      throw error;
    }
  }

  async getGamesList() {
    try {

      const data: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIgamesByDate(this.date, this.date).subscribe(
          async (res: any) => {

            console.log('[TrackingPage] getGamesList()', await res);
            resolve(res)

          },
          (error) => {
            alert(`Error: ${error.code}, Message: ${error.message}`);
            console.log('[TrackingPage] getGamesList() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });
      this.games = data.gamePlays;
      console.log(this.games)
      this.setGamesSlider(this.games)

      //this.setG(data);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching elements list:', error);
      throw error;
    }
  }

  navigateToFormPage(content) {
    console.log('[FormListPage] navigateToFormPage() ', content)

    if (this.canDoForm) {
      this.router.navigate([ContentTypePath.FormDetail, { id: content.form_id }], { state: { game_play_id: content.data?.game_play_id, form_programmation_id: content.id, form_answer_id: content?.id } });
    }
  }



  async getFormsList() {
    try {
      const params = { date: this.date, grouped_by_times: false }
      const data: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIFormsByDate(params).subscribe(
          async (res: any) => {
            console.log('[TrackingPage] getAPIformPending()', await res);
            const forms = Form.getFormProgrammationByTimes(res)
            this.setFormsSlider(forms)
          },
          (error) => {
            alert(`Error: ${error.code}, Message: ${error.message}`);
            console.log('[TrackingPage] getAPIformPending() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching elements list:', error);
      throw error;
    }
  }

  async getChallenges() {
    try {


      const data: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIChallenges({ onlyAccepted: 1 }).subscribe(
          async (res: any) => {
            console.log('[TrackingPage] getAPIChallenges()', await res);
            this.setChallengesSlider(res.challenges)
          },
          (error) => {
            alert(`Error: ${error.code}, Message: ${error.message}`);
            console.log('[TrackingPage] getGamesList() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching elements list:', error);
      throw error;
    }
  }

  async getExercisesList() {
    try {
      const exercisesPromise = await new Promise((resolve, reject) => {
        this.scpService.getAPIExercises().subscribe(
          //  this.dooleService.getAPIExercisesByDate(this.date, this.date).subscribe(
          res => resolve(res),
          error => reject(error)
        );
      });

      //  let [exercisesResponse] = await Promise.all([exercisesPromise]) as [any];;
      console.log('[TrackingPage] getExercisesList()', exercisesPromise);
      this.setExercisesSlider(exercisesPromise);

    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching elements list:', error);
      throw error;
    }
  }


  async getExercisesListOld() {
    try {

      const data: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIExercisesByDate(this.date, this.date).subscribe(
          async (res: any) => {
            console.log('[TrackingPage] getAPIExercises()', await res);
            this.setExercisesSlider(res?.exercisePlays)
          },
          (error) => {
            alert(`Error: ${error.code}, Message: ${error.message}`);
            console.log('[TrackingPage] getGamesList() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching elements list:', error);
      throw error;
    }
  }

  ViewData() {

    if (this.forms?.length > 0 || this.exercises?.length > 0 || this.drugs?.length > 0 || this.diets?.length > 0 || this.games?.length > 0 || this.activity?.length > 0) {
      return true
    } else {
      return false
    }
  }



  setSliderOption(option, list?) {
    switch (option) {
      //Horizontal
      case 'agenda':
        this.sliderAgendasConfigHorizontal = (this.appointment?.length == 1) ? this.sliderConfigHorizontalOneSlide : this.sliderConfigHorizontal
        break;
      case 'advices':
        this.sliderAdvicesConfigHorizontal = (this.advices?.length == 1) ? this.sliderConfigHorizontalOneSlide : this.sliderConfigHorizontal
        break;
      case 'procedures':
        this.sliderProceduresConfigHorizontal = (this.procedures?.length == 1) ? this.sliderConfigHorizontalOneSlide : this.sliderConfigHorizontal
        break;
      case 'challenges':
        this.sliderChallengesConfigHorizontal = (this.challenges?.length == 1) ? this.sliderConfigHorizontalOneSlide : this.sliderConfigHorizontal
        break;
      //Vertical
      case 'goals':
        this.sliderGoalsConfigVertical = (this.goals?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderGoalConfig
        break;
      case 'drugs':
        this.sliderDrugsConfigVertical = (this.drugs?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderConfigVertical
        break;
      case 'physical':
        this.sliderPhysicalConfigVertical = (this.activity?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderConfigVertical
        break;
      case 'diets':
        this.sliderDietsConfigVertical = (this.diets?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderConfigVertical
        break;
      case 'games':
        this.sliderGamesConfigVertical = (this.games?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderConfigVertical
        break;
      case 'exercises':
        this.sliderExercisesConfigVertical = (this.exercises?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderConfigVertical
        break;
      case 'forms':
        this.sliderFormsConfigVertical = (this.forms?.length == 1) ? this.sliderConfigVerticalOneSlide : this.sliderConfigVertical
        break;
    }
  }

  setGoalsSlider(goals) {
    this.currentIndexGoal = 0

    console.log('setGoalsSlider()', this.goals);


    if (goals && goals?.length > 0) {
      this.goals = goals

      this.goals.forEach(goal => {
        let element_last_value = goal?.element?.element_last_value
        if (element_last_value.value != null) {
          goal['progress_bar_value'] = String(this.convertToDecimal(goal?.goal_compute?.percentage));
          goal['progress_bar_color'] = this.getProgressBarClass(goal);
          goal['last_value'] = parseFloat(goal?.element?.element_last_value?.value);
          goal['value1'] = parseFloat(goal?.value1)
          goal['last_value_date'] = goal?.element.element_last_value?.date_value;
          goal['last_value_text'] = goal?.last_value + ' ' + goal.element?.element_unit?.abbreviation
        }
        else
          goal.last_value_text = this.translate.instant('home.goals_no_data');
      });

      this.searchIndexGoal()
      console.log('[HomePage] setGoalsSlider() update', this.currentIndexGoal);

      this.infoGoals = {
        title: this.goals[this.currentIndexGoal]?.element?.name,
        image: this.selectImgGoalsProgressBar(this.goals[this.currentIndexGoal]?.progress_bar_color),
        frequency: this.goals[this.currentIndexGoal]?.frequencyString
      }

      //  this.sliderGoals?.nativeElement?.swiper?.slideTo(this.currentIndexGoal).then( slide => {
      //     this.slideGoalChange()
      //   }) 
      console.log('[HomePage] setGoalsSlider() update', this.infoGoals);
    }
  }

  updateAdvicesSlider(advices) {
    /* this.sliderGoals?.update().then( event => {
      this.advices = advices?.length > 0 ? advices: [];
      this.setSliderOption('advices')
    }) */
  }

  setAdvicesSlider(advices/* , news */) {
    this.advices = advices?.length > 0 ? advices : [];
    /* if (news?.length > 0)
      news.forEach(element => {
        element['new'] = true
        this.advices.push(element)
      }); */
    this.advices = this.advices.filter(advice => (!this.getStatusable(advice?.statusable, 'hide')))
    this.setSliderOption('advices')
    this.updateAdvicesSlider(advices)

    console.log(this.advices)
  }

  updateDietSlider(diets) {
    this.diets = diets?.length > 0 ? diets : [];
    this.setSliderOption('diets')
  }

  updateGamesSlider(games) {
    this.games = games?.length > 0 ? games : [];
    this.setSliderOption('games')
  }
  updateExercisesSlider(exercises) {
    this.exercises = exercises?.length > 0 ? exercises : [];
    this.setSliderOption('exercises')
  }

  updateChallengesSlider(challenges) {
    this.challenges = challenges?.length > 0 ? challenges : [];
    this.setSliderOption('challenges')
  }

  updateFormsSlider(forms) {
    this.forms = forms?.length > 0 ? forms : [];
    this.setSliderOption('forms')
  }

  setDietSlider(diets) {
    console.log('[DiaryPage] setDietSlider()', diets);
    this.diets = diets?.length > 0 ? diets : [];

    if (this.diets.length > 0) {
      this.infoDiet = {
        title: this.diets[this.currentIndexDiet]?.items,
        hour: this.diets[this.currentIndexDiet]?.from_date !== null ? this.transformDate(new Date(this.diets[this.currentIndexDiet]?.from_date), 'HH:mm') : ''
      }

      this.setSliderOption('diets')
      this.updateDietSlider(diets)
    }
  }

  setGamesSlider(games) {
    console.log('[DiaryPage] setDietSlider()', games);


    if (this.games !== undefined && this.games.length > 0) {

      this.infoGames = {
        title: this.games[this.currentIndexGame]?.name,
        hour: this.games[this.currentIndexGame]?.scheduled_date !== null ? this.transformDate(new Date(this.games[this.currentIndexGame]?.scheduled_date), 'HH:mm') : ''
      }


      this.setSliderOption('games')
      //this.updateGamesSlider(games)

      this.sliderGames.nativeElement.swiper.activeIndex = this.currentIndexGame;
    }


  }

  setExercisesSlider(exercises) {
    console.log('[DiaryPage] setDietSlider()', exercises);
    this.exercises = exercises?.length > 0 ? exercises : [];

    if (this.exercises.length > 0) {
      this.searchIndexExercise();
      this.infoExercises = {
        title: this.exercises[this.currentIndexExercise]?.exercise?.name,
        hour: this.exercises[this.currentIndexExercise]?.scheduled_date ? this.transformDate(new Date(this.exercises[this.currentIndexExercise]?.scheduled_date), 'HH:mm') : ''
      }

      this.setSliderOption('exercises')
      this.updateExercisesSlider(exercises)
    }

  }

  setChallengesSlider(challenges) {
    console.log('[DiaryPage] challenges()', challenges);
    this.challenges = challenges?.length > 0 ? challenges : [];

    if (this.challenges.length > 0) {
      this.setSliderOption('challenges')
      this.updateChallengesSlider(challenges)
    }

  }

  setFormsSlider(forms) {
    console.log('[DiaryPage] setFormsSlider()', forms);
    this.forms = forms?.length > 0 ? forms : [];

    if (this.forms.length > 0) {

      this.searchIndexForm();
      this.infoForms = {
        title: this.forms[this.currentIndexForm]?.title,
        hour: this.forms[this.currentIndexForm]?.time
      }
      this.setSliderOption('forms')
      this.updateFormsSlider(forms)
    }
  }

  groupelement(elements) {
    let group = []
    elements.forEach((element, index) => {
      const groupName = element?.group?.name
      if (index == 0 || groupName !== elements[index - 1].group?.name) {
        let list = elements.filter(e => (e?.group?.name === groupName))
        const item = { group: groupName, elements: list }
        group.push(item)
      }

    })
    return group
  }

  sortElements(elements) {
    return elements.sort(function (a, b) {
      if (a?.group?.name > b?.group?.name)
        return 1;
      if (a?.group?.name < b?.group?.name)
        return -1;
      return 0;
    })
  }

  setPhysicalSlider(constants) {
    this.activity = []
    if (constants?.length > 0) {
      this.activity = this.groupelement(
        this.sortElements(constants)
      )
      this.slideActivityChange()
    }
    this.setSliderOption('physical')
  }

  // setPhysicalSlider(constants) {
  //   this.activity = []
  //   let elements = constants
  //   if (elements?.eg) {
  //     this.treeIterate(elements?.eg, '');
  //     this.slideActivityChange()
  //   }
  //   this.setSliderOption('physical')
  // }

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
    console.log('[DiaryPage] treeIterateDiets()', this.diets);
  }

  treeIterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {

          this.treeIterate(obj[property], stack + '.' + property);
        } else {
          if (property == "group") {
            obj['is_child'] = stack.includes('childs');
            //if(obj?.elements?.length>0)
            this.activity.push(obj);

          }

        }
      }
    }

    console.log(this.activity);
  }

  goElements() {
    console.log('[HomePage] goElements()');
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
    goal.value1 = parseFloat(goal.value1)
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

    // console.log("** Goal: ", goal );
    // console.log("** goalType: ", goal.goalType );
    // console.log("**  element.last value: ", element_goal?.value);
    // console.log("**  goal.value2 : ", goal.value2 );
    // console.log("**  element.reversed: ", goal.reversed);
    // console.log("**  element.goal_percentage: ", goal.goal_percentage);
    // console.log("**  element.progress_bar_value: ",  goal.progress_bar_value);
    // console.log("**  element.progress_bar_color: ",  goal.progress_bar_color);
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
    } else if (goal.last_value <= goal.value1 && goal.last_value <= goal.value2) {
      goal = this.getGoalProgress(goal, goal.value1)
    } else if (goal.last_value <= goal.value1 && goal.last_value >= goal.value2) {
      console.log("**  ERROR: ");
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
      goal.goal_percentage = goal?.goal_compute?.percentage; //this.getGoalPercentage(goal.last_value, target);
      goal.progress_bar_value = this.convertToDecimal(goal?.goal_compute?.percentage)
    } else if (goal.last_value > target) {
      goal.goal_percentage = goal?.goal_compute?.percentage;//this.getGoalPercentage(goal.last_value, target);
      goal.progress_bar_value = this.convertToDecimal(goal?.goal_compute?.percentage)
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
    //console.log("** equal() goalType: ", goal.goalType);
    if (goal.last_value == goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  lessThan(goal) {
    //console.log("** lessThan() goalType: ", goal.goalType);
    goal.reversed = true;
    if (goal.last_value < goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  greaterOrEqualThan(goal) {
    //console.log("** greaterThan() goalType: ", goal.goalType);
    goal.reversed = false;
    if (goal.last_value >= goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }

    return goal;
  }

  lessOrEqualThan(goal) {
    //console.log("** lessThan() goalType: ", goal.goalType);
    goal.reversed = true;
    if (goal.last_value <= goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  greaterThan(goal) {
    //console.log("** greaterThan() goalType: ", goal.goalType);
    goal.reversed = false;
    if (goal.last_value > goal.value1) {
      goal = this.goalAchieved(goal);
    } else {
      goal = this.getGoalProgress(goal, goal.value1)
    }

    return goal;
  }

  convertToDecimal(numberVal) {
    if (numberVal == 0)
      return 0;
    else
      return (numberVal / 100).toFixed(3);

  }


  getProgressBarClass(goal, reversed = false) {


    let cssClass: string;
    let value = this.convertToDecimal(goal?.goal_compute?.percentage);

    // if(goal.goal_type == "<" || goal.goal_type == "<=")
    //   cssClass = this.reversedProgressBarClass(percentage);
    // else
    cssClass = this.progressBarClass(value);

    return cssClass
  }

  progressBarClass(value) {
    //console.log("** progressBarClass(): ", value);
    if (value <= 0.25)
      return 'my-buffer-progress_red'
    else if (value > 0.25 && value <= 0.75)
      return 'my-buffer-progress_orange'
    else if (value > 0.75)
      return 'my-buffer-progress_green'

  }

  reversedProgressBarClass(value) {
    //console.log("** reversedProgressBarClass(): ", value);
    if (value >= 0.75)
      return 'my-buffer-progress_red'
    else if (value < 0.75 && value > 0.25)
      return 'my-buffer-progress_orange'
    else
      return 'my-buffer-progress_green'

  }

  selectImgGoalsProgressBar(progress) {
    let res = this.goalsColor[0]
    switch (progress) {
      case 'my-buffer-progress_green':
        res = this.goalsColor[0]
        break;
      case 'my-buffer-progress_orange':
        res = this.goalsColor[1]
        break;
      case 'my-buffer-progress_red':
        res = this.goalsColor[2]
        break;
      default:
        res = this.goalsColor[3]
        break;
    }
    return res
  }

  async getDrugIntake() {
    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIdrugIntakeByDate({ date: this.date }).subscribe(
          (data: any) => {
            console.log('[HomePage] getDrugIntake()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getDrugIntake() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      this.drugs = res.drugIntakes;
      this.filterDrugsByStatus();
    } catch (error) {
      console.error('Error fetching drug intake:', error);
      throw error;
    }
  }


  async getProcedures() {
    try {
      const date = { from_date: this.date + ' 00:00', to_date: null };

      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.postAPImedicalProcedures(date).subscribe(
          (data: any) => {
            console.log('[HomePage] getProcedures()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getProcedures() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      if (res.success) {
        this.procedures = res.medicalProcedures;
        this.setSliderOption('procedures');
      }
    } catch (error) {
      console.error('Error fetching procedures:', error);
      throw error;
    }
  }

  async getDietList() {
    this.diets = []
    let date = this.transformDate2(this.date)
    this.dooleService.getAPIlistDietsByDate(date).subscribe(
      async (res: any) => {
        console.log('[DiaryPage] getDietList()', await res);
        if (res.diets) {
          this.setDietSlider(res?.diets)
        }
      });
  }

  convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
  }

  syncData(days) {
    let startDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    let endDate = new Date(); // now
    const healthDataTypes = ['steps', 'distance', 'heart_rate', 'weight', 'blood_glucose', 'height'];
    let promises = [];

    healthDataTypes.forEach((dataType) => {
      console.log('dataType:', dataType);
      const queryType = dataType === 'steps' || dataType === 'distance' ? 'queryAggregated' : 'query';
      const promise = this.health[queryType]({
        startDate: startDate,
        endDate: endDate,
        dataType: dataType,
        ...(queryType === 'queryAggregated' && { bucket: 'hour' })
      }).then(data => {
        return this.postHealth(dataType, data);
      }).catch(error => {
        console.error(error);
        return error;
      });

      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      
    }).catch(error => {
      console.error('Error with one of the health data queries:', error);
    });
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

  agendaTitle(slide) {
    if (slide?.agenda_type?.type == 'turnos' || slide?.agenda_type?.type == 'turno') {
      return this.translate.instant('agenda.type_turn')
    } else {
      if (slide?.origin == 0)
        return this.translate.instant('agenda.type_turn')
      else if (slide?.origin == 1 && slide?.staff.length > 0)
        return this.translate.instant('agenda.type_meeting')
      else return this.translate.instant('agenda.type_event')
    }
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
  }

  actionRegisterAdvice(slide) {
  }

  actionCloseAppointment(slide) {
    slide.hide = true
    this.appointment = this.appointment.filter(slide => slide.hide == false)
  }

  actionDetailAppointment(slide) {
  }

  actionButtonDrugs(slide) {
  }

  slideGoalDrag(event) {
    console.log('[HomePage] slideGoalDrag()', event);
  }


  slideExerciseChange() {
    if (this.exercises !== undefined && this.exercises?.length > 0) {
      const index = this.sliderExercises?.nativeElement?.swiper.activeIndex
      let slider = this.exercises[index]
      this.infoExercises = {
        title: slider?.exercise?.name,
        hour: slider?.scheduled_date
          ? this.transformDate(new Date(slider?.scheduled_date), 'HH:mm')
          : ''
      }

      console.log(this.infoExercises)
    }
  }

  slideFormChange() {
    if (this.forms !== undefined && this.forms?.length > 0) {
      const index = this.sliderForms?.nativeElement?.swiper.activeIndex
      let slider = this.forms[index]
      console.log(this.forms)

      this.infoForms = {
        title: this.forms[index]?.title,
        hour: this.forms[index]?.time
      }

      console.log(this.infoForms)
    }
  }

  slideGoalChange() {
    console.log('[HomePage] slideGoalChange()');
    if (this.goals !== undefined && this.goals?.length > 0) {
      const index = this.sliderGoals.nativeElement.swiper.activeIndex
      let slider = this.goals[index]
      this.infoGoals = {
        title: slider?.element?.name,
        image: this.selectImgGoalsProgressBar(slider?.progress_bar_color),
        frequency: slider?.frequencyString
      }
    }
  }

  slideDietChange() {
    if (this.diets !== undefined && this.diets?.length > 0) {
      const index = this.sliderDiet?.nativeElement?.swiper.activeIndex
      let slider = this.diets[index]
      console.log(this.diets)
      this.infoDiet = {
        title: slider?.items,
        hour: slider?.from_date
          ? this.transformDate(new Date(slider?.from_date), 'HH:mm')
          : ''
      }

      console.log(this.infoDiet)
    }
  }

  slideDrugChange() {
    console.log("entro")
    if (this.drugs !== undefined && this.drugs?.length > 0) {
      const index = this.sliderDrug?.nativeElement?.swiper?.activeIndex
      let slider = this.drugs[index]

      console.log(slider)

      this.infoDrugs = {
        title: slider?.name,
        hour: slider?.hour_intake
      }
      console.log('[HomePage] slideDrugChange()', this.infoDrugs, index);
    } else {
      this.infoDrugs = null;
    }

  }

  slideGameChange() {
    console.log("Entro")

    console.log(this.games)
    console.log(this.games?.length > 0)
    if (this.games !== undefined && this.games?.length > 0) {
      const index = this.sliderGames?.nativeElement?.swiper.activeIndex
      let slider = this.games[index]
      this.infoGames = {
        title: slider?.items,
        hour: slider?.scheduled_date ? this.transformDate(new Date(slider?.scheduled_date), 'HH:mm') : ''
      }

      console.log(this.infoGames)
    }
    else {
      this.infoGames = null
    }
  }

  slideActivityChange() {
    if (this.activity !== undefined && this.activity?.length > 0) {
      const index = this.sliderPhysical?.nativeElement?.swiper?.activeIndex
      let slider = this.activity[index]
      this.infoActivity = {
        title: slider?.group
      }
    }
    console.log(this.activity)
  }

  changeTake(id, taked) {
    if (this.permissionService.canManageMedication) {
      taked = (taked == "0") ? "1" : "0";
      var dict = [];
      dict.push({
        key: "date",
        value: ""
      });
      this.dooleService.postAPIchangeStatedrugIntake(id, taked).subscribe(json => {
        this.getDrugIntake()
      }, (err) => {
        alert('ERROR(' + err.code + '): ' + err.message)
        throw err;
      });
    }

  }

  filterDrugsByStatus() {
    console.log('[HomePage] filterDrugsByStatus()');
    if (this.drugs !== undefined && this.drugs?.length > 0) {
      console.log('[HomePage] filterDrugsByStatus()', event);
      this.drugs = this.drugs.filter(drug => drug.forgotten !== 0)

      this.searchIndexDrug()
      this.infoDrugs = {
        title: this.drugs[this.currentIndexDrug]?.name,
        hour: this.drugs[this.currentIndexDrug]?.hour_intake
      }
      this.setSliderOption('drugs')
      this.sliderDrug.nativeElement.swiper.activeIndex = this.currentIndexDrug;

    } else {
      this.infoDrugs = null;
    }
  }

  searchIndexGoal() {
    let length = this.goals?.length
    if (length > 0) {
      if (length % 2 == 0) { //Si es par
        this.currentIndexGoal = length / 2 - 1
      } else
        this.currentIndexGoal = Math.trunc(length / 2)
    }
  }

  searchIndexDrug() {
    if (this.drugs !== undefined && this.drugs?.length > 0) {
      let drug = this.drugs?.find(element =>
        ((this.hourToMinutes(element?.hour_intake) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.drugs.indexOf(drug);
      this.currentIndexDrug = (index > -1) ? index : 0
    }
  }

  searchIndexExercise() {
    if (this.exercises !== undefined && this.exercises?.length > 0) {
      if (!this.exercises[0]?.scheduled_date) {
        this.currentIndexExercise = 0
        return
      }
      let exercise = this.exercises?.find(element =>
        ((this.hourToMinutes(element?.scheduled_date?.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.exercises.indexOf(exercise);
      this.currentIndexExercise = (index > -1) ? index : 0
    }
  }


  searchIndexForm() {
    if (this.forms !== undefined && this.forms?.length > 0) {
      let form = this.forms?.find(element =>
        ((this.hourToMinutes(element.time) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.forms.indexOf(form);
      this.currentIndexForm = (index > -1) ? index : 0
    }
  }

  searchIndexDGame() {
    if (this.games !== undefined && this.games?.length > 0) {
      let game = this.games?.find(element =>
        ((this.hourToMinutes(element.scheduled_date?.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.games.indexOf(game);
      this.currentIndexDrug = (index > -1) ? index : 0
    }
  }

  searchIndexDiet() {
    if (this.diets !== undefined && this.diets?.length > 0) {
      let diet = this.diets?.find(element =>
        ((this.hourToMinutes(element.scheduled_date?.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours() * 60 + new Date().getMinutes()))
      )
      let index = this.diets?.indexOf(diet);
      this.currentIndexDiet = (index > -1) ? index : 0
    }
  }

  hourToMinutes(hour) {
    let minutes = hour?.split(':')
    return (Number(minutes[0])) * 60 + (Number(minutes[1]))
  }

  doRefresh(event) {
    setTimeout(() => {
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

      await this.authService.getUserLocalstorage().then(value => {
        this.authService.user = value
      })

      if (item.url.startsWith("http")) {
        this.header = true
        item.url = item.url + "?user=" + this.authService.user.idUser + "&game=" + item.id;
        browser = this.iab.create(item.url, '_blank', iosoption);
        browser.on('exit').subscribe(event => {
          this.ngZone.run(() => {
            this.header = false
          });
        });
      }
      else {
        browser = this.iab.create(item.url, '_system', iosoption);
      }
    }

    if (item.game_type == "form") {
      this.nav.navigateForward(['/tracking/form', { id: item?.form_id }]);
    }

  }

  sortDate(games) {
    return games.sort(function (a, b) {
      if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1]) > this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
        return 1;
      if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1]) < this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
        return -1;
      return 0;
    })

  }

  formatSelectedDate(date) {
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM, HH:mm');
  }

  formatDate(d) {
    if (d) {
      let date = new Date(d)
      return this.transformDate(date, 'dd/MM/yyyy HH:mm')
    }
  }

  formatDate2(d) {
    if (d) {
      let date = new Date(d)
      return this.transformDate(date, 'dd/MM/yyyy')
    }
  }

  transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }

  transformDate2(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }



  goUnitName(unitName) {
    let name = JSON.parse(unitName)
    return Object.values(name) + ''
  }

  async confirmAllNotification() {
    const notification = localStorage.getItem(ALL_NOTICATION);
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
            localStorage.setItem(ALL_NOTICATION, 'true');
            this.activateAllNotifications(0)
          }
        }, {
          text: this.translate.instant("button.ok"),
          handler: (data) => {
            localStorage.setItem(ALL_NOTICATION, 'true')
            this.activateAllNotifications(1)
          }
        }
      ]
    });

    await alert.present();
  }

  activateAllNotifications(factor) {
    console.log('[HomePage] activateAllNotifications()');
    let params = { active: 'all', value: factor }
    this.dooleService.postAPIConfiguration(params).subscribe((res) => { })
  }

  checkStorageNotification() {
    const notification = localStorage.getItem('allNotification');
    if (JSON.parse(notification))
      return
    this.activateAllNotifications(1)
    localStorage.setItem('allNotification', 'true')
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
        } else if (result?.data?.action == 'add') {
          this.notification.displayToastSuccessful()
          this.getUserInformation()
        }
      });

    await modal.present();
  }

  async activatePendingMedicationPlans() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant('alert.header_atention'),
      message: this.translate.instant('home.pending_medication_planes'),
      buttons: [
        {
          text: this.translate.instant("button.ignore"),
          role: 'cancel',
          cssClass: 'warning',
          handler: (blah) => {
            console.log('[LandingPage] AlertConfirm Cancel');
          }
        }, {
          text: this.translate.instant("button.start"),
          role: 'confirm',
          cssClass: 'secondary',
          handler: (data) => {
            this.router.navigate([`/more/medication-plan/medication-pending`]);
          }
        }
      ]
    });

    await alert.present();
  }

  async getallAgenda() {
    try {
      const params = { from_date: this.date, to_date: null, with_medical_procedures: 0, filter_by_date: 1, order: 1 };
      console.log('[HomePage] getallAgenda() init', params, this.date);

      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIallAgenda(params).subscribe(
          (data: any) => {
            console.log('[HomePage] getallAgenda()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getallAgenda() ERROR(' + error.code + '): ' + error.message);
            alert('ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      if (res.agenda) {
        this.appointment = res.agenda;
        this.setSliderOption('agenda');
      }
    } catch (error) {
      console.error('Error fetching agenda:', error);
      throw error;
    }
  }


  goEventDetail(event) {
    if (event?.agenda_type?.type === 'turno' || event?.agenda_type?.type === 'turnos') {
      this.router.navigate([`EndMeeting`], { state: { turn_ext_id: event?.ext_id, segment: 'turn', segment_backup: 'home' } });
    }
    else {
      if (event?.is_reminder)
        this.router.navigate([`EndMeeting/reminder`], { state: { event: event, id: event.id } });
      else
        this.router.navigate([`EndMeeting/detail`], { state: { event: event, id: event.id } });
    }
  }

  returnValueProgressBarr(v) {
    let value = parseFloat(v)
    if (0.999 === value) value = 0.99
    return value
  }

  openActionPrescribedApps(app) {
    console.log(app)
    if (app.access_type === ACCESS_TYPE.APP)
      this.openMarketApp(app.id_pkg)
    else
      this.openShowIframe(app)
  }

  openMarketApp(id) {
    NativeMarket.openStoreListing({
      appId: id
    });
  }

  async openShowIframe(slide) {
    console.log('openActionPrescribedApps()', slide);
    const modal = await this.modalCtrl.create({
      component: ShowIframeComponent,
      componentProps: { app: slide.configurations },
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('openActionPrescribedApps()', result);

        if (result?.data?.error) {

        } else if (result?.data?.action == 'add') {

        }
      });

    await modal.present();
  }


  nChallengesNotCompleted() {


    return this.challenges.filter(challenge => !challenge.completed).length;
  }


  public async openAICoachMessage(text: string) {

    let message = `
    <ion-row class="ion-padding ion-margin">
      <ion-col class="text-align-center ion-padding" style="padding: 0px" >
        <img src="${'../../assets/images/doctor_dayPhrase.svg'}" alt="photo" style='width: -webkit-fill-available' /> 
        <h1>`+ this.translate.instant('home.tip') + `</h1>
        <ion-text> <p>`+ text + `</p> </ion-text>
      </ion-col>
    </ion-row>`;

    const alert = await this.alertController.create({
      mode: 'ios',
      animated: true,
      backdropDismiss: false,
      cssClass: "scp-home-alert",
      message: new IonicSafeString(message),
      buttons: [
        {
          text: this.translate.instant('shared_care_plan.new_scp_alert_cancel'),
          role: 'cancel',
        },
      ],
    });


    await alert.present();

    await alert.onDidDismiss();
  }



  navigateToDietsPage() {
    this.router.navigate([ContentTypePath.Diets], { state: { segment: 'diets' } });
  }

  goDetailRecipe(e) {
    let id = e.id
    if (id)
      this.nav.navigateForward([ContentTypePath.DietsDetail], { state: { id: id } });
  }


  navigateToExercises() {
    this.router.navigate([ContentTypePath.Exercises], { state: { segment: 'exercises' } });

  }


  navigateToMedicationPage() {
    this.router.navigate([ContentTypePath.Medication], { state: { segment: 'medication' } });
  }

  navigateToFormsPage() {
    this.router.navigate([ContentTypePath.Forms], { state: { segment: 'forms' } });
  }

  navigateToExercisesPage(slide: any) {
    console.log('navigateToExercisesPage()', slide);
    if (!slide?.configurations)
      this.router.navigate([ContentTypePath.ExercisesDetail], { state: { id: slide?.exercise?.id } });
    else {
      this.openShowIframe(slide)
    }
  }

  navigateToGamesPage() {
    this.router.navigate([ContentTypePath.Games], { state: { segment: 'games' } });
  }

  navigateToMonitoringPage() {
    this.router.navigate([ContentTypePath.Monitoring], { state: { segment: 'health' } });
  }

  navigateToChallengesPage(challenge: any) {
    this.router.navigate([ContentTypePath.Challenges], { state: { challenge: challenge } });
  }

  navigateToChallengeDetailPage(challenge: any) {
    this.router.navigate([ContentTypePath.ChallengesDetail], { state: { challenge: challenge } });

  }


  async setDateDayPhraseReaded(date: Date): Promise<void> {
    const dateString = date.toISOString(); // Convert Date object to ISO string format
    Preferences.set({
      key: 'dateReaded',
      value: dateString,
    });
  }

  async getDatedayPhraseReaded(): Promise<Date> {
    const result = await Preferences.get({ key: 'dateReaded' });

    if (result.value) {
      return new Date(result.value); // Convert the ISO string back to a Date object
    } else {
      return null;
    }

    //return new Date(result.value); 
  }


  activateList() {
    this.ngZone.run(() => {
      console.log("Acivate/des Focus")
      this.activateFocus = true;
    });
  }

  onCancel($event?: any) {
    this.activateFocus = false;
  }

  checkBlur() {
    this.activateFocus = false;
  }

  checkPermissionsTasks() {
    return this.permissionService.canViewForms || this.permissionService.canViewExercises || this.permissionService.canViewMedication || this.permissionService.canViewDiets ||
      this.permissionService.canViewGames || this.permissionService.canViewMonitoring
  }

  handleInput(event) {
    // Normalize and remove diacritical marks from the input query
    const query = event.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (query === '') {
      this.results = [];
    }
    else {
      this.results = this.listFamilyUnit.filter(item => {
        // Normalize and remove diacritical marks from each item's name
        const processedName = item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log(processedName); // Log the processed item name
        return processedName.includes(query); // Perform the filtering
      });
    }
}





  truncateText(text, maxLines, maxLength) {
    if (!text) return '';


    text = text.replace(/(\r\n|\n|\r)/gm, " ");


    if (text.length > maxLength) {
      text = text.substring(0, maxLength) + '...';
    }


    let lines = text.split(' ').reduce((acc, word) => {
      const currentLine = acc.pop();
      if ((currentLine + ' ' + word).length > maxLength) {
        acc.push(currentLine);
        acc.push(word);
      } else {
        acc.push(currentLine + ' ' + word);
      }
      return acc;
    }, ['']);

    if (lines.length > maxLines) {

      return lines.slice(0, maxLines).join(' ').trim() + '...';
    }

    return text.trim();
  }

  getCaregiversList() {
    return this.listFamilyUnit;
  }

}
