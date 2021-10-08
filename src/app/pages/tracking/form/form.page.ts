import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Constants} from "../../../config/constants";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  private data: any = history.state?.data;
  public id;
  public url;
  constructor(private auth: AuthenticationService,
              private constants: Constants,
              private router: Router,
              private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.constants.DOOLE_ENDPOINT + '/formAnswer/fill/' + this.id + '?user_id=' + this.auth.user.idUser + '&secret=' + this.auth.getAuthToken());
  }

  backButton(){
    if(this.data)
    this.router.navigate([`/home`]);
  }

}
