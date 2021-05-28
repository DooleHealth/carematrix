(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["verification-verification-module"],{

/***/ "3Tn+":
/*!***************************************************************!*\
  !*** ./src/app/pages/login/verification/verification.page.ts ***!
  \***************************************************************/
/*! exports provided: VerificationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationPage", function() { return VerificationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_verification_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./verification.page.html */ "Rz++");
/* harmony import */ var _verification_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./verification.page.scss */ "PJ6W");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @capacitor/core */ "gcOT");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");










const { Storage } = _capacitor_core__WEBPACK_IMPORTED_MODULE_6__["Plugins"];
let VerificationPage = class VerificationPage {
    constructor(router, translate, alertController, dooleService) {
        this.router = router;
        this.translate = translate;
        this.alertController = alertController;
        this.dooleService = dooleService;
        this.KEY_TELEPHONE_STORAGE = 'telephone';
        this.isSubmitted = false;
        this.code = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(4)]);
    }
    ngOnInit() {
    }
    goIntro() {
        console.log('[VerificationPage] goIntro()', this.code.value);
        this.isSubmitted = true;
        if (!this.code.invalid) {
            this.checkCode(this.code.value);
        }
    }
    checkCode(code) {
        this.dooleService.postAPIsmsConfirmation(code).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[VerificationPage] checkCode()', yield res);
            let isSuccess = res.success;
            if (isSuccess) {
                this.router.navigateByUrl("intro");
            }
            else {
                this.dooleService.presentAlert(this.translate.instant("verification.alert_message"));
            }
        }), (err) => {
            console.log('VerificationPage checkCode()  ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    sendTelephone(telephone) {
        console.log('[VerificationPage] sendTelephone()', telephone);
        this.dooleService.postAPIsmsVerification(telephone).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[LegalPage] sendTelephone()', yield res);
            let isSuccess = res.success;
            if (isSuccess) {
                let messagge = this.translate.instant("verification.send_telephone_alert_message");
                yield this.dooleService.presentAlert(messagge);
            }
        }), (err) => {
            console.log('getAll ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    getVerificationCode() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[VerificationPage] getVerificationCode()');
            Storage.get({ key: this.KEY_TELEPHONE_STORAGE }).then((data) => {
                let telephone = data.value;
                this.sendTelephone(telephone);
            });
        });
    }
};
VerificationPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"] },
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_9__["DooleService"] }
];
VerificationPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-verification',
        template: _raw_loader_verification_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_verification_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], VerificationPage);



/***/ }),

/***/ "EHAZ":
/*!*****************************************************************!*\
  !*** ./src/app/pages/login/verification/verification.module.ts ***!
  \*****************************************************************/
/*! exports provided: VerificationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationPageModule", function() { return VerificationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _verification_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./verification-routing.module */ "LxuC");
/* harmony import */ var _verification_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./verification.page */ "3Tn+");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








let VerificationPageModule = class VerificationPageModule {
};
VerificationPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _verification_routing_module__WEBPACK_IMPORTED_MODULE_5__["VerificationPageRoutingModule"]
        ],
        declarations: [_verification_page__WEBPACK_IMPORTED_MODULE_6__["VerificationPage"]]
    })
], VerificationPageModule);



/***/ }),

/***/ "LxuC":
/*!*************************************************************************!*\
  !*** ./src/app/pages/login/verification/verification-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: VerificationPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationPageRoutingModule", function() { return VerificationPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _verification_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./verification.page */ "3Tn+");




const routes = [
    {
        path: '',
        component: _verification_page__WEBPACK_IMPORTED_MODULE_3__["VerificationPage"]
    },
    {
        path: 'intro',
        loadChildren: () => __webpack_require__.e(/*! import() | onboarding-intro-intro-module */ "onboarding-intro-intro-module").then(__webpack_require__.bind(null, /*! ../../onboarding/intro/intro.module */ "hxez")).then(m => m.IntroPageModule)
    }
];
let VerificationPageRoutingModule = class VerificationPageRoutingModule {
};
VerificationPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], VerificationPageRoutingModule);



/***/ }),

/***/ "PJ6W":
/*!*****************************************************************!*\
  !*** ./src/app/pages/login/verification/verification.page.scss ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2ZXJpZmljYXRpb24ucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "Rz++":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/verification/verification.page.html ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [text]=\"buttonText\" [icon]=\"buttonIcon\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"toolbarTitle\">{{ 'verification.header' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <div class=\"main-container\">\n    <ion-grid>\n      <h2 class=\"bold\">{{ 'verification.title' | translate}}</h2>\n      <ion-text>{{ 'verification.text1' | translate}}</ion-text><a (click)=\"getVerificationCode()\">aquí.</a>\n      <ion-col>\n        <div style=\"padding-top: 15%;\">\n          <ion-item-divider>\n            <ion-input placeholder=\"\" [formControl]=\"code\" maxlength=\"4\" (ionInput)=\"isSubmitted = false\" required></ion-input>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmitted && this.code.hasError('required')\">\n              {{ 'verification.error_required' | translate}}\n            </ion-label>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmitted && this.code.hasError('minlength')\">\n              {{ 'verification.error_min_lenght' | translate}}\n            </ion-label>\n          </ion-item-divider>\n          <ion-button type=\"button\" color=\"primary\" expand=\"block\" style=\"margin-top:15%;\" (click)=\"goIntro()\">\n            {{ 'verification.next_button' | translate}}\n          </ion-button>\n        </div>\n      </ion-col>\n    </ion-grid>\n  </div>\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=verification-verification-module-es2015.js.map