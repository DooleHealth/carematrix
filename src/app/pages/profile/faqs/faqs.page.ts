import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  listFaqs: any;
  constructor(
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.listFaqs = '<div class="demo"><b>This is my Legal HTML.</b></div>';
    //this.getFaqs()
  }


  getFaqs(){
    this.dooleService.getAPIFaqs().subscribe(
      async (res: any) =>{
        console.log('[FaqsPage] getFaqs()', await res);
        this.listFaqs = res
       },(err) => { 
          console.log('[FaqsPage] getFaqs() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

}
