import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ChangeEndpointsService, _INDEX_ENPOINT } from 'src/app/services/change-endpoints.service';

@Component({
  selector: 'app-test-bar',
  templateUrl: './test-bar.component.html',
  styleUrls: ['./test-bar.component.scss'],
})
export class TestBarComponent  implements OnInit,OnDestroy {

  isTestEnvironment = true;
  endpointName: string ="";
  private subscription: Subscription;

  constructor(private changeEndpointService: ChangeEndpointsService, private translate : TranslateService) { }

  ngOnInit() {
   

    
    this.subscription = this.changeEndpointService.getEndpointIndexObservable().subscribe(index => {
      this.isTestEnvironment = index !== 0;
        this.translate.get(this.changeEndpointService._LIST_ENPOINT[index].name).subscribe((data:any)=> {
          this.endpointName=  data
         });
   
    });
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpiar la suscripción
  }
  hideTestBar() {
    this.isTestEnvironment = false;
  }


    
    

}
