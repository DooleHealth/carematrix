import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Input, NgZone, HostBinding, ApplicationRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';
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

const NAME_BIND =  'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated';
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
  goalsColor = ['assets/icons/hpc/icon_check_verde.svg', 'assets/icons/hpc/icon_check_naranja.svg', 'assets/icons/hpc/icon_check_rojo.svg','assets/icons/hpc/icon_check_primary.svg']
  dataStore: DataStore<Array<ShowcaseShellUserModel>>;
  data: Array<ShowcaseShellUserModel> & ShellModel;
  numMedicationPlans: number = 0;
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }
  WAIT_TIME = 10 //10 minutes
  MAX_GOAL_SLIDER = 3
  userDoole : any = {}
  userImage: string
  goals: any =[]
  diets: any =[]
  dietsNoMenu: any =[]
  drugs: any =[]
  games =[]
  header = false;
  listFamilyUnit:FamilyUnit[] = [];
  isLoading = false
  isLoadingNumNotifications = false;
  activity: any =[]
  appointment: Agenda[] =[]
  showGoogleFit = false;
  advices: any =[]
  procedures: any =[]
  date
  healtDate
  loading:boolean = true;
  isFirstTime = true;
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

   sliderConfigVertical : SwiperOptions = {
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
   };

   sliderConfigVerticalOneSlide : SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    direction: 'vertical',
    centeredSlides: true,
    pagination: true,
   };

   sliderConfigHorizontal : SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1.1,
    spaceBetween: 0,
    centeredSlides: false,
   };

   sliderConfigHorizontalOneSlide : SwiperOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
  };

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    pagination: { clickable: true},
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
    direction:'vertical'
  };
  
  //Horizontal
  sliderAdvicesConfigHorizontal = this.sliderConfigHorizontal;
  sliderProceduresConfigHorizontal = this.sliderConfigHorizontal;
  sliderAgendasConfigHorizontal = this.sliderConfigHorizontal;
  //vertical
  sliderGoalsConfigVertical:any = this.sliderGoalConfig;
  sliderDietsConfigVertical:any = this.sliderConfigVertical;
  sliderDrugsConfigVertical:any = this.sliderConfigVertical;
  sliderPhysicalConfigVertical:any = this.sliderConfigVertical;

   @ViewChild('sliderGoals') sliderGoals: ElementRef | undefined;
   @ViewChild('sliderPhysical') sliderPhysical: ElementRef | undefined;
   @ViewChild('sliderDrug') sliderDrug: ElementRef | undefined;
   @ViewChild('sliderDiet') sliderDiet: ElementRef | undefined;
   @ViewChild('sliderGames') sliderGames: ElementRef | undefined;
   //@ViewChild('tabs') tabs: TabsComponent;

   infoDiet: UserInformation
   infoDrugs: UserInformation
   infoGames: UserInformation
   infoActivity: UserInformation
   infoGoals: UserInformation

   textGoals = ''

  constructor(
    public router:Router,
    public platform: Platform,
    private dooleService: DooleService,
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
    private appRef: ApplicationRef,
    private pusherConnection: PusherConnectionService,
  ) { }

  async ngOnInit() {
    this.date = this.transformDate(Date.now(), 'yyyy-MM-dd')
    this.checkHealthAccess();
    this.checkStorageNotification();
    this.initPushers()
  }

  ionViewWillEnter(){
    console.log('[HomePage] ionViewWillEnter()');
    //console.log('[HomePage] ionViewWillEnter() this.deviceToken: ', this.authService?.deviceToken);

    
    
     this.getUserInformation()
     this.getNumNotification();

     this.update()
     if(!this.pusherConnection?.isConnectedPusher()){
      //console.log('[HomePage] ionViewWillEnter() this.userDoole: ', this.authService?.user?.idUser);
      const token = this.authService.getAuthToken()
      this.pusherConnection.subscribePusher(token, this.authService?.user?.idUser)
      this.initPushers()
    }
  }

  initPushers(){
    this.pusherAlarms?.init()
    const channel = this.pusherNotifications.init();
    if(channel)
    channel.bind(NAME_BIND, ({ data }) => {
      console.log('[HomePage] initPushers()',  data);
      this.getNumNotification();
    });
  }

  activatePusherNotification(){
    const channel = this.pusherNotifications?.init();
    console.log('[HomePage] activatePusherNotification() channel ',  channel);
    if(channel)
    channel?.bind(NAME_BIND, ({ data }) => {
      console.log('[HomePage] activatePusherNotification()',  data);
      this.getNumNotification();
    });
  }

  getNumNotification() {
    this.isLoadingNumNotifications = true;
    this.dooleService.getAPINotificationsCount().subscribe((res) => {
      console.log('[HomePage] getNumNotification()',  res);
      if (res?.success) this.numNotification = res?.notifications;
      if (this.numNotification == 0) this.pusherNotification = false;
      else this.pusherNotification = true;

      this.isLoadingNumNotifications = false;
    });
  }



  update(){
    this.appRef.tick();
    console.log('[HomePage] update() cambio ' );
  }

  checkHealthAccess(){
    if (this.platform.is('cordova')) {
      this.health.isAvailable()
          .then((available: boolean) => {
            //console.log(available);
            this.showGoogleFit = !available;
            this.health.requestAuthorization([
              'distance', 'steps', 'heart_rate', 'activity', 'weight', 'oxygen_saturation'  //read and write permissions
            ])
                .then(res => {
                  //console.log(res);
                  this.syncData(30);
                })
                .catch(e => {
                  console.log(e)
                });
          })
          .catch(e => {
            console.log(e)
          });
    }
  }

  setAnalyticsUserProperty(){
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
        this.getUserImage(),
        this.getPersonalInformation(),
        this.getGoalImformation(),
        this.getallAgenda(),
        this.getAdvicesList(),
        (this.drugs = [], this.getDrugIntake()),
        this.getDietList(),
        this.getProcedures(),
        this.getPendingMedicationPlans(),
        this.getElementsList(),
        // Add other asynchronous calls as needed
      ]);
  
      // Analytics
      // this.setAnalyticsUserProperty();
    } catch (error) {
      console.error('Error fetching user information:', error);
      // Handle errors if needed
    } finally {

      console.log('Entro sense esperar');

      this.isLoading = false;
    }
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
            console.log('[HomePage] getPersonalInformation()', data);
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
      this.greeting = this.translate.instant('home.hello') + ', ' + this.first_name;
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching personal information:', error);
      throw error;
    }
  }
  

  async getAdvicesList() {
    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIlistAdvices().subscribe(
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
  
      this.getNewsList(res.advices);
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching advices list:', error);
      throw error;
    }
  }
  

  async getNewsList(advices) {
    try {
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIlistNews().subscribe(
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
  
      this.setAdvicesSlider(advices, res.news);
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
        this.dooleService.getAPIelementsListByDate(params).subscribe(
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
  

  setSliderOption(option, list?){
    switch (option) {
      //Horizontal
      case 'agenda':
        this.sliderAgendasConfigHorizontal = (this.appointment?.length == 1)?this.sliderConfigHorizontalOneSlide: this.sliderConfigHorizontal
        break;
      case 'advices':
        this.sliderAdvicesConfigHorizontal = (this.advices?.length == 1)?this.sliderConfigHorizontalOneSlide: this.sliderConfigHorizontal
        break;
      case 'procedures':
        this.sliderProceduresConfigHorizontal = (this.procedures?.length == 1)?this.sliderConfigHorizontalOneSlide: this.sliderConfigHorizontal
        break;
      //Vertical
      case 'goals':
        this.sliderGoalsConfigVertical = (this.goals?.length == 1)? this.sliderConfigVerticalOneSlide: this.sliderGoalConfig
        break;
      case 'drugs':
        this.sliderDrugsConfigVertical = (this.drugs?.length == 1)?this.sliderConfigVerticalOneSlide: this.sliderConfigVertical
        break;
      case 'physical':
        this.sliderPhysicalConfigVertical = (this.activity?.length == 1)?this.sliderConfigVerticalOneSlide: this.sliderConfigVertical
        break;
      case 'diets':
        this.sliderDietsConfigVertical = (this.diets?.length == 1)?this.sliderConfigVerticalOneSlide: this.sliderConfigVertical
        break;
    }
  }

  setGoalsSlider(goals){
    this.currentIndexGoal = 0

    console.log('setGoalsSlider()', this.goals);


    if(goals && goals?.length > 0){
      this.goals = goals

        this.goals.forEach(goal => {
          let element_last_value = goal?.element?.element_last_value 
          if(element_last_value.value != null){
            goal['progress_bar_value']= String(this.convertToDecimal(goal?.goal_compute?.percentage));
            goal['progress_bar_color']= this.getProgressBarClass(goal);
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

  updateAdvicesSlider(advices){
    /* this.sliderGoals?.update().then( event => {
      this.advices = advices?.length > 0 ? advices: [];
      this.setSliderOption('advices')
    }) */
}

  setAdvicesSlider(advices, news){
        this.advices = advices?.length > 0 ? advices: [];
        if(news?.length > 0)
        news.forEach(element => {
          element['new'] = true
          this.advices.push(element)
        });
        this.advices = this.advices.filter(advice => ( !this.getStatusable(advice?.statusable, 'hide')))
        this.setSliderOption('advices')
        this.updateAdvicesSlider(advices)
  }

  updateDietSlider(diets){
    
      this.diets = diets?.length > 0 ? diets: [];
      this.setSliderOption('diets')
     
    
     
  }

  setDietSlider(diets){
      console.log('[DiaryPage] setDietSlider()', diets);
      this.diets = diets?.length > 0 ? diets: [];
      this.setSliderOption('diets')
      this.updateDietSlider(diets)
  }

  setPhysicalSlider(constants){
      this.activity = []
      let elements = constants
      if(elements?.eg){
        this.treeIterate(elements?.eg, '');
         this.slideActivityChange()
      }
      this.setSliderOption('physical')
  }

  treeIterateDiets(obj) {
    this.diets = []
    for (var property in obj) {
      //console.log('[DiaryPage] treeIterateDiets()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          //console.log('[DiaryPage] treeIterateDiets()', obj[property]);
          this.diets.push({date: property, items: obj[property]})
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
          if(property=="group"){
            obj['is_child'] = stack.includes('childs');
            //if(obj?.elements?.length>0)
            this.activity.push(obj);

          }

        }
      }
    }
  }

  goElements(){
    console.log('[HomePage] goElements()');
  }

  getStatusable(list, type){
    if(list?.length >0){
      let statu = list.find(status => (status?.type == type));
      return statu? true:false
    }
    else return false
  }

  getGoalLastValue(element_goal, goal){


    goal.last_value = parseFloat(element_goal?.value);
    goal.value1 = parseFloat(goal.value1)
    goal.last_value_date = element_goal?.date_value;

    switch(goal.goalType){

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

  inBetween(goal){
    goal.value2 = parseFloat(goal?.value2);
    goal.reversed = false;
      if(goal.last_value >= goal.value1 && goal.last_value <= goal.value2){
        goal = this.goalAchieved(goal);
      }else if(goal.last_value >= goal.value1 && goal.last_value >= goal.value2){
        goal.reversed = true;
        goal = this.getGoalProgress(goal, goal.value2)
      }else if(goal.last_value <= goal.value1 && goal.last_value <= goal.value2){
        goal = this.getGoalProgress(goal, goal.value1)
      }else if(goal.last_value <= goal.value1 && goal.last_value >= goal.value2){
        console.log("**  ERROR: ");
        goal = this.getGoalProgress(goal, goal.value1)
      }
    return goal;
  }

  goalAchieved(goal){
    goal.goal_percentage = 100;
    goal.progress_bar_value = 1;
    goal.progress_bar_color = this.getProgressBarClass(goal.progress_bar_value, goal.reversed);

    return goal
  }

  getGoalProgress(goal, target){
    if(goal.last_value <= target){
      goal.goal_percentage = goal?.goal_compute?.percentage; //this.getGoalPercentage(goal.last_value, target);
      goal.progress_bar_value = this.convertToDecimal(goal?.goal_compute?.percentage)
    }else if(goal.last_value > target){
      goal.goal_percentage = goal?.goal_compute?.percentage;//this.getGoalPercentage(goal.last_value, target);
    goal.progress_bar_value = this.convertToDecimal(goal?.goal_compute?.percentage)
    }

    goal.progress_bar_color = this.getProgressBarClass(goal.progress_bar_value, goal.reversed);

    return goal;
  }

  getProgressBarValue(goal){
    let progress_bar_value;
    if(goal.goalType == 'a<x<b'){
      let percentage = 100 - (parseFloat(goal.goal_percentage) - 100);
      progress_bar_value = this.convertToDecimal(percentage)
    }else if(goal.goalType == '>' || goal.goalType == '=>' )
      progress_bar_value = this.convertToDecimal(goal.goal_percentage)
    else if(goal.goalType == '<' || goal.goalType == '<=' ){
      let percentage = 100 - (parseFloat(goal.goal_percentage) - 100);
      progress_bar_value = this.convertToDecimal(percentage)
    }else if(goal.goalType == '='){
      if(goal.last_value > goal.value1){
        goal.reversed = true;
        let percentage = 100 - (parseFloat(goal.goal_percentage) - 100);
        progress_bar_value = this.convertToDecimal(percentage)
      }else{
        goal.reversed = false;
        progress_bar_value = this.convertToDecimal(goal.goal_percentage)
      }

    }else
      progress_bar_value = this.convertToDecimal(goal.goal_percentage);

    return progress_bar_value;

  }

  getGoalPercentage(last_value, value){
    return (last_value*100)/value;

  }

  getProgress(goal){
    return goal.last_value <= goal.value1 ? 1 : this.convertToDecimal(goal.goal_percentage);
  }

  equal(goal){
    //console.log("** equal() goalType: ", goal.goalType);
    if(goal.last_value == goal.value1){
      goal = this.goalAchieved(goal);
    }else{
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  lessThan(goal){
    //console.log("** lessThan() goalType: ", goal.goalType);
    goal.reversed = true;
    if(goal.last_value < goal.value1){
      goal = this.goalAchieved(goal);
    }else{
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  greaterOrEqualThan(goal){
    //console.log("** greaterThan() goalType: ", goal.goalType);
    goal.reversed = false;
    if(goal.last_value >= goal.value1){
      goal = this.goalAchieved(goal);
    }else{
      goal = this.getGoalProgress(goal, goal.value1)
    }

    return goal;
  }

  lessOrEqualThan(goal){
    //console.log("** lessThan() goalType: ", goal.goalType);
    goal.reversed = true;
    if(goal.last_value <= goal.value1){
      goal = this.goalAchieved(goal);
    }else{
      goal = this.getGoalProgress(goal, goal.value1)
    }
    return goal;
  }

  greaterThan(goal){
    //console.log("** greaterThan() goalType: ", goal.goalType);
    goal.reversed = false;
    if(goal.last_value > goal.value1){
      goal = this.goalAchieved(goal);
    }else{
      goal = this.getGoalProgress(goal, goal.value1)
    }

    return goal;
  }

   convertToDecimal(numberVal){
    if(numberVal == 0)
      return 0;
    else
      return (numberVal / 100).toFixed(3);

 }


  getProgressBarClass(goal, reversed = false){


    let cssClass: string;
    let value = this.convertToDecimal(goal?.goal_compute?.percentage);

    // if(goal.goal_type == "<" || goal.goal_type == "<=")
    //   cssClass = this.reversedProgressBarClass(percentage);
    // else
      cssClass = this.progressBarClass(value);

    return cssClass
  }

  progressBarClass(value){
    //console.log("** progressBarClass(): ", value);
    if(value<=0.25)
      return 'my-buffer-progress_red'
    else if(value>0.25 && value<=0.75)
      return 'my-buffer-progress_orange'
    else if(value>0.75)
      return 'my-buffer-progress_green'

  }

  reversedProgressBarClass(value){
    //console.log("** reversedProgressBarClass(): ", value);
    if(value >= 0.75)
      return 'my-buffer-progress_red'
    else if(value < 0.75 && value > 0.25)
      return 'my-buffer-progress_orange'
    else
      return 'my-buffer-progress_green'

  }

  selectImgGoalsProgressBar(progress){
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
      // Handle errors if needed
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
      // Handle errors if needed
      console.error('Error fetching procedures:', error);
      throw error;
    }
  }
  

  async getPendingMedicationPlans() {
    try {
      const params = { onlyCount: 1 };
  
      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIPendingMedicationPlans(params).subscribe(
          (data: any) => {
            console.log('[HomePage] getPendingMedicationPlans()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getPendingMedicationPlans() ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });
  
      if (res.success) {
        this.numMedicationPlans = res.medication_plan_count ? res.medication_plan_count : 0;
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching pending medication plans:', error);
      throw error;
    }
  }
  


  async getDietList(){
    this.diets = []
    this.dooleService.getAPIlistDietsByDate().subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);
        if(res.diets){
/*           this.dietsNoMenu = res.data?.dietaryIntake?.diet
          this.treeIterateDiets(res.data?.dietaryIntake.dietIntakes) */
          this.setDietSlider(res?.diets)
        }
       });
  }

  convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
  }

  syncData(days){

    let startDate =  new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    let endDate =  new Date(); // now

    console.log('dataType: steps');

    this.health.queryAggregated({
      startDate: startDate,
      endDate: endDate,
      dataType: 'steps',
      bucket: 'hour'
    }).then(data => {
      this.postHealth('steps', data);
    }).catch(error => {
      console.error(error);
      throw error;
    });

    console.log('dataType: distance');
    this.health.queryAggregated({
      startDate: startDate,
      endDate: endDate,
      dataType: 'distance',
      bucket: 'hour'
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

    //console.log('dataType: temperature');
    // this.health.query({
    //   startDate,
    //   endDate,
    //   dataType: 'temperature',
    // }).then(data => {
    //   //this.postHealth('temperature', data);
    // }).catch(error => {
    //   console.error(error);
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

  }

    //envia post amb dades de salut a api
    postHealth(type, data){
      const timezone =  Intl.DateTimeFormat().resolvedOptions().timeZone
      console.log('syncData', timezone)
      const postData = {
        timezone: timezone,
        type: type,
        vals: JSON.stringify(data),
      };
      if(this.authService?.deviceToken)
      postData['device_token'] = this.authService.deviceToken
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

    agendaTitle(slide){
    //console.log('[HomePage] agendaTitle()', slide);
    if(slide?.agenda_type?.type == 'turnos' || slide?.agenda_type?.type == 'turno'){
      return this.translate.instant('agenda.type_turn')
    }else{
      if(slide?.origin == 0)
      return this.translate.instant('agenda.type_turn')
      else if(slide?.origin == 1 && slide?.staff.length > 0)
      return this.translate.instant('agenda.type_meeting')
      else  return this.translate.instant('agenda.type_event')
    }
  }

  actionCloseAdvice(slide){
    console.log('[HomePage] actionCloseAdvice()', slide.name);
    let model = (slide.new)? 'News':'Advice'
    let params = {
      model: model,
      id: slide.id,
      type: 'hide',
      status: 1
    }
    this.dooleService.postAPIContentStatus(params).subscribe(
      async (res: any) =>{
          if(res.success){
            this.advices = this.advices.filter(advice => (advice?.id != slide.id))
          }
      }
    )
  }

  actionSeeAllAdvices(){
    //console.log('[HomePage] actionCloseAdvice()');
  }

  actionRegisterAdvice(slide){
    //console.log('[HomePage] actionRegisterAdvice()', slide.name);
  }

  actionCloseAppointment(slide){
    //console.log('[HomePage] actionCloseAppointment()', slide.title);
    slide.hide = true
    this.appointment = this.appointment.filter( slide => slide.hide == false)
  }

  actionDetailAppointment(slide){
    //console.log('[HomePage] actionDetailAppointment()', slide.name);
  }

  actionButtonDrugs(slide){
    //console.log('[HomePage] actionButtonDrugs()', slide.name);
  }

  slideGoalDrag(event){
    console.log('[HomePage] slideGoalDrag()', event);
  }

  slideGoalChange() {
    console.log('[HomePage] slideGoalChange()');
    if(this.goals !== undefined && this.goals?.length > 0){
      const index = this.sliderGoals.nativeElement.swiper.activeIndex
      let slider = this.goals[index]
      this.infoGoals = {
        title: slider?.element?.name, 
        image: this.selectImgGoalsProgressBar(slider?.progress_bar_color),
        frequency: slider?.frequencyString
      }
    }
  }

  slideDietChange(){
    if(this.diets !== undefined && this.diets?.length > 0) {
     const index = this.sliderDiet?.nativeElement?.swiper.activeIndex
      let slider = this.diets[index]
      this.infoDiet = {
        title: slider?.items,
      }
  }
  }

  slideDrugChange(){
    if(this.drugs !== undefined && this.drugs?.length > 0){
      const index = this.sliderDrug?.nativeElement?.swiper?.activeIndex
        let slider = this.drugs[index]
        this.infoDrugs = {
          title: slider?.name,
          hour: slider?.hour_intake
        }
        console.log('[HomePage] slideDrugChange()', this.infoDrugs, index );
    }else{
      this.infoDrugs = null;
    }

  }

  slideGamesChange(){
    if(this.games !== undefined && this.games?.length > 0) {}
    /* this.sliderGames?.getActiveIndex().then(index => {
      let slider = this.games[index]
      let hour = slider?.scheduled_date?.split(' ')[1]
      this.infoGames = {
        title: slider?.name,
        hour: hour?.split(':')[0] + ':' + hour?.split(':')[1]
      }
    }); */
  }

  slideActivityChange(){
    if(this.activity !== undefined && this.activity?.length > 0){
      const index = this.sliderPhysical?.nativeElement?.swiper?.activeIndex
      let slider = this.activity[index]
      this.infoActivity = {
        title: slider?.group
      }
    }
  }

  changeTake(id,taked){
    taked=(taked=="0") ? "1" : "0";
    var dict = [];
    dict.push({
        key:   "date",
        value: ""
    });
    this.dooleService.postAPIchangeStatedrugIntake(id,taked).subscribe(json=>{
      //console.log('[HomePage] changeTake()',  json);
      this.getDrugIntake()
    },(err) => {
      //console.log('[HomePage] changeTake() ERROR(' + err.code + '): ' + err.message);
      alert( 'ERROR(' + err.code + '): ' + err.message)
      throw err;
    });
  }

  filterDrugsByStatus(){
    console.log('[HomePage] filterDrugsByStatus()');
    if(this.drugs !== undefined && this.drugs?.length > 0){
        console.log('[HomePage] filterDrugsByStatus()', event);
        this.drugs = this.drugs.filter( drug => drug.forgotten != 0)

        this.searchIndexDrug()
        this.infoDrugs = {
          title: this.drugs[this.currentIndexDrug]?.name,
          hour: this.drugs[this.currentIndexDrug]?.hour_intake
        }
        // this.sliderDrug?.nativeElement?.swiper?.slideTo(this.currentIndexDrug).then( slide => {
        //   this.slideDrugChange()
        // })
      this.setSliderOption('drugs')
    } else{
      this.infoDrugs = null;
    }
  }

  searchIndexGoal(){
    let length = this.goals?.length
    if(length > 0){
      if(length%2 == 0){ //Si es par
        this.currentIndexGoal =  length/2 - 1
      }else
      this.currentIndexGoal = Math.trunc(length/2)
    }
  }

  searchIndexDrug(){
    if(this.drugs !== undefined && this.drugs?.length > 0){
      let drug = this.drugs?.find(element =>
        ((this.hourToMinutes(element?.hour_intake) + this.WAIT_TIME) >= (new Date().getHours()*60 + new Date().getMinutes()))
        )
      let index = this.drugs.indexOf(drug);
        //console.log('[HomePage] searchIndexDrug()', drug, index);
        this.currentIndexDrug = (index > -1)? index: 0
    }
  }

  searchIndexDGame(){
    if(this.games !== undefined && this.games?.length > 0){
      let game = this.games?.find(element =>
        ((this.hourToMinutes(element.scheduled_date?.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours()*60 + new Date().getMinutes()))
        )
      let index = this.games.indexOf(game);
      this.currentIndexDrug = (index > -1)? index: 0
    }
  }

  searchIndexDiet(){
    if(this.diets !== undefined && this.diets?.length > 0){
      let diet = this.diets?.find(element =>
        ((this.hourToMinutes(element.date?.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours()*60 + new Date().getMinutes()))
        )
      let index = this.diets?.indexOf(diet);
      this.currentIndexDiet = (index > -1)? index: 0
    }
  }

  hourToMinutes(hour){
    let minutes = hour?.split(':')
    return (Number(minutes[0]))*60 + (Number(minutes[1]))
  }

  doRefresh(event) {
    //console.log('Begin async operation');

    setTimeout(() => {
      //console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  isLess(value){
    if(value <= 3)
      return true
    return false
  }

  async actionButtonGames(item){
    var browser : any;
    if(item.game_type=="html5"){
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location:'no',
        toolbar:'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes',
        hidden:'no',
      }

      await this.authService.getUserLocalstorage().then(value =>{
        this.authService.user = value
      })

      if(item.url.startsWith("http")){
        this.header = true
        item.url=item.url+"?user="+this.authService.user.idUser+"&game="+item.id;
        browser = this.iab.create(item.url, '_blank', iosoption);
        browser.on('exit').subscribe(event => {
          this.ngZone.run(() => {
            //console.log("anim complete");
                this.header = false
          });
        });
      }
      else{
        browser = this.iab.create(item.url, '_system', iosoption);
      }
    }

    if(item.game_type=="form") {
      this.nav.navigateForward(['/tracking/form', {id: item?.form_id}] );
    }

  }

    sortDate(games){
      //console.log('Async operation has ended' ,games);
      return games.sort( function (a, b) {
        if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1])> this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
          return 1;
        if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1])< this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
          return -1;
        return 0;
      })

    }

    formatSelectedDate(date){
      let language = this.languageService.getCurrent();
      const datePipe: DatePipe = new DatePipe(language);
      return datePipe.transform(date, 'EEEE, d MMMM HH:mm');
    }

    formatDate(d){
      if(d){
        let date = new Date(d)
        return this.transformDate(date, 'dd/MM/yyyy HH:mm')
      }
    }

    transformDate(date, format) {
      return this.datePipe.transform(date, format);
    }

    goDetailRecipe(e){
      let id = e.id
      if(id)
      this.nav.navigateForward("/journal/diets-detail", { state: {id:id} });
    }

    goUnitName(unitName){
      let name = JSON.parse(unitName)
      return Object.values(name) + ''
    }

    async confirmAllNotification() {
      const notification = localStorage.getItem(ALL_NOTICATION);
      if(JSON.parse(notification))
      return

      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        //mode: 'ios',
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

    activateAllNotifications(factor){
      console.log('[HomePage] activateAllNotifications()');
      let params = { active: 'all', value: factor }
      this.dooleService.postAPIConfiguration(params).subscribe((res)=>{ })
    }

    checkStorageNotification(){
      const notification = localStorage.getItem('allNotification');
      if(JSON.parse(notification))
      return
      this.activateAllNotifications(1)
      localStorage.setItem('allNotification', 'true')
    }

    async addElement(slide){
      console.log('addElement()', slide);
      const modal = await this.modalCtrl.create({
        component:  ElementsAddPage,
        componentProps: { id: slide?.element_id, nameElement: slide?.element?.name, units: slide.element?.element_unit?.abbreviation },
      });

      modal.onDidDismiss()
        .then((result) => {
          console.log('addElement()', result);

          if(result?.data?.error){
           // let message = this.translate.instant('landing.message_wrong_credentials')
            //this.dooleService.presentAlert(message)
          }else if(result?.data?.action == 'add'){
            this.notification.displayToastSuccessful()
            this.getUserInformation()
          }
        });

        await modal.present();
    }


    async activatePendingMedicationPlans(){
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        //mode: 'ios',
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
        const params = { from_date: this.date, with_medical_procedures: 0, filter_by_date: 1 };
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
        // Handle errors if needed
        console.error('Error fetching agenda:', error);
        throw error;
      }
    }
    

  goEventDetail(event){
    if(event?.agenda_type?.type === 'turno' || event?.agenda_type?.type === 'turnos'){
      this.router.navigate([`EndMeeting`],{state:{turn_ext_id: event?.ext_id, segment:'turn', segment_backup: 'home'}});
    }
    else{
      if(event?.is_reminder)
      this.router.navigate([`EndMeeting/reminder`],{state:{event: event, id: event.id}});
      else
      this.router.navigate([`EndMeeting/detail`],{state:{event: event, id: event.id}});
    }
  }

  returnValueProgressBarr(v){
    let value = parseFloat(v)
    if(0.999 === value) value = 0.99
    //console.log('[HomePage] returnValueProgressBarr()',  value);
    return value
  }
}
