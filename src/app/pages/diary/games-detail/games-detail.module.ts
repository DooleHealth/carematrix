import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesDetailPageRoutingModule } from './games-detail-routing.module';

import { GamesDetailPage } from './games-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GamesDetailPageRoutingModule
  ],
  providers: [InAppBrowser] ,
  declarations: [GamesDetailPage]
})
export class GamesDetailPageModule {}
