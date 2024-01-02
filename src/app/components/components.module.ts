import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import { VideoComponent } from './video/video.component';
import { TranslateModule } from '@ngx-translate/core';
import { InfoComponent } from './info/info.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { CachedImageComponent } from './cached-image/cached-image.component';
import { AutocompleteComponent } from './form/autocomplete/autocomplete.component';
import { BioquimicComponent } from './form/bioquimic/bioquimic.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { FileComponent } from './form/file/file.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { HeaderComponent } from './form/header/header.component';
import { HiddenComponent } from './form/hidden/hidden.component';
import { InputComponent } from './form/input/input.component';
import { ParagraphComponent } from './form/paragraph/paragraph.component';
import { RadioComponent } from './form/radio/radio.component';
import { SelectComponent } from './form/select/select.component';
import { FormDirective } from './form/shared/form.directive';
import { SliderComponent } from './form/slider/slider.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { TooltipComponent } from './form/tooltip/tooltip.component';
import { SafeHtmlPipe } from './form/shared/safe-html.pipe';
import { NgxSliderModule } from 'ngx-slider-v2';
import { ContentComponent } from './shared-care-plan/content/content.component';
import { LifestyleIndexComponent } from './shared-care-plan/lifestyle-index/lifestyle-index.component';
import { ContentCircleProgressComponent } from './shared-care-plan/content-circle-progress/content-circle-progress.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ScpMedForMonComponent } from './shared-care-plan/scp-med-for-mon/scp-med-for-mon.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { FileUploadV2Component } from './file-upload-v2/file-upload-v2.component';
import { ConfirmationAnswersComponent } from './form/confirmation-answers/confirmation-answers.component';
import { ContentDateComponent } from './shared-care-plan/content-date/content-date.component';
import { ShowIframeComponent } from './shared-care-plan/show-iframe/show-iframe.component';
import { PendingComponentComponent } from './shared-care-plan/pending-component/pending-component.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShellModule,
        IonicModule,
        RouterModule,
        TranslateModule,
        NgxSliderModule,
        NgCircleProgressModule.forRoot({})
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
    VideoComponent,
    InfoComponent,
    ChangeUserComponent,
    CachedImageComponent,
    // All Components Form
    FormControlComponent,
    HeaderComponent,
    SliderComponent,
    BioquimicComponent,
    CheckboxComponent,
    RadioComponent,
    AutocompleteComponent,
    SelectComponent,
    TextareaComponent,
    InputComponent,
    ParagraphComponent,
    HiddenComponent,
    FileComponent,
    TooltipComponent,
    FormDirective,
    SafeHtmlPipe,
    ContentComponent,
    LifestyleIndexComponent,
    ContentCircleProgressComponent,
    ScpMedForMonComponent,
    PdfViewerComponent,
    ConfirmationAnswersComponent,
    FileUploadV2Component,
    ContentDateComponent,
    ShowIframeComponent,
    PendingComponentComponent
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
    InfoComponent,
    ChangeUserComponent,
    CachedImageComponent,
    // All Components Form
    FormControlComponent,
    FileComponent,
    HeaderComponent,
    SliderComponent,
    BioquimicComponent,
    CheckboxComponent,
    RadioComponent,
    AutocompleteComponent,
    SelectComponent,
    TextareaComponent,
    InputComponent,
    ParagraphComponent,
    HiddenComponent,
    TooltipComponent,
    ContentComponent,
    LifestyleIndexComponent,
    ContentCircleProgressComponent,
    ScpMedForMonComponent,
    PdfViewerComponent,
    ConfirmationAnswersComponent,
    FileUploadV2Component,
    ContentDateComponent,
    ShowIframeComponent,
    PendingComponentComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ComponentsModule {}
