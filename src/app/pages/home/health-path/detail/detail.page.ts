import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  //path = history.state.path;
  path = {
    "game": "El camino a la salud",
    "level": "nivel TRES",
    "score": "Tienes 30 healthies consigue 15 más y pasa al siguiente nivel",
    "goal": 45
  };
  goalsText = [];
  goals = [
    {
      "goalable_type": "App\\Form",
      "goalable_id": 69,
      "goalable_origin_type": null,
      "goalable_origin_id": null,
      "type": "fill",
      "frequency": "every_time",
      "form": {
        "id": 69,
        "title": "F69 ¿Qué síntomas tengo? C.Colon - diagnóstico Colon sin drenaje ni estoma",
        "mode_wizard": 0
      },
      "completed": false
    },
    {
      "id": 30,
      "goalable_type": "App\\Drug",
      "goalable_id": 7262,
      "goalable_origin_type": null,
      "goalable_origin_id": null,
      "type": "take",
      "frequency": "every_time",
      "score": 1,
      "frequencyString": "Cada vez",
      "drug": {
        "id": 7262,
        "name": "A.A.S. 100 mg COMPRIMIDOS , 30 comprimidos"
      },
      "completed": true
    },
    {
      "goalable_type": "App\\Form",
      "goalable_id": 182,
      "goalable_origin_type": null,
      "goalable_origin_id": null,
      "type": "fill",
      "frequency": "every_time",
      "form": {
        "id": 182,
        "title": "F182 ¿Qué síntomas tengo? C.Colon - diagnóstico Colon con drenaje",
        "mode_wizard": 0
      },
      "completed": true
    },
    {
      "id": 29,
      "goalable_type": "App\\News",
      "goalable_id": 49,
      "goalable_origin_type": null,
      "goalable_origin_id": null,
      "type": "read",
      "frequency": "every_time",
      "score": 1,
      "frequencyString": "Cada vez",
      "news": {
        "id": 49,
        "subject": "TEST DOOLE Botón Shortcode"
      },
      "completed": false
    },
    {
      "id": 28,
      "goalable_type": "App\\Element",
      "goalable_id": 13,
      "goalable_origin_type": null,
      "goalable_origin_id": null,
      "type": "add",
      "frequency": "every_time",
      "score": 1,
      "frequencyString": "Cada vez",
      "element": {
        "id": 13,
        "name": "Deposicions vintiquatre hores"
      },
      "completed": true
    },
    {
      "id": 31,
      "goalable_type": "App\\Advice",
      "goalable_id": 4,
      "goalable_origin_type": null,
      "goalable_origin_id": null,
      "type": "read",
      "frequency": "every_time",
      "score": 1,
      "frequencyString": "Cada vez",
      "advice": {
        "id": 4,
        "name": "C4 No tomar sustancias excitantes como café, té, alcohol, tabaco, y similares"
      },
      "completed": false
    }
  ];


  constructor(public translate: TranslateService,) { }

  ngOnInit() {
    this.getGoals();
    console.log(this.goalsText);

  }

  getGoals() {
    this.goalsText = [];
    this.goals.forEach(element => {
      switch (element.goalable_type) {
        case "App\\Form":
          
          this.goalsText.push({name:element.form.title, link:'/form', id:element.id})

          break;
        case "App\\Drug":
          this.goalsText.push({name:element.drug.name, link:'/journal', id:element.id})

          break;
        case "App\\News":
          
          this.goalsText.push({name:element.news.subject, link:'/journal', id:element.id})
          

          break;
        case "App\\Advice":
          this.goalsText.push({name:element.advice.name, link:'/journal', id:element.id})
         

          break;
        case "App\\Element":
          this.goalsText.push({name:element.element.name, link:'/journal', id:element.id})
          

          break;

        default:
          break;
      }

    });
  }

}
