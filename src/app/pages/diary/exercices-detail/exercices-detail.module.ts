import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ShareModule } from 'src/app/shared/share/share.module';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ExercicesDetailPageRoutingModule } from './exercices-detail-routing.module';
import { ExercicesDetailComponent } from './exercices-detail.component';


@NgModule({  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ShareModule,
    ExercicesDetailPageRoutingModule
  ],
  providers: [InAppBrowser] ,
  declarations: [ExercicesDetailComponent]
})
export class ExercicesDetailModule { }
