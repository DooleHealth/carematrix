import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  
  constructor(public router: Router) { }

  ngOnInit() {

  }

  async introAction(){
    await Storage.set({
     key: 'showIntro',
     value: 'true'
   });
   console.log(`[IntroPage] introAction()`);
   this.router.navigate(['app/home']);
 }
 

}
