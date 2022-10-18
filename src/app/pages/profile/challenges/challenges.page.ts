import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})
export class ChallengesPage {
  listChallenges=[];
  nameChallenge: string = 'Doolehealth'
  isLoading = false
  progressBarValue = 0;
  constructor(
    public router:Router,
    private dooleService: DooleService) { }

    ionViewWillEnter() {
    this.getChallenges()
  }

  getChallenges(){
    this.isLoading = true
    this.dooleService.getAPIChallenges().subscribe(
      async (res: any) =>{
        console.log('[ChallengesPage] getChallenges()', await res);
        this.listChallenges = res.challenges;
        this.isLoading = false
       },(err) => { 
          console.log('getChallenges() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

}
