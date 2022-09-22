import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-health-path',
  templateUrl: './health-path.page.html',
  styleUrls: ['./health-path.page.scss'],
})
export class HealthPathPage implements OnInit {
  currentPath = {
    "game":"El camino a la salud",
    "level":"Aprend de la meva malaltia cardíaca",
    "score":"Tienes 30 healthies consigue 15 más y pasa al siguiente nivel",
    "goal":40
};
  levels = [
    {
        "id": 25,
        "level_id": 13,
        "name": "Aprend de la meva malaltia cardíaca",
        "description": false,
        "score": 10,
        "completed": true,
        "currentLevelCompleted": false,
        "isNextLevelToCompleted": true,
        "cover": "https://covidapp.s3.eu-central-1.amazonaws.com/private_content/jHdzGqXCMU6tYm7fc6oQGqR8OBxLr5G5pOgjE5uU.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20220920%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220920T112534Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=833cf206fddbb70a0bf8bacac2a52eea424b418ef1d328603b91f43844ba27e1",
        "coin": {
            "id": 1,
            "name": "Puntos"
        }
    },
    {
        "id": 26,
        "level_id": 13,
        "name": "Aprenc de la meva malaltia cardíaca",
        "description": false,
        "score": 20,
        "completed": true,
        "currentLevelCompleted": false,
        "isNextLevelToCompleted": false,
        "cover": "https://covidapp.s3.eu-central-1.amazonaws.com/private_content/YoVyGXlyBbLIB2sFbOHr8ByWjdSwsUCD0DCLUMdF.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20220920%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220920T112534Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=a33b2ba8889c0c57a249b0568dc4ef8f9e794ffc1b5849cf7daffce132912a25",
        "coin": {
            "id": 1,
            "name": "Puntos"
        }
    },
    {
        "id": 27,
        "level_id": 13,
        "name": "Aprenc de la meva malaltia cardíaca",
        "description": false,
        "score": 30,
        "completed": false,
        "currentLevelCompleted": false,
        "isNextLevelToCompleted": false,
        "cover": "https://covidapp.s3.eu-central-1.amazonaws.com/private_content/rYUwSOFBT7pvBcJpey2SB8zdGBANLODGSteAZgGr.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20220920%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220920T112534Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=97f82665caf5969ad61b628fa0863f0cb3751ea4869df8e477c2c8db8c5f7cfd",
        "coin": {
            "id": 1,
            "name": "Puntos"
        }
    },
    {
        "id": 40,
        "level_id": 13,
        "name": "Nivel de prueba Fernando",
        "description": false,
        "score": 3000,
        "completed": false,
        "currentLevelCompleted": false,
        "isNextLevelToCompleted": false,
        "cover": null,
        "coin": {
            "id": 5,
            "name": "Estrellas"
        }
    },
    {
        "id": 41,
        "level_id": 13,
        "name": "Nivel de prueba Fernando 2",
        "description": false,
        "score": 11000,
        "completed": false,
        "currentLevelCompleted": false,
        "isNextLevelToCompleted": false,
        "cover": null,
        "coin": {
            "id": 5,
            "name": "Estrellas"
        }
    }
  ];
  handlerMessage = '';
  roleMessage = '';
  constructor(private alertController: AlertController, public translate: TranslateService,) { }

  ngOnInit() {
  }

  async presentAlert(item) {
    if(!item?.completed){
       
        const alert = await this.alertController.create({
            header:  this.translate.instant('health_path.blocked_level'),
            buttons: [
              {
                text: this.translate.instant('info.button'),
                role: 'confirm',
                handler: () => {
                  this.handlerMessage = 'Alert confirmed';
                },
              },
            ],
          });
          await alert.present();

          const { role } = await alert.onDidDismiss();
          this.roleMessage = `Dismissed with role: ${role}`;
    }
    

   
  }

}
