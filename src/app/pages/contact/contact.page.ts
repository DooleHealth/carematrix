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
  isLoading: boolean = true
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }

  segment = 'chat';
  constructor(
    private dooleService: DooleService,
    public authService: AuthenticationService,
    private translate: TranslateService,
    public role: RolesService,
    private datePipe: DatePipe,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,
    private dateService: DateService) { }

  ngOnInit() {
    this.setSegment()
  }

  ionViewWillEnter() {
    this.setSegment()
  }

  setSegment() {
    if (!this.role?.component?.agenda) {
      this.segment = 'chat'
      if (!this.role?.component?.chat) {
        this.segment = ''
      }
    }

    if (this.segment === 'chat') {
      const dataSource = this.dooleService.getAPIUserMessages();
      // Initialize the model specifying that it is a shell model
      const shellModel: Array<ShellChatModel> = [
        new ShellChatModel(),
        new ShellChatModel()
      ];
      this.dataStore = new DataStore(shellModel);
      // Trigger the loading mechanism (with shell) in the dataStore
      this.dataStore.load(dataSource);
      this.dataStore.state.subscribe(res => {
        console.log('[ChatPage] getAPIUserMessages()', res);
        this.chat = res;
        this.data = res;
        console.log(this.data);
        console.log(this.myDate);
        this.isLoading = false;
      },
        (err) => {
          this.isLoading = false;
          console.log('[ChatPage] getAPIUserMessages() ERROR(' + err.code + '): ' + err.message);
          throw err;
        });
    }
  }

  goMedicalDirectory(isOnline) {
    localStorage.setItem('isOnline-contact', isOnline);
    this.router.navigate([`medical-directory`], { state: { isOnline: isOnline } });
  }

  segmentChanged(event?) {

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


  showMessage(message){
    if(message?.content)
     return message.content
    else if(message?.file)
      return this.translate.instant('chat.attached_file')
    else return ''
}

formatDate(date){

  return this.dateService.formatDate(date)

}

transformDate(date, format) {
  return this.datePipe.transform(date, format);
}

isToday(mDate: Date){
  let date = new Date()
  if(date.getDate() === mDate.getDate() && date.getMonth() === mDate.getMonth() && date.getFullYear() === mDate.getFullYear())
    return true
  return false
}
}
