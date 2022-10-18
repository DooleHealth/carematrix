import { Component, Input, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {Constants} from "../../../config/constants";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import { ModalController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  private data: any = history.state?.data;
  private temporaryUrl
  @Input()id: any;
  public url;
  constructor(private auth: AuthenticationService,
              private constants: Constants,
              private router: Router,
              private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private modalCtrl: ModalController, private location: Location) { }

  ngOnInit() {
    console.log(`[FamilyUnitPage] FormPage(), user_auth: ${this.auth.id_user}, user_id: ${this.auth.user.idUser}`);
    if(this.activatedRoute.snapshot.paramMap.get('id'))
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.constants.DOOLE_ENDPOINT + '/formAnswer/fill/' + this.id + '?user_auth=' + this.auth.id_user + '&user_id=' + this.auth.user.idUser + '&secret=' + this.auth.getAuthToken());
  }

  async backButton(){

    const modal = await this.modalCtrl.getTop();
    if (modal)
      await modal.dismiss({error:null});
    else if(this.data)
      this.router.navigate([`/home`]);
    else
      this.router.navigate([`/tracking`]);
  }
}
