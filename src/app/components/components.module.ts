import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ShellModule } from '../utils/shell/shell.module';

import { CheckboxWrapperComponent } from './checkbox-wrapper/checkbox-wrapper.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { RatingInputComponent } from './rating-input/rating-input.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { ElasticTextareaComponent } from './elastic-textarea/elastic-textarea.component';
import { ImageDownloadComponent } from './image-download/image-download';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { PageHeaderComponent } from './page-header/page-header.component'
import { RouterModule} from "@angular/router";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShellModule,
        IonicModule,
        RouterModule
    ],
  declarations: [
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    GoogleMapComponent,
    ImageDownloadComponent,
    ElasticTextareaComponent,
    ChatBubbleComponent,
    CustomHeaderComponent,
    PageHeaderComponent,
    FileUploadComponent,
    ExpandableComponent,
    TabsComponent,

    SliderVerticalComponent,
    SliderHorizontalComponent

  ],
  exports: [
    ShellModule,
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    GoogleMapComponent,
    ImageDownloadComponent,
    ElasticTextareaComponent,
    ChatBubbleComponent,
    CustomHeaderComponent,
    PageHeaderComponent,
    FileUploadComponent,
    ExpandableComponent,
    TabsComponent,

    SliderVerticalComponent,
    SliderHorizontalComponent

  ]
})
export class ComponentsModule {}
