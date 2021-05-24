import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private translate: TranslateService) { }
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
  ngOnInit() {
  }

  changeAuthentication(){
    console.log(`[SettingsPage] changeAuthentication(${this.authentication})`);
  }

  changeFaceId(){
    console.log(`[SettingsPage] changeFaceId(${this.faceId})`);
  }

  changeCommunications(){
    console.log(`[SettingsPage] changeCommunications(${this.communications})`);
  }

  changeAppointment(){
    console.log(`[SettingsPage] changeAppointment(${this.appointment})`);
  }

  changeDiets(){
    console.log(`[SettingsPage] changeDiets(${this.diets})`);
  }

  changeMedication(){
    console.log(`[SettingsPage] changeMedication(${this.medication})`);
  }

  changeAdvices(){
    console.log(`[SettingsPage] changeAdvices(${this.advices})`);
  }

  changeOffers(){
    console.log(`[SettingsPage] changeOffers(${this.offers})`);
  }

  changeGoals(){
    console.log(`[SettingsPage] changeGoals(${this.goals})`);
  }

  changeForm(){
    console.log(`[SettingsPage] changeForm(${this.form})`);
  }

  changeMessages(){
    console.log(`[SettingsPage] changeMessages(${this.messages})`);
  }

}
