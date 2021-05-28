import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  listCard: any = [];
  constructor(
    public router: Router,    
    private translate: TranslateService,
    private alertController: AlertController,
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    this.getHealthCards()
  }

  getHealthCards(){
    this.dooleService.getAPIhealthCards().subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getHealthCards()', await res);
        this.listCard = res as any[]
       },(err) => { 
          console.log('[GoalsPage] getHealthCards() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  getDetailCard(card){
    console.log('[GoalsPage] getDetailCard()', card.name);
  }

}
