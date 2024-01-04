import { Component, OnInit } from "@angular/core";
import { ItemDiary, ListItemByDate } from "../diary.page";
import { DooleService } from "src/app/services/doole.service";
import { DatePipe } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { DrugsDetailPage } from "../drugs-detail/drugs-detail.page";
import { DrugAddPage } from "../drug-add/drug-add.page";
import { ElementsAddPage } from "../../tracking/elements-add/elements-add.page";
import { DateService } from "src/app/services/date.service";
import { LanguageService } from "src/app/services/language.service";
import { ModalController, NavController, AlertController } from "@ionic/angular";
import { NotificationService } from "src/app/services/notification.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { StorageService } from "src/app/services/storage.service";
import { RolesService } from "src/app/services/roles.service";
import { Router } from "@angular/router";

export interface ListDrugByDate {
  date?: string;
  itemDrugs?: ItemDiary[];
}
@Component({
  selector: "app-medication-detail",
  templateUrl: "./medication-detail.page.html",
  styleUrls: ["./medication-detail.page.scss"],
})
export class MedicationDetailPage implements OnInit {
  firstTime: boolean;
  public items: ItemDiary[] = [];
  listDrug: ListDrugByDate[] = [];
  listDiets: ListItemByDate[] = [];
  listGames = [];
  listElements = [];
  listDrugIntakes = [];
  listGamePlays = [];
  diets: any = {};
  groupedElements: Array<any>;
  newGroupedElements: Array<any>;
  date = Date.now();
  segment = history.state?.segment ? history.state.segment : "diets";
  isLoading: boolean;
  isLoadingDiets: boolean = true;
  isLoadingDrugs: boolean = true;
  isLoadingGames: boolean = true;
  isLoadingElements: boolean = true;
  isFutureDay = false;

  constructor(
    private dooleService: DooleService,
    private datePipe: DatePipe,
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
    public alertController: AlertController,
  ) {}

  ngOnInit() {
    this.getDrugIntakeList();
    //this.setSegment()
    this.items = [];

    this.storageService.isFirstTimeLoad().then((result) => {
      this.firstTime = result;
    });

    //if first time update first time
    if (this.firstTime) {
      // this.storageService.saveFirstTimeLoad();
    }
  }

  load() {
    this.firstTime = true;
    this.storageService.saveFirstTimeLoad(false);
  }
  ionViewWillEnter() {
    this.getDrugIntakeList();
  }
  next() {
    let nextDay = new Date(this.date).getDate() + 1;
    this.date = new Date(this.date).setDate(nextDay);
    this.isFutureDay = Date.now() < this.date ? true : false;
    this.resetLoaders();
    this.getDrugIntakeList();
  }

  prev() {
    let lastDay = new Date(this.date).getDate() - 1;
    this.date = new Date(this.date).setDate(lastDay);
    this.isFutureDay =
      Date.now() < new Date(this.date).getMilliseconds() ? true : false;
    this.resetLoaders();
    this.getDrugIntakeList();
  }

  resetLoaders() {
    this.isLoadingDrugs = true;
  }
  expandItem(item): void {
    console.log("[DiaryPage] expandItem()", item.expanded);
    item.expanded = !item.expanded;
  }

  expandItemDiet(item) {
    item.expanded = !item.expanded;
  }

  transformDate(date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }

  transformDate2(date) {
    return this.datePipe.transform(date, "dd-MM-yyyy");
  }

  formatSelectedDate(date) {
    return this.dateService.selectedDateFormat(date);
  }

  addItems(list) {
    let items = [];
    list.forEach((element) => {
      items.push({ expanded: false, item: element });
    });
    console.log("[DiaryPage] addItems()", this.items.length);

    return items;
  }

  treeIterateDiets(obj, stack) {
    for (var property in obj) {
      console.log("[DiaryPage] treeIterateDiets()", property);
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          console.log("[DiaryPage] treeIterateDiets()", obj[property]);
          this.listDiets.push({
            name: property,
            date: obj[property][0]?.date_intake,
            items: obj[property],
            expanded: false,
          });
          //this.treeIterate(obj[property], stack + '.' + property);
        }
      }
    }
    console.log("[DiaryPage] treeIterateDiets()", this.listDiets);
  }

  async getDrugIntakeList() {
    console.log("[DiaryPage] getDrugIntakeList()");
    this.items = [];
    let formattedDate = this.transformDate(this.date);
    let date = { date: formattedDate };
    this.dooleService.getAPIdrugIntakeByDate(date).subscribe(
      async (res: any) => {
        console.log("[DiaryPage] getDrugIntakeList()", await res);
        this.listDrug = [];
        let list = res?.drugIntakes;
        if (list) {
          this.listDrugIntakes = res.drugIntakes;
          list = this.sortDate(list);
          let items = this.addItems(list);
          console.log("[DiaryPage] getDrugIntakeList() items", items);
          this.groupDiagnosticsByDate(items);
        }
      },
      (err) => {
        console.log(
          "[DiaryPage] getDrugIntakeList() ERROR(" +
            err.code +
            "): " +
            err.message
        );
        throw err;
      },
      () => {
        this.isLoadingDrugs = false;
      }
    );
  }

  groupDiagnosticsByDate(drugs) {
    drugs.forEach((drug, index) => {
      let date = this.selectDayPeriod(drug.item.hour_intake);
      if (
        index == 0 ||
        date !== this.selectDayPeriod(drugs[index - 1].item.hour_intake)
      ) {
        let list = drugs.filter(
          (event) => this.selectDayPeriod(event.item.hour_intake) === date
        );
        this.listDrug.push({ date: date, itemDrugs: list });
      }
    });
    console.log("[DiaryPage] groupDiagnosticsByDate()", this.listDrug);
  }

  sortDate(drugs) {
    return drugs.sort(function (a, b) {
      if (a.hour_intake > b.hour_intake) return 1;
      if (a.hour_intake < b.hour_intake) return -1;
      return 0;
    });
  }

  changeTake(id, taked) {
    taked = taked == "0" ? "1" : "0";
    var dict = [];
    dict.push({
      key: "date",
      value: "",
    });
    this.dooleService.postAPIchangeStatedrugIntake(id, taked).subscribe(
      (json) => {
        console.log("[DiaryPage] changeTake()", json);
        this.getDrugIntakeList();
      },
      (err) => {
        console.log(
          "[DiaryPage] changeTake() ERROR(" + err.code + "): " + err.message
        );
        alert("ERROR(" + err.code + "): " + err.message);
        throw err;
      }
    );
  }

  selectDayPeriod(time) {
    let h = time.split(":"); //new Date(time).getHours()
    let hour = Number(h[0]);
    if (hour >= 6 && hour < 12) {
      return this.translate.instant("diary.morning");
    }
    if (hour == 12) {
      return this.translate.instant("diary.noon");
    }
    if (hour >= 13 && hour < 20) {
      return this.translate.instant("diary.aftenoon");
    }
    if (hour >= 20 && hour < 24) {
      return this.translate.instant("diary.night");
    }
    if (hour == 24 || hour == 0) {
      return this.translate.instant("diary.midnight");
    }
    if (hour > 0 && hour < 6) {
      return this.translate.instant("diary.dawning");
    }
    return this.translate.instant("diary.all_day");
  }

  selectMealTime(time) {
    let h = time.split(":"); //new Date(time).getHours()
    let minute = Number(h[1]);
    let hour = Number(h[0]) + minute / 60;
    if (hour >= 6 && hour <= 10) {
      return this.translate.instant("diet.breakfast");
    }
    if (hour >= 11 && hour < 13) {
      return this.translate.instant("diet.brunch");
    }
    if (hour >= 13 && hour <= 16) {
      return this.translate.instant("diet.lunch");
    }
    if (hour >= 17 && hour <= 19) {
      return this.translate.instant("diet.afternoon_snack");
    }
    if (hour > 19 && hour <= 22) {
      return this.translate.instant("diet.dinner");
    }
  }

  async addDrugPlan(drug, id) {
    const modal = await this.modalCtrl.create({
      component: DrugsDetailPage,
      componentProps: { drug: drug, id: id },
      cssClass: "modal-custom-class",
    });

    modal.onDidDismiss().then((result) => {
      console.log("addDrugPlan()", result);

      if (result?.data?.error) {
        // let message = this.translate.instant('landing.message_wrong_credentials')
        //this.dooleService.presentAlert(message)
      } else if (result?.data?.action !== undefined) {
        this.notification.displayToastSuccessful();
        this.getDrugIntakeList();
      }
    });

    await modal.present();
  }

  async addDrug() {
    const modal = await this.modalCtrl.create({
      component: DrugAddPage,
      componentProps: {},
      cssClass: "modal-custom-class",
    });

    modal.onDidDismiss().then((result) => {
      console.log("addDrug()", result);

      if (result?.data?.error) {
        // let message = this.translate.instant('landing.message_wrong_credentials')
        //this.dooleService.presentAlert(message)
      } else if (result?.data?.action == "add") {
        let drug = result?.data?.drug;
        this.addDrugPlan(drug, undefined);
      }
    });

    await modal.present();
  }
  groupElements(elements) {
    elements.forEach((element) => {
      element["units"] = element?.element_unit?.abbreviation
        ? element?.element_unit?.abbreviation
        : "";
      element["value"] = element?.last_value?.value;
    });

    console.log("[DiaryPage] groupElements()", this.groupedElements);
  }
  treeIterate(obj) {
    console.log("[DiaryPage] groupElements()", obj);
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        console.log("[DiaryPage] groupElements()", property);
        let elements = obj[property];
        this.groupElements(elements);
        this.groupedElements.push({ group: property, elements: elements });
      }
    }
  }
  async getElementsList() {
    this.isLoadingElements = true;
    this.groupedElements = [];
    this.newGroupedElements = [];
    let params = { only_with_values: "0", grouped: "1", filter: 1 };
    //Activar filtro getAPIelementsList(true)
    this.dooleService.getAPIelementsList(params).subscribe(
      async (data: any) => {
        console.log("[TrackingPage] getElementsList()", await data);
        this.treeIterate(data?.elements);
        console.log("[TrackingPage] getElementsList() ", this.groupedElements);
        this.isLoadingElements = false;
      },
      (err) => {
        alert(`Error: ${err.code}, Message: ${err.message}`);
        console.log(
          "[TrackingPage] getElementsList() ERROR(" +
            err.code +
            "): " +
            err.message
        );
        this.isLoadingElements = false;
        throw err;
      }
    );
  }
  async addElement() {
    const modal = await this.modalCtrl.create({
      component: ElementsAddPage,
      componentProps: {},
      cssClass: "modal-custom-class",
    });

    modal.onDidDismiss().then((result) => {
      console.log("addElement()", result);

      if (result?.data?.error) {
        // let message = this.translate.instant('landing.message_wrong_credentials')
        //this.dooleService.presentAlert(message)
      } else if (result?.data?.action == "add") {
        this.notification.displayToastSuccessful();
        this.getElementsList();
      }
    });

    await modal.present();
  }

  goDetailRecipe(e) {
    let id = e.item.id;
    if (e.item_type === "App\\Receipt")
      this.nav.navigateForward("journal/diets-detail/recipe", {
        state: { id: id },
      });
  }

  formatHour(time) {
    if (time) {
      let hour = time.split(":");
      return hour[0] + ":" + hour[1];
    }
  }

  formatHourGamePlay(date) {
    if (date) {
      let time = date.split(" ")[1];
      let hour = this.formatHour(time);
      this.dateService.format24h(hour);
    } else return "";
  }

  showDetailAlert(title:string, observations:string) {

    this.translate.get('info.button').subscribe(
      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: title,
          // subHeader: 'Subtitle',
          message: observations,
          buttons: [button]
        });

        await alert.present();
      });
  }

 
}
