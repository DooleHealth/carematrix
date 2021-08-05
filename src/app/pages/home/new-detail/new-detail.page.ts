import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-new-detail',
  templateUrl: './new-detail.page.html',
  styleUrls: ['./new-detail.page.scss'],
})
export class NewDetailPage implements OnInit {
  id : any;
  isLoading = false
  new : any = {};
  constructor(
    private dooleService: DooleService,
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getDetailNew();
  }

  async getDetailNew(){
    console.log('[DiaryPage] getDetailNew()');
    this.isLoading = true
    this.dooleService.getAPIdetailNew( this.id).subscribe(
      async (json: any) =>{
        console.log('[DiaryPage] getDetailNew()', await json);

        this.new=json.news;


        this.isLoading = false
       },(err) => {
          console.log('[DiaryPage] getDetailNew() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false
          throw err;
      });
  }

}
