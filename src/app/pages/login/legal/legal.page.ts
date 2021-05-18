import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {
  KEY_LOCAL_STORAGE = 'showIntro';
  constructor(public router: Router) { }

  ngOnInit() {

  }

  acceptLegalConditions(){
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
