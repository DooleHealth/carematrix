import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  information: any
  faq: any
  isLoading = false
  constructor(
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    // this.information = '<div class="demo"><b>This is my About Us HTML.</b></div>';
    this.getInformationAboutUs();
  }

  getInformationAboutUs(){
    this.isLoading = true
    this.dooleService.getAPIaboutUs().subscribe(
      async (res: any) =>{
        console.log('[AboutUsPage] getInformationAboutUs()', await res);
        // this.information = res
        this.faq = res.faq
        this.isLoading = false
       },(err) => { 
          console.log('[AboutUsPage] getInformationAboutUs() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

}
