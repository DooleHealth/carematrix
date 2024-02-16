import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-diets',
  templateUrl: './diets.page.html',
  styleUrls: ['./diets.page.scss'],
})
export class DietsPage implements OnInit {

  public items= [];
  pushNotification:any = history.state.data;
  isLoading = false
  constructor(
    private dooleService: DooleService,
    public role: RolesService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    console.log("fghjkl")
this.getDietList()
  }
 
 
  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  getDietList(){

    console.log('[DiaryPage] getDietList()');
    this.items = []
    ///let formattedDate = this.transformDate(this.date)
   //// let date = {date: formattedDate}
    this.dooleService.getAPIlistDietsByDate().subscribe(
      async (res: any) =>{
        console.log('[DiaryPage] getDietList()', await res);

        if(res.diets){
          console.log("dietas", res)
          this.adapterForView(res.diets)
        }


       },(err) => {
          console.log('[DiaryPage] getDietList() ERROR(' + err.code + '): ' + err.message);
          alert( 'ERROR(' + err.code + '): ' + err.message)

          throw err;
      }, ()=>{
        
      });
  }


  adapterForView(list){
    
    list.forEach(element => {
    //Se adapta la respuesta de la API a lo que espera el componente  
      let data={
        img: element.image,
        title: element.name,
        description: "",
        type: "diets",
        id:element.id,
        routerlink: "diets-detail"
      }
      this.items.push(data)
    })
  }

}
