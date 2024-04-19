import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/config/constants';
import { NativeMarket } from "@capacitor-community/native-market";
import { NativeSettings, AndroidSettings} from 'capacitor-native-settings';
import { Health } from '@awesome-cordova-plugins/health/ngx';
import {Platform } from '@ionic/angular';
import { DooleService } from 'src/app/services/doole.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-google-fit',
  templateUrl: './google-fit.page.html',
  styleUrls: ['./google-fit.page.scss'],
})
export class GoogleFitPage implements OnInit {

  comesFromSettings:any;
  loadingData: boolean = false;

 
  constructor(public platform: Platform, private health: Health, private dooleService: DooleService, public router: Router, private translate: TranslateService,public languageService: LanguageService, private constants: Constants, public authService: AuthenticationService, private alertController: AlertController) { }

  ngOnInit() {
    this.comesFromSettings = history.state.settings;
    console.log(this.comesFromSettings)
  }

  ionWillEnter() {
    this.comesFromSettings = history.state.settings;
    console.log(this.comesFromSettings)
  }

  ionViewDidEnter() {
    this.comesFromSettings = history.state.settings
  }

   redirectHomePage() {
    this.authService.setShowGoogleFitLocalstorage()
    console.log(this.comesFromSettings)
    if (!this.comesFromSettings) {
      this.router.navigate(['home']);
    }
    else {
      this.router.navigate(['profile/settings'])
    }
    
  }

  redirectGoogleFitMarket() {
    NativeMarket.openStoreListing({
      appId: this.constants.googleFitPackageID
    });
  }

  connectGoogleFit() {
      if (this.platform.is("cordova")) {
        this.health
          .isAvailable()
          .then((available: boolean) => {
            this.health.promptInstallFit()
              this.health
              .requestAuthorization([
                {
                  read : ['distance', 'steps', 'heart_rate', 'activity', 'weight', 'blood_glucose'] // Read permission 
                }
              ])
              .then((res) => {
                this.loadingData = true;
                this.authService.setShowGoogleFitLocalstorage()
                this.syncData(30);
                if (!this.comesFromSettings) {
                  this.router.navigate(['home']);
                }
                else {
                  this.router.navigate(['profile/settings'])
                }

              })
              .catch((e) => {
                this.presentAlertConfirm();
                console.log(e);
              });
          })
          .catch((e) => {
            this.presentAlertConfirm();
            console.log(e);
          });
      }
  }


  syncData(days) {
    let startDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
    let endDate = new Date(); // now
    const healthDataTypes = ['steps', 'distance', 'heart_rate', 'weight', 'height', "blood_glucose"];
    let promises = [];

    healthDataTypes.forEach((dataType) => {
      console.log('dataType:', dataType);
      const queryType = dataType === 'steps' || dataType === 'distance' ? 'queryAggregated' : 'query';
      const promise = this.health[queryType]({
        startDate: startDate,
        endDate: endDate,
        dataType: dataType,
        ...(queryType === 'queryAggregated' && { bucket: 'hour' })
      }).then(data => {
        return this.postHealth(dataType, data);
      }).catch(error => {
        console.error(error);
        return error;
      });

      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      setTimeout(() => this.loadingData = false, 500);
    }).catch(error => {
      console.error('Error with one of the health data queries:', error);
    });
  }

  //envia post amb dades de salut a api
  postHealth(type, data) {
    const postData = {
      type: type,
      vals: JSON.stringify(data),
    };
    this.dooleService.post('user/element/sync', postData).subscribe(
      async (data) => {
        console.log("postHealth: ", data);
      },

      (error) => {
        // Called when error
        console.log('error: ', error);
        throw error;
      },
      () => {
        // Called when operation is complete (both success and error)
        // loading.dismiss();
      });
  }

  redirectSettings() {
    NativeSettings.openAndroid({
      option: AndroidSettings.ApplicationDetails,
    });
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      header: this.translate.instant("google-fit.error_msg"),
      buttons: [
        {
          text: this.translate.instant("alert.button_cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: async (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("google-fit.return_home"),
          handler:  () => {
            this.authService.setShowGoogleFitLocalstorage()
            this.router.navigate(['home']);
          }
        }
      ]
    });
    await alert.present();
  }
  
}