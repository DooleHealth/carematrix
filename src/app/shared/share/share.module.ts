import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { CachedImageComponent } from 'src/app/components/cached-image/cached-image.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [SafeHtmlPipe]
})
export class ShareModule { }
