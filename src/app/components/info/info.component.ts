import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  @Input('title') title: string;
  // @Input('icon') icon: string;
  @Input('info') info: string;
  // info: string;

  constructor(public translate: TranslateService, public alertController: AlertController) { }


  ngOnInit(

    ) {}
  
    async presentAlert() {
      
      this.translate.get('info.button').subscribe(
        async button => {
          // value is our translated string
          const alert = await this.alertController.create({
            cssClass: "alertClass",
            header: (this.title)? this.title : this.translate.instant('info.title'),
            // subHeader: 'Subtitle',
            message: this.info,
            buttons: [button]
          });
      
          await alert.present();
        });
      
    }
  }
  