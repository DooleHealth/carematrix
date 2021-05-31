(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sms-sms-module"],{

/***/ "OvAX":
/*!*******************************************************!*\
  !*** ./src/app/pages/login/sms/sms-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: SmsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsPageRoutingModule", function() { return SmsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _sms_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sms.page */ "gtvT");




const routes = [
    {
        path: '',
        component: _sms_page__WEBPACK_IMPORTED_MODULE_3__["SmsPage"]
    },
    {
        path: 'verification',
        loadChildren: () => __webpack_require__.e(/*! import() | verification-verification-module */ "verification-verification-module").then(__webpack_require__.bind(null, /*! ../verification/verification.module */ "EHAZ")).then(m => m.VerificationPageModule)
    }
];
let SmsPageRoutingModule = class SmsPageRoutingModule {
};
SmsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SmsPageRoutingModule);



/***/ }),

/***/ "cqrv":
/*!***********************************************!*\
  !*** ./src/app/pages/login/sms/sms.page.scss ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbXMucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "gtvT":
/*!*********************************************!*\
  !*** ./src/app/pages/login/sms/sms.page.ts ***!
  \*********************************************/
/*! exports provided: SmsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsPage", function() { return SmsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_sms_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./sms.page.html */ "wEmF");
/* harmony import */ var _sms_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sms.page.scss */ "cqrv");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @capacitor/core */ "gcOT");










const { Storage } = _capacitor_core__WEBPACK_IMPORTED_MODULE_9__["Plugins"];
let SmsPage = class SmsPage {
    constructor(router, translate, alertController, dooleService) {
        this.router = router;
        this.translate = translate;
        this.alertController = alertController;
        this.dooleService = dooleService;
        this.COUNTRY_CODE = "+34";
        this.isSubmitted = false;
        this.telephone = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(9)]);
    }
    ngOnInit() {
    }
    goVerification() {
        console.log('[LegalPage] goVerification()', this.telephone.value);
        this.isSubmitted = true;
        if (!this.telephone.invalid) {
            this.presentAlertConfirm();
        }
    }
    presentAlertConfirm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const telephoneTemp = this.COUNTRY_CODE + this.telephone.value;
            const alert = yield this.alertController.create({
                cssClass: 'my-alert-class',
                header: this.COUNTRY_CODE + " " + this.telephone.value,
                message: this.translate.instant("sms.alert_message"),
                buttons: [
                    {
                        text: this.translate.instant("sms.ko_button"),
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: this.translate.instant("sms.ok_button"),
                        handler: () => {
                            console.log('Confirm Okay');
                            this.sendTelephone(telephoneTemp);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    sendTelephone(telephone) {
        this.dooleService.postAPIsmsVerification(telephone).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[LegalPage] sendTelephone()', yield res);
            let isSuccess = res.success;
            if (isSuccess) {
                this.saveTelephone();
                this.router.navigateByUrl("verification");
            }
            else {
                console.log('[LegalPage] sendTelephone() Unsuccessful response', yield res);
            }
        }), (err) => {
            console.log('getAll ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    saveTelephone() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield Storage.set({
                key: 'telephone',
                value: this.COUNTRY_CODE + this.telephone.value
            });
            console.log(`[VerificationPage] saveTelephone()`);
        });
    }
};
SmsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__["DooleService"] }
];
SmsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-sms',
        template: _raw_loader_sms_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_sms_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SmsPage);



/***/ }),

/***/ "o3pB":
/*!***********************************************!*\
  !*** ./src/app/pages/login/sms/sms.module.ts ***!
  \***********************************************/
/*! exports provided: SmsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsPageModule", function() { return SmsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _sms_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sms-routing.module */ "OvAX");
/* harmony import */ var _sms_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sms.page */ "gtvT");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








let SmsPageModule = class SmsPageModule {
};
SmsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _sms_routing_module__WEBPACK_IMPORTED_MODULE_5__["SmsPageRoutingModule"]
        ],
        declarations: [_sms_page__WEBPACK_IMPORTED_MODULE_6__["SmsPage"]]
    })
], SmsPageModule);



/***/ }),

/***/ "wEmF":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/sms/sms.page.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [text]=\"buttonText\" [icon]=\"buttonIcon\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"toolbarTitle\">{{ 'sms.header' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <div class=\"main-container\">\n    <ion-grid>\n      <h2 class=\"bold\">{{ 'sms.title' | translate}}</h2>\n      <ion-text>{{ 'sms.text1' | translate}}</ion-text>\n      <ion-col>\n        <div style=\"padding-top: 15%;\">\n          <ion-item-divider>  \n            <span>+34 </span>          \n            <ion-input type=\"tel-country-code\" (ionInput)=\"isSubmitted = false\" [formControl]=\"telephone\" maxlength=\"9\"  required></ion-input>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmitted && this.telephone.hasError('required')\">\n              {{ 'sms.error_required' | translate}}\n            </ion-label>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmitted && this.telephone.hasError('minlength')\">\n              {{ 'sms.error_min_lenght' | translate}}\n            </ion-label>\n          </ion-item-divider>\n          <ion-button type=\"button\" color=\"primary\" expand=\"block\" style=\"margin-top:15%;\" (click)=\"goVerification()\">\n            {{ 'sms.next_button' | translate}}\n          </ion-button>\n          <div style=\"padding-top:5%;\">\n            <ion-text>{{ 'sms.text2' | translate}}</ion-text>\n          </div>\n        </div>\n      </ion-col>\n    </ion-grid>\n  </div>\n</ion-content>");

/***/ })

}]);
//# sourceMappingURL=sms-sms-module-es2015.js.map