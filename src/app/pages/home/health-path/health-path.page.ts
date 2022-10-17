import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
declare var LeaderLine: any;

@Component({
  selector: 'app-health-path',
  templateUrl: './health-path.page.html',
  styleUrls: ['./health-path.page.scss'],
})
export class HealthPathPage implements OnInit, AfterViewInit {
  fetching = true;
  challenge = history.state?.challenge;
  current_level:any;
  progressBarValue = this.challenge?.current_level?.percentage_completed > 0 ? this.challenge?.current_level?.percentage_completed/100:0;
  levels = [];
  handlerMessage = '';
  roleMessage = '';
  constructor(private alertController: AlertController, public translate: TranslateService, private dooleService: DooleService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  ionViewWillEnter() {
   
    this.getChallenge();

  }

  ionViewDidEnter() {

  }

  async presentAlert() {

    let message = '';

    const alert = await this.alertController.create({

      message: this.translate.instant('health_path.blocked_level'),
      buttons: [
        {
          text: this.translate.instant('info.button'),
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

  }

  getChallenge() {

    this.dooleService.getAPIChallenge(this.challenge?.id).subscribe(
      async (res: any) => {

        await res;
        console.log('getAPIChallenge: ', res);
        this.challenge = res?.challenge;
        this.current_level= res?.current_level;
        if(res?.levels?.length > 0){
          console.log('levels', await res?.levels);
          this.levels = res?.levels;
        }
        
        this.fetching = false;
        console.log('FETCHING: ', this.fetching);
        this.changeDetectorRef.detectChanges();
      
      }, (err) => {
        console.log('[HealthPathPage] getAPIChallenge() ERROR(' + err.code + '): ' + err.message);
        throw err;
      }), () => {

      };
  }



}
