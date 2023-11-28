import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExercicesRoutingModule } from './exercises-routing.module';
import { ExercisesPage } from './exercises.page';



@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ExercicesRoutingModule
  ],
  providers: [DatePipe, InAppBrowser] ,
  declarations: [ExercisesPage]
})
export class ExercicesModule { }
