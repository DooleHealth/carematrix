import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  faq: any;
  isLoading = false
  constructor(
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    //this.faq = '<div class="demo"><b>This is my FAQ HTML.</b></div>';
    this.getFaqs()
  }


  getFaqs(){
    this.isLoading = true
    this.dooleService.getAPIFaqs().subscribe(
      async (res: any) =>{
        console.log('[FaqsPage] getFaqs()', await res);
        if(res.success)
        this.faq = res.faq
        this.isLoading = false
       },(err) => { 
        this.isLoading = false
          alert( 'ERROR(' + err.code + '): ' + err.message)
          console.log('[FaqsPage] getFaqs() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

}
