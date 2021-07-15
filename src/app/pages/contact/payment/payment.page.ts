import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  agenda= history.state?.agenda;
  staff = history.state?.staff;
  add = this.agenda?.online ? 'contact.tap_video' : 'contact.tap_appointment';
  isNewEvent = true;
  constructor(private dooleService: DooleService, private translate: TranslateService, private loadingController: LoadingController,   ) { }

  ngOnInit() {
    console.log('[PaymentPage] agenda = ', this.agenda);
  }

  async addAgenda(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.postAPIaddAgenda(this.agenda).subscribe(
      async (res: any) =>{
        console.log('[PaymentPage] addAgenda()', await res);
        let message = this.translate.instant('reminder.message_added_appointment')
        if(!this.isNewEvent)
        message = this.translate.instant('reminder.message_updated_reminder')
        this.showAlert(message)
        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[PaymentPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/contact')
  }


}
