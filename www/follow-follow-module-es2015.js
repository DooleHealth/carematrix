(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["follow-follow-module"],{

/***/ "JESd":
/*!****************************************************!*\
  !*** ./src/app/pages/home/follow/follow.page.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb2xsb3cucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "YjTH":
/*!************************************************************!*\
  !*** ./src/app/pages/home/follow/follow-routing.module.ts ***!
  \************************************************************/
/*! exports provided: FollowPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FollowPageRoutingModule", function() { return FollowPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _follow_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./follow.page */ "dFQU");




const routes = [
    {
        path: '',
        component: _follow_page__WEBPACK_IMPORTED_MODULE_3__["FollowPage"]
    }
];
let FollowPageRoutingModule = class FollowPageRoutingModule {
};
FollowPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], FollowPageRoutingModule);



/***/ }),

/***/ "dFQU":
/*!**************************************************!*\
  !*** ./src/app/pages/home/follow/follow.page.ts ***!
  \**************************************************/
/*! exports provided: FollowPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FollowPage", function() { return FollowPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_follow_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./follow.page.html */ "vDPG");
/* harmony import */ var _follow_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./follow.page.scss */ "JESd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let FollowPage = class FollowPage {
    constructor() { }
    ngOnInit() {
    }
};
FollowPage.ctorParameters = () => [];
FollowPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-follow',
        template: _raw_loader_follow_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_follow_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], FollowPage);



/***/ }),

/***/ "jTZI":
/*!****************************************************!*\
  !*** ./src/app/pages/home/follow/follow.module.ts ***!
  \****************************************************/
/*! exports provided: FollowPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FollowPageModule", function() { return FollowPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _follow_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./follow-routing.module */ "YjTH");
/* harmony import */ var _follow_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./follow.page */ "dFQU");







let FollowPageModule = class FollowPageModule {
};
FollowPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _follow_routing_module__WEBPACK_IMPORTED_MODULE_5__["FollowPageRoutingModule"]
        ],
        declarations: [_follow_page__WEBPACK_IMPORTED_MODULE_6__["FollowPage"]]
    })
], FollowPageModule);



/***/ }),

/***/ "vDPG":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/follow/follow.page.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>follow</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=follow-follow-module-es2015.js.map