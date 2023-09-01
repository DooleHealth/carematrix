import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  
})

export class PageHeaderComponent implements OnInit {
  @Input('title') title: string;
  @Input('icon') icon: string;
  @Input('info') info: string;

  constructor(public translate: TranslateService, public alertController: AlertController) { }

  ngOnInit(

  ) {}

  async presentAlert() {
    
    this.translate.get('success.button').subscribe(
      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: this.translate.instant('Information'),
          // subHeader: 'Subtitle',
          message: this.info,
          buttons: [button]
        });
    
        await alert.present();
      });
    
  }
}
