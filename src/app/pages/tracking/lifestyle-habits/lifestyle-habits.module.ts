import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifestyleHabitsComponent } from './lifestyle-habits.component';
import { LifestyleRoutingModule } from './lifestyle-habits-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/shared/share/share.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [LifestyleHabitsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    ShareModule,
    ComponentsModule,
    LifestyleRoutingModule

    
  ]
})
export class LifestyleHabitsModule { }
