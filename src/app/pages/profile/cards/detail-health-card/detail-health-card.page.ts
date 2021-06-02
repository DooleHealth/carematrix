import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthCard } from 'src/app/models/user';
@Component({
  selector: 'app-detail-health-card',
  templateUrl: './detail-health-card.page.html',
  styleUrls: ['./detail-health-card.page.scss'],
})
export class DetailHealthCardPage implements OnInit {
  card: HealthCard;
  constructor() { }

  ngOnInit() {
    this.getHealthCard()
  }

  getHealthCard(){
    this.card = history.state.card;
    console.log('[DetailHealthCardPage] getHealthCard()' ,  this.card); 
  }


}
