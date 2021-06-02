(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "723k":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.module.ts ***!
  \*************************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./profile-routing.module */ "x0XS");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile.page */ "uxLX");








let ProfilePageModule = class ProfilePageModule {
};
ProfilePageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"],
            _profile_routing_module__WEBPACK_IMPORTED_MODULE_5__["ProfilePageRoutingModule"]
        ],
        declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_7__["ProfilePage"]]
    })
], ProfilePageModule);



/***/ }),

/***/ "EGjV":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.page.scss ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-back-button {\n  display: block;\n  color: #3498DB;\n}\n\n.img-wrapper {\n  max-height: 81px;\n  max-width: 81px;\n  display: block;\n  margin: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBQTtFQUNBLGNBQUE7QUFDSjs7QUFFQTtFQUNJLGdCQUFBO0VBQ0YsZUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBQ0YiLCJmaWxlIjoicHJvZmlsZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tYmFjay1idXR0b24ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiMzNDk4REI7XG4gfVxuXG4uaW1nLXdyYXBwZXIge1xuICAgIG1heC1oZWlnaHQ6IDgxcHg7XG4gIG1heC13aWR0aDogODFweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuXG5cbiJdfQ== */");

/***/ }),

/***/ "VVTS":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/profile.page.html ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"{{ 'profile.button_go_init' | translate}}\" ></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ 'profile.title_profile' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col size=\"12\" *ngIf=\"this.userImage!== undefined\">\n          <ion-img [src]=\"this.userImage\" class=\"img-wrapper\"></ion-img>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col *ngIf='this.userDoole !== undefined'>\n          <h3 style=\"text-align: center;\"> {{this.userDoole.first_name}} {{ this.userDoole.last_name}}</h3>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-text class=\"txtTitle\">{{ 'profile.information.title_information' | translate}}</ion-text>\n    <ion-card class=\"cardProfile\">\n          <ion-list>\n            <ion-item routerLink=\"personal\" >\n              <ion-label>{{ 'profile.information.data' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item routerLink=\"cards\" >\n              <ion-label>{{ 'profile.information.your_health_cards' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item routerLink=\"emergency-contacts\">\n              <ion-label>{{ 'profile.information.emergency' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item routerLink=\"family\">\n              <ion-label>{{ 'profile.information.family_unit' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>          \n            <ion-item routerLink=\"goals\">\n              <ion-label>{{ 'profile.information.your_goals' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item lines=\"none\">\n              <ion-label>{{ 'profile.information.payment_method' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n          </ion-list>\n    </ion-card>\n    <ion-text class=\"txtTitle\">{{ 'profile.configuration.title_setting' | translate}}</ion-text>\n    <ion-card class=\"cardProfile\">\n          <ion-list>\n            <ion-item>\n              <ion-label>{{ 'profile.configuration.linked_accounts' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item lines=\"none\" routerLink=\"settings\">\n              <ion-label lines=\"none\">{{ 'profile.configuration.settings' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n          </ion-list>\n    </ion-card>\n    <ion-text class=\"txtTitle\">{{ 'profile.help.title_help' | translate}}</ion-text>\n    <ion-card class=\"cardProfile\">\n          <ion-list>\n            <ion-item routerLink=\"faqs\">\n              <ion-label>{{'profile.help.frequent_questions' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item routerLink=\"report-problem\">\n              <ion-label>{{'profile.help.report_problem' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item>\n              <ion-label>{{ 'profile.help.legal_warning' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n            <ion-item lines=\"none\">\n              <ion-label>{{ 'profile.help.us' | translate}}</ion-label>\n              <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n            </ion-item>\n          </ion-list>\n    </ion-card>\n    <ion-button expand=\"block\" color=\"transparent\" class=\"buttonClose\" (click)=\"signOut()\">\n      {{ 'profile.button_sign_off' | translate}}\n  </ion-button>\n</ion-content>\n");

/***/ }),

/***/ "uxLX":
/*!***********************************************!*\
  !*** ./src/app/pages/profile/profile.page.ts ***!
  \***********************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./profile.page.html */ "VVTS");
/* harmony import */ var _profile_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.page.scss */ "EGjV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/authentication.service */ "ej43");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");
/* harmony import */ var src_app_services_firebase_auth_firebase_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/firebase/auth/firebase-auth.service */ "ejKP");








