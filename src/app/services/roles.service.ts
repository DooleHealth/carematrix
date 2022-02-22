import { Injectable } from '@angular/core';

export class ComponentsApp {
  goal: boolean;
  advices: boolean;
  news: boolean;
  agenda: boolean;
  reminder: boolean;
  diet: boolean;
  drug: boolean;
  game: boolean;
  element: boolean;
  form: boolean;
  chat: boolean;
  doc_diagnostic: boolean;
  contacta: boolean;
  constructor(goal: boolean,advices: boolean,news: boolean, agenda: boolean, reminder: boolean, diet: boolean, drug: boolean, game: boolean, element: boolean, form: boolean, chat: boolean,doc_diagnostic: boolean, contacta: boolean){
    this.goal = goal
    this.advices = advices
    this.news = news
    this.agenda = agenda
    this.reminder = reminder
    this.diet = diet
    this.drug = drug
    this.game = game
    this.element = element
    this.form = form
    this.chat = chat
    this.doc_diagnostic = doc_diagnostic
    this.contacta = contacta
  }
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  component: ComponentsApp;
  userType: any;
  isProfessional: boolean;
  constructor() { 
    this.setProfessional(false)
    this.activatedAllComponents(true)
    //this.customAllComponents(true,false,true,false,false,false,false,true,true,true,true, false, true)
  }

  activatedAllComponents(enable: boolean){
      this.component = new ComponentsApp(enable, enable,enable,enable,enable,enable,enable,enable,enable,enable,enable, enable,enable )
  }

  customAllComponents(goal: boolean,advices: boolean,news: boolean, agenda: boolean, reminder: boolean, diet: boolean, drug: boolean, game: boolean, element: boolean, form: boolean, chat: boolean, doc_diagnostic: boolean, contacta: boolean){
    this.component = new ComponentsApp(goal, advices, news, agenda, reminder, diet, drug, game, element, form, chat, doc_diagnostic, contacta )
  }

  setProfessional(professional){
    this.isProfessional = professional? true: false
  }
}
