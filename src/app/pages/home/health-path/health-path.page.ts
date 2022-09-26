import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
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
  progressBarValue = this.challenge?.current_level?.percentage_completed>0 ? this.challenge?.current_level?.percentage_completed/100:0;
  currentPath = {
    "game": "El camino a la salud",
    "level": "Aprend de la meva malaltia cardíaca",
    "score": "Tienes 30 healthies consigue 15 más y pasa al siguiente nivel",
    "goal": 40
  };
  public f = [2, 5, 8, 11];
  levels = [];
  handlerMessage = '';
  roleMessage = '';
  constructor(private alertController: AlertController, public translate: TranslateService, private dooleService: DooleService, @Inject(DOCUMENT) private document: Document,) { }

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

        if(res?.levels?.length > 0){
          console.log('levels', await res?.levels);

          let dashboard = [];
          const colRowNumber = 3;
          for (let i = 0; i < res?.levels.length; i += colRowNumber) {
  
            const row = res?.levels.slice(i, i + colRowNumber);
            if ((i % 2) == 0) {
  
              row.forEach((element, index) => {
  
                if (index == 0)
                  element['class'] = 'pill-first-even';
                else if (index == 2)
                  element['class'] = 'pill-last-even';
                else
                  element['class'] = 'pill';
  
                console.log('push,index ', element, index);
                dashboard.push(element);
              })
            } else {
              const rowCopy = row;
              let reversedRow = rowCopy.reverse();
  
              reversedRow.forEach((element, index) => {
  
                if (index == 0)
                  element['class'] = 'pill-first-odd';
                else if (index == 2)
                  element['class'] = 'pill-last-odd';
                else
                  element['class'] = 'pill';
  
                console.log('push reversed ,index ', element, index);
                dashboard.push(element);
              })
            }
          }
          console.log('levels fixed', dashboard);
          this.levels = dashboard;
        }
        
        this.fetching = false;

      }, (err) => {
        console.log('[HealthPathPage] getAPIChallenge() ERROR(' + err.code + '): ' + err.message);
        throw err;
      }), () => {

      };
  }

}
