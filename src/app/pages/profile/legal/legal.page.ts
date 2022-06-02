import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.page.html',
  styleUrls: ['./legal.page.scss'],
})
export class LegalPage implements OnInit {
  legal: any = {}
  isLoading = false
  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private dooleService: DooleService,
    public translate: TranslateService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getInformationLegal()
  }

  getInformationLegal(){
    this.isLoading = true
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LegalPage] getInformationLegal()', await res);
        this.legal = res.legalTerm
        this.isLoading = false
       },(err) => { 
          console.log('[LegalPage] getInformationLegal() ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          throw err; 
      });
  }

  rejectLegalConditions(){
    let confirmation = {lt_id: this.legal.id}
    this.dooleService.postAPIRejectLegalConfirmation(confirmation).subscribe(
    async (res: any) =>{
      console.log('[LegalPage] sendLegalConformation()', await res);
      if(res.success){
        this.signOut()
      }
      else this.dooleService.presentAlert("legal.error_post_conditions_label")
     },(err) => { 
        console.log('getAll ERROR(' + err.code + '): ' + err.message); 
        this.dooleService.presentAlert(err.message)
        throw err; 
    });
  }

  async confirmLegalTerms() {

    const alert = await this.alertController.create({
      cssClass: 'my-alert-class',
      subHeader: this.translate.instant('legal.no_acept_conditions'),
      message: this.translate.instant('legal.messaje_reject_terms'),
        buttons: [
          {
            text: this.translate.instant("button.cancel"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              //console.log('[LandingPage] AlertConfirm Cancel');
            }
          }, {
            text: this.translate.instant("button.ok"),
            handler: (data) => {
              this.rejectLegalConditions()
            }
          }
        ]
    });

    await alert.present();
  }

  async signOut() {
    await this.authService.logout().then(res=>{
      this.router.navigateByUrl('/landing');
    });
  }

}
