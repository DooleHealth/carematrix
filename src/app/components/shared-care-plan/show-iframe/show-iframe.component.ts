import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ACCESS_TYPE } from 'src/app/models/shared-care-plan';

@Component({
  selector: 'app-show-iframe',
  templateUrl: './show-iframe.component.html',
  styleUrls: ['./show-iframe.component.scss'],
})
export class ShowIframeComponent  implements OnInit {
  @Input()configurations: any;
  IFRAME = ACCESS_TYPE.IFRAME
  safeUrl: SafeResourceUrl
  constructor( private modalCtrl: ModalController,   private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    console.log(`[ShowIframeComponent] configurations: `, this.configurations)
    if(this.configurations?.iframe_url)
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.configurations.iframe_url);
  }


  backButton(){
    this.modalCtrl.dismiss({error:null, action: 'add'});
  }

}
