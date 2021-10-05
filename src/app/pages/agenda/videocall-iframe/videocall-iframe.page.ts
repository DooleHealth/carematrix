import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-videocall-iframe',
  templateUrl: './videocall-iframe.page.html',
  styleUrls: ['./videocall-iframe.page.scss'],
})
export class VideocallIframePage implements OnInit {
  @Input("id") id;
  public url;
  constructor(private sanitizer: DomSanitizer,private constants: Constants, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("AGENDA ID:", this.id)
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.constants.DOOLE_ENDPOINT + '/agenda/'+ this.id +'/guestApp');
  }

  close(){
    this.modalCtrl.dismiss({date:null});
  }

}
