import { Directive, ElementRef, HostListener, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Console } from 'console';
import { InfoComponent } from 'src/app/components/info/info.component';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';
@Directive({
  selector: '[appClickCounter]'
})
export class ClickCounterDirective {

  @Output() processCompleted: EventEmitter<boolean> = new EventEmitter();
  //Change endPoint
  listEndPoint = []
  environment;
  clickCount: number = 0;
  @Output() tenClicks = new EventEmitter<void>();
  endpoints = ['Endpoint 1', 'Endpoint 2', 'Endpoint 3'];
  constructor(private el: ElementRef, private alertController: AlertController,
    private endpointsService: ChangeEndpointsService,
    private translate: TranslateService,
    private router: Router,) { 
    console.log("Dentro directiva");
    
  }


  @HostListener("click")
  onClick(): void {  
    console.log('Clic detectado: ',this.clickCount);
    this.clickCount++;
    if (this.clickCount === 10) {
      this.getEndPoint();
      this.showAlert();
      
      this.clickCount=0;
    }
  }

  getEndPoint() {
    this.endpointsService.addEndPoint()
    this.environment = this.endpointsService._ENVIROMENT
    this.listEndPoint = this.endpointsService._LIST_ENPOINT
    this.listEndPoint.forEach((e, index) => {
      e.name = this.translate.instant(e.name)
    })
    console.log("ListaEndpoints: ",this.listEndPoint);


  }
  
  async showAlert() {
    const inputs = this.listEndPoint.map(endpoint => ({
      label: endpoint.name,  
      type: 'radio' as const,  
      value: endpoint.id      ,
      checked: endpoint.id === this.endpointsService.getIndexEndPointLocalstorage()
    }));
  
    const alert = await this.alertController.create({
      header: this.translate.instant('enviroment.select'),  //falta translate
      inputs: inputs,
      cssClass:'buttonCss',
      buttons: [
        {
          text: this.translate.instant('button.cancel'),  // falta translate
          role: 'cancel',
          cssClass: 'ion-color-danger',
          handler: () => {
            this.processCompleted.emit(false);
          }
        }, {
          text: this.translate.instant('button.ok'),
          handler: (selectedEndpoint) => {
            console.log('Endpoint seleccionado:', selectedEndpoint);
            this.changeEndpoint(selectedEndpoint);
            this.processCompleted.emit(true);
          }
        }
      ],
      backdropDismiss: false
    });
  
    await alert.present();
  }


  changeEndpoint(endpointId) {

    const selectedEndpoint = this.listEndPoint.find(ep => ep.id === parseInt(endpointId));
    console.log('[LoginPage] changeEndPoint()', selectedEndpoint)
    let index = selectedEndpoint.id;
    this.endpointsService.setEndPoint(index);

  }
}
