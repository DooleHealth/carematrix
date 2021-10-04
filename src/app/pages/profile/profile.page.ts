import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { FirebaseAuthService } from 'src/app/services/firebase/auth/firebase-auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ReportProblemPage } from './report-problem/report-problem.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDoole : any
  userImage:string = 'assets/icons/user_icon.svg'
  isLoading: boolean;
  constructor( 
    public authService: AuthenticationService,
    private firebaseService: FirebaseAuthService,
    private dooleService: DooleService,
    private notification: NotificationService,
    private modalCtrl: ModalController,
    private router: Router,) { }

  ngOnInit() {
    this.getUserProfile();
  }

  ionViewWillEnter(){
    this.getPersonalInformation()
  }

  getUserProfile(){   
    if(history.state?.user){
      this.userDoole = history.state.user;
      console.log('[ProfilePage] getUserProfile()' ,  this.userDoole); 
    }  
  }

  getPersonalInformation(){
    this.isLoading = true
    this.dooleService.getAPIuserProfile().subscribe(
      async (res: any) =>{
        console.log('[ProfilePage] getPersonalInformation()', res);
        this.userDoole = res.user;
        this.isLoading = false
       },(err) => { 
          console.log('[ProfilePage] getPersonalInformation() ERROR(' + err.code + '): ' + err.message);
          this.isLoading = false 
          throw err; 
      });
    }




  async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('/landing');
  }

  async sendReportProblem(){
    const modal = await this.modalCtrl.create({
      component:  ReportProblemPage,
      componentProps: { },
      cssClass: "modal-custom-class"
    });
  
    modal.onDidDismiss()
      .then((result) => {
        console.log('sendReportProblem()', result);     
        if(result?.data?.error){

        }else if(result?.data?.action == 'add'){
          this.notification.displayToastSuccessful()
        }
      });
  
      await modal.present();
  
    }


}
