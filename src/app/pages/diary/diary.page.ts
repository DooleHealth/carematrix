import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, NavController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ElementsAddPage } from '../tracking/elements-add/elements-add.page';
import { DrugAddPage } from './drug-add/drug-add.page';
import { DrugsDetailPage } from './drugs-detail/drugs-detail.page';
import { StorageService } from 'src/app/services/storage.service';
import { RolesService } from 'src/app/services/roles.service';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/date.service';
export interface ItemDiary {
  expanded?: boolean;
  item?: any;
}
export interface ListDrugByDate {
  date?: string;
  itemDrugs?: ItemDiary[];
}
export interface ListItemByDate {
  date?: string;
  name?: string;
  items?: ItemDiary[];
  expanded: boolean
}
@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {
  firstTime: boolean;
  public items: ItemDiary[] = [];
  listDrug:  ListDrugByDate[] = [];
  listDiets:  ListItemByDate[] = [];
  listGames= [];
  listElements=[];
  listDrugIntakes=[];
  listGamePlays = [];
  diets:any = {}
  groupedElements: Array<any>;
  newGroupedElements: Array<any>;
  date = Date.now()
  segment = history.state?.segment ? history.state.segment : 'diets';
  isLoading:boolean;
  isLoadingDiets:boolean = true;
  isLoadingDrugs:boolean = true;
  isLoadingGames:boolean = true;
  isLoadingElements:boolean = true;
  isFutureDay = false

  constructor(
    private dooleService: DooleService,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    public dateService: DateService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public authService: AuthenticationService,
    private storageService: StorageService,
    private nav: NavController,
    public role: RolesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setSegment()
    this.items = []
    console.log('[DiaryPage] ngOnInit()');
    // let state = history.state?.segment;
    // if(state) this.segment = state
    //this.segmentChanged()

    this.storageService.isFirstTimeLoad().then(((result) =>
    {
      this.firstTime = result;
    }));

    //if first time update first time
    if(this.firstTime){
      // this.storageService.saveFirstTimeLoad();
    }
  }

  load(){
    this.firstTime = true;
    this.storageService.saveFirstTimeLoad(false);
  }
  ionViewWillEnter(){
    this.segmentChanged()
  }
  next() {
    let nextDay =  new Date(this.date).getDate() + 1
    this.date = new Date(this.date ).setDate(nextDay)
    this.isFutureDay = (Date.now() < this.date)? true:false
    this.resetLoaders();
    this.segmentChanged()
  }

  prev() {
    let lastDay =  new Date(this.date).getDate() - 1
    this.date = new Date(this.date ).setDate(lastDay)
    this.isFutureDay = (Date.now() < (new Date(this.date).getMilliseconds() ) )? true:false
    this.resetLoaders();
    this.segmentChanged()
  }

  resetLoaders(){
    this.isLoadingDiets = true;
    this.isLoadingDrugs = true;
    this.isLoadingGames = true;
    this.isLoadingElements = true;
  }
  expandItem(item): void {
    console.log('[DiaryPage] expandItem()', item.expanded);
    item.expanded = !item.expanded;
  }

  expandItemDiet(item){
      item.expanded = !item.expanded;
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  transformDate2(date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  formatSelectedDate(date){
    return this.dateService.selectedDateFormat(date);
  }

  addItems(list){
    let items = []
    list.forEach(element => {
      items.push({expanded: false, item: element })
    });
    console.log('[DiaryPage] addItems()', this.items.length);

    return items;
  }

  async getDietList(){

    console.log('[DiaryPage] getDietList()');
    this.items = []
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIlistDietsByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);

        if(res.diets){
          this.addItems(res.diets)
        }


       },(err) => {
          console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)

          throw err;
      }, ()=>{
        this.isLoadingDiets = false
      });
  }



  async getDietListByDate(){

    console.log('[DiaryPage] getDietListByDate()');
    let date  = this.transformDate2(this.date)
    const params = {date: date, grouped_by_times: true}
    this.dooleService.getAPIdietsByDate(params).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietListByDate()', await res);
        if(res.success){
          this.listDiets = []

          this.diets = res?.diet?.id ? res.diet : undefined;

          this.treeIterateDiets(res.dietIntakes, '')

          console.log("VERIFY DIETS")
          console.log(this.diets)
          console.log(this.diets?.length)
        }

       },(err) => {
          console.log('[DiaryPage] getDietListByDate() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)

          throw err;
      }, ()=>{
        this.isLoadingDiets = false
      });
  }

  treeIterateDiets(obj, stack) {
    for (var property in obj) {
      console.log('[DiaryPage] treeIterateDiets()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          console.log('[DiaryPage] treeIterateDiets()', obj[property]);
          this.listDiets.push({name: property, date: obj[property][0]?.date_intake, items: obj[property], expanded: false,})
          //this.treeIterate(obj[property], stack + '.' + property);
        }
      }
    }
    console.log('[DiaryPage] treeIterateDiets()', this.listDiets);
  }

  async getDrugIntakeList(){
    console.log('[DiaryPage] getDrugIntakeList()');
    this.items = []
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIdrugIntakeByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDrugIntakeList()', await res);
        this.listDrug = [];
        let list = res?.drugIntakes
        if(list){
          this.listDrugIntakes = res.drugIntakes;
          list = this.sortDate(list)
          let items = this.addItems(list)
          console.log('[DiaryPage] getDrugIntakeList() items', items);
          this.groupDiagnosticsByDate(items)
        }

       },(err) => {
          console.log('[DiaryPage] getDrugIntakeList() ERROR(' + err.code + '): ' + err.message);
          throw err;
      }, ()=>{
        this.isLoadingDrugs = false
      });
  }

  groupDiagnosticsByDate(drugs){
    drugs.forEach( (drug, index) =>{
      let date = this.selectDayPeriod(drug.item.hour_intake)
      if(index == 0 || date !== this.selectDayPeriod(drugs[index-1].item.hour_intake)){
        let list = drugs.filter( event =>
          (this.selectDayPeriod(event.item.hour_intake) === date)
        )
        this.listDrug.push({date: date, itemDrugs: list})
      }
    })
    console.log('[DiaryPage] groupDiagnosticsByDate()', this.listDrug);
  }

  sortDate(drugs){
    return drugs.sort( function (a, b) {
      if (a.hour_intake > b.hour_intake)
        return 1;
      if (a.hour_intake < b.hour_intake)
        return -1;
      return 0;
    })
  }

  changeTake(id,taked){

    taked=(taked=="0") ? "1" : "0";
    var dict = [];
    dict.push({
        key:   "date",
        value: ""
    });
    this.dooleService.postAPIchangeStatedrugIntake(id,taked).subscribe(json=>{
      console.log('[DiaryPage] changeTake()',  json);
      this.getDrugIntakeList()
    },(err) => {
      console.log('[DiaryPage] changeTake() ERROR(' + err.code + '): ' + err.message);
      alert( 'ERROR(' + err.code + '): ' + err.message)
      throw err;
  });
  }

  async getGameListByDate(){
    console.log('[DiaryPage] getGameListByDate()');
    this.items = []
    let date = this.transformDate(this.date)
    this.dooleService.getAPIgamesByDate(date, date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getGameListByDate()', await res);
         if(res.gamePlays){
          this.listGames = []
          res.gamePlays.forEach(element => {
            element.game['scheduled_date'] = element.scheduled_date
            this.listGames.push(element.game)
          });
          this.listGames.sort(function(a,b){
            return a.scheduled_date.localeCompare(b.scheduled_date);
          })
          this.listGamePlays = this.addItems(this.listGames)
         }

       },(err) => {
          console.log('[DiaryPage] getGameListByDate() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)

          throw err;
      }, ()=>{
        this.isLoadingGames = false
      });
  }

  async openGames(item){
    var browser : any;
    if(item.game_type=="html5"){
      console.log('[DiaryPage] openGames()', 'html5');
      this.router.navigate([`/journal/games-detail`],{state:{ id:item.id}});
    }

    if(item.game_type=="form") {
      console.log('[DiaryPage] openGames()', 'form');
      this.router.navigate([`/journal/games-detail`],{state:{ id:item.id, form_id: item.form_id}});
    }

  }


  async getElementsList() {
    this.isLoadingElements = true
    this.groupedElements = [];
    this.newGroupedElements = [];
    let params = { only_with_values: '0', grouped: '1', filter: 1 }
    //Activar filtro getAPIelementsList(true)
    this.dooleService.getAPIelementsList(params).subscribe(
      async (data: any) => {
        console.log('[TrackingPage] getElementsList()', await data);
          this.treeIterate(data?.elements)
          console.log('[TrackingPage] getElementsList() ', this.groupedElements);
        this.isLoadingElements = false
      }, (err) => {
        alert(`Error: ${err.code}, Message: ${err.message}`)
        console.log('[TrackingPage] getElementsList() ERROR(' + err.code + '): ' + err.message);
        this.isLoadingElements = false
        throw err;
      });

  }

  groupElements(elements) {
    elements.forEach((element) => {
      element['units'] = element?.element_unit?.abbreviation ? element?.element_unit?.abbreviation : '';
      element['value'] = element?.last_value?.value;
    })

    console.log('[DiaryPage] groupElements()', this.groupedElements);
  }

  treeIterate(obj) {
    console.log('[DiaryPage] groupElements()', obj);
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        console.log('[DiaryPage] groupElements()', property);
              let elements = obj[property]
              this.groupElements(elements)
              this.groupedElements.push({ group: property, elements: elements });
      }
    }
  }

  async segmentChanged($event?){
    console.log('[DiaryPage] segmentChanged()', this.segment);
    console.log('[DiaryPage] event()', $event);
    this.items = []
    switch (this.segment) {
      case 'diets':
        //await this.getDietList()
        await this.getDietListByDate()
        break;
      case 'medication':
        await this.getDrugIntakeList()
        break;
      case 'games':
        await this.getGameListByDate()
        break;
      case 'health':
        await this.getElementsList()
        break;
      default:
        console.log('Segment not found');
        break;
    }
  }

  setSegment(){
    if(!this.role?.component?.diet){
      this.segment = 'medication'
      if(!this.role?.component?.drug){
          this.segment = 'games'
          if(!this.role?.component?.game){
            this.segment = 'health'
            if(!this.role?.component?.element){
              this.segment = ''
            }
          }
      }
    }
  }

  selectDayPeriod(time){
    let h =  time.split(':')  //new Date(time).getHours()
    let hour = Number(h[0])
    if(hour >= 6  && hour < 12){
      return this.translate.instant('diary.morning')
    }
    if(hour == 12){
      return this.translate.instant('diary.noon')
    }
    if(hour >= 13 && hour < 20){
      return this.translate.instant('diary.aftenoon')
    }
    if(hour >= 20 && hour < 24){
      return this.translate.instant('diary.night')
    }
    if(hour == 24 || hour == 0){
      return this.translate.instant('diary.midnight')
    }
    if(hour >0 && hour < 6){
      return this.translate.instant('diary.dawning')
    }
    return  this.translate.instant('diary.all_day')
  }

  selectMealTime(time){
    let h =  time.split(':')  //new Date(time).getHours()
    let minute = Number(h[1])
    let hour = Number(h[0]) + minute/60
    if(hour >= 6  && hour <= 10){
      return this.translate.instant('diet.breakfast')
    }
    if(hour >= 11 && hour < 13){
      return this.translate.instant('diet.brunch')
    }
    if(hour >= 13 && hour <= 16){
      return this.translate.instant('diet.lunch')
    }
    if(hour >=17 && hour <= 19){
      return this.translate.instant('diet.afternoon_snack')
    }
    if(hour >19 && hour <= 22){
      return this.translate.instant('diet.dinner')
    }
  }

  async addDrugPlan(drug, id){
    const modal = await this.modalCtrl.create({
      component:  DrugsDetailPage,
      componentProps: { drug: drug, id: id},
      cssClass: "modal-custom-class"
    });

    modal.onDidDismiss()
      .then((result) => {
        console.log('addDrugPlan()', result);

        if(result?.data?.error){
         // let message = this.translate.instant('landing.message_wrong_credentials')
          //this.dooleService.presentAlert(message)
        }else if(result?.data?.action !== undefined){
          this.notification.displayToastSuccessful()
          this.segmentChanged()
        }
      });

      await modal.present();
    }

    async addDrug(){
      const modal = await this.modalCtrl.create({
        component:  DrugAddPage,
        componentProps: { },
        cssClass: "modal-custom-class"
      });

      modal.onDidDismiss()
        .then((result) => {
          console.log('addDrug()', result);

          if(result?.data?.error){
           // let message = this.translate.instant('landing.message_wrong_credentials')
            //this.dooleService.presentAlert(message)
          }else if(result?.data?.action == 'add'){
            let drug = result?.data?.drug
            this.addDrugPlan(drug, undefined)
          }
        });

        await modal.present();
    }

    async addElement(){
      const modal = await this.modalCtrl.create({
        component:  ElementsAddPage,
        componentProps: { },
        cssClass: "modal-custom-class"
      });

      modal.onDidDismiss()
        .then((result) => {
          console.log('addElement()', result);

          if(result?.data?.error){
           // let message = this.translate.instant('landing.message_wrong_credentials')
            //this.dooleService.presentAlert(message)
          }else if(result?.data?.action == 'add'){
            this.notification.displayToastSuccessful()
            this.getElementsList()
          }
        });

        await modal.present();
      }

      goDetailRecipe(e){
        let id = e.item.id
        if(e.item_type === 'App\\Receipt')
        this.nav.navigateForward("journal/diets-detail/recipe", { state: {id:id} });
      }

      formatHour(time){
        if(time){
          let hour =  time.split(':')
          return hour[0]+':'+hour[1]
        }
      }

      formatHourGamePlay(date){
        if(date){
          let time = date.split(' ')[1]
          let hour = this.formatHour(time)
          this.dateService.format24h(hour);
        }else return ''
      }

}

