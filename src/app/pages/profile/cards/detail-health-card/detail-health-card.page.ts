import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';
@Component({
  selector: 'app-detail-health-card',
  templateUrl: './detail-health-card.page.html',
  styleUrls: ['./detail-health-card.page.scss'],
})
export class DetailHealthCardPage implements OnInit {
  card: any = {};
  id
  constructor(
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.id = history.state.id;
    if(this.id)
    this.getDetailsHealthCard()
  }

/*   getHealthCard(){
    this.card = history.state.card;
    console.log('[DetailHealthCardPage] getHealthCard()' ,  this.card); 
  } */

  getDetailsHealthCard(){
    this.dooleService.getAPIhealthCardId(this.id).subscribe(
      async (res: any) =>{
        console.log('[CardsPage] getHealthCards()', await res);
        if(res.success)
        this.card = res.healthcard
       },(err) => { 
          console.log('[CardsPage] getHealthCards() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }


}
