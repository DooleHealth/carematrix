import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  text: string;

  constructor( private router: Router )  {
    // this.nav=nav;
    this.text = 'Hello World';
  }
  ngOnInit() {
    
   
  }

  public navigateAgenda() {
    return this.router.navigate(['/agenda'], {replaceUrl:true});
   
  }
  public navigateHome(){
    return this.router.navigateByUrl('/home');
  }

  public navigateMessages(){
    return this.router.navigateByUrl('/agenda');
  }

  public navigateTracking(){
    return this.router.navigateByUrl('/tracking');
  }

  public navigateDiary(){
    return this.router.navigateByUrl('/journal');
  }

}