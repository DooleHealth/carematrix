import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  agenda= history.state?.agenda;
  staff = history.state?.staff;
  files = history.state?.files;
  selectedDate = history.state?.selectedDate;
  add = this.agenda?.online ? 'contact.tap_video' : 'contact.tap_appointment';
  isLoading = false
  constructor(private dooleService: DooleService, private translate: TranslateService, private loadingController: LoadingController,  private notification: NotificationService, private nav: NavController, public datepipe: DatePipe) { }

  ngOnInit() {
    console.log('[PaymentPage] agenda = ', this.agenda);
  }

  async addAgenda(){
    this.isLoading = true
    let agenda = this.agenda;
    if(agenda?.date) agenda.date = this.transformDate(this.selectedDate,  'yyyy-MM-dd HH:mm:ss')
    this.dooleService.postAPIaddAgenda(agenda).subscribe(
      async (res: any) =>{
        console.log('[PaymentPage] addAgenda()', await res);
        if(res.success){
          if(this.files.length >0){
            let n: any = [];
            let f: any = [];
            this.files.forEach(element => {
              f.push(element.file)
              n.push(element.name);
            });
        
            let params = {
              'model': 'Agenda',
              'id':  res.agenda.id,
              'file': f,
              'name': n
            }
            this.dooleService.postAPIAddMedia(params).subscribe(res =>{
              if(res.success){
                let date = agenda.date
                this.nav.navigateForward('/agenda', { state: {date: date} });
                this.notification.displayToastSuccessful()
              }else{
                let message = this.translate.instant('documents_add.error_alert_message')
                alert(message)
              }
            })
          }else{
            let date = agenda.date
            this.nav.navigateForward('/agenda', { state: {date: date} });
            this.notification.displayToastSuccessful()
          }
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[PaymentPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };
  }

  showAlert(message){
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, '/contact')
  }

  transformDate(date, format) {
    return this.datepipe.transform(date, format);
  }


}
