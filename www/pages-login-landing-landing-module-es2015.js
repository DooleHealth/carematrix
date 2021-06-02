(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-landing-landing-module"],{

/***/ "Ci23":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/landing/landing.page.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-content fullscreen>\n    <div class=\"main-container\">\n        <img style=\"padding-top: 40%;\" src=\"/assets/images/logo.svg\" />\n        <ion-grid>\n            <ion-col>\n                <form [formGroup]=\"loginForm\" (ngSubmit)=\"doDooleAppLogin()\">\n                    <ion-item-divider>\n                        <ion-icon name=\"person\"></ion-icon>\n                        <ion-input type=\"text\" placeholder=\"{{'landing.user_placeholder' | translate }}\" formControlName=\"username\" >\n                        </ion-input>\n                    </ion-item-divider>\n                    <ion-item-divider>\n                        <ion-icon name=\"lock-closed\"></ion-icon>\n                        <app-show-hide-password>\n                            <ion-input type=\"password\" placeholder=\"{{'landing.password_placeholder' | translate }}\" formControlName=\"password\">\n                            </ion-input>\n                        </app-show-hide-password>\n                    </ion-item-divider>\n                    <ion-text (click)=\"passwordRecovery()\">\n                        <a>{{ 'landing.password_recovery' | translate}}</a>\n                    </ion-text>\n                  \n                    <!-- <ion-button type=\"submit\" color=\"primary\" expand=\"block\" class=\"enter-btn\" routerLink=\"legal\">\n                        Iniciar sesión\n                    </ion-button> -->\n\n                    <ion-button type=\"submit\" size=\"medium\" [disabled]=\"!loginForm.valid\"\n                    color=\"primary\" expand=\"block\" class=\"enter-btn\">\n                    {{ 'landing.button_signin' | translate}}</ion-button>\n       \n<!--                     <ion-button expand=\"block\" color=\"transparent\" class=\"buttonLink\">\n                        {{ 'landing.button_registre' | translate}}\n                    </ion-button> -->\n                </form>\n            </ion-col>\n        </ion-grid>\n    </div>\n</ion-content>");

/***/ }),

/***/ "Ibm1":
/*!***************************************************************!*\
  !*** ./src/app/pages/login/landing/landing-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: LandingPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageRoutingModule", function() { return LandingPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./landing.page */ "tV2Q");




const routes = [
    {
        path: '',
        component: _landing_page__WEBPACK_IMPORTED_MODULE_3__["LandingPage"]
    },
    {
        path: 'legal',
        loadChildren: () => __webpack_require__.e(/*! import() | legal-legal-module */ "legal-legal-module").then(__webpack_require__.bind(null, /*! ../legal/legal.module */ "XR32")).then(m => m.LegalPageModule)
    }
];
let LandingPageRoutingModule = class LandingPageRoutingModule {
};
LandingPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LandingPageRoutingModule);



/***/ }),

/***/ "T6vd":
/*!*******************************************************!*\
  !*** ./src/app/pages/login/landing/landing.page.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".enter-btn {\n  margin-top: 10%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xhbmRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtBQUNKIiwiZmlsZSI6ImxhbmRpbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVudGVyLWJ0bntcbiAgICBtYXJnaW4tdG9wOiAxMCU7XG59Il19 */");

/***/ }),

/***/ "tV2Q":
/*!*****************************************************!*\
  !*** ./src/app/pages/login/landing/landing.page.ts ***!
  \*****************************************************/
/*! exports provided: LandingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPage", function() { return LandingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_landing_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./landing.page.html */ "Ci23");
/* harmony import */ var _landing_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./landing.page.scss */ "T6vd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/authentication.service */ "ej43");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @capacitor/core */ "gcOT");
/* harmony import */ var src_app_services_language_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/services/language.service */ "kyOO");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");













