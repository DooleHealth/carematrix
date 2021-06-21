import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HealthCard } from 'src/app/models/user';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  listCard: HealthCard[] =[];
  isLoading = false
  constructor(
    public router: Router,
    private alertController: AlertController,
    private dooleService: DooleService
  ) { }

  ngOnInit() {
    console.log('[CardsPage] ngOnInit()');
    this.getHealthCards()
  }

  ionViewDidEnter(){
    console.log('[CardsPage] ionViewDidEnter()');
  }

  getHealthCards(){
    this.isLoading = true
    this.dooleService.getAPIhealthCards().subscribe(
      async (res: any) =>{
        console.log('[CardsPage] getHealthCards()', await res);
        this.listCard = res as HealthCard[]
        this.isLoading = false
       },(err) => { 
          console.log('[CardsPage] getHealthCards() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  getDetailCard(card){
    console.log('[CardsPage] getDetailCard()', card.name);
    //this.router.navigateByUrl('cards/detailCard')
    this.router.navigate(['cards/detailCard', {id: card.id}]);
  }

}
