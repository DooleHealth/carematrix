import { Component, HostBinding, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RolesService } from 'src/app/services/roles.service';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store';
import { DateService } from 'src/app/services/date.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { DatePipe, formatDate } from '@angular/common';
import { DooleService } from 'src/app/services/doole.service';
import {  ModalController } from '@ionic/angular';
import { RequestVisitPage } from '../request-visit/request-visit.page';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { PermissionService } from 'src/app/services/permission.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export class ShellRecipientModel extends ShellModel {
  id: string;
  image: string;
  name: string;

  constructor() {
    super();
  }
}
export class ShellMessageModel extends ShellModel {
  content: string;
  created_at: string;
  deleted_at: string;
  file: string;
  id: number;
  message_header_id: number;
  mime: string;
  temporaryUrl: string;
  updated_at: string;
  user_id: number;
  recipients: ShellRecipientModel[];

  constructor() {
    super();
  }
}

export class ShellChatModel extends ShellModel {
  messages: ShellMessageModel[];

  constructor() {
    super();
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  numMessages: number;
  chat: ShellChatModel[] & ShellModel;
  m: ShellChatModel;
  r: Array<ShellRecipientModel>;
  dataStore: DataStore<Array<ShellChatModel>>;
  data: Array<ShellChatModel> & ShellModel;
  routeResolveData: ShellChatModel[];
  myDate: String = new Date().toISOString();
  isLoading: boolean = false
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }

  segment = 'chat';
  appointment: any[];
  departments: any[];

  constructor(
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private translate: TranslateService,
    public role: RolesService,
    private datePipe: DatePipe,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,
    private dateService: DateService,
    private languageService: LanguageService,
    private callService: CallNumber,
    private sanitizer: DomSanitizer,
    public permissionService: PermissionService) { }

  ngOnInit() {
    TextToSpeech.stop();
    this.setSegment()
    this.segmentChanged()
  }

  ionViewWillEnter() {
    this.setSegment()
    this.segmentChanged()
  }

  setSegment() {
    if (!this.role?.component?.agenda) {
      this.segment = 'chat'
      if (!this.role?.component?.chat) {
        this.segment = ''
      }
    }

  }

  goMedicalDirectory(isOnline) {
    localStorage.setItem('isOnline-contact', isOnline);
    this.router.navigate([`medical-directory`], { state: { isOnline: isOnline } });
  }

  segmentChanged(event?) {

    this.isLoading = true;
    switch (this.segment) {
      case 'chat':
       this.getAllChat()
        break;

      case 'medical-visits':
        this.getallAgenda()
        break;

      case 'my-centers':
        this.getAPIallowedDepartments();
        break;

      default:
        break;

    }

    // Fix to Focus on the selected segment
    console.log("event: ", event);
    setTimeout(() => {
      if (event) {
        const s = event.target.getBoundingClientRect();
        const sw = (s.right - s.left);
        for (const button of event.target.childNodes) {
          if (button.className?.indexOf('segment-button-checked') > -1) {
            const bc = button.offsetLeft + (button.offsetWidth / 2);
            const diff = bc - (sw / 2);
            event.target.scrollTo({
              left: diff,
              behavior: 'smooth'
            });
            break;
          }
        }
      }
    }, 200);
  }


  showMessage(message) {
    if (message?.content)
      return message.content
    else if (message?.file)
      return this.translate.instant('chat.attached_file')
    else return ''
  }

  formatDate(date) {

    return this.dateService.formatDate(date)

  }

  transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }

  isToday(mDate: Date) {
    let date = new Date()
    if (date.getDate() === mDate.getDate() && date.getMonth() === mDate.getMonth() && date.getFullYear() === mDate.getFullYear())
      return true
    return false
  }

async getAllChat(){
  this.isLoading = true;
  const dataSource = this.dooleService.getAPIUserMessages();
  const shellModel: Array<ShellChatModel> = [
    new ShellChatModel(),
    new ShellChatModel()
  ];
  this.dataStore = new DataStore(shellModel);
  this.dataStore.load(dataSource);
  this.dataStore.state.subscribe(res => {
    console.log('[ChatPage] getAPIUserMessages()', res);
    this.chat = res;
    this.data = res;
    console.log(this.data);
    console.log(this.myDate);
    setTimeout(() => {
      this.isLoading = false;
  }, 900);
  },
    (err) => {
      this.isLoading = false;
      console.log('[ChatPage] getAPIUserMessages() ERROR(' + err.code + '): ' + err.message);
      throw err;
    });
}

  async getallAgenda() {

    this.isLoading = true;
    let date = this.transformDate(Date.now(), 'yyyy-MM-dd')

    try {
      const params = { from_date: date, to_date: null, with_medical_procedures: 0, filter_by_date: 1, order: 1 };
      console.log('[HomePage] getallAgenda() init', params, date);

      const res: any = await new Promise((resolve, reject) => {
        this.dooleService.getAPIallAgenda(params).subscribe(
          (data: any) => {
            console.log('[HomePage] getallAgenda()', data);
            resolve(data);
          },
          (error) => {
            console.log('[HomePage] getallAgenda() ERROR(' + error.code + '): ' + error.message);
            alert('ERROR(' + error.code + '): ' + error.message);
            reject(error);
          }
        );
      });

      if (res.agenda) {
        this.appointment = res.agenda;
      }
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching agenda:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  checkAppointmentsNoStaff(){
    return this.appointment.every(appointment => appointment.staff.length === 0);
  }


  async getAPIallowedDepartments() {
    this.isLoading = true
    this.dooleService.getAPIallowedDepartments().subscribe(
      async (res: any) => {
        this.departments = []
        console.log('[ContactPage] getdepartments(', await res);
        this.departments = res.departments
        this.isLoading = false
        console.log(this.departments);
      }, async (err) => {
        alert(`Error: ${err.code}, Message: ${err.message}`)
        console.log('[ContactPage]  getdepartments( ERROR(' + err.code + '): ' + err.message);
        this.isLoading = false
        throw err;
      });
  }


  formatSelectedDate(date) {
    let language = this.languageService.getCurrent();
    const datePipe: DatePipe = new DatePipe(language);
    return datePipe.transform(date, 'EEEE, d MMMM, HH:mm');
  }

  requestVisit() {
    this.router.navigate([`request-visit`]);
  }

  callNumber(phone:string) {
    this.callService.callNumber(""+phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  sanitizeUrl(url:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  emergencyCall(){
    //recuperar valor numero general
    
    let num=this.authService.emergencyNumber;
    console.log('[ContactPage] emergencyCall()', num);
    this.callService.callNumber(""+num, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
