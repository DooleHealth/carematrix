import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FamilyUnit } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DooleService } from 'src/app/services/doole.service';
import { RolesService } from 'src/app/services/roles.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  listFamilyUnit:FamilyUnit[] = [];
  isLoading = false
  user
  text: string;
  home= 'Inicio'
  agenda= 'Agenda'
  contact= 'Contacto'
  tracking= 'Seguimiento'
  journal= 'Mi diario'
  pusherNotification = false;
  constructor(
     private router: Router , 
     public role: RolesService,
     private authService: AuthenticationService)  {
    { this.user = this.authService?.user?.familyUnit}
  }
  ngOnInit() {
    this.translateTab();
    // this.getFamilyUnitData(); 
  }

  translateTab(){
    
  }

  public navigateAgenda() {
    return this.router.navigate(['/agenda'], {replaceUrl:true});
   
  }
  public navigateHome(){
    return this.router.navigateByUrl('/home');
  }

  public navigateMessages(){
    return this.router.navigateByUrl('/contact');
  }

  public navigateTracking(){
    return this.router.navigateByUrl('/tracking');
  }

  public navigateDiary(){
    return this.router.navigateByUrl('/journal');
  }

// borrar después de esta linea para abajo

  // getFamilyUnitData(){
  //   this.isLoading = true
  //   this.dooleService.getAPIFamilyUnit().subscribe(
  //     async (res: any) =>{
  //       console.log('[FamilyUnitPage] getFamilyUnitData()', await res);
  //       this.listFamilyUnit = res
  //       this.isLoading = false
  //      },(err) => { 
  //         console.log('[FamilyUnitPage] getFamilyUnitData() ERROR(' + err.code + '): ' + err.message); 
  //         this.isLoading = false
  //         throw err; 
  //     });
  // }

  // changeAccount(family){
  //   console.log('[FamilyUnitPage] changeAccount()', family.name);
  //   this.presentAlertConfirm(family)
  // }

  // async presentAlertConfirm(family) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-alert-class',
  //     header: family.name,
  //     message: this.translate.instant("setting.family_unit.msg_alert_change_perfil"),
  //     buttons: [
  //       {
  //         text: this.translate.instant("alert.button_cancel"),
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: this.translate.instant("alert.button_change"),
  //         handler: () => {
  //           console.log('Confirm Okay');
  //           console.log('[FamilyUnitPage] presentAlertConfirm() Cuenta de:', family.name);
  //           this.changeUser(family)
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // changeUser(user?){
  //   console.log('[FamilyUnitPage] changeUser() Cuenta de:', user);
  //   this.authService.setUserFamilyId(user? user.id: null);
  //   this.router.navigateByUrl('home');
  // }




}
