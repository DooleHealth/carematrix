import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { ViewChild } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonicSlides, LoadingController, ModalController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DrugAddPage } from '../drug-add/drug-add.page';
import { DrugsDetailPage } from '../drugs-detail/drugs-detail.page';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AddAddressPage } from './add-address/add-address.page';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  @Input()event: any;
  segment = history.state?.segment ? history.state.segment : 'Order';
  items = []
  items2 = []
  isLoading:boolean = true
  //isFormVisible:boolean = false
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
  loadingList : any;
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
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postal_code: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.formShipment = this.fb.group({
      sendType: ['urgente10'],
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
    this.loadingList = true;
    console.log('hola');
    this.items = []
    this.dooleService.getAPImedicationsList().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadData()', await data);
        if(data){
          this.deliveries = data.petitions

          console.log(this.deliveries);

        }
       },(err) => {
          console.log('[MedicationPage] loadData() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      }, ()=>{
        this.loadingList = false
      });

  }

  loadDataDirections(){
    this.isLoading = true;
    this.dooleService.getAPIdirectionsList().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadDataDirections()', await data);
        if(data){
          this.directions = []
          this.directions = data
          this.directions .sort(function(a,b){
            return b.created_at.localeCompare(a.created_at);
          })
          // this.isSubmittedFields(false)
          // this.form.reset()
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


  async deleteDirection(address){
      this.dooleService.deleteAPIsendDirection(address.id).subscribe(
        async (res: any)=>{
      console.log('[MedicationPage] deleteDirection()', await res);
         // if(res.result){
            this. loadDataDirections()
            this.notification.displayToastSuccessful()
          //}
     },(err) => {
        console.log('[MedicationPage] deleteDirection() ERROR(' + err.code + '): ' + err.message);
        throw err;
    }) ,() => {
      this.isLoading = false
    };
    }

    confirm(){
      this.isLoading = true
      this.segment = "List"
      this.segmentChanged()
      this.isLoading = false
      this.notification.displayToastSuccessful()
      this.loadDataDirections();
      this.paso = 'cero';
      return
        this.dooleService.postAPImedicationSendPetition(this.formulario.value).subscribe(
        async (res: any)=>{
           console.log('[MedicationPage] postAPImedicationSendPetition()', await res);
            this.messages = res
            this.isLoading = false
            this.segment = "List"
            this.segmentChanged()
            this.notification.displayToastSuccessful()
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

    async addAddress(address?){
      const modal = await this.modalCtrl.create({
        component: AddAddressPage,
        componentProps: {address: address },
        cssClass: "modal-custom-class"
      });

      modal.onDidDismiss()
        .then((result) => {
          if(result?.data['action'] === 'add' || result?.data['action'] === 'update'){
            this.segment = 'Order'
            this.segmentChanged()
            this.notification.displayToastSuccessful()
           }
          if(result?.data['error']){
          //TODO: handle error message
          }
      });
      await modal.present();
    }

    deleteAddress(address){
      console.log('[MedicationPage] deleteAddress() ');
    }


  }
