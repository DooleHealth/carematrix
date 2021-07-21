import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  userDoole : User
  goals: Goal[] =[]
  diets: Diet[] =[]
  drugs: Drug[] =[]
  games: Game[] =[]
  activity: PhysicalActivity[] =[]
  appointment: Agenda[] =[]
  showGoogleFit = false;
  advices: Advice[] =[]
  date
  loading:boolean = true;
  currentIndexDrug = 0
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
  constructor(
    public router:Router,
    public platform: Platform,
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private datePipe: DatePipe,
    private health: Health,
  ) { }

  async ngOnInit() { 
    this.date =  this.transformDate(Date.now())
    this.checkHealthAccess();
    //this.getUserInformation()  
  }

  async ionViewDidEnter(){
    console.log('[HomePage] ionViewDidEnter()');
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
    this.dooleService.getAPIgames().subscribe((res)=>{
      this.games = res.games;
    });

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

    this.getDrugIntake()

    this.activity.push({name:'456 Cal'})

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

  getDrugIntake(){
    this.dooleService.getAPIdrugIntakeByDate({date: this.date}).subscribe((res)=>{
      this.drugs = res.drugIntakes;
      this.filterDrugsByStatus()
      this.searchIndexDrug()
      this.slideDrugChange()
      this.sliderDrug.slideTo(this.currentIndexDrug)
    })
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

  actionButtonGames(slide){
    console.log('[HomePage] actionButtonDrugs()', slide.name);
  }

  slideGoalChange() {		    
		this.sliderGoals.getActiveIndex().then(index => {      
      console.log('[HomePage] slideGoalChange()', index);
      let slider = this.goals[index]
    });
  }

  slideDietChange(){	   
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
		this.sliderDrug.getActiveIndex().then(index => {      
      console.log('[HomePage] slideDrugChange()', index);
      let slider = this.drugs[index]
      this.infoDrugs = {
        title: slider?.name,
        hour: slider?.hour_intake
      }
    });
  }

  slideGamesChange(){
    this.sliderGames.getActiveIndex().then(index => {      
      console.log('[HomePage] slideGamesChange()', index);
      let slider = this.drugs[index]
    });
  }
  slideActivityChange(){
    this.sliderPhysical.getActiveIndex().then(index => {      
      console.log('[HomePage] slideActivityChange()', index);
      let slider = this.drugs[index]
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
      //this.getUserInformation()
      this.getDrugIntake()
    },(err) => { 
      console.log('[HomePage] changeTake() ERROR(' + err.code + '): ' + err.message); 
      alert( 'ERROR(' + err.code + '): ' + err.message)
      throw err; 
    });
  }

  filterDrugsByStatus(){
    this.drugs = this.drugs.filter( drug => drug.forgotten != 0)
  }

  searchIndexDrug(){
    let drug = this.drugs.find(element => 
      ((this.hourToMinutes(element.hour_intake)) >= (new Date().getHours()*60 + new Date().getMinutes()))
      )
    let index = this.drugs.indexOf(drug);
      console.log('[HomePage] searchIndexDrug()', drug, index);
      this.currentIndexDrug = (index > -1)? index: 0
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
 
}
