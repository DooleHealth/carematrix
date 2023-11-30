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

import { NotificationsType } from 'src/app/shared/classes/notification-options';
import { LifeStyle } from 'src/app/models/shared-care-plan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  @Input()event: any;
  items = []
  isLoading:boolean = true
  id:any
  isSubmitted = false;
  loading : any;
  loadingList : any;

  public exerLifeStyle:LifeStyle
  constructor(
    private dooleService: DooleService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    private router: Router

  ) {
    this.exerLifeStyle = new LifeStyle( NotificationsType.MEDICATIONS, "medication")
  }

  ngOnInit() {
    console.log("mostrar")
   this.loadData()
  }


 async loadData(){
    console.log('hola');
    this.items = []
    this.dooleService.getAPImedicationAlls().subscribe(
      async (data: any) =>{
        console.log('[MedicationPage] loadData()', await data);
        if(data){

          this.items = this.exerLifeStyle.adapterForView(
            data.medication, // JSON
            'cover',  //img
            'name',   //title
            'id')     //id
         }
          //saber como vendrian los datos de los medicamentos para poder enviarlos a la vista
        //  this.items = data.petitions

         // console.log(this.deliveries);
        
       },(err) => {
          console.log('[MedicationPage] loadData() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err;
      }, ()=>{
        this.loadingList = false
      });

  }

  
  goTo(){  
    console.log("prueba") 
    this.router.navigate(['/medication-details']);
    //this.router.navigate(['/medication-details']);
}

    async presentAlert() {

      this.translate.get('info.button').subscribe(
        async button => {
          // value is our translated string
          const alert = await this.alertController.create({
            cssClass: "alertClass",
            header: this.translate.instant('info.title'),
            // subHeader: 'Subtitle',
            //message: this.messages.message,
            buttons: [button]
          });

          await alert.present();
        });

    }

   



  }
