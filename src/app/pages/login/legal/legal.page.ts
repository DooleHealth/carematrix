import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { LegalInformation } from 'src/app/models/legal-information';
import { DooleService } from 'src/app/services/doole.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {
  KEY_LOCAL_STORAGE = 'showIntro';
  legal: LegalInformation;
  isChecked = false;
  constructor(
    public router: Router,    
    private translate: TranslateService,
    private dooleService: DooleService) { }

  ngOnInit() {
    this.getLegalInformation()
  }

  getLegalInformation(){
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LegalPage] getAPILegalInformation()', await res);
        this.legal = res as LegalInformation
        //this.showInformation()
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  acceptLegalConditions(){
      this.sendLegalConformation()
  }

  sendLegalConformation(){
    this.dooleService.postAPILegalConfirmation(this.isChecked).subscribe(
    async (res: any) =>{
      console.log('[LegalPage] sendLegalConformation()', await res);
      let legal = (res as any).success
      if(legal){
        this.saveStorage()
      }

     },(err) => { 
        console.log('getAll ERROR(' + err.code + '): ' + err.message); 
        throw err; 
    });
  }

  async saveStorage(){
    Storage.get({key: this.KEY_LOCAL_STORAGE}).then((data)=>{
      //console.log(`[IntroPage] ngOnInit()`,data.value.toString());
      let  showIntro = Boolean(data.value)
      if(showIntro){
        console.log(`[IntroPage] ngOnInit() localStorage`,showIntro);
              this.router.navigate(['/home/initial']);
      }else{
        this.router.navigate(['/intro']);
      }
    })
  }


}
