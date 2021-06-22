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
  reminder = []
  constructor(
    private loadingController: LoadingController,
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    //console.log('[ReminderPage] ngOnInit()', this.event);
    if(this.id){
      this.event = history.state.event;
      console.log('[ReminderPage] ngOnInit()', this.event);
    }
    this.getReminderData()
  }


  async getReminderData(){
    const loading = await this.loadingController.create();
    await loading.present();
    this.dooleService.getAPIagendaID(this.id).subscribe(
      async (res: any) =>{
        console.log('[ReminderPage] getReminderData()', await res);
        if (res.agenda) {
          this.reminder = res.agenda
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

  

}
