import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input('title') title: string;
  @Input('info') info: string;
  constructor(public translate: TranslateService, public alertController: AlertController) { }

  ngOnInit() {}

  async presentAlert() {
      
    this.translate.get('form.info.button').subscribe(
      async button => {
        // value is our translated string
        const alert = await this.alertController.create({
          cssClass: "alertClass",
          header: this.translate.instant('form.info.title'),
          message: this.info,
          buttons: [button]
        });
    
        await alert.present();
      });
    
  }

}
