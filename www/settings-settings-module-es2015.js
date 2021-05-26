(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["settings-settings-module"],{

/***/ "E2gZ":
/*!*******************************************************************!*\
  !*** ./src/app/pages/profile/settings/settings-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: SettingsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageRoutingModule", function() { return SettingsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.page */ "I2iO");




const routes = [
    {
        path: '',
        component: _settings_page__WEBPACK_IMPORTED_MODULE_3__["SettingsPage"]
    },
    {
        path: 'password',
        loadChildren: () => __webpack_require__.e(/*! import() | password-password-module */ "password-password-module").then(__webpack_require__.bind(null, /*! ./password/password.module */ "Ul5O")).then(m => m.PasswordPageModule)
    }
];
let SettingsPageRoutingModule = class SettingsPageRoutingModule {
};
SettingsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SettingsPageRoutingModule);



/***/ }),

/***/ "I2iO":
/*!*********************************************************!*\
  !*** ./src/app/pages/profile/settings/settings.page.ts ***!
  \*********************************************************/
/*! exports provided: SettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPage", function() { return SettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_settings_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./settings.page.html */ "yqnf");
/* harmony import */ var _settings_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.page.scss */ "J5bP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");





let SettingsPage = class SettingsPage {
    constructor(translate) {
        this.translate = translate;
        this.authentication = true;
        this.faceId = true;
        this.communications = true;
        this.appointment = true;
        this.diets = true;
        this.medication = true;
        this.goals = true;
        this.advices = true;
        this.offers = true;
        this.form = true;
        this.messages = true;
    }
    ngOnInit() {
    }
    changeAuthentication() {
        console.log(`[SettingsPage] changeAuthentication(${this.authentication})`);
    }
    changeFaceId() {
        console.log(`[SettingsPage] changeFaceId(${this.faceId})`);
    }
    changeCommunications() {
        console.log(`[SettingsPage] changeCommunications(${this.communications})`);
    }
    changeAppointment() {
        console.log(`[SettingsPage] changeAppointment(${this.appointment})`);
    }
    changeDiets() {
        console.log(`[SettingsPage] changeDiets(${this.diets})`);
    }
    changeMedication() {
        console.log(`[SettingsPage] changeMedication(${this.medication})`);
    }
    changeAdvices() {
        console.log(`[SettingsPage] changeAdvices(${this.advices})`);
    }
    changeOffers() {
        console.log(`[SettingsPage] changeOffers(${this.offers})`);
    }
    changeGoals() {
        console.log(`[SettingsPage] changeGoals(${this.goals})`);
    }
    changeForm() {
        console.log(`[SettingsPage] changeForm(${this.form})`);
    }
    changeMessages() {
        console.log(`[SettingsPage] changeMessages(${this.messages})`);
    }
};
SettingsPage.ctorParameters = () => [
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
];
SettingsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-settings',
        template: _raw_loader_settings_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_settings_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], SettingsPage);



/***/ }),

/***/ "J5bP":
/*!***********************************************************!*\
  !*** ./src/app/pages/profile/settings/settings.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXR0aW5ncy5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "yqnf":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/settings/settings.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"{{'setting.button_profile' | translate }}\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ 'setting.title_setting' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <div class=\"txtTitle2\"></div>\n    <ion-text class=\"txtTitle2\">{{ 'setting.title_security' | translate}}</ion-text>\n    <ion-card class=\"cardProfile\">\n          <ion-list>\n            <ion-item routerLink=\"password\"  >\n              <ion-label>{{ 'setting.password.title_change_password' | translate}}</ion-label>\n              \n            </ion-item>\n            <ion-item >\n              <ion-label >{{ 'setting.subtitle_authentication' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"authentication\" (ionChange)=\"changeAuthentication()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item lines=\"none\">\n              <ion-label>{{ 'setting.subtitle_face_id' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"faceId\" (ionChange)=\"changeFaceId()\" checked></ion-toggle>\n            </ion-item>\n       \n          </ion-list>\n    </ion-card>\n    <ion-text class=\"txtTitle\">{{ 'setting.title_notification' | translate}}</ion-text>\n    <ion-card class=\"cardProfile\">\n          <ion-list>\n            <ion-item>\n              <ion-label >{{'setting.subtitle_communications' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"communications\" (ionChange)=\"changeCommunications()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item>\n              <ion-label >{{'setting.subtitle_appointment' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"appointment\" (ionChange)=\"changeAppointment()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item>\n              <ion-label >{{'setting.subtitle_diets' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"diets\" (ionChange)=\"changeDiets()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item>\n              <ion-label >{{'setting.subtitle_medication' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"medication\" (ionChange)=\"changeMedication()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item>\n              <ion-label >{{'setting.subtitle_goals' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"goals\" (ionChange)=\"changeGoals()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item>\n              <ion-label >C{{'setting.subtitle_advices' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"advices\" (ionChange)=\"changeAdvices()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item>\n              <ion-label >{{'setting.subtitle_offers' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"offers\" (ionChange)=\"changeOffers()\" checked></ion-toggle>\n            </ion-item>\n             <ion-item>\n              <ion-label >{{'setting.subtitle_form' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"form\" (ionChange)=\"changeForm()\" checked></ion-toggle>\n            </ion-item>\n            <ion-item lines=\"none\">\n              <ion-label>{{'setting.subtitle_messages' | translate}}</ion-label>\n              <ion-toggle slot=\"end\" color=\"success\" [(ngModel)]=\"messages\" (ionChange)=\"changeMessages()\" checked></ion-toggle>\n            </ion-item>\n          </ion-list>\n    </ion-card>\n   \n\n</ion-content>\n\n");

/***/ }),

/***/ "zKZX":
/*!***********************************************************!*\
  !*** ./src/app/pages/profile/settings/settings.module.ts ***!
  \***********************************************************/
/*! exports provided: SettingsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _settings_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings-routing.module */ "E2gZ");
/* harmony import */ var _settings_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings.page */ "I2iO");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








let SettingsPageModule = class SettingsPageModule {
};
SettingsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _settings_routing_module__WEBPACK_IMPORTED_MODULE_5__["SettingsPageRoutingModule"]
        ],
        declarations: [_settings_page__WEBPACK_IMPORTED_MODULE_6__["SettingsPage"]]
    })
], SettingsPageModule);



/***/ })

}]);
//# sourceMappingURL=settings-settings-module-es2015.js.map