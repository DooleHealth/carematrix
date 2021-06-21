import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
const INTRO_KEY = 'intro';
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
     key: INTRO_KEY,
     value: 'true'
   });
   console.log(`[IntroPage] introAction()`);
   this.router.navigate(['home']);
 }
 

}
