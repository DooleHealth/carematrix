import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/shared/share/share.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LifestyleHabitsPageRoutingModule } from './lifestyle-habits-routing.module';
import { LifestyleHabitsPage } from './lifestyle-habits.page';



@NgModule({
  declarations: [LifestyleHabitsPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ShareModule,
    ComponentsModule,
    LifestyleHabitsPageRoutingModule

    
  ]
})
export class LifestyleHabitsPageModule {}
