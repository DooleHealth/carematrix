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
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
  checked:true
  petitions : any = [];
  date = Date.now()
  message: string
  messages : any = [];
  directions = [] 
  deliveries = [] 
  isNewEvent = true
  id:any
  isSubmitted = false;
  loading : any;
  directionItems : any;
  form: FormGroup;
  formulario: FormGroup;
  formShipment = new FormGroup({
    sendType: new FormControl('bag19'),
  });

  times = []
  paso : string = 'cero';
  direction : any;
  sendType : any;
  sendTypes : any;
  types: any;
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

    this.formShipment = this.fb.group({
      sendType: [''],
    });

    this.formulario = this.fb.group({
      selected_address : [''],
      order_shipping_method:  [''],
  
    });
  
  }
  ionViewWillEnter() {
    this.loadDataDirections();
    console.log(this.sendType)
    
  }

  loadData(){
    this.isLoading = true;
    console.log('hola');
    this.items = []
    this.dooleService.getAPImedicationsList().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadDataDirections()', await data); 
        if(data){
          this.deliveries = data.petitions
          
          console.log(this.deliveries ); 
       
        }
       },(err) => { 
          console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      }, ()=>{
        this.isLoading = false
      });
 
  }

  loadDataDirections(){
    this.isLoading = true;
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
    console.log('[MedicationPage] ionViewDidEnter() holaaaaaaaaaaaaaaaaaa');
    let state = history.state?.segment;
    if(state) this.segment = state
    this.segmentChanged()
 
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

    confirm(){
      this.isLoading = true
        this.dooleService.postAPImedicationSendPetition(this.formulario.value).subscribe(
        async (res: any)=>{
      console.log('[MedicationPage] postAPImedicationSendPetition()', await res);    
      this.messages = res    
 
      this.isLoading = false
      this.presentAlert();
     },(err) => { 
      this.isLoading = false
        console.log('[MedicationPage] postAPImedicationSendPetition() ERROR(' + err.code + '): ' + err.message); 
        throw err; 
    }) ,() => {
      this.isLoading = false
    };     
    }
  
    selectSendType(){
      this.paso = 'dos';
      this.sendType = this.formShipment.value;
      this.sendTypes = Object.values(this.sendType);
      this.types = this.sendTypes[0];
      this.formulario.get('selected_address').setValue(this.direction.id);
      this.formulario.get('order_shipping_method').setValue(this.types);
      console.log(this.formulario.value)
      console.log(this.direction.id)
      console.log(this.types)
  
    }

  
    async selectDirection(address){
        this.direction = address;
        this.paso = 'uno';
        return;
    }
    async presentAlert() {
      
      this.translate.get('info.button').subscribe(
        async button => {
          // value is our translated string
          const alert = await this.alertController.create({
            cssClass: "alertClass",
            header: this.translate.instant('info.title'),
            // subHeader: 'Subtitle',
            message: this.messages.message,
            buttons: [button]
          });
      
          await alert.present();
        });
      
    }
  }
  