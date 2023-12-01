import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentTypeIcons, ContentTypeTranslatedName } from 'src/app/models/shared-care-plan';
import { SharedCarePlanGoals } from 'src/app/models/shared-care-plan/scp-adapters';
import { DooleService } from 'src/app/services/doole.service';
import { DrugsDetailPage } from '../../diary/drugs-detail/drugs-detail.page';
import { ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  listGoal: any[] = []
  nameGoal: string = ContentTypeTranslatedName.Goals
  iconGoals = ContentTypeIcons.Goals
  public scpGoals:SharedCarePlanGoals
  isLoading = false
  constructor(
    public router:Router,
    private dooleService: DooleService,
    private modalCtrl: ModalController,
    private notification: NotificationService,
    ) { 
      this.scpGoals = new SharedCarePlanGoals()
    }

  ngOnInit() {
    this.getGoalImformation()
  }

  getGoalImformation(){
    this.listGoal = []
    this.isLoading = true
    this.dooleService.getAPI_SCP_goals().subscribe(
      async (res: any) =>{
        console.log('[GoalsPage] getGoalImformation()', await res);
        this.listGoal = this.scpGoals.adapterForView(
          res.goals, // JSON 
          'name',  //title
          'from_date',  //date
          'content_type', //type
          'is_new_content' //is_new_content
          )  
        this.isLoading = false
        //console.log('[GoalsPage] getGoalImformation() goals', await this.listGoal);
       },(err) => { 
          console.log('getGoalImformation() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  // async addDrugPlan(drug, id){
  //   const modal = await this.modalCtrl.create({
  //     component:  DrugsDetailPage,
  //     componentProps: { drug: drug, id: id},
  //     cssClass: "modal-custom-class"
  //   });

  //   modal.onDidDismiss()
  //     .then((result) => {
  //       console.log('addDrugPlan()', result);

  //       if(result?.data?.error){
  //        // let message = this.translate.instant('landing.message_wrong_credentials')
  //         //this.dooleService.presentAlert(message)
  //       }else if(result?.data?.action !== undefined){
  //         this.notification.displayToastSuccessful()
  //         //this.segmentChanged()
  //       }
  //     });

  //     await modal.present();
  //   }

}
