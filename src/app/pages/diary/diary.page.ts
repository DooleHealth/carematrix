import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonSlides, ModalController, NavController} from '@ionic/angular'; 
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ElementsAddPage } from '../tracking/elements-add/elements-add.page';
import { DrugAddPage } from './drug-add/drug-add.page';
import { DrugsDetailPage } from './drugs-detail/drugs-detail.page';
import { StorageService } from 'src/app/services/storage.service';
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
  diets:any = {}
  groupedElements: any = [];
  date = Date.now()
  segment = history.state?.segment ? history.state.segment : 'diets';
  isLoading:boolean = true
  isFutureDay = false
  @ViewChild('slides') slides: IonSlides;
  constructor(
    private dooleService: DooleService,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public authService: AuthenticationService,
    private storageService: StorageService,
    private nav: NavController,
  ) {}

  ngOnInit() {
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
  ionViewDidEnter(){
    this.segmentChanged()
  }
  next() {
    let nextDay =  new Date(this.date).getDate() + 1
    this.date = new Date(this.date ).setDate(nextDay)
    this.isFutureDay = (Date.now() < this.date)? true:false
    this.segmentChanged()
  }

  prev() {
    let lastDay =  new Date(this.date).getDate() - 1
    this.date = new Date(this.date ).setDate(lastDay)
    this.isFutureDay = (Date.now() < (new Date(this.date).getMilliseconds() ) )? true:false
    this.segmentChanged()
  }
  expandItem(item): void {
    console.log('[DiaryPage] expandItem()', item.expanded);
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
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
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM');
  }

  addItems(list){
    this.items = []
    list.forEach(element => {
      this.items.push({expanded: false, item: element })
    });
    console.log('[DiaryPage] addItems()', this.items.length);
  }

  async getDietList(){
    this.isLoading = true;
    console.log('[DiaryPage] getDietList()');
    this.items = []
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIlistDietsByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);
        if(res.diets)
          this.addItems(res.diets)
        //this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          //this.isLoading = false
          throw err; 
      }, ()=>{
        this.isLoading = false
      });
  }

  async getDietListByDate(){
    this.isLoading = true;
    console.log('[DiaryPage] getDietListByDate()');
    let date  = this.transformDate2(this.date)
    this.dooleService.getAPIdietsByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietListByDate()', await res);
        if(res.success){
          this.listDiets = []
          this.diets = res.diet
          this.treeIterateDiets(res.dietIntakes, '')
          //console.log('[DiaryPage] getDietListByDate()', await this.diets);
        }
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDietListByDate() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          //this.isLoading = false
          throw err; 
      }, ()=>{
        this.isLoading = false
      });
  }

  treeIterateDiets(obj, stack) {
    for (var property in obj) {
      console.log('[DiaryPage] treeIterateDiets()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          console.log('[DiaryPage] treeIterateDiets()', obj[property]);
          this.listDiets.push({date: property, items: obj[property], expanded: false,})
          //this.treeIterate(obj[property], stack + '.' + property);
        }
      }
    }
    //console.log('[DiaryPage] treeIterateDiets()', this.listDiets);
  }

  async getDrugIntakeList(){
    console.log('[DiaryPage] getDrugIntakeList()');
    this.items = []
    this.isLoading = true
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIdrugIntakeByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDrugIntakeList()', await res);
        let list = res.drugIntakes
        if(list){
          this.listDrug = []
          list = this.sortDate(list)
          this.addItems(list)
          this.groupDiagnosticsByDate(this.items)
        }
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDrugIntakeList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err; 
      }, ()=>{
        this.isLoading = false
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
    this.isLoading = true
    let date = this.transformDate(this.date)
    this.dooleService.getAPIgamesByDate(date, date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getGameListByDate()', await res);
         if(res.gamePlays){
          let games = []
          res.gamePlays.forEach(element => {
            games.push(element.game)
          });
          this.addItems(games)
         }
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getGameListByDate() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err; 
      }, ()=>{
        this.isLoading = false
      });
  }

  async openGames(item){
    var browser : any;
    if(item.type=="html5"){
      const iosoption: InAppBrowserOptions = {
        zoom: 'no',
        location:'yes',
        toolbar:'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        disallowoverscroll: 'yes',
        enableViewportScale: 'yes'
      }

      await this.auth.getUserLocalstorage().then(value =>{
        this.auth.user = value
      })
      
      if(item.url.startsWith("http")){
        item.url=item.url+"?user="+this.auth.user.idUser+"&game="+item.id;
        browser = this.iab.create(item.url, '_blank', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
      }
      else
        browser = this.iab.create(item.url, '_system', "hidden=no,location=no,clearsessioncache=yes,clearcache=yes");
    }

    if(item.type=="form") {
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
    }

  }

  async getElementsList(){
    this.items = []
    this.isLoading = true
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIelementsListByDate(date).subscribe(
      async (data: any) =>{
        console.log('[DiaryPage] getElementsList()', await data); 
        if(data.eg){
          this.groupedElements = [];
          // Iterate elements in the tree searching for element groups
          this.treeIterate(data.eg, '');
          // Order grouped elements by Name
          this.groupedElements.sort(function(a,b){
            return a.group.localeCompare(b.group);
          })
          this.addItems(this.groupedElements);
        }
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err; 
      }, ()=>{
        this.isLoading = false
      });
  }

  treeIterate(obj, stack) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {

          this.treeIterate(obj[property], stack + '.' + property);
        } else {
          if(property=="group"){
            obj['is_child'] = stack.includes('childs');
            this.groupedElements.push(obj);

          }

        }
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

}

