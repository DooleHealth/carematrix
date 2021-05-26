(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["password-password-module"],{

/***/ "4ntE":
/*!********************************************************************!*\
  !*** ./src/app/pages/profile/settings/password/password.page.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXNzd29yZC5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "N/bm":
/*!******************************************************************!*\
  !*** ./src/app/pages/profile/settings/password/password.page.ts ***!
  \******************************************************************/
/*! exports provided: PasswordPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordPage", function() { return PasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_password_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./password.page.html */ "e3xn");
/* harmony import */ var _password_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./password.page.scss */ "4ntE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");









let PasswordPage = class PasswordPage {
    constructor(dooleService, formBuilder, alertController, router, translate) {
        this.dooleService = dooleService;
        this.formBuilder = formBuilder;
        this.alertController = alertController;
        this.router = router;
        this.translate = translate;
        this.isSubmittedNewPassword = false;
        this.isSubmittedRepeatedPassword = false;
        this.isSubmittedCurrentPassword = false;
    }
    ngOnInit() {
        this.formPassword = this.formBuilder.group({
            newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(4)]],
            confirmedPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(4), this.checkPasswords.bind(this)]],
            currentPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(4)]],
        });
    }
    checkPasswords(group) {
        if (this.formPassword !== null && this.formPassword !== undefined) {
            const pass = this.formPassword.get('newPassword').value;
            const confirmPass = group.value;
            //console.log(`[PasswordPage] checkPasswords(${pass}, ${confirmPass})`);
            return pass === confirmPass ? null : {
                NotEqual: true
            };
        }
    }
    changePassword() {
        this.isSubmittedPassword(true);
        if (!this.formPassword.invalid) {
            this.presentAlertConfirm();
            console.log(`[PasswordPage] changePassword(OK)`);
        }
    }
    getErrorCurrentPassword() {
        if (this.formPassword.get('currentPassword').hasError('required')) {
            return this.translate.instant("setting.password.validators_required");
        }
        if (this.formPassword.get('currentPassword').hasError('minlength')) {
            return this.translate.instant("setting.password.validators_minlength");
        }
        return '';
    }
    getErrorNewPassword() {
        if (this.formPassword.get('newPassword').hasError('required')) {
            return this.translate.instant("setting.password.validators_required");
        }
        if (this.formPassword.get('newPassword').hasError('minlength')) {
            return this.translate.instant("setting.password.validators_minlength");
        }
        return '';
    }
    getErrorConfirmPassword() {
        if (this.formPassword.get('confirmedPassword').hasError('required')) {
            return this.translate.instant("setting.password.validators_required");
        }
        if (this.formPassword.get('confirmedPassword').hasError('NotEqual')) {
            return this.translate.instant("setting.password.validators_check_password");
        }
        return '';
    }
    presentAlertConfirm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert-class',
                header: this.translate.instant("alert.header_confirmation"),
                message: this.translate.instant("setting.password.password_confirmation"),
                buttons: [
                    {
                        text: this.translate.instant("alert.button_cancel"),
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: this.translate.instant("alert.button_ok"),
                        handler: () => {
                            console.log('Confirm Okay');
                            this.postChangePassword();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    presentAlert(message) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert-class',
                message: message,
                buttons: [{
                        text: this.translate.instant("alert.button_ok"),
                        handler: () => {
                            console.log('Confirm Okay');
                            this.isSubmittedPassword(false);
                            this.router.navigateByUrl('/profile/settings');
                        }
                    }],
                backdropDismiss: false
            });
            yield alert.present();
        });
    }
    postChangePassword() {
        let params = {
            oldPassword: this.formPassword.get('currentPassword').value,
            newPassword: this.formPassword.get('newPassword').value,
        };
        this.dooleService.postAPIChangePassword(params).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[InitialPage] postChangePassword()', yield res);
            if (res.success) {
                this.presentAlert(this.translate.instant("setting.password.success_changed_password"));
            }
            else {
                this.presentAlert(this.translate.instant("setting.password.no_success_changed_password"));
            }
        }), (err) => {
            console.log('postChangePassword() ERROR(' + err.code + '): ' + err.message);
            this.presentAlert(this.translate.instant("setting.password.error_changed_password"));
            throw err;
        });
    }
    isSubmittedPassword(isSubmitted) {
        this.isSubmittedNewPassword = isSubmitted;
        this.isSubmittedRepeatedPassword = isSubmitted;
        this.isSubmittedCurrentPassword = isSubmitted;
    }
};
PasswordPage.ctorParameters = () => [
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__["DooleService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] }
];
PasswordPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-password',
        template: _raw_loader_password_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_password_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PasswordPage);



