import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExercicesComponent } from './exercices.component';
import { ExercicesRoutingModule } from './exercices-routing.module';



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
  declarations: [ExercicesComponent]
})
export class ExercicesModule { }
