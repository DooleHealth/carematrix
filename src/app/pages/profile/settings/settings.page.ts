import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DooleService } from 'src/app/services/doole.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  authentication = true
  faceId = true
  communications = true
  appointment = true
  diets = true
  medication = true
  goals = true
  advices = true
  offers = true
  form = true
  messages = true
  constructor(
    private dooleService: DooleService) { }
  ngOnInit() {
  }

  changeAuthentication(){
    console.log(`[SettingsPage] changeAuthentication(${this.authentication})`);
    let params = {
      name: 'authentication',
      value: this.authentication
    }
    this.sendConfigution(params)
  }

  changeFaceId(){
    console.log(`[SettingsPage] changeFaceId(${this.faceId})`);
    let params = {
      name: 'faceId',
      value: this.faceId
    }
    this.sendConfigution(params)
  }

  changeCommunications(){
    console.log(`[SettingsPage] changeCommunications(${this.communications})`);
    let params = {
      name: 'communications',
      value: this.communications
    }
    this.sendConfigution(params)
  }

  changeAppointment(){
    console.log(`[SettingsPage] changeAppointment(${this.appointment})`);
    let params = {
      name: 'appointment',
      value: this.appointment
    }
    this.sendConfigution(params)
  }

  changeDiets(){
    console.log(`[SettingsPage] changeDiets(${this.diets})`);
    let params = {
      name: 'diets',
      value: this.diets
    }
    this.sendConfigution(params)
  }

  changeMedication(){
    console.log(`[SettingsPage] changeMedication(${this.medication})`);
    let params = {
      name: 'medication',
      value: this.medication
    }
    //let params2 = {drugIntakeNotificationMail: 1}
    this.sendConfigution(params)
  }

  changeAdvices(){
    console.log(`[SettingsPage] changeAdvices(${this.advices})`);
    let params = {
      name: 'advices',
      value: this.advices
    }
    this.sendConfigution(params)
  }

  changeOffers(){
    console.log(`[SettingsPage] changeOffers(${this.offers})`);
    let params = {
      name: 'offers',
      value: this.offers
    }
    this.sendConfigution(params)
  }

  changeGoals(){
    console.log(`[SettingsPage] changeGoals(${this.goals})`);
    let params = {
      name: 'goals',
      value: this.goals
    }
    this.sendConfigution(params)
  }

  changeForm(){
    console.log(`[SettingsPage] changeForm(${this.form})`);
    let params = {
      name: 'form',
      value: this.form
    }
    this.sendConfigution(params)
  }

  changeMessages(){
    console.log(`[SettingsPage] changeMessages(${this.messages})`);
    let params = {
      name: 'messages',
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
          console.log('p[SettingsPage] sendConfigution() ERROR(' + err.code + '): ' + err.message); 
          throw err; 
      });
  }

}
