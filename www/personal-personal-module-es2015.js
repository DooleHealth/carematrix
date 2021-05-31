(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["personal-personal-module"],{

/***/ "/j/C":
/*!*********************************************************!*\
  !*** ./src/app/pages/profile/personal/personal.page.ts ***!
  \*********************************************************/
/*! exports provided: PersonalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalPage", function() { return PersonalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_personal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./personal.page.html */ "1vVg");
/* harmony import */ var _personal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./personal.page.scss */ "uImq");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");







let PersonalPage = class PersonalPage {
    constructor(dooleService, router, translate) {
        this.dooleService = dooleService;
        this.router = router;
        this.translate = translate;
    }
    ngOnInit() {
        this.getDataProfile();
    }
    getDataProfile() {
        this.dooleService.getAPIuserProfile().subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.userProfile = res;
            console.log('[InitialPage] getDataProfile()', yield this.userProfile);
        }), (err) => {
            console.log('getDataProfile() ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    goBack() {
        this.router.navigateByUrl('/profile');
    }
};
PersonalPage.ctorParameters = () => [
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] }
];
PersonalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-personal',
        template: _raw_loader_personal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_personal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PersonalPage);



/***/ }),

/***/ "1vVg":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/personal/personal.page.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"{{ 'personal.button_back' | translate }}\" ></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ 'personal.header' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen class=\"whiteBackground\">\n  <div>\n    <ion-grid class=\"paddingGrid\">\n      <ion-row>\n        <ion-col size=\"12\">\n          <ion-img *ngIf='this.userProfile as UserProfile'\n            [src]=\"this.userProfile.image\"\n            class=\"img-wrapper\"\n          ></ion-img>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-list *ngIf='this.userProfile as UserProfile'>\n      <ion-item *ngIf=\"this.userProfile.first_name !== null\">\n        <ion-label>{{ 'personal.first_name' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.first_name}}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.last_name !== null\">\n        <ion-label>{{ 'personal.last_name' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.last_name}}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.birthdate_european !== null\">\n        <ion-label>{{ 'personal.birthdate' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.birthdate_european}}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.gender !== null\">\n        <ion-label>{{ 'personal.gender' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.gender}}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.height !== null\"> \n        <ion-label>{{ 'personal.height' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.height}}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.weight !== null\">\n        <ion-label>{{ 'personal.weight' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.weight }}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.blood_group !== null\">\n        <ion-label>{{ 'personal.blood_group' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">{{this.userProfile.blood_group }}</ion-label>\n      </ion-item>\n      <ion-item *ngIf=\"this.userProfile.diagnostics !== null\">\n        <ion-label>{{ 'personal.diagnostics' | translate}}</ion-label>\n        <div *ngFor=\"let diagnostic of this.userProfile.diagnostics \" >\n          <ion-label class=\"textMedium\">{{diagnostic}}</ion-label>\n        </div>\n         \n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label>{{ 'personal.allergies' | translate}}</ion-label>\n        <div *ngFor=\"let allergy of this.userProfile.allergies \" >\n          <ion-label class=\"textMedium\">{{allergy}}</ion-label>\n        </div>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ "5fiz":
/*!*******************************************************************!*\
  !*** ./src/app/pages/profile/personal/personal-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: PersonalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalPageRoutingModule", function() { return PersonalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _personal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./personal.page */ "/j/C");




const routes = [
    {
        path: '',
        component: _personal_page__WEBPACK_IMPORTED_MODULE_3__["PersonalPage"]
    }
];
let PersonalPageRoutingModule = class PersonalPageRoutingModule {
};
PersonalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PersonalPageRoutingModule);



/***/ }),

/***/ "c7e1":
/*!***********************************************************!*\
  !*** ./src/app/pages/profile/personal/personal.module.ts ***!
  \***********************************************************/
/*! exports provided: PersonalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonalPageModule", function() { return PersonalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _personal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./personal-routing.module */ "5fiz");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _personal_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./personal.page */ "/j/C");








let PersonalPageModule = class PersonalPageModule {
};
PersonalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"],
            _personal_routing_module__WEBPACK_IMPORTED_MODULE_5__["PersonalPageRoutingModule"]
        ],
        declarations: [_personal_page__WEBPACK_IMPORTED_MODULE_7__["PersonalPage"]]
    })
], PersonalPageModule);



/***/ }),

/***/ "uImq":
/*!***********************************************************!*\
  !*** ./src/app/pages/profile/personal/personal.page.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-back-button {\n  display: block;\n  color: #3498db;\n}\n\n.img-wrapper {\n  max-height: 81px;\n  max-width: 81px;\n  display: block;\n  margin: auto;\n}\n\n.paddingGrid {\n  margin-top: 10%;\n  margin-bottom: 10%;\n}\n\n.txtTitle {\n  font-size: 18px;\n}\n\n.whiteBackground {\n  --ion-background-color: white !important;\n}\n\n.textMedium {\n  text-align: right;\n  color: #7f8c8d;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3BlcnNvbmFsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGNBQUE7RUFDQSxjQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSx3Q0FBQTtBQUNGOztBQUVBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0FBQ0YiLCJmaWxlIjoicGVyc29uYWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWJhY2stYnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGNvbG9yOiAjMzQ5OGRiO1xufVxuXG4uaW1nLXdyYXBwZXIge1xuICBtYXgtaGVpZ2h0OiA4MXB4O1xuICBtYXgtd2lkdGg6IDgxcHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IGF1dG87XG59XG5cbi5wYWRkaW5nR3JpZCB7XG4gIG1hcmdpbi10b3A6IDEwJTtcbiAgbWFyZ2luLWJvdHRvbTogMTAlO1xufVxuXG4udHh0VGl0bGUge1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi53aGl0ZUJhY2tncm91bmQge1xuICAtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4udGV4dE1lZGl1bSB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBjb2xvcjogIzdmOGM4ZDtcbn1cbiJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=personal-personal-module-es2015.js.map