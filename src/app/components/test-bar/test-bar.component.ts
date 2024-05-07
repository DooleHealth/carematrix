import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeEndpointsService } from 'src/app/services/change-endpoints.service';

@Component({
  selector: 'app-test-bar',
  templateUrl: './test-bar.component.html',
  styleUrls: ['./test-bar.component.scss'],
})
export class TestBarComponent  implements OnInit,OnDestroy {

  isTestEnvironment = true;
  endpointName: string ="";
  private subscription: Subscription;

  constructor(private changeEndpointService: ChangeEndpointsService) { }

  ngOnInit() {
    this.subscription = this.changeEndpointService.getEndpointIndexObservable().subscribe(index => {
      this.isTestEnvironment = index !== 0;
      console.log('Endpoint Index Changed:', index, 'Is Test Environment:', this.isTestEnvironment);
      //const root = document.documentElement;
      //root.style.setProperty('--ion-background-color', this.isTestEnvironment ? 'rgba(255, 165, 0, 0.5)' : '#f5f5f5');
      this.endpointName= this.changeEndpointService._LIST_ENPOINT[index].name;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpiar la suscripción
  }
  hideTestBar() {
    this.isTestEnvironment = false;
  }

}
