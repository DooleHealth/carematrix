import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Health } from '@ionic-native/health/ngx';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { VideoComponent } from 'src/app/components/video/video.component';
import { User, Goal, Diet, Drug, PhysicalActivity, Game, Agenda, Advice } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { OpentokService } from 'src/app/services/opentok.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export interface UserInformation {
  title?: string;
  hour?: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  WAIT_TIME = 10 //10 minutes 
  userDoole : User
  goals: Goal[] =[]
  diets: Diet[] =[]
  drugs: Drug[] =[]
  games =[]
  header = false;
  activity: any =[]
  appointment: Agenda[] =[]
  showGoogleFit = false;
  advices: Advice[] =[]
  date
  loading:boolean = true;
  currentIndexDrug = 0
  currentIndexGame = 0
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
    public translate: TranslateService, public alertController: AlertController
  ) { }

  async ngOnInit() { 
    this.date =  this.transformDate(Date.now())
    this.checkHealthAccess();
  }

  async ionViewDidEnter(){
    console.log('[HomePage] ionViewDidEnter()', this.authService?.user);
    this.tabs.translateTab()
    await this.getUserInformation()
    setTimeout(() => {
      // Close modal
     this.loading = false;
    }, 500);
  }

  checkHealthAccess(){
    if (this.platform.is('cordova')) {
      this.health.isAvailable()
          .then((available: boolean) => {
            console.log(available);
            this.showGoogleFit = !available;
            this.health.requestAuthorization([
              'distance', 'steps', 'heart_rate', 'activity', 'weight'  //read and write permissions
            ])
                .then(res => {
                  console.log(res);
                  this.syncData(30);
                })
                .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
    }
  }
  async getUserInformation(){

    this.dooleService.getAPIgoals().subscribe((res)=>{
      this.goals = res.goals;
    });
    
    this.dooleService.getAPIappointmentAgenda().subscribe((res)=>{
      console.log(res);
      this.appointment = res.agenda;
    });

    this.dooleService.getAPIlistAdvices().subscribe((res)=>{
      this.advices = res.advices;
    })

    this.dooleService.getAPIlistDietsByDate({}).subscribe((res)=>{
      this.diets = res.diets;
      this.slideDietChange()
    })

    this.dooleService.getAPIelementsListByDate({}).subscribe((res)=>{
      if(res.eg){
        this.treeIterate(res.eg, '');
        this.sliderGames.slideTo(0)
        this.slideActivityChange()
      }
    })

    this.getDrugIntake()

    this.getGames()

    //this.activity.push({name:'456 Cal'})

  }

  treeIterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {

          this.treeIterate(obj[property], stack + '.' + property);
        } else {
          if(property=="group"){
            obj['is_child'] = stack.includes('childs');
            this.activity.push(obj);

          }

        }
      }
    }
  }

  getGames(){
    this.dooleService.getAPIgamesByDate(this.date ,this.date ).subscribe((res)=>{
      if(res.gamePlays){
        this.games = res.gamePlays
        this.games.sort(function(a,b){
          return a.scheduled_date.localeCompare(b.scheduled_date);
        })
        this.searchIndexDGame()
        this.slideGamesChange()
        this.sliderGames.slideTo(this.currentIndexDrug)
      }
    });
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

    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'steps',
      bucket: 'day'
    }).then(data => {
      this.postHealth('steps', data);
    });

    this.health.queryAggregated({
      startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'distance',
      bucket: 'day'
    }).then(data => {
      this.postHealth('distance', data);

    }).catch(error => {
      console.log(error);
    });

    this.health.query({
      startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'heart_rate',
    }).then(data => {
      this.postHealth('heart_rate', data);
    }).catch(error => {
      console.log(error);
    });

    this.health.query({
      startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'weight',
    }).then(data => {
      this.postHealth('weight', data);
    }).catch(error => {
      console.log(error);
    });

    this.health.query({
      startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
      endDate: new Date(), // now
      dataType: 'temperature',
    }).then(data => {
      this.postHealth('temperature', data);
    }).catch(error => {
      console.log(error);
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

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  actionSeeAllAdvices(){
    console.log('[HomePage] actionCloseAdvice()');
  }

  actionCloseAdvice(slide){
    console.log('[HomePage] actionCloseAdvice()', slide.name);
  }

  actionRegisterAdvice(slide){
    console.log('[HomePage] actionRegisterAdvice()', slide.name);
  }

  actionCloseAppointment(slide){
    console.log('[HomePage] actionCloseAppointment()', slide.title);
    slide.hide = true
    this.appointment = this.appointment.filter( slide => slide.hide == false)
  }

  actionDetailAppointment(slide){
    console.log('[HomePage] actionDetailAppointment()', slide.name);
  }

  actionButtonDrugs(slide){
    console.log('[HomePage] actionButtonDrugs()', slide.name);
  }

  slideGoalChange() {		    
		this.sliderGoals.getActiveIndex().then(index => {      
      console.log('[HomePage] slideGoalChange()', index);
      let slider = this.goals[index]
    });
  }

  slideDietChange(){	  
    if(this.diets !== undefined && this.diets?.length > 0) 
		this.sliderDiet.getActiveIndex().then(index => {      
      console.log('[HomePage] slideDietChange()', index);
      let slider = this.diets[index]
      this.infoDiet = {
        title: slider?.name,
        hour: slider?.hour
      }
    });
  }

  slideDrugChange(){	
    if(this.drugs !== undefined && this.drugs?.length > 0){
      this.sliderDrug.getActiveIndex().then(index => {      
        console.log('[HomePage] slideDrugChange()', index);
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
      console.log('[HomePage] slideGamesChange()', index);
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
      console.log('[HomePage] slideActivityChange()', index);
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
      console.log('[HomePage] changeTake()',  json);
      this.getDrugIntake()
    },(err) => { 
      console.log('[HomePage] changeTake() ERROR(' + err.code + '): ' + err.message); 
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

  hourToMinutes(hour){
    let minutes = hour.split(':')
    return (Number(minutes[0]))*60 + (Number(minutes[1]))
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
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
            console.log("anim complete");
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
      console.log('Async operation has ended' ,games);
      return games.sort( function (a, b) {
        if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1])> this.hourToMinutes(b?.scheduled_date?.split(' ')[1])) 
          return 1;
        if (this.hourToMinutes(a?.scheduled_date?.split(' ')[1])< this.hourToMinutes(b?.scheduled_date?.split(' ')[1]))
          return -1;
        return 0;
      })
  
    }

}
