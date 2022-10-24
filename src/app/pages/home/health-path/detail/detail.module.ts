import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewDetailPageModule } from '../../new-detail/new-detail.module';
import { AdvicesDetailPageModule } from '../../advices-detail/advices-detail.module';
import { DietsDetailPageModule } from 'src/app/pages/diary/diets-detail/diets-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    DetailPageRoutingModule,
    NewDetailPageModule,
    AdvicesDetailPageModule,
    DietsDetailPageModule
    
  ],
  declarations: [DetailPage],
  exports:[TranslateModule]
  
})
export class DetailPageModule {}
