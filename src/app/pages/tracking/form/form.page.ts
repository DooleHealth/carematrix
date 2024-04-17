import { Component, Input, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormDirective } from 'src/app/components/form/shared/form.directive';
import { FormService } from 'src/app/components/form/shared/form.service';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';
import { AlarmFormPage } from './alarm-form/alarm-form.page';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  private data: any = history.state?.data;
  private form_programmation_id = history?.state.form_programmation_id;
  private form_answer_id = history?.state.form_answer_id;
  private formAnswer: any = history.state?.formAnswer;
  private gamePlayId: any = history.state?.game_play_id;
  private source: string


  @Input()id: any;
  @Input()isModal: boolean;
  @Input()goalsByAlarms: any;
  @Input()challengeId: any;

  userLang = 'es-es';
  isLoading = false
  date = new Date(Date.now()).toISOString()
  formComponent:FormDirective[]  = []
  mode_wizard: boolean;
  backDisnable: boolean = false;
  title:string;
  confirmAnswers:boolean = true;
  note_message: string;
  constructor(
    private navCtrl: NavController,   
    private auth: AuthenticationService,
    private router: Router,
    private dooleService: DooleService,
    private languageService: LanguageService,
    private formService: FormService,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public alertController: AlertController,  
    ) { }

  ngOnInit() {
    console.log('FormPage ngOnInit() formAnswer', this.formAnswer)
    console.log('FormPage ngOnInit() gamePlayId', this.gamePlayId)
    // console.log('FormPage ngOnInit() goalsByAlarms', this.goalsByAlarms)
    // this.note_message = this.translate.instant('form.goal.message')
    this.getLanguage()
   // this.getForm()
    
    if(this.activatedRoute.snapshot.paramMap.get('id'))
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id){
      this.formService.userLang = this.userLang; //Set languages in the form
      this.getForm()
    }
    console.log('[FormPage] ngOnInit() isModal: ', this.isModal);
  }

  getLanguage(){
    let leng = this.languageService.getCurrent()
    this.userLang = leng  == 'es'? this.userLang:leng;
  }

  backButton(result?){
    if (this.isModal){
      console.log('[FormPage] backButton() this.isModal: ', this.isModal);
      setTimeout(()=>this.modalCtrl.dismiss({result: result,error:null}), 500);
       ;
    }
    else if(this.data){
      console.log('[FormPage] backButton() this.data: ', this.data);
      this.router.navigate([`/home`]);
    }
    else
      this.navCtrl.pop()
  }

  getForm(){
    
    this.isLoading = true;
    let params = {formAnswer: this.formAnswer, game_play_id: this.gamePlayId}

    this.dooleService.getAPIFormJSON(this.id, params).subscribe(
      async (res: any) =>{
        console.log('[FormPage] getForm()', await res);
        if(res.success){    
            //this.title = res?.form?.title 
            this.source = res?.form?.source
            this.mode_wizard = res?.mode_wizard
            this.backDisnable = res?.permit_preview
            let json =res.fields
            if(json.length > 0){
              this.formComponent = this.formService.getComponent(json)
              console.log('[FormPage] getForm()', await this.formComponent);
              if(res?.conditionals?.length > 0)
              this.formService.formFieldConditionals = res.conditionals
            }
        }else{
          this.dialogNotFind(res.message)
        }
        this.isLoading = false;
       },(err) => { 
        this.isLoading = false;
          console.log('[FormPage] getForm() ERROR(' + err.code + '): ' + err.message); 
          alert( 'ERROR(' + err.code + '): ' + err.message)
          throw err; 
      });
  }


  send(event){
    console.log('[FormPage] send()', event)
    event['form_id'] = this.id
    event['user_id'] = this.auth.user.idUser
    event['user_auth'] = this.auth.id_user

    if(this.challengeId) event['challenge_id'] = this.challengeId

    console.log('[FormPage] send()', event)
    this.isLoading = true;


    if (this.form_programmation_id) event["form_programmation_id"]=this.form_programmation_id
    if (this.form_answer_id) event['form_answer_id'] = this.form_answer_id

    this.dooleService.postAPIFormFill(event).subscribe( (res) =>{
      console.log(res)
      this.isLoading = false;
      if(res.original.result)
      this.openDialogForm(true, res.original, this.source)
      else
      this.openDialogForm(false,null, null)
    }
    ,(err) => {
      this.isLoading = false;
      console.log('***** ERROR ' + err);
      this.openDialogForm(false,null, null)
      throw err;
    
    })
  }

    async openDialogForm(result: boolean, data: any, source: string){
      const modal = await this.modalCtrl.create({
        component:  AlarmFormPage,
        componentProps: {result: result, data:data, source: source},
        cssClass: "modal-custom-class"
      });
    
      modal.onDidDismiss()
        .then((result) => {
          console.log('openDialogForm() close', result);
          if(result?.data?.formRedirect){
            // this.id = result?.data?.formRedirect
            let url = result?.data?.formRedirect.split('formAnswer/fill/')[1]
            this.id = url.split('?')[0];
            console.log('formRedirect id:', this.id)
             if(this.id)
             this.getForm()
             else this.backButton(result)
          }
          else{
            this.backButton(result)
          }
        });
    
        await modal.present(); 
    }

    async dialogNotFind(message) {
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        backdropDismiss: false,
        //subHeader: this.translate.instant(confirm? 'signup.success_message_signup':'signup.failed_message_signup'),
        message: message, 
        buttons: [
          {
            text: this.translate.instant("button.accept"),
            handler: (data) => {
              this.backButton()
            }
          }
        ]
      });
  
      await alert.present();
    }
  
}