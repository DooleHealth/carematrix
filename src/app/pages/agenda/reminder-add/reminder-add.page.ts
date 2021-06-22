import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.page.html',
  styleUrls: ['./reminder-add.page.scss'],
})
export class ReminderAddPage implements OnInit {
  form: FormGroup;
  dateMax:any;
  isSubmittedPlace = false;
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  id:any
  event:any
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private dooleService: DooleService,
    private translate : TranslateService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    let year = (new Date(Date.now()).getFullYear()) + 1
    this.dateMax =  year
    this.form = this.fb.group({
      place: [],
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      description: [],
    });
    this.getAppointment()
  }

  getAppointment(){
    this.id = history.state.id;
    if(this.id){
      this.event = history.state.event;
      console.log('[ReminderAddPage] getAppointment()', this.event);
      if(this.event.site) this.form.get('place').setValue(this.event.site)
      if(this.event.title) this.form.get('title').setValue(this.event.title)
      if(this.event.startTime) this.form.get('date').setValue(this.event.startTime)
      if(this.event.endTime) this.form.get('duration').setValue(this.event.endTime)
    }
  }

  isSubmittedFields(isSubmitted){
    this.isSubmittedPlace = isSubmitted
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDuration= isSubmitted;
    this.isSubmittedStartDate= isSubmitted;
  }

  async addAgenda(){
    const loading = await this.loadingController.create();
    await loading.present();

    let date = this.form.get('date').value 
    let data_prestacio = this.datepipe.transform(date, "yyyy-MM-dd HH:mm:ss");
    this.form.get('date').setValue(data_prestacio);
    console.log(`[AgendaAddPage] addAgenda()`,this.form.value );

    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[ReminderAddPage] addAgenda()', await res);


        loading.dismiss();
       },(err) => { 
        loading.dismiss();
          console.log('[ReminderAddPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        loading.dismiss();
      };
  }

  showAlert(){
    let messagge = this.translate.instant('documents_add.alert_message')
    let header = this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,messagge,false, '/app/tracking')
  }

  async submit() {
    console.log('[ReminderAddPage] submit()', this.form.value );
    this.isSubmittedFields(true);
    if(this.form.invalid)
    return 
    this.addAgenda()
    
  }
}
