import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videocall-test',
  templateUrl: './videocall-test.page.html',
  styleUrls: ['./videocall-test.page.scss'],
})
export class VideocallTestPage implements OnInit {
  public url;
  constructor(  private sanitizer: DomSanitizer) { 
  
  }

  ngOnInit() {
    this.url = this.getOpenTokTest();
    console.log('Viodeocall test url:', this.url);
  }

  getOpenTokTest(){
    const endpoint = 'https://freeconferencing.vonage.com/room/winter-band-little-hat-0798';
    return this.sanitizer.bypassSecurityTrustResourceUrl(endpoint);
  }

}
