import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getRandomBackground } from 'src/app/shared/classes/utils';

@Component({
  selector: 'app-biometric-auth',
  templateUrl: './biometric-auth.page.html',
  styleUrls: ['./biometric-auth.page.scss'],
})
export class BiometricAuthPage implements OnInit {
  @Input() isModal: boolean;
  backgroundImage: string = getRandomBackground();
  showDialog: boolean = true;
  showSuccess: boolean = false;
  constructor(private authService: AuthenticationService, private router: Router, private modalCtrl: ModalController, public translate: TranslateService, public platform: Platform, public alertCtrl: AlertController, private faio: FingerprintAIO) {
    localStorage.setItem('show-bio-dialog','false');
    localStorage.setItem('settings-bio','false');
  }

  ngOnInit() {
  }

  async showBioAuthDlg() {
    
  }

  async dismissLockScreen() {
    this.modalCtrl.dismiss();
  }

}
