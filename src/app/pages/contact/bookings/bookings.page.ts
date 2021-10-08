import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';
import { MedicalCalendarPage } from '../medical-calendar/medical-calendar.page';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  staff = history.state.staff;
  staffId = this.staff?.id
  selectedDate: string;
  files: Array<{ name: string, file: any, type: string }> = [];
  @ViewChild('uploadFile') uploadFile: FileUploadComponent;
  form: FormGroup;
  dateMax:any;
  duration:string = "30";
  isSubmittedTitle = false;
  isSubmittedDuration = false;
  isSubmittedStartDate = false;
  isLoading = false
  constructor(public dooleService:DooleService, private nav: NavController, private actionSheetCtrl: ActionSheetController,  private translate: TranslateService,  
    public datepipe: DatePipe,  private loadingController: LoadingController,  private fb: FormBuilder, private modalCtrl: ModalController, private chooser: Chooser,
    public file: File, private router: Router, private notification: NotificationService,  private analyticsService: AnalyticsService) { 
      // this.analyticsService.setScreenName('booking','[BookingsPage]')
    }
  ngOnInit() {
   
    this.form = this.fb.group({
      place: [''],
      title: [''],
      user_comments: [''],
      date: ['', [Validators.required]],
      duration: [this.duration],
      indications: [],
      // file:[this.images],
      online:[history.state.isOnline]
    });
    this.setTitle()
  }

  setTitle(){
    let messagge = this.translate.instant('appointment.field_specially')+': '+ this.staff?.name
    this.form.get('title').setValue(messagge)
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
  }

  trasnforHourToMinutes(time): any{
    let hour = time.split(':');
    return (Number(hour[0]))*60 + (Number(hour[1]))  }

  async addAgenda(){
    console.log(`[AgendaAddPage] addAgenda()` );
    this.isLoading = true
    this.dooleService.postAPIaddAgenda(this.form.value).subscribe(
      async (res: any) =>{
        console.log('[BookingsPage] addAgenda()', await res);  
        if(res.success){
          // this.analyticsService.logEvent('create_agenda', res)   
          if(!this.uploadFile.isEmptyFiles()){
            this.uploadFile.uploadFiles(res.agenda.id, 'Agenda').subscribe(res =>{
              if(res.success){
                this.nav.navigateForward('/agenda', { state: {date: this.form.get('date').value} });
                this.notification.displayToastSuccessful()
              }
              else{
                  let message = this.translate.instant('bookings.error_upload_files')
                  alert(message)
              }
            })
          } else{
            this.nav.navigateForward('/agenda', { state: {date: this.form.get('date').value} });
            this.notification.displayToastSuccessful()
          }
        }
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          console.log('[BookingsPage] addAgenda() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      }) ,() => {
        // Called when operation is complete (both success and error)
        this.isLoading = false
      };     
  }
  isSubmittedFields(isSubmitted){
    this.isSubmittedTitle = isSubmitted;
    this.isSubmittedDuration= isSubmitted;
    this.isSubmittedStartDate= isSubmitted;
  }


  async submit() {
    console.log('[BookingsAddPage] submit()', this.form.value );
    this.isSubmittedFields(true);
    if(this.form.invalid)
      return 
   
    this.addAgenda()
    
  }

  async openCalendarModal() {
    const modal = await this.modalCtrl.create({
      component: MedicalCalendarPage,
      componentProps: { id: this.staffId },
    });

    modal.onDidDismiss()
      .then((result) => {
        if(result.data['date']){
          this.selectedDate = result.data['date']; 
          this.form.patchValue({date: this.transformDate(this.selectedDate)})
          console.log("openCalendarModal() selectedDate: ", this.selectedDate);
        }
    });

    await modal.present();
  }
  

  async payment(){
    console.log(`[AgendaAddPage] payment()` );
    this.isSubmittedFields(true);
    if(this.form.invalid)
      return 
  
    this.files = this.uploadFile.files

    this.router.navigate(['bookings/payment'],{state:{agenda:this.form.value, staff:this.staff, files: this.files}});
    
  }
//  navigateDoctors() {
//     return this.router.navigate(['/doctors'],{state:{staff:this.staff}});;
   
//   }
}
