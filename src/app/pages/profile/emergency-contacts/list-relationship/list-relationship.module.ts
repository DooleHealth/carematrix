import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRelationshipPageRoutingModule } from './list-relationship-routing.module';

import { ListRelationshipPage } from './list-relationship.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ListRelationshipPageRoutingModule
  ],
  declarations: [ListRelationshipPage]
})
export class ListRelationshipPageModule {}
