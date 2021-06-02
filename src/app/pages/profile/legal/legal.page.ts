import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {
  information: any
  constructor(
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.information = '<div class="demo"><b>This is my Legal HTML.</b></div>';
    //this.getInformationLegal()
  }

  getInformationLegal(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LegalPage] getInformationLegal()', await res);
        this.information = res
       },(err) => { 
          console.log('[LegalPage] getInformationLegal() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

}