const { Storage } = _capacitor_core__WEBPACK_IMPORTED_MODULE_10__["Plugins"];
let LandingPage = class LandingPage {
    constructor(router, route, translate, loadingController, location, authService, alertController, ngZone, languageService, dooleService) {
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.loadingController = loadingController;
        this.location = location;
        this.authService = authService;
        this.alertController = alertController;
        this.ngZone = ngZone;
        this.languageService = languageService;
        this.dooleService = dooleService;
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required
            ]))
        });
    }
    ngOnInit() {
    }
    dismissLoading() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.redirectLoader) {
                console.log("dismissLoading");
                this.redirectLoader.dismiss();
            }
        });
    }
    resetSubmitError() {
        this.submitError = null;
    }
    // Once the auth provider finished the authentication flow, and the auth redirect completes,
    // hide the loader and redirect the user to the profile page
    redirectLoggedUserToHomePage() {
        console.log('[LandingPage] redirectLoggedUserToHomePage()');
        //this.dismissLoading();
        // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
        // That's why we need to wrap the router navigation call inside an ngZone wrapper
        this.ngZone.run(() => {
            //this.router.navigate(['app/home']);
            this.router.navigate(['home']);
        });
    }
    doDooleAppLogin() {
        let text = this.translate.instant('login.submit');
        this.loadingController.create({
            spinner: 'lines',
            message: text + 'DooleApp',
            cssClass: 'custom-loading',
            backdropDismiss: false
        }).then((loader) => {
            const currentUrl = this.location.path();
            this.redirectLoader = loader;
            this.redirectLoader.present();
            this.authService.login(this.loginForm.value).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                console.log('[LandingPage] doDooleAppLogin()', yield res);
                this.dismissLoading();
                //this.checkConditionLegal(res.condicion_legal)
                this.router.navigate(['/legal']);
            }), (error) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                console.log('doDooleAppLogin() ERROR', yield error);
                this.dismissLoading();
                throw error;
            }));
        });
    }
    checkConditionLegal(condicion) {
        if (!condicion)
            this.router.navigate(['/legal']);
        else
            this.redirectLoggedUserToHomePage();
    }
    saveInLocalStorage(data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            /**
             * On iOS this plugin  Storage will use UserDefaults and on Android SharedPreferences.
             * Stored data is cleared if the app is uninstalled.
             */
            yield Storage.set({
                key: 'mutua',
                value: data
            });
        });
    }
    sendPassword(username) {
        console.log('[LandingPage] passwordRecovery()');
        this.dooleService.postAPIpasswordRecovery(username).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            //console.log('[InitialPage] passwordRecovery()', await res);
        }), (err) => {
            console.log('[LandingPage] passwordRecovery() ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    passwordRecovery() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert-class',
                subHeader: this.translate.instant('landing.header_message_password_recovery'),
                message: this.translate.instant('landing.message_password_recovery'),
                inputs: [
                    {
                        name: 'username',
                        type: 'text',
                        placeholder: this.translate.instant('landing.user'),
                    }
                ],
                buttons: [
                    {
                        text: this.translate.instant("alert.button_cancel"),
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('[LandingPage] AlertConfirm Cancel');
                        }
                    }, {
                        text: this.translate.instant("alert.button_send"),
                        handler: (data) => {
                            console.log('[LandingPage] AlertConfirm Okay', data.username);
                            this.sendPassword(data.username);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
LandingPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"] },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] },
    { type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
    { type: src_app_services_language_service__WEBPACK_IMPORTED_MODULE_11__["LanguageService"] },
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_12__["DooleService"] }
];
LandingPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-landing',
        template: _raw_loader_landing_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_landing_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], LandingPage);



/***/ }),

/***/ "uOmu":
/*!*******************************************************!*\
  !*** ./src/app/pages/login/landing/landing.module.ts ***!
  \*******************************************************/
/*! exports provided: LandingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageModule", function() { return LandingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _landing_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./landing-routing.module */ "Ibm1");
/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./landing.page */ "tV2Q");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/components/components.module */ "j1ZV");










const routes = [
    {
        path: '',
        component: _landing_page__WEBPACK_IMPORTED_MODULE_6__["LandingPage"]
    }
];
let LandingPageModule = class LandingPageModule {
};
LandingPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            src_app_components_components_module__WEBPACK_IMPORTED_MODULE_9__["ComponentsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild(routes),
            _landing_routing_module__WEBPACK_IMPORTED_MODULE_5__["LandingPageRoutingModule"]
        ],
        declarations: [_landing_page__WEBPACK_IMPORTED_MODULE_6__["LandingPage"]]
    })
], LandingPageModule);



/***/ })

}]);
//# sourceMappingURL=pages-login-landing-landing-module-es2015.js.map