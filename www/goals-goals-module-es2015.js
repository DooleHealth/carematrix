(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["goals-goals-module"],{

/***/ "ddUB":
/*!***************************************************!*\
  !*** ./src/app/pages/profile/goals/goals.page.ts ***!
  \***************************************************/
/*! exports provided: GoalsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalsPage", function() { return GoalsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_goals_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./goals.page.html */ "m11O");
/* harmony import */ var _goals_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./goals.page.scss */ "eMhC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");







let GoalsPage = class GoalsPage {
    constructor(router, translate, dooleService) {
        this.router = router;
        this.translate = translate;
        this.dooleService = dooleService;
        this.nameGoal = 'Doolehealth';
    }
    ngOnInit() {
        this.getGoalImformation();
    }
    getGoalImformation() {
        this.dooleService.getAPIgoals().subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[GoalsPage] getGoalImformation()', yield res);
            this.listGoal = res.goals;
        }), (err) => {
            console.log('getGoalImformation() ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    openActivities() {
        this.router.navigateByUrl('/activity-goal');
    }
};
GoalsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] },
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"] }
];
GoalsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-goals',
        template: _raw_loader_goals_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_goals_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], GoalsPage);



/***/ }),

/***/ "eMhC":
/*!*****************************************************!*\
  !*** ./src/app/pages/profile/goals/goals.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("ion-img {\n  height: 15px;\n}\n\nion-content {\n  height: 100px;\n}\n\nion-content ion-card-header {\n  display: inline-flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2dvYWxzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUFDSjs7QUFFQTtFQUNJLGFBQUE7QUFDSjs7QUFDSTtFQUNJLG9CQUFBO0FBQ1IiLCJmaWxlIjoiZ29hbHMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWltZ3tcbiAgICBoZWlnaHQ6IDE1cHg7XG59XG5cbmlvbi1jb250ZW50e1xuICAgIGhlaWdodDogMTAwcHg7XG5cbiAgICBpb24tY2FyZC1oZWFkZXJ7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIH1cbn0iXX0= */");

/***/ }),

/***/ "kY8X":
/*!*************************************************************!*\
  !*** ./src/app/pages/profile/goals/goals-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: GoalsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalsPageRoutingModule", function() { return GoalsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _goals_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./goals.page */ "ddUB");




const routes = [
    {
        path: '',
        component: _goals_page__WEBPACK_IMPORTED_MODULE_3__["GoalsPage"]
    }
];
let GoalsPageRoutingModule = class GoalsPageRoutingModule {
};
GoalsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], GoalsPageRoutingModule);



/***/ }),

/***/ "m11O":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/goals/goals.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"{{'setting.button_profile' | translate }}\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{'goals.your_goals' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content >\n  <div *ngFor=\"let goal of this.listGoal\" >\n    <ion-card (click)=\"openActivities()\" class=\"cardProfile\">\n \n        <ion-grid>\n          <ion-row>\n            <ion-col size=\"2\"><ion-img  src='assets/icons/goals.svg' style=\"margin-right: 5px;\"></ion-img></ion-col>\n            <ion-col size=\"6\"><ion-card-title class=\"txtTitleGoals\">{{'goals.goals' | translate}} de {{goal.element.name}}</ion-card-title></ion-col>\n            <ion-col size=\"4\"><ion-text class=\"textMediumGreen\">{{goal.score}} Healthies</ion-text></ion-col>\n          </ion-row>\n        </ion-grid>\n        <!-- <ion-img  src='assets/icons/goals.svg' style=\"margin-right: 5px;\"></ion-img>\n        <ion-card-title class=\"txtTitleGoals\">Objetivo de {{goal.element.name}}</ion-card-title><br>\n        <div class=\"textMedium\">{{goal.score}} Healthies</div>\n        <ion-icon name=\"chevron-forward-outline\" style=\"margin-left: 5px;\"></ion-icon> -->\n\n  \n      <ion-card-content>\n        <div class=\"txtTitleGoals2\">{{'goals.achieve' | translate}} {{goal.typeString}} {{goal.element.element_unit.abbreviation}}</div>\n        <div class=\"txtTitleGoalsLittle\">\n          <div *ngIf=\"(goal.from_date != null || goal.to_date != null); else objetive\">\n            <div *ngIf='goal.from_date != null'>{{'goals.start' | translate}}: {{goal.from_date | date: 'dd/MM/yyyy'}}</div>\n            <div *ngIf='goal.to_date != null'>{{'goals.end' | translate}}: {{goal.to_date | date: 'dd/MM/yyyy'}}</div>\n          </div>\n          <ng-template #objetive>{{'goals.goals' | translate}}: {{goal.frequencyString}}</ng-template>\n          \n        </div>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n</ion-content>\n");

/***/ }),

/***/ "nS1m":
/*!*****************************************************!*\
  !*** ./src/app/pages/profile/goals/goals.module.ts ***!
  \*****************************************************/
/*! exports provided: GoalsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalsPageModule", function() { return GoalsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _goals_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./goals-routing.module */ "kY8X");
/* harmony import */ var _goals_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./goals.page */ "ddUB");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








let GoalsPageModule = class GoalsPageModule {
};
GoalsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _goals_routing_module__WEBPACK_IMPORTED_MODULE_5__["GoalsPageRoutingModule"]
        ],
        declarations: [_goals_page__WEBPACK_IMPORTED_MODULE_6__["GoalsPage"]]
    })
], GoalsPageModule);



/***/ })

}]);
//# sourceMappingURL=goals-goals-module-es2015.js.map