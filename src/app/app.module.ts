import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, Optional, PLATFORM_ID, LOCALE_ID, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy, Platform } from "@ionic/angular";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { TokenInterceptorService } from "../app/interceptors/auth.interceptor";
import { File } from '@awesome-cordova-plugins/file/ngx';
import { fakeBackendProvider } from "../app/interceptors/fake-backend.interceptor";
import { FingerprintAIO } from "@awesome-cordova-plugins/fingerprint-aio/ngx"
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { GlobalErrorHandler } from "./shared/classes/global-error-handler";
import { ServerErrorInterceptor } from "../app/interceptors/server-error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ComponentsModule } from "./components/components.module";
import { DatePipe, isPlatformServer } from "@angular/common";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { registerLocaleData } from '@angular/common';
import { AngularFireModule } from "@angular/fire/compat";

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {environment} from "../environments/environment";
import { LanguageService } from "./services/language.service";
import { FileTransfer } from "@awesome-cordova-plugins/file-transfer/ngx";
import { DocumentViewer } from "@awesome-cordova-plugins/document-viewer/ngx";
import { PhotoViewer } from "@awesome-cordova-plugins/photo-viewer/ngx";
import { Health } from '@awesome-cordova-plugins/health/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import localeNo from '@angular/common/locales/no';
import localeSv from '@angular/common/locales/sv';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from "./interceptors/timeout.interceptor";
import { Network } from "@awesome-cordova-plugins/network/ngx";
import { TestTypePageModule } from "./pages/tracking/documents-add/test-type/test-type.module";
import { HttpRequestInterceptor } from "./interceptors/loading.interceptor";
import { Badge } from "@awesome-cordova-plugins/badge/ngx";
import { ReminderAddPageModule } from "./pages/agenda/reminder-add/reminder-add.module";
import { BackgroundMode } from "@awesome-cordova-plugins/background-mode/ngx";
//import { BLE } from "@awesome-cordova-plugins/ble/ngx";
import { Market } from "@awesome-cordova-plugins/market/ngx";
import { Device } from "@awesome-cordova-plugins/device/ngx";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { VideocallPageModule } from "./pages/agenda/videocall/videocall.module";
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { DirectiveModule } from "./directive/directive.module";
import config from '../../capacitor.config';
import {SentryConfi, AppVersion} from './utils/sentry-confi';

import * as Sentry from "@sentry/capacitor";
import * as SentrySibling from "@sentry/angular-ivy";

registerLocaleData(localeEn);
registerLocaleData(localeEs);
registerLocaleData(localeCa);
registerLocaleData(localePt);
registerLocaleData(localeNo);
registerLocaleData(localeSv);


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
/*..SENTRY YA IMPLEMENTADO PARA CUANDO ESTE EN LA WEB TODO LISTO.
      SOLO PONER EL DSN QUE ESTE EN LA WEB
*/
/*
Sentry.init({
  dsn: "",
  release: `${config.appName}`+` V- ` +`${AppVersion}`,
  dist: "1",
  tracesSampleRate: 1.0,
  integrations: [
    SentrySibling.browserTracingIntegration(),
  ],
  tracePropagationTargets: [
    "localhost",
    SentryConfi
  ],
},

SentrySibling.init
);*/



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    TestTypePageModule,
    ReminderAddPageModule,
    NgCircleProgressModule,
    VideocallPageModule,
    DirectiveModule
    
  ],
  providers: [
    Ng2SearchPipeModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true },
    { provide: DEFAULT_TIMEOUT, useValue: 20000 },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ca-ES'},
    LanguageService,
    FileTransfer,
    File,
    //BLE,
    Badge,
    DocumentViewer,
    PhotoViewer,
    Health,
    SocialSharing,
    Calendar,
    FingerprintAIO,
    Device,
    Platform,
    Network,
    BackgroundMode,
    fakeBackendProvider,
    DatePipe,
    Market,
    ScreenOrientation,
    {
      provide: APP_INITIALIZER,
      useFactory: (platformId: object, response: any) => {
        return () => {
          // In the server.ts we added a custom response header with information about the device requesting the app
          if (isPlatformServer(platformId)) {
            if (response && response !== null) {
              // Get custom header from the response sent from the server.ts
              const mobileDeviceHeader = response.get('mobile-device');
              // Set Ionic config mode?
            }
          }
        };
      },
      deps: [PLATFORM_ID, [new Optional(), RESPONSE]],
      multi: true
    },


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA],
  exports:[HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
