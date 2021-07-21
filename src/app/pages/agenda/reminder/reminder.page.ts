import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  id:any
  event = []
  reminder = {}
  frequency = ''
  constructor(
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private languageService: LanguageService,
    private translate : TranslateService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id){
      this.event = history.state.event;
      console.log('[ReminderPage] ngOnInit()', this.event);
      this.getReminderData()
    }
  }


  async getReminderData(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIreminderID(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderPage] getReminderData()', await res);
        if (res.reminder) {
          this.reminder = res.reminder
          this.selectedFrequency(res.reminder?.frequency)
        }

        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderPage] getReminderData() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  formatSelectedDate(date){
    let language = this.languageService.getCurrent()
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM yyyy, HH:mm');
    //return day[0].toUpperCase() + day.slice(1);
  }

  selectedFrequency(frequency){
    switch (frequency) {
      case 'day':
        this.frequency = this.translate.instant('Un día');
        break;
      case 'daily':
        this.frequency = this.translate.instant('Diario');
        break;
      case 'mom_fri':
        this.frequency = this.translate.instant('Lun a Vie');
        break;

      default:
        this.frequency = this.translate.instant('Diario');
        break;
    }
  }

/*   trasnforHourToMinutes(time): any{
        let hour = time.split(':');
        return (Number(hour[0]))*60 + (Number(hour[1]))
  } */

  

}