/***/ }),

/***/ "Ul5O":
/*!********************************************************************!*\
  !*** ./src/app/pages/profile/settings/password/password.module.ts ***!
  \********************************************************************/
/*! exports provided: PasswordPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordPageModule", function() { return PasswordPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _password_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./password-routing.module */ "ylY6");
/* harmony import */ var _password_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./password.page */ "N/bm");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








let PasswordPageModule = class PasswordPageModule {
};
PasswordPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _password_routing_module__WEBPACK_IMPORTED_MODULE_5__["PasswordPageRoutingModule"]
        ],
        declarations: [_password_page__WEBPACK_IMPORTED_MODULE_6__["PasswordPage"]]
    })
], PasswordPageModule);



/***/ }),

/***/ "e3xn":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/settings/password/password.page.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button icon=\"\" text=\"{{'alert.button_cancel' | translate }}\" ></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{'setting.password.title_change_password' | translate }}</ion-title>\n    <ion-button slot=\"end\" fill=\"clear\" (click)=\"changePassword()\">OK\n    </ion-button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <form [formGroup]=\"formPassword\" (ngSubmit)=\"changePassword()\">\n    <ion-card class=\"cardProfile\">\n          <ion-list>\n            <ion-item lines=\"none\" >\n              <ion-label>{{'setting.password.current-password' | translate }}</ion-label>\n              <ion-input type=\"current-password\" (ionInput)=\"isSubmittedCurrentPassword = false\" formControlName=\"currentPassword\" class=\"textMedium\" placeholder=\"{{'setting.password.password' | translate }}\" minlength=\"4\" required></ion-input>\n            </ion-item>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmittedCurrentPassword && this.formPassword.get('currentPassword').invalid\">\n                {{this.getErrorCurrentPassword()}}\n              </ion-label>\n          </ion-list>\n    </ion-card>\n    <ion-card class=\"cardProfile\">\n      <ion-list>\n        <ion-item>\n          <ion-label >{{'setting.password.new-password' | translate }}</ion-label>\n          <!-- <ion-label class=\"textMedium\">Contraseña</ion-label> -->\n          <ion-input type=\"new-password\" (ionInput)=\"isSubmittedNewPassword = false\" formControlName=\"newPassword\" class=\"textMedium\" placeholder=\"{{'setting.password.password' | translate }}\" minlength=\"4\"  required></ion-input>\n        </ion-item>\n        <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmittedCurrentPassword && this.formPassword.get('newPassword').invalid\">\n          {{this.getErrorNewPassword()}}\n        </ion-label>\n        <ion-item lines=\"none\">\n          <ion-label>{{'setting.password.confirmedPassword' | translate }}</ion-label>\n          <!-- <ion-label class=\"textMedium\">Contraseña</ion-label> -->\n          <ion-input type=\"new-password\" (ionInput)=\"isSubmittedRepeatedPassword = false\" formControlName=\"confirmedPassword\" class=\"textMedium\" placeholder=\"{{'setting.password.password' | translate }}\" required=\"true\"></ion-input>\n        </ion-item>\n        <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmittedRepeatedPassword && this.formPassword.get('confirmedPassword').invalid\">\n          {{this.getErrorConfirmPassword()}}\n        </ion-label>\n      </ion-list>\n</ion-card>\n</form>\n</ion-content>");

/***/ }),

/***/ "ylY6":
/*!****************************************************************************!*\
  !*** ./src/app/pages/profile/settings/password/password-routing.module.ts ***!
  \****************************************************************************/
/*! exports provided: PasswordPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordPageRoutingModule", function() { return PasswordPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _password_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./password.page */ "N/bm");




const routes = [
    {
        path: '',
        component: _password_page__WEBPACK_IMPORTED_MODULE_3__["PasswordPage"]
    }
];
let PasswordPageRoutingModule = class PasswordPageRoutingModule {
};
PasswordPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PasswordPageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=password-password-module-es2015.js.map