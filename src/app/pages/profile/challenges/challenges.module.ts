import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChallengesPageRoutingModule } from './challenges-routing.module';

import { ChallengesPage } from './challenges.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChallengesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChallengesPage]
})
export class ChallengesPageModule {}
