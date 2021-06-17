import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonSlides, LoadingController} from '@ionic/angular'; 
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
export interface ItemDiary {
  expanded?: boolean;
  item?: any;
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})

export class DiaryPage implements OnInit {
  public items: ItemDiary[] = [];
  diets = []
  groupedElements: any = [];
  date = Date.now()
  segment = 'diets'
  isLoading = false
  @ViewChild('slides') slides: IonSlides;
  constructor(
    private dooleService: DooleService,
    private loadingController: LoadingController,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    private auth: AuthenticationService,
  ) {}

  ngOnInit() {
    this.segmentChanged()
  }
  next() {
    let nextDay =  new Date(this.date).getDate() + 1
    this.date = new Date(this.date ).setDate(nextDay)
    this.segmentChanged()
  }

  prev() {
    let lastDay =  new Date(this.date).getDate() - 1
    this.date = new Date(this.date ).setDate(lastDay)
    this.segmentChanged()
  }
  expandItem(item): void {
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

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  addItems(list){
    this.items = []
    list.forEach(element => {
      this.items.push({expanded: false, item: element })
    });
    console.log('[DiaryPage] addItems()', this.items);
  }

  async getDietList(){
    console.log('[DiaryPage] getDietList()');
    this.items = []
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIlistDietsByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);
        if(res.diets)
        this.addItems(res.diets)
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
      });
  }

  async getDrugIntakeList(){
    console.log('[DiaryPage] getDetailDiet()');
    this.items = []
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.postAPIdrugIntakeByDate(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDetailDiet()', await res);
        if(res.drugIntakes)
        this.addItems(res.drugIntakes)
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getDetailDiet() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
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
      console.log('[DiaryPage] changeTake()',  json);
      this.getDrugIntakeList()
    },(err) => { 
      console.log('[DiaryPage] changeTake() ERROR(' + err.code + '): ' + err.message); 
      throw err; 
  });
  }

  async getGameList(){
    console.log('[DiaryPage] getGameList()');
    this.items = []
    this.isLoading = true
    const loading = await this.loadingController.create();
    await loading.present();
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIgames(date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getGameList()', await res);
         if(res.games)
       this.addItems(res.games)
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getGameList() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
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
    const loading = await this.loadingController.create();
    await loading.present();
    this.items = []
    this.groupedElements = [];
    this.isLoading = true
    let formattedDate = this.transformDate(this.date)
    let date = {date: formattedDate}
    this.dooleService.getAPIelementsListByDate(date).subscribe(
      async (data: any) =>{
        console.log('[DiaryPage] getElementsList()', await data); 

        if(data.eg){
          // Iterate elements in the tree searching for element groups
          this.treeIterate(data.eg, '');
          // Order grouped elements by Name
          this.groupedElements.sort(function(a,b){
            return a.group.localeCompare(b.group);
          })
          this.addItems(this.groupedElements);
        }
        loading.dismiss();
        this.isLoading = false
       },(err) => { 
          console.log('[DiaryPage] getElementsList() ERROR(' + err.code + '): ' + err.message); 
          loading.dismiss();
          this.isLoading = false
          throw err; 
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

  segmentChanged(){
    console.log(this.segment);
    switch (this.segment) {
      case 'diets':
        this.getDietList()
        break;
      case 'medication':
        this.getDrugIntakeList()
        break;
      case 'games':
        this.getGameList()
        break;
      case 'health':
        this.getElementsList()
        break;
      default:
        //this.getDiagnosticTestsList()
        break;
    }
  }


  selectDayPeriod(time){
    let hour = new Date(time).getHours()
    if(hour <= 6  || hour < 12){
      return 'mañana'
    }
    if(hour == 12){
      return 'medio día'
    }
    if(hour >= 13 || hour < 20){
      return 'tarde'
    }
    if(hour >= 20 || hour < 24){
      return 'noche'
    }
    if(hour == 24){
      return 'media noche'
    }
    if(hour > 0 || hour < 6){
      return 'madrugada'
    }
    return 'todo el día'
  }
}

