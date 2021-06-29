import { Component, HostBinding, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { DataStore, ShellModel } from 'src/app/utils/shell/data-store';

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

@HostBinding('class.is-shell') get isShell() {
  return (this.data && this.data.isShell) ? true : false;
}

  constructor(private dooleService: DooleService) { }
  
  ngOnInit() {
    const dataSource = this.dooleService.getAPIallowedContacts();
     // Initialize the model specifying that it is a shell model
     const shellModel: Array<ShowcaseShellUserModel> = [
      new ShowcaseShellUserModel(),
      new ShowcaseShellUserModel()
    ];
    this.dataStore = new DataStore(shellModel);
    // Trigger the loading mechanism (with shell) in the dataStore
    this.dataStore.load(dataSource);

    this.dataStore.state.subscribe(res => {
      console.log('[MedicalDirectoryPage] allowedContacts()', res);
      this.staff = res;
      this.data = res;
    },
    (err) => { 
      console.log('[MedicalDirectoryPage] allowedContacts() ERROR(' + err.code + '): ' + err.message); 
      throw err; 
    });

     }

}