let ProfilePage = class ProfilePage {
    constructor(authService, firebaseService, dooleService, router) {
        this.authService = authService;
        this.firebaseService = firebaseService;
        this.dooleService = dooleService;
        this.router = router;
        this.userImage = 'assets/icons/user_icon.svg';
    }
    ngOnInit() {
        this.getUserProfile();
    }
    getUserProfile() {
        this.userDoole = history.state.user;
        console.log('[ProfilePage] getUserProfile()', this.userDoole);
        this.userImg();
    }
    userImg() {
        if (this.userDoole !== undefined && this.userDoole.image !== undefined && this.userDoole.image !== null
            && this.userDoole.image !== '')
            this.userImage = this.userDoole.image;
    }
    signOut() {
        this.authService.logout();
        this.firebaseService.signOut().subscribe(() => {
            // Sign-out successful.
            // Replace state as we are no longer authorized to access profile page.
            console.log("signout user");
            this.router.navigateByUrl('/landing');
        }, (error) => {
            console.log('signout error', error);
        });
    }
};
ProfilePage.ctorParameters = () => [
    { type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"] },
    { type: src_app_services_firebase_auth_firebase_auth_service__WEBPACK_IMPORTED_MODULE_7__["FirebaseAuthService"] },
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
ProfilePage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-profile',
        template: _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_profile_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], ProfilePage);



/***/ }),

/***/ "x0XS":
/*!*********************************************************!*\
  !*** ./src/app/pages/profile/profile-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProfilePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageRoutingModule", function() { return ProfilePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.page */ "uxLX");




const routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_3__["ProfilePage"]
    },
    {
        path: 'personal',
        loadChildren: () => __webpack_require__.e(/*! import() | personal-personal-module */ "personal-personal-module").then(__webpack_require__.bind(null, /*! ./personal/personal.module */ "c7e1")).then(m => m.PersonalPageModule)
    },
    {
        path: 'family',
        loadChildren: () => __webpack_require__.e(/*! import() | family-unit-family-unit-module */ "family-unit-family-unit-module").then(__webpack_require__.bind(null, /*! ./family-unit/family-unit.module */ "CKOg")).then(m => m.FamilyUnitPageModule)
    },
    {
        path: 'settings',
        loadChildren: () => __webpack_require__.e(/*! import() | settings-settings-module */ "settings-settings-module").then(__webpack_require__.bind(null, /*! ./settings/settings.module */ "zKZX")).then(m => m.SettingsPageModule)
    },
    {
        path: 'goals',
        loadChildren: () => __webpack_require__.e(/*! import() | goals-goals-module */ "goals-goals-module").then(__webpack_require__.bind(null, /*! ./goals/goals.module */ "nS1m")).then(m => m.GoalsPageModule)
    },
    {
        path: 'report-problem',
        loadChildren: () => __webpack_require__.e(/*! import() | report-problem-report-problem-module */ "report-problem-report-problem-module").then(__webpack_require__.bind(null, /*! ./report-problem/report-problem.module */ "S5g2")).then(m => m.ReportProblemPageModule)
    },
    {
        path: 'cards',
        loadChildren: () => __webpack_require__.e(/*! import() | cards-cards-module */ "cards-cards-module").then(__webpack_require__.bind(null, /*! ./cards/cards.module */ "S7h8")).then(m => m.CardsPageModule)
    },
    {
        path: 'faqs',
        loadChildren: () => __webpack_require__.e(/*! import() | faqs-faqs-module */ "faqs-faqs-module").then(__webpack_require__.bind(null, /*! ./faqs/faqs.module */ "qGCi")).then(m => m.FaqsPageModule)
    },
    {
        path: 'emergency-contacts',
        loadChildren: () => __webpack_require__.e(/*! import() | emergency-contacts-emergency-contacts-module */ "emergency-contacts-emergency-contacts-module").then(__webpack_require__.bind(null, /*! ./emergency-contacts/emergency-contacts.module */ "E+q/")).then(m => m.EmergencyContactsPageModule)
    }
];
let ProfilePageRoutingModule = class ProfilePageRoutingModule {
};
ProfilePageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ProfilePageRoutingModule);



/***/ })

}]);
//# sourceMappingURL=profile-profile-module-es2015.js.map