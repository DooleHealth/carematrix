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
  //KEY_LOCAL_STORAGE = 'showIntro';
  legal:any = {};
  isChecked = false;
  isLoading = false
  constructor(
    public router: Router,    
    private translate: TranslateService,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private dooleService: DooleService) { }

  ngOnInit() {
    this.getLegalInformation()
  }

  getLegalInformation(){
    this.isLoading = true
    this.dooleService.getAPILegalInformation().subscribe(
      async (res: any) =>{
        console.log('[LegalPage] getAPILegalInformation()', await res);
        if(res.success){
          this.legal = res.legalTerm
          if(this.legal === undefined || this.legal === null ){
            let message = this.translate.instant('legal.no_get_conditions_label')
            this.showAlert(message)
          }
        }
        else{
          let message = this.translate.instant('legal.error_conditions_label')
          this.showAlert(message, 'error')
        }
        this.isLoading = false
       },(err) => { 
          console.log('getAll ERROR(' + err.code + '): ' + err.message); 
          this.isLoading = false
          let message = this.translate.instant('legal.error_conditions_label')+' '+ err.message
          this.showAlert(message, 'error')
          throw err; 
      });
  }

  showAlert(message, type?){
    let header = (type == 'error')? this.translate.instant('alert.header_error'): this.translate.instant('alert.header_info')
    this.dooleService.showAlertAndReturn(header,message,false, 'landing')
  }

  acceptLegalConditions(){
    let confirmation = {lt_id: this.legal.id}
    this.dooleService.postAPILegalConfirmation(confirmation).subscribe(
    async (res: any) =>{
      console.log('[LegalPage] sendLegalConformation()', await res);
      if(res.success){
        this.redirectBiometric()
        //this.showIntro()
      }
      else {
        let message = this.translate.instant("legal.error_post_conditions_label");
        this.dooleService.presentAlert(message)
      }

     },(err) => { 
        console.log('getAll ERROR(' + err.code + '): ' + err.message); 
        this.dooleService.presentAlert(err.message)
        throw err; 
    });
  }

  showIntro(){
      this.authService.getShowIntroLocalstorage().then((showIntro) =>{
        console.log(`[LegalPage] showIntro() localStorage`,showIntro);
        if(showIntro){
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/intro']);
        }
      })
  }

  redirectBiometric(){
    let condicion = JSON.parse(localStorage.getItem('show-bio-dialog') )
    if(condicion){
      this.router.navigate(['/login/biometric-auth']);
    } else{
      this.showIntro()
    }      
  }

  rejectLegalConditions(){
    let confirmation = {lt_id: this.legal.id}
    this.dooleService.postAPIRejectLegalConfirmation(confirmation).subscribe(
    async (res: any) =>{
      console.log('[LegalPage] sendLegalConformation()', await res);
      if(res.success){
        this.signOut()
      }
      else {
        let message = this.translate.instant("legal.error_post_conditions_label");
        this.dooleService.presentAlert(message)
      }
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
