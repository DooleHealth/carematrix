import { Component, OnInit } from '@angular/core';
import { DooleService } from 'src/app/services/doole.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  authentication = false
  faceId = false
  communications = false
  appointment = false
  diets = false
  medication = false
  goals = false
  advices = false
  offers = false
  form = false
  messages = false
  language
  constructor(
    private dooleService: DooleService,
    public languageService: LanguageService, 
    ) { }
  ngOnInit() {
    this.getNotificationConfiguration()
    this.getLocalLanguages()
  }

  getNotificationConfiguration(){
    this.dooleService.getAPInotificationConfigurations().subscribe(
      async (res: any) =>{
       console.log('[SettingsPage] sendConfigution()', await res);
       if(res){
        this.getConfigurationParams(res)
       }
       },(err) => { 
          console.log('[SettingsPage] sendConfigution() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  getConfigurationParams(params: any){
    this.authentication = (params?.authenticationNotificaton== "1")? true:false
    this.faceId = (params?.faceIdNotificaton== "1")? true:false
    this.communications = (params?.communicationsNotificaton== "1")? true:false
    this.appointment = (params?.appointmentNotificaton== "1")? true:false
    this.diets = (params?.dietsNotificaton== "1")? true:false
    this.medication = (params?.drugIntakeNotificationMail == "1")? true:false
    this.goals = (params?.goalsNotificaton== "1")? true:false
    this.advices = (params?.advicesNotificaton== "1")? true:false
    this.offers = (params?.offersNotificaton== "1")? true:false
    this.form = (params?.formNotificaton== "1")? true:false
    this.messages = (params?.messagesNotificaton== "1")? true:false

  }

  changeAuthentication(){
    console.log(`[SettingsPage] changeAuthentication(${this.authentication})`);
    let params = {
      name: 'authenticationNotificaton',
      value: this.authentication
    }
    this.sendConfigution(params)
  }

  changeFaceId(){
    console.log(`[SettingsPage] changeFaceId(${this.faceId})`);
    let params = {
      name: 'faceIdNotificaton',
      value: this.faceId
    }
    this.sendConfigution(params)
  }

  changeCommunications(){
    console.log(`[SettingsPage] changeCommunications(${this.communications})`);
    let params = {
      name: 'communicationsNotificaton',
      value: this.communications
    }
    this.sendConfigution(params)
  }

  changeAppointment(){
    console.log(`[SettingsPage] changeAppointment(${this.appointment})`);
    let params = {
      name: 'appointmentNotificaton',
      value: this.appointment
    }
    this.sendConfigution(params)
  }

  changeDiets(){
    console.log(`[SettingsPage] changeDiets(${this.diets})`);
    let params = {
      name: 'dietsNotificaton',
      value: this.diets
    }
    this.sendConfigution(params)
  }

  changeMedication(){
    console.log(`[SettingsPage] changeMedication(${this.medication})`);
    let params = {
      name: 'drugIntakeNotificationMail',
      value: this.medication
    }
    //let params2 = {drugIntakeNotificationMail: 1}
    this.sendConfigution(params)
  }

  changeAdvices(){
    console.log(`[SettingsPage] changeAdvices(${this.advices})`);
    let params = {
      name: 'advicesNotificaton',
      value: this.advices
    }
    this.sendConfigution(params)
  }

  changeOffers(){
    console.log(`[SettingsPage] changeOffers(${this.offers})`);
    let params = {
      name: 'offersNotificaton',
      value: this.offers
    }
    this.sendConfigution(params)
  }

  changeGoals(){
    console.log(`[SettingsPage] changeGoals(${this.goals})`);
    let params = {
      name: 'goalsNotificaton',
      value: this.goals
    }
    this.sendConfigution(params)
  }

  changeForm(){
    console.log(`[SettingsPage] changeForm(${this.form})`);
    let params = {
      name: 'formNotificaton',
      value: this.form
    }
    this.sendConfigution(params)
  }

  changeMessages(){
    console.log(`[SettingsPage] changeMessages(${this.messages})`);
    let params = {
      name: 'messagesNotificaton',
      value: this.messages
    }
    this.sendConfigution(params)
  }


  sendConfigution(params){
    this.dooleService.postAPIConfiguration(params).subscribe(
      async (res: any) =>{
       console.log('[SettingsPage] sendConfigution()', await res);
       if(res.success){
        console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
       }
        else{
          console.log(`[SettingsPage] sendConfigution(success: ${res.success})`);
        }
       },(err) => { 
          console.log('[SettingsPage] sendConfigution() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

  changeLanguages(){
    console.log('[SettingsPage] changeLanguages()', this.language);
    this.languageService.setLenguageLocalstorage(this.language)
  }

  getLocalLanguages(){
    this.language = this.languageService.getCurrent()
    console.log('[SettingsPage] getLocalLanguages()', this.language);
  }

}
