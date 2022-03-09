import { Component, HostBinding, OnInit,Inject, LOCALE_ID } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store';
import { DatePipe, formatDate } from '@angular/common';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';



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
  recipients:ShellRecipientModel[];
  
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
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  numMessages:number;
  chat: ShellChatModel[] & ShellModel;
  m:ShellChatModel;
  r:Array<ShellRecipientModel>;
  dataStore: DataStore<Array<ShellChatModel>>;
  data: Array<ShellChatModel> & ShellModel;
  routeResolveData: ShellChatModel[];
  myDate: String = new Date().toISOString();
  isLoading:boolean = true
  @HostBinding('class.is-shell') get isShell() {
    return (this.data && this.data.isShell) ? true : false;
  }

  constructor(
  private dooleService:DooleService, 
  public authService: AuthenticationService, 
  @Inject(LOCALE_ID) private locale: string,
  private translate: TranslateService, 
  private languageService: LanguageService,) { }

  ngOnInit(){

  }

  ionViewWillEnter() {

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