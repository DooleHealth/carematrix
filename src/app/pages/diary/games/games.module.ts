import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { GamesRoutingModule } from './games-routing.module';
import { GamesPage } from './games.page';



@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    GamesRoutingModule
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [GamesPage]
})
export class GamesPageModule {}
