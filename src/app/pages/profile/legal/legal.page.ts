import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {
  legal: any = {}
  isLoading = false
  constructor(
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.getInformationLegal()
  }

  getInformationLegal(){
    this.isLoading = true
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LegalPage] getInformationLegal()', await res);
        this.legal = res.legalTerm
        this.isLoading = false
       },(err) => { 
          console.log('[LegalPage] getInformationLegal() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

}
