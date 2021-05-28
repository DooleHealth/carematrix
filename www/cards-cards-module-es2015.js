(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cards-cards-module"],{

/***/ "S7h8":
/*!*****************************************************!*\
  !*** ./src/app/pages/profile/cards/cards.module.ts ***!
  \*****************************************************/
/*! exports provided: CardsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsPageModule", function() { return CardsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _cards_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cards-routing.module */ "eC4O");
/* harmony import */ var _cards_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cards.page */ "tTm4");








let CardsPageModule = class CardsPageModule {
};
CardsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"],
            _cards_routing_module__WEBPACK_IMPORTED_MODULE_6__["CardsPageRoutingModule"]
        ],
        declarations: [_cards_page__WEBPACK_IMPORTED_MODULE_7__["CardsPage"]]
    })
], CardsPageModule);



/***/ }),

/***/ "eC4O":
/*!*************************************************************!*\
  !*** ./src/app/pages/profile/cards/cards-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: CardsPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsPageRoutingModule", function() { return CardsPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _cards_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards.page */ "tTm4");




const routes = [
    {
        path: '',
        component: _cards_page__WEBPACK_IMPORTED_MODULE_3__["CardsPage"]
    },
    {
        path: 'addCard',
        loadChildren: () => __webpack_require__.e(/*! import() | add-health-card-add-health-card-module */ "add-health-card-add-health-card-module").then(__webpack_require__.bind(null, /*! ./add-health-card/add-health-card.module */ "tryS")).then(m => m.AddHealthCardPageModule)
    }
];
let CardsPageRoutingModule = class CardsPageRoutingModule {
};
CardsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], CardsPageRoutingModule);



/***/ }),

/***/ "pmdc":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/cards/cards.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"Perfil\" ></ion-back-button>\n    </ion-buttons>\n    <ion-title>Tarjetas sanitarias</ion-title>\n    <ion-buttons slot=\"end\" routerLink=\"addCard\" >\n    <ion-icon slot=\"icon-only\" name=\"add\" color=\"primary\"></ion-icon>\n  </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"listCard !== undefined\">\n  <ion-list *ngFor=\"let card of listCard\">\n    <ion-card class=\"cardProfile\" (click)=getDetailCard(card)>\n      <ion-card-content>\n        <ion-item lines=\"none\">\n            <img src=\"assets/images/tarjeta.png\">\n          <ion-label class=\"txtPaddingLeft\" >\n            <h3>{{ card.name}}</h3>\n            <div>\n              <p>{{ card.affiliation_number}}</p>\n              <p *ngIf=\"card.expiration_date !== null && card.expiration_date !== undefined\"> \n                {{ card.expiration_date | date: 'MM/yyyy'}}</p>\n            </div>\n            \n          </ion-label>\n        </ion-item>\n    </ion-card-content>\n  </ion-card>\n  </ion-list>\n</ion-content>\n");

/***/ }),

/***/ "tTm4":
/*!***************************************************!*\
  !*** ./src/app/pages/profile/cards/cards.page.ts ***!
  \***************************************************/
/*! exports provided: CardsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsPage", function() { return CardsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_cards_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./cards.page.html */ "pmdc");
/* harmony import */ var _cards_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards.page.scss */ "wK/v");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");








let CardsPage = class CardsPage {
    constructor(router, translate, alertController, dooleService) {
        this.router = router;
        this.translate = translate;
        this.alertController = alertController;
        this.dooleService = dooleService;
        this.listCard = [];
    }
    ngOnInit() {
        this.getHealthCards();
    }
    getHealthCards() {
        this.dooleService.getAPIhealthCards().subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('[GoalsPage] getHealthCards()', yield res);
            this.listCard = res;
        }), (err) => {
            console.log('[GoalsPage] getHealthCards() ERROR(' + err.code + '): ' + err.message);
            throw err;
        });
    }
    getDetailCard(card) {
        console.log('[GoalsPage] getDetailCard()', card.name);
    }
};
CardsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"] },
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_7__["DooleService"] }
];
CardsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-cards',
        template: _raw_loader_cards_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_cards_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CardsPage);



/***/ }),

/***/ "wK/v":
/*!*****************************************************!*\
  !*** ./src/app/pages/profile/cards/cards.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXJkcy5wYWdlLnNjc3MifQ== */");

/***/ })

}]);
//# sourceMappingURL=cards-cards-module-es2015.js.map