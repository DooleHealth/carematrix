import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { BLE } from '@awesome-cordova-plugins/ble/ngx';
import { LoadingController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
})
export class DevicesPage implements OnInit {
  devices:any;// = [{'name':'dedede','id':'dededed','advertising':'dedede','rssi':'dededed'},{'name':'dededed','id':'dedededdd','advertising':'dedede','rssi':'dededed'}];
  loaderCtrl:HTMLIonLoadingElement;
  //constructor(private ble: BLE, private ngZone: NgZone,  private translate: TranslateService, private router: Router, public loadingController: LoadingController) { }
  constructor(private ngZone: NgZone,  private translate: TranslateService, private router: Router, public loadingController: LoadingController) { }
  ngOnInit() {
  }

  scan(){
 /*    this.devices = [];
    this.ble.isEnabled().then(
      success => {
        this.presentLoading('buscando')
        this.ble.startScan([]).subscribe(device=> this.onDeviceDiscovered(device),(error)=>{
          alert(JSON.stringify(error))
          this.dismissLoading();
          console.error('error: ', error);
        });
        setTimeout(() => {
          this.ble.stopScan().then(() => { console.log('scan stopped');
        this.dismissLoading() });
        }, 5000);
      },
      error => {
        alert('Bluetooth no disponible, actívalo e intenta de nuevo');
        
  
      }); */
    
  }

  onDeviceDiscovered(device){
    console.log(JSON.stringify(device, null,2))
    this.ngZone.run(() => {
      this.devices.push(device);
    });

  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      console.log(message);
    });
  }

  connect(device){
   /*  this.ble.isEnabled().then(
      success => {
        this.presentLoading('conectando');
        this.ble.connect(device?.id).subscribe((data)=>{
          console.log('connected to: ', JSON.stringify(data));
          this.dismissLoading();
          this.router.navigate(['scan'],{state:{device:device, data:data}});
          
          },(error)=>{ 
            alert(JSON.stringify(error))
            this.dismissLoading();
            console.error('error: ', error);
          });
      },
      error => {
        alert('Bluetooth no disponible, actívalo e intenta de nuevo');
        
      }
      
    ); */
  }

  async presentLoading(action) {

    this.loadingController.create({
      cssClass: 'custom-loading',
      message: action,
      translucent: true,
      backdropDismiss: true
    }).then((loader) => {
      this.loaderCtrl = loader;
      this.loaderCtrl.present();
    });;

  }

  async dismissLoading() {

    if (this.loaderCtrl) {
      this.loaderCtrl.dismiss();
    }
  }

  
  
}

