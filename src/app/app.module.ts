import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, Optional, PLATFORM_ID, LOCALE_ID } from "@angular/core";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { TokenInterceptorService } from "../app/interceptors/auth.interceptor";
import { File } from '@ionic-native/file/ngx';
import { fakeBackendProvider } from "../app/interceptors/fake-backend.interceptor";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx"
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
import { isPlatformServer } from "@angular/common";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { registerLocaleData } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from "../environments/environment";
import { LanguageService } from "./services/language.service";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import { Health } from '@ionic-native/health/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import {IonicStorageModule} from '@ionic/storage';
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';AngularFireModule
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from "./interceptors/timeout.interceptor";
import { Network } from "@ionic-native/network/ngx";
import { TestTypePageModule } from "./pages/tracking/documents-add/test-type/test-type.module";
import { HttpRequestInterceptor } from "./interceptors/loading.interceptor";
import { Badge } from "@ionic-native/badge/ngx";
import { ReminderAddPageModule } from "./pages/agenda/reminder-add/reminder-add.module";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";


registerLocaleData(localeEs);
registerLocaleData(localeCa);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    ComponentsModule,
    Ng2SearchPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: "ca",
    }),
    BrowserAnimationsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    TestTypePageModule,
    ReminderAddPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Ng2SearchPipeModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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

    Badge,
    DocumentViewer,
    PhotoViewer,
    Health,
    SocialSharing,
    Calendar,
    FingerprintAIO,
    Network,
    BackgroundMode,
    fakeBackendProvider,
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
  bootstrap: [AppComponent],
})
export class AppModule { }
