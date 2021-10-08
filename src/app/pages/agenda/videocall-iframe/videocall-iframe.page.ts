import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/config/constants';
import { OpentokService } from 'src/app/services/opentok.service';

@Component({
  selector: 'app-videocall-iframe',
  templateUrl: './videocall-iframe.page.html',
  styleUrls: ['./videocall-iframe.page.scss'],
})
export class VideocallIframePage implements OnInit {
  @Input('id') id: string;
  public url;
  apiKey: string;
  token: string;
  sessionId: string;
  constructor(private sanitizer: DomSanitizer,private constants: Constants, private modalCtrl: ModalController, public opentokService: OpentokService) { }

  ngOnInit() {
    this.apiKey = this.opentokService.apiKey$;
    this.token = this.opentokService.token$;
    this.sessionId = this.opentokService.sessionId$;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.constants.DOOLE_ENDPOINT + '/agenda/'+ this.id +'/guestApp');
  }

  close(){
    this.modalCtrl.dismiss({date:null});
  }

}
