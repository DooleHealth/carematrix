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
    private alertController: AlertController,
    private authService: AuthenticationService,
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

  async showAlertgetLegal(success){
    let messagge = '' 
    if(success)
      messagge = this.translate.instant("legal.send_email_alert_message")
    else
      messagge = this.translate.instant("legal.error_conditions_label")
    await  this.dooleService.presentAlert(messagge)
  }

  acceptLegalConditions(){
    let confirmation = {lt_id: this.legal.id}
    this.dooleService.postAPILegalConfirmation(confirmation).subscribe(
    async (res: any) =>{
      console.log('[LegalPage] sendLegalConformation()', await res);
      if(res.success){
        this.router.navigate(['/sms']);
        //this.showIntro()
      }
      else this.dooleService.presentAlert("legal.error_post_conditions_label")
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

}
