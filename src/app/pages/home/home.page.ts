import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Input, NgZone, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Health } from '@ionic-native/health/ngx';
import { IonSlides, ModalController, NavController, Platform } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { VideoComponent } from 'src/app/components/video/video.component';
import { User, Goal, Diet, Drug, PhysicalActivity, Game, Agenda, Advice, FamilyUnit } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { OpentokService } from 'src/app/services/opentok.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { LanguageService } from 'src/app/services/language.service';
import { group } from '@angular/animations';

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
})
export class HomePage implements OnInit {
  dataStore: DataStore<Array<ShowcaseShellUserModel>>;
  data: Array<ShowcaseShellUserModel> & ShellModel;
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }
  WAIT_TIME = 10 //10 minutes 
  userDoole : any = {}
  goals: any =[]
  diets: any =[]
  drugs: Drug[] =[]
  games =[]
  header = false;
  listFamilyUnit:FamilyUnit[] = [];
  isLoading = false
  activity: any =[]
  appointment: Agenda[] =[]
  showGoogleFit = false;
  advices: Advice[] =[]
  date
  loading:boolean = true;
  currentIndexDrug = 0
  currentIndexGame = 0
  currentIndexDiet = 0
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

   @ViewChild('sliderGoals') sliderGoals: IonSlides;
   @ViewChild('sliderDiet') sliderDiet: IonSlides;
   @ViewChild('sliderDrug') sliderDrug: IonSlides;
   @ViewChild('sliderGames') sliderGames: IonSlides;
   @ViewChild('sliderPhysical') sliderPhysical: IonSlides;
   @ViewChild('tabs') tabs: TabsComponent;

   infoDiet: UserInformation
   infoDrugs: UserInformation
   infoGames: UserInformation
   infoActivity: UserInformation
   infoGoals: UserInformation
  constructor(
    public router:Router,
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
    private analyticsService: AnalyticsService,
    private languageService: LanguageService,
    private nav: NavController,
  ) {
    this.analyticsService.setScreenName('home','[HomePage]')
  }

  async ngOnInit() { 
    this.date = this.transformDate(Date.now(), 'yyyy-MM-dd')
    this.checkHealthAccess();
    //this.getUserInformation();
  }


  ionViewWillEnter(){
      this.getUserInformation()
   
  }

  checkHealthAccess(){
    if (this.platform.is('cordova')) {
      this.health.isAvailable()
          .then((available: boolean) => {
            //console.log(available);
            this.showGoogleFit = !available;
            this.health.requestAuthorization([
              'distance', 'steps', 'heart_rate', 'activity', 'weight'  //read and write permissions
            ])
                .then(res => {
                  //console.log(res);
                  this.syncData(30);
                })
                .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
    }
  }

  setAnalyticsUserProperty(){
    if(this.userDoole?.age)
    this.analyticsService.setProperty('Edad', this.userDoole.age)
    if(this.userDoole?.language?.name)
    this.analyticsService.setProperty('Idioma', this.userDoole.language.name)   
    this.analyticsService.setProperty('gender', this.userDoole.gender)
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
  async getUserInformation(){
    this.isLoading = true
    this.activity = []
    let date2= this.transformDate(this.date, 'dd-MM-yyyy')
    let date = {date: date2, from_date: this.date, to_date: this.date}

    this.dooleService.getAPIinformationSummary(date).subscribe(
      async (res: any) =>{
        await res;

        console.log('[HomePage] getUserInformation()',  res);
        this.userDoole = res.data?.profile;
        this.appointment = res.data?.agenda;
        this.advices = res.data?.advices;

        if(res.data?.goals){
          this.goals = res.data?.goals
           this.infoGoals = {
            title: this.goals[0]?.typeString +' '+this.goals[0]?.element?.element_unit?.abbreviation
          }

          // Get the latest value of the element-goal
          this.goals.forEach(goal => {
            let group = this.getValue(res.data.elements.eg, goal.element.element_group_id); // Get the element group
            if(group)
              this.getGoalLastValue(group, goal)
          });
        }

        //diets
        this.treeIterateDiets(res.data?.dietaryIntake.dietIntakes) 
        this.searchIndexDiet()  
        this.slideDietChange()
        this.sliderDiet.slideTo(this.currentIndexDiet)

        let elements = res?.data.elements
        if(elements?.eg){
          this.treeIterate(elements?.eg, '');
          this.sliderPhysical.slideTo(0)
          this.slideActivityChange()       
        }
      
        if(res.data.gamePlays){
          this.games = res.data.gamePlays
          this.games.sort(function(a,b){
            return a.scheduled_date.localeCompare(b.scheduled_date);
          })
          this.searchIndexDGame()
          this.slideGamesChange()
          this.sliderGames.slideTo(this.currentIndexDrug)
        }

        this.getDrugIntake()
        this.isLoading = false
        //Analytics
        //console.log('[HomePage] getUserInformation()', this.userDoole);
        //this.setAnalyticsUserProperty()
       },(err) => { 
          console.log('***** ERROR ' + err); 
          this.isLoading = false
         
          throw err; 
          
      });
  }
  treeIterateDiets(obj) {
    this.diets = []
    for (var property in obj) {
      console.log('[DiaryPage] treeIterateDiets()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          console.log('[DiaryPage] treeIterateDiets()', obj[property]);
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
            if(obj?.elements.length>0)
            this.activity.push(obj);

          }

        }
      }
    }
  }

  getGoalLastValue(group, goal){
    console.log("** element.element_id: ", goal.element_id);
    console.log("** element.element_group_id: ", goal.element.element_group_id);
    console.log("** res.data.elements: ", group);
   
      console.log("** Family Group: ", group);
      const element_goal = group?.elements.find(e => e.id == goal.element_id);
      if(element_goal){
        console.log("** found last value: ", element_goal?.value);
        goal.last_value = element_goal?.value;
        goal.last_value_date = element_goal?.date;
        if(goal.last_value > 0){
          let p = (goal.last_value/100)*goal.score
          goal.goal_percentage = p/100;
          console.log("**  element.goal_percentage: ", goal.goal_percentage);
          goal.reversed = goal.goalType == '<'
          console.log("** element.reversed: ", goal.reversed);
        }
        
      }
    
  }

  getDrugIntake(){
    this.dooleService.getAPIdrugIntakeByDate({date: this.date}).subscribe((res)=>{
      this.drugs = res.drugIntakes;
      this.filterDrugsByStatus()
      this.searchIndexDrug()
      this.slideDrugChange()
      this.sliderDrug.slideTo(this.currentIndexDrug)
    })
  }

  
  
  syncData(days){

    let startDate =  new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    let endDate =  new Date(); // now
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
      //this.postHealth('heart_rate', data);
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
      //this.postHealth('weight', data);
    }).catch(error => {
      console.error(error);
      throw error; 
    });

    console.log('dataType: temperature');
    this.health.query({
      startDate,
      endDate,
      dataType: 'temperature',
    }).then(data => {
      //this.postHealth('temperature', data);
    }).catch(error => {
      console.error(error);
      throw error; 
    });

  }

    //envia post amb dades de salut a api
    postHealth(type, data){
      const postData = {
        type: type,
        vals: JSON.stringify(data),
      };
      this.authService.post('user/element/sync', postData).subscribe(
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

  actionSeeAllAdvices(){
    //console.log('[HomePage] actionCloseAdvice()');
  }

  actionCloseAdvice(slide){
    //console.log('[HomePage] actionCloseAdvice()', slide.name);
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

  slideGoalChange() {	
    if(this.goals !== undefined && this.goals?.length > 0) 	    
		this.sliderGoals.getActiveIndex().then(index => {      
      //console.log('[HomePage] slideGoalChange()', index);
      let slider = this.goals[index]
         console.log('[HomePage] slideGoalChange()', slider);
      this.infoGoals = {
        title: slider?.typeString +' '+slider?.element?.element_unit?.abbreviation
      }
    });
  }

  slideDietChange(){	  
    if(this.diets !== undefined && this.diets?.length > 0) 
		this.sliderDiet.getActiveIndex().then(index => {      
      //console.log('[HomePage] slideDietChange()', index);
      let slider = this.diets[index]
      let hour = slider?.date.split(' ')[1]
      this.infoDiet = {
        title: slider?.items,
        hour: hour.split(':')[0]+':'+hour.split(':')[1]
      }
    });
  }

  slideDrugChange(){	
    if(this.drugs !== undefined && this.drugs?.length > 0){
      this.sliderDrug.getActiveIndex().then(index => {      
        //console.log('[HomePage] slideDrugChange()', index);
        let slider = this.drugs[index]
        this.infoDrugs = {
          title: slider?.name,
          hour: slider?.hour_intake
        }
      });
    }else{
      this.infoDrugs = null;
    }
	
  }

  slideGamesChange(){
    if(this.games !== undefined && this.games?.length > 0)
    this.sliderGames.getActiveIndex().then(index => {      
      //console.log('[HomePage] slideGamesChange()', index);
      let slider = this.games[index]
      let hour = slider?.scheduled_date.split(' ')[1]
      this.infoGames = {
        title: slider?.name,
        hour: hour.split(':')[0] + ':' + hour.split(':')[1]
      }
    });
  }

  slideActivityChange(){
    this.sliderPhysical.getActiveIndex().then(index => {      
      //console.log('[HomePage] slideActivityChange()', index);
      let slider = this.activity[index]
      this.infoActivity = {
        title: slider?.group
      }

    });
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
    if(this.drugs !== undefined && this.drugs?.length > 0)
    this.drugs = this.drugs.filter( drug => drug.forgotten != 0)
  }

  searchIndexDrug(){
    if(this.drugs !== undefined && this.drugs?.length > 0){
      let drug = this.drugs?.find(element => 
        ((this.hourToMinutes(element.hour_intake) + this.WAIT_TIME) >= (new Date().getHours()*60 + new Date().getMinutes()))
        )
      let index = this.drugs.indexOf(drug);
        //console.log('[HomePage] searchIndexDrug()', drug, index);
        this.currentIndexDrug = (index > -1)? index: 0
    }
  }

  searchIndexDGame(){
    if(this.games !== undefined && this.games?.length > 0){
      let game = this.games?.find(element => 
        ((this.hourToMinutes(element.scheduled_date.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours()*60 + new Date().getMinutes()))
        )
      let index = this.games.indexOf(game);
      this.currentIndexDrug = (index > -1)? index: 0
    }
  }

  searchIndexDiet(){
    if(this.diets !== undefined && this.diets?.length > 0){
      let diet = this.diets?.find(element => 
        ((this.hourToMinutes(element.date.split(' ')[1]) + this.WAIT_TIME) >= (new Date().getHours()*60 + new Date().getMinutes()))
        )
      let index = this.diets.indexOf(diet);
      this.currentIndexDiet = (index > -1)? index: 0
    }
  }

  hourToMinutes(hour){
    let minutes = hour.split(':')
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
    //if(item.type=="html5"){
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

      await this.auth.getUserLocalstorage().then(value =>{
        this.auth.user = value
      })
      
      if(item.url.startsWith("http")){
        this.header = true
        item.url=item.url+"?user="+this.auth.user.idUser+"&game="+item.id;      
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

   

/*     if(item.type=="form") {
      const options: InAppBrowserOptions = {
        location: 'no',
        toolbar: 'yes'
      };

      var pageContent = '<html><head></head><body><form id="loginForm" action="https://covid.doole.io/formAnswer/fill/'+item.form_id+'" method="post" enctype="multipart/form-data">' +
        '<input type="hidden" name="idForm" value="'+item.form_id+'">' +
        '<input type="hidden" name="user_id" value="'+this.auth.user.idUser+'">' +
        '<input type="hidden" name="secret" value="'+this.auth.user.secret+'">' +
        '</form> <script type="text/javascript">document.getElementById("loginForm").submit();</script></body></html>';
      var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
      var browserRef = this.iab.create(
        pageContentUrl,
        "_blank",
        "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
      );
    } */

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
      return datePipe.transform(date, 'EEEE, d MMMM hh:mm');
    }

    formatDate(d){
      if(d){
        var auxdate = d.split(' ')
        let date = new Date(auxdate[0]);
        let time = auxdate[1];
        date.setHours(time.substring(0,2));
        date.setMinutes(time.substring(3,5));
        return this.transformDate(date, 'MM/dd/yyyy HH:mm')
      }
    }

    transformDate(date, format) {
      return this.datePipe.transform(date, format);
    }

    goDetailRecipe(e){
      let id = e.item.id
      if(e.item_type === 'App\\Receipt')
      this.nav.navigateForward("/journal/diets-detail/recipe", { state: {id:id} });
    }

}
