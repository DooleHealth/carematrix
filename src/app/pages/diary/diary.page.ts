import { DatePipe } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, NavController} from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';
import { RolesService } from 'src/app/services/roles.service';
import { Router } from '@angular/router';
import { DateService } from 'src/app/services/date.service';
import { PermissionService } from 'src/app/services/permission.service';
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
  isDateInPast = false;
  currentDate;
  lastName;
  isSame: boolean = false;
  listDietsToday = [];
  Lasttimestring;
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
    private router: Router,
    private ngZone: NgZone,
    public permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.getCurrentDate();
    this.setSegment()
    this.items = []
    this.listDietsToday = [];
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

  getIsDateInPast(date: string | number | Date){
  
    this.isDateInPast = new Date(date) < this.currentDate;
    return this.isDateInPast

  }

  getCurrentDate() {    
    // Obtener la fecha actual en el mismo formato que content.date
    this.currentDate = new Date();
    // ... Realizar cualquier formato necesario para que coincida con content.date
    return this.currentDate;
}
  load(){
    this.firstTime = true;
    this.storageService.saveFirstTimeLoad(false);
  }
  ionViewWillEnter(){
    this.segmentChanged()
  }
  

  resetLoaders(){
    this.isLoadingDiets = true;
    this.isLoadingDrugs = true;
    this.isLoadingGames = true;
    this.isLoadingElements = true;
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
          this.items = res.dietIntakes
          console.log('[DiaryPage] getDietListByDate(dietIntakes)', await this.items);
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
    this.listDietsToday=[];
    for (var property in obj) {
      console.log('[DiaryPage] treeIterateDiets()', property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          console.log('[DiaryPage] treeIterateDiets()', obj[property]);
          obj[property].forEach(element => {
            this.listDietsToday.push(element)
          });
         
          this.listDiets.push({name: property, date: obj[property][0]?.date_intake, items: obj[property], expanded: false,})
          //this.treeIterate(obj[property], stack + '.' + property);
         
        }
      }
    }
    console.log('[DiaryPage] listDietsToday()', this.listDietsToday);
    console.log('[DiaryPage] treeIterateDiets()', this.listDiets);
    
        
  }

  async segmentChanged($event?){
    console.log('[DiaryPage] segmentChanged()', this.segment);
    console.log('[DiaryPage] event()', $event);
    this.items = []
    switch (this.segment) {
      case 'diets':
        //await this.getDietList()
        if (this.permissionService.canViewDiets) await this.getDietListByDate()
        break;
      case 'recipes':
        if (this.permissionService.canViewRecipes) await this.getRecipesist()
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

 
  selectMealTimess(time) {
    let timeMeals = "";
    let hour = new Date(time).getHours();
  
    if (hour >= 6 && hour <= 10) {
      timeMeals = this.translate.instant('diet.breakfast');
    } else if (hour >= 11 && hour < 13) {
      timeMeals = this.translate.instant('diet.brunch');
    } else if (hour >= 13 && hour <= 16) {
      timeMeals = this.translate.instant('diet.lunch');
    } else if (hour >= 17 && hour <= 19) {
      timeMeals = this.translate.instant('diet.afternoon_snack');
    } else if (hour > 19 && hour <= 22) {
      timeMeals = this.translate.instant('diet.dinner');
    }
  
    return timeMeals;
  }

  updateLastName(time) {
    const meal = this.selectMealTimess(time);
    if (this.lastName !== meal) {
      this.lastName = meal;
    }
  }

  updateLastTimeString(name) {
    this.Lasttimestring = name;
  }
  
  getLastName(name) {
    const isDifferent = name !== this.Lasttimestring;
    if (isDifferent) {
      this.updateLastTimeString(name);
    }
    return isDifferent;
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


     
      async getRecipesist(){
    
        console.log('[DiaryPage] getRecipesList()');
        this.items = []
        ///let formattedDate = this.transformDate(this.date)
       //// let date = {date: formattedDate}
       let  params={
        tags:1,
        interactions:1,
        readingTime:1,
        from_date:"2024-01-01",
        to_date:"2025-02-01"
      }
        await this.dooleService.getAPIListRecipe(params).subscribe(
          async (res: any) =>{
            
    
            if(res.receipts){
             
              let recipes = res.receipts
              recipes.forEach(element => {
                this.items.push(element)
              });
            
              console.log('[DiaryPage] getRecipesList()', await this.items);
             // this.adapterForView(res.diets)
            }
    
    
           },(err) => {
              console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message);
              alert( 'ERROR(' + err.code + '): ' + err.message)
    
              throw err;
          }, ()=>{
            
          });
      }
    
    
     
}

