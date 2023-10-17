import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {HttpParams} from "@angular/common/http";
import { Constants } from 'src/app/config/constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trak',
  templateUrl: './trak.page.html',
  styleUrls: ['./trak.page.scss'],
})
export class TrakPage implements OnInit {


  safeUrl: SafeResourceUrl;

  constructor(public authService: AuthenticationService, private constants: Constants, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const params = new HttpParams().set('user_id', this.authService.user.idUser);
    const urlWithParams = `${this.constants.TRAK_URL}?${params.toString()}`;
    console.log(urlWithParams);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlWithParams);
  }
}