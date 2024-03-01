import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private history: string[] = [];
 
  constructor(private router: Router, private location: Location, /* private modalCtrl: ModalController */) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("NavigationEnd", event.urlAfterRedirects);
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
 
  back(): void {
    this.history.forEach( (event, index) => {
      console.log("NavigationEnd", index, event);
    })

    let lastUrl = this.history.pop();

    this.history.forEach((event, index) => {
      console.log("NavigationEnd pop", index, event);
    })

    if (this.history?.length > 0) {
      this.location.back()
      //this.router.navigate([`${lastUrl}`]);
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  // async close(): Promise<void>  {
  //   const modal = await this.modalCtrl.getTop();
  //   if (modal)
  //     await modal.dismiss({error:null});
  //   else this.back()
  // }

  async close(modalCtrl?): Promise<void>  {
    const modal = await modalCtrl?.getTop();
    if (modal)
      await modal.dismiss({error:null});
    else this.back()
  }
}
