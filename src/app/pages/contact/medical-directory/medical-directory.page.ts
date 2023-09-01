import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DooleService } from 'src/app/services/doole.service';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store'; 
import { ActivatedRoute } from '@angular/router';
export class ShowcaseShellUserModel extends ShellModel {
  id: string;
  name: string;
  image: string;
  type: string;
  
  constructor() {
    super();
  }
}
@Component({
  selector: 'app-medical-directory',
  templateUrl: './medical-directory.page.html',
  styleUrls: ['./medical-directory.page.scss'],
})

export class MedicalDirectoryPage implements OnInit {
staff : any;
dataStore: DataStore<Array<ShowcaseShellUserModel>>;
data: Array<ShowcaseShellUserModel> & ShellModel;
isChat:boolean;
isLoading = false
@HostBinding('class.is-shell') get isShell() {
  return (this.data && this.data.isShell) ? true : false;
}

  constructor(private dooleService: DooleService, private router: Router) { }
  
  ngOnInit() {
    this.isLoading = true
    this.isChat = history.state?.isChat;
    const dataSource = this.dooleService.getAPIallowedContacts();
     // Initialize the model specifying that it is a shell model
     const shellModel: Array<ShowcaseShellUserModel> = [
      new ShowcaseShellUserModel(),
      new ShowcaseShellUserModel()
    ];
    this.dataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.dataStore.load(dataSource)
    this.dataStore.state.subscribe(res => {
      console.log('[MedicalDirectoryPage] allowedContacts()', res);
      if(!res.isShell){
        this.staff = res;
       // this.data = res;
      }
      this.isLoading = false
    },
    (err) => { 
      this.isLoading = false
      console.log('[MedicalDirectoryPage] allowedContacts() ERROR(' + err.code + '): ' + err.message); 
      throw err; 
    });
  }

    redirect(staff){
      console.log('[MedicalDirectoryPage] redirect() ', staff); 
      if(this.isChat){
        this.router.navigate(['/contact/chat/conversation'],{state:{staff:staff, chat:staff.message_header_id}})
      }else{
        this.router.navigate(['bookings'], {state:{staff:staff, isOnline:history.state.isOnline}});
      }
    }

}
