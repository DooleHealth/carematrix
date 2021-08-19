import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { IonSlides, LoadingController, ModalController, AlertController, NavController } from '@ionic/angular'; 
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DrugAddPage } from '../drug-add/drug-add.page';
import { DrugsDetailPage } from '../drugs-detail/drugs-detail.page';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  @Input()event: any;
  segment = history.state?.segment ? history.state.segment : 'List';
  items = []
  items2 = []
  isLoading:boolean = true
  isFormVisible:boolean = false
  petitions : any = [];
  date = Date.now()
  diets = []
  directions = [] 
  isNewEvent = true
  id:any
  isSubmitted = false;
  loading : any;
  directionItems : any;
  form: FormGroup;
  times = []
  paso = 0;
  direction : any;
  sendType : string = 'bag19';
  showConfirmed = false;
  
  

  constructor(
    private dooleService: DooleService,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    private fb: FormBuilder,
    private datepipe: DatePipe
  
  ) {}

  ngOnInit() {
  
    this.form = this.fb.group({
      name: [''],
      address: [''],
      city: [''],
      state: [''],
      postal_code: [''],
      phone: [''],

    });

  }

 
  loadData(){
    this.isLoading = true;
    console.log('[MedicationPage] getListMedications()');
    this.items = []
    this.dooleService.getAPIlistDietsByDate(this.date).subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);
        if(res.diets)
        this.addItems(res.diets)
        console.log(this.items); 
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

  loadDataDirections(){
    this.dooleService.getAPIdirectionsList().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadDataDirections()', await data); 
        if(data){
          this.directions = data
          console.log(this.directions); 
          console.log(this.paso) 
        }
       
       },(err) => { 
          console.log('[MedicationPage] loadDataDirections() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err; 
      });
  }

  addItems(list){
    this.items = []
    list.forEach(element => {
      this.items.push({expanded: false, item: element })
    });
    console.log('[DiaryPage] addItems()', this.items.length);
  }

  ionViewDidEnter(){
    this.items = []
    console.log('[MedicationPage] ionViewDidEnter()');
    let state = history.state?.segment;
    if(state) this.segment = state
    this.segmentChanged()
    this.loadDataDirections()
  }
  async segmentChanged($event?){
    console.log('[MedicationPage] segmentChanged()', this.segment); 
    this.items = []
    switch (this.segment) {
      case 'List':
        await this.loadData()
        break;
      case 'Order':
        await this.loadDataDirections()
        break;

      default:
       
        break;
    }
  }
 

  async saveDirection(){
    this.isLoading = true
      this.dooleService.postAPIsendDirection(this.form.value).subscribe(
        async (res: any)=>{
      console.log('[MedicationPage] saveDirection()', await res);        
 
 
      this.isLoading = false
     },(err) => { 
      this.isLoading = false
        console.log('[MedicationPage] saveDirection() ERROR(' + err.code + '): ' + err.message); 
        throw err; 
    }) ,() => {
      this.isLoading = false
    };     
    }

    submit(){
      console.log('submit',this.form.value);
      this.isSubmitted = true;
      if(this.form.invalid)
      return 

       this.saveDirection()
        
  
    }
    toggleIsFormVisible()
    {
        this.isFormVisible = !this.isFormVisible;
    }

    // confirm(){

    //   this.loading.present();
  
    //   var dict = [];
    //   dict.push({key: "selected_address",value: this.direction.id});
    //   dict.push({key: "order_shipping_method",value: this.sendType});
    //   this.data.post("sendmedication",dict).subscribe(json=>{
    //     this.loading.dismiss();
    //     let alert = this.alertCtrl.create({
    //       title: 'Datos guardados',
    //       subTitle: 'Los datos han sido guardados correctamente',
    //       buttons: [{
    //         text: 'Ok',
    //         handler: data => {
    //           this.navCtrl.pop();
    //         }
    //       }]
    //     });
    //     alert.present();
    //   },error => {
    //     this.loading.dismiss();
    //     let alert = this.alertController.create({
    //       title: 'Error',
    //       subTitle: 'Se ha producido un error al intentar guardar los datos',
    //       buttons: [{
    //         text: 'Ok',
    //         handler: data => {
    //           this.nav.pop();
    //         }
    //       }]
    //     });
    //     alert.present();
    //   });
    // }
  
    selectSendType(){
      this.paso = 2;
    }
  
    selectDirection(address){
        this.direction = address;
        this.paso = 1;
        console.log(this.direction)
        console.log(this.paso)
        return;
    }
  }
  