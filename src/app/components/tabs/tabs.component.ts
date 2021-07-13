import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  text: string;
  home= 'Inicio'
  agenda= 'Agenda'
  contact= 'Contacto'
  tracking= 'Seguimiento'
  journal= 'Mi diario'

  constructor( private router: Router , private translate: TranslateService, )  {
    // this.nav=nav;
    this.text = 'Hello World';
  }
  ngOnInit() {
    this.translateTab() 
  }

  translateTab(){
    this.home = this.translate.instant('tab.home')
    this.agenda= this.translate.instant('tab.agenda')
    this.contact= this.translate.instant('tab.contact')
    this.tracking= this.translate.instant('tab.tracking')
    this.journal= this.translate.instant('tab.journal')
  }

  public navigateAgenda() {
    return this.router.navigate(['/agenda'], {replaceUrl:true});
   
  }
  public navigateHome(){
    return this.router.navigateByUrl('/home');
  }

  public navigateMessages(){
    return this.router.navigateByUrl('/contact');
  }

  public navigateTracking(){
    return this.router.navigateByUrl('/tracking');
  }

  public navigateDiary(){
    return this.router.navigateByUrl('/journal');
  }

}