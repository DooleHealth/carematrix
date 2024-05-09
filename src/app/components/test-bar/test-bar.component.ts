import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private changeEndpointService: ChangeEndpointsService, private translate : TranslateService) { }

  ngOnInit() {
   

    
    this.subscription = this.changeEndpointService.getEndpointIndexObservable().subscribe(index => {
      this.isTestEnvironment = index !== 0;
      let lang = this.translate.getBrowserLang() ?? 'en';
   
      console.log("TEST BAR LANG: ",lang);
  
      this.translate.setDefaultLang(lang);
      console.log('TEST BAR: Index Changed:', index, 'Is Test Environment:', this.isTestEnvironment);


        this.translate.get(this.changeEndpointService._LIST_ENPOINT[index].name).subscribe((data:any)=> {
          console.log('TEST BAR', data);
          this.endpointName=  data
         });
   
      console.log("TEST BAR endpoint: ", this.endpointName);
      console.log("TEST BAR endpoint translate: ", this.translate.instant( this.endpointName));
    });
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpiar la suscripción
  }
  hideTestBar() {
    this.isTestEnvironment = false;
  }


    
    

}
