import { Component, OnInit } from '@angular/core';
import { FakeBackendInterceptor } from 'src/app/interceptors/fake-backend.interceptor';
import { LifeStyle } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.page.html',
  styleUrls: ['./testimonials.page.scss'],
})
export class TestimonialsPage implements OnInit {

  public items= [];
  // itemsBackup= []
  // news = []
  contents = [];
  isLoading = false;
  segmet= "testimonials-detail";
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    public fakeBackend: FakeBackendInterceptor
  ) { 
     
  }

  ngOnInit() {
    this.getNewsTestimonial()
  }


  async getNewsTestimonial(){
    console.log('[NewsPage] getNewsList()');
    this.items = []
    this.isLoading = true
    let  params={
      tags:1,
      interactions:1,
      readingTime:1
    }
   this.dooleService.getAPIlistTestimonials(params).subscribe(
      async (res: any) =>{
        console.log('[TestimonailsPage] getTestimonialsList()', await res);
        if(res.testimonials)
       // this.adapterForView(res.news)
        this.items = res.testimonials
        console.log('[TestimonailsPage] getTestimonialsList(content)', this.items);
        this.isLoading = false
       },(err) => {
          console.log('[NewsPage] getNewsList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)
          this.isLoading = false
          throw err;
      });
  }
  filterListTertimonials(event) {
    
    const searchTerm = event.srcElement.value.toLowerCase(); 
    let search = this.items
    const filteredItems = search.filter(item => {
      const subject = item.subject.toLowerCase();
      return subject.includes(searchTerm) || subject === searchTerm;
    });
      this.items = (filteredItems)
  };
}
