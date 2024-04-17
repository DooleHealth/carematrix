import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-exercices-detail',
  templateUrl: './exercices-detail.component.html',
  styleUrls: ['./exercices-detail.component.scss'],
})
export class ExercicesDetailComponent  implements OnInit {
  private data: any = history.state?.data;
  private programable_id: any = history.state?.programable_id;
  @Input()id: any;
  @Input()challengeId: any;
  isLoading = false
  exercise: any;
  constructor(
    private dooleService: DooleService,
    public router:Router,
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    public translate: TranslateService,
  ) { }

  ngOnInit() {}

  ionViewWillEnter(){
    if(history.state?.id)
    this.id = history.state.id;
    if(this.id)
    this.getDetailExercise();

    console.log('[ExercisePage] ionViewWillEnter() id', this.id);
  }
  getDetailExercise() {
    console.log('[ExercisePage] getDetailExercise()', this.programable_id);
    this.isLoading = true
    let params = {programable_play: this.programable_id, challenge_id: this.challengeId} 

    console.log(params)
    this.dooleService.getAPIExerciseDetail(this.id, params).subscribe(
      async (res: any) =>{
        console.log('[ExercisePage] getDetailExercise()', await res);
        if(res.success){
          this.exercise=res.exercise;
        }
   
        this.isLoading = false
       },(err) => { 
          console.log('[ExercisePage] getDetailExercise() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
    
  }

}
