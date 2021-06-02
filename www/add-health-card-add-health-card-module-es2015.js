(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-health-card-add-health-card-module"],{

/***/ "NxSy":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/cards/add-health-card/add-health-card.page.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-button slot=\"start\" fill=\"clear\" routerLink=\"/cards\">{{ 'health_card.button_return' | translate}}</ion-button>\n<!--     <ion-buttons slot=\"start\">\n      <ion-back-button text=\"Inicio\"></ion-back-button>\n    </ion-buttons> -->\n    <ion-title>{{ isAddCard? ('add_health_card.header_add_card' | translate) : ('edit_health_card.header_edit_card' | translate) }}</ion-title>\n    <ion-button slot=\"end\" fill=\"clear\" (click)=\"this.isAddCard? addCard(): editCard()\">\n      {{ isAddCard? ('add_health_card.button_add' | translate) : ('edit_health_card.button_edit' | translate) }}</ion-button>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <ion-grid>\n    <ion-row>\n      <ion-col size=\"12\">\n        <img class=\"img-wrapperCard\" src=\"assets/images/Subtract.png\">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n    </ion-row>\n  </ion-grid>\n\n  <form [formGroup]=\"formHealthCard\" (ngSubmit)=\"addCard()\">\n  <ion-card class=\"cardProfile\">\n    <ion-list>\n      <ion-item lines=\"none\">\n        <ion-label>{{ 'health_card.modality' | translate}}</ion-label>\n        <ion-select interface=\"action-sheet\" placeholder=\"Selecciona uno\" formControlName=\"modality\" required>\n          <ion-select-option *ngFor=\"let card of cards\" [value]=\"card.modality\">{{card.modality}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n  <ion-card class=\"cardProfile\">\n    <ion-list>\n      <ion-item>\n        <ion-label>{{ 'health_card.name' | translate}}</ion-label>\n        <ion-input formControlName=\"name\" placeholder=\"\" slot=\"end\" (ionInput)=\"isSubmitted = false\" maxlength=\"50\" required></ion-input>\n        <ion-label *ngIf=\"this.isSubmittedName && this.formHealthCard.get('name').invalid\" class=\"error ion-padding\" color=\"danger\" slot=\"end\"><p>{{ 'health_card.error_required' | translate}}</p></ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{ 'health_card.affiliation_number' | translate}}</ion-label>\n        <ion-input formControlName=\"affiliation_number\" placeholder=\"\" (ionInput)=\"isSubmittedAffiliationNumber = false\" maxlength=\"30\" required></ion-input>\n        <ion-label *ngIf=\"this.isSubmittedAffiliationNumber && this.formHealthCard.get('affiliation_number').invalid\" class=\"error ion-padding\" color=\"danger\" slot=\"end\"><p>{{ 'health_card.error_required' | translate}}</p></ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{ 'health_card.expiration_date' | translate}}</ion-label>\n        <ion-datetime formControlName=\"expiration_date\" displayFormat=\"DD/MM/YY\" placeholder=\"Opcional\" min=\"1990-01-01\" [max]=\"this.dateMax\"></ion-datetime>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label lines=\"none\">{{ 'health_card.expedition_date' | translate}}</ion-label>\n        <ion-datetime formControlName=\"expedition_date\" displayFormat=\"DD/MM/YY\" placeholder=\"Opcional\" min=\"1990-01-01\"></ion-datetime>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</form>\n</ion-content>");

/***/ }),

/***/ "bKic":
/*!*****************************************************************************!*\
  !*** ./src/app/pages/profile/cards/add-health-card/add-health-card.page.ts ***!
  \*****************************************************************************/
/*! exports provided: AddHealthCardPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddHealthCardPage", function() { return AddHealthCardPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_add_health_card_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./add-health-card.page.html */ "NxSy");
/* harmony import */ var _add_health_card_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-health-card.page.scss */ "yVFn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/doole.service */ "tE2R");









let AddHealthCardPage = class AddHealthCardPage {
    constructor(dooleService, formBuilder, alertController, router, translate) {
        this.dooleService = dooleService;
        this.formBuilder = formBuilder;
        this.alertController = alertController;
        this.router = router;
        this.translate = translate;
        this.cards = [
            {
                modality: "Mutuas Seguros",
                color: "BDC3C7"
            },
            {
                modality: "Sanidad Pública",
                color: "2980B9"
            },
            {
                modality: "Sanidad Privada",
                color: "09f"
            }
        ];
        this.isSubmittedName = false;
        this.isSubmittedAffiliationNumber = false;
        this.isSubmittedModality = false;
        this.isAddCard = true;
    }
    ngOnInit() {
        this.translateModalityCards();
        let year = (new Date(Date.now()).getFullYear()) + 20;
        this.dateMax = year;
        this.formHealthCard = this.formBuilder.group({
            modality: [this.cards[0].modality, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            affiliation_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
            expiration_date: [''],
            expedition_date: [''],
        });
        this.getHealthCard();
    }
    getHealthCard() {
        this.card = history.state.card;
        console.log('[AddHealthCardPage] getHealthCard()', this.card);
        if (this.card) {
            this.isAddCard = false;
            this.showDetailCard();
        }
    }
    translateModalityCards() {
        this.cards.forEach((card, index) => {
            card.modality = this.translate.instant(`health_card.modality_type.text${index}`);
        });
    }
    showDetailCard() {
        this.formHealthCard.get('modality').setValue(this.card.modality);
        this.formHealthCard.get('name').setValue(this.card.name);
        this.formHealthCard.get('affiliation_number').setValue(this.card.affiliation_number);
        this.formHealthCard.get('expiration_date').setValue(this.card.expiration_date ? this.card.expiration_date : '');
        this.formHealthCard.get('expedition_date').setValue(this.card.expedition_date ? this.card.expedition_date : '');
    }
    addCard() {
        console.log('[AddHealthCardPage] addCard()', this.formHealthCard.value);
        this.isSubmittedFields(true);
        if (this.formHealthCard.valid) {
            this.dooleService.postAPIhealthCards(this.formHealthCard.value).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                console.log('[AddHealthCardPage] addCard()', yield res);
                let isSuccess = res.success;
                if (isSuccess) {
                    let messagge = this.translate.instant('add_health_card.alert_message_add_card');
                    this.presentAlert(messagge);
                }
                else {
                    console.log('[AddHealthCardPage] addCard() Unsuccessful response', yield res);
                }
            }), (err) => {
                console.log('[AddHealthCardPage] addCard() ERROR(' + err.code + '): ' + err.message);
                this.dooleService.presentAlert(err.messagge);
                throw err;
            });
        }
    }
    editCard() {
        console.log('[AddHealthCardPage] editCard()', this.formHealthCard.value);
        this.isSubmittedFields(true);
        if (this.formHealthCard.valid) {
            this.dooleService.putAPIhealthCard(this.formHealthCard.value).subscribe((res) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                console.log('[AddHealthCardPage] editCard()', yield res);
                let isSuccess = res.success;
                if (isSuccess) {
                    let messagge = this.translate.instant('edit_health_card.alert_message_edit_card');
                    this.presentAlert(messagge);
                }
                else {
                    console.log('[InitialPage] editCard() Unsuccessful response', yield res);
                }
            }), (err) => {
                console.log('[InitialPage] editCard() ERROR(' + err.code + '): ' + err.message);
                this.dooleService.presentAlert(err.messagge);
                throw err;
            });
        }
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
                            this.router.navigateByUrl('/cards');
                        }
                    }],
                backdropDismiss: false
            });
            yield alert.present();
        });
    }
    isSubmittedFields(isSubmitted) {
        this.isSubmittedName = isSubmitted;
        this.isSubmittedAffiliationNumber = isSubmitted;
        this.isSubmittedModality = isSubmitted;
    }
};
AddHealthCardPage.ctorParameters = () => [
    { type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__["DooleService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"] }
];
AddHealthCardPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-health-card',
        template: _raw_loader_add_health_card_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_health_card_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AddHealthCardPage);



/***/ }),

/***/ "c/ys":
/*!***************************************************************************************!*\
  !*** ./src/app/pages/profile/cards/add-health-card/add-health-card-routing.module.ts ***!
  \***************************************************************************************/
/*! exports provided: AddHealthCardPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddHealthCardPageRoutingModule", function() { return AddHealthCardPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _add_health_card_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add-health-card.page */ "bKic");




const routes = [
    {
        path: '',
        component: _add_health_card_page__WEBPACK_IMPORTED_MODULE_3__["AddHealthCardPage"]
    }
];
let AddHealthCardPageRoutingModule = class AddHealthCardPageRoutingModule {
};
AddHealthCardPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AddHealthCardPageRoutingModule);



/***/ }),

/***/ "tryS":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/profile/cards/add-health-card/add-health-card.module.ts ***!
  \*******************************************************************************/
/*! exports provided: AddHealthCardPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddHealthCardPageModule", function() { return AddHealthCardPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _add_health_card_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./add-health-card-routing.module */ "c/ys");
/* harmony import */ var _add_health_card_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./add-health-card.page */ "bKic");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");








let AddHealthCardPageModule = class AddHealthCardPageModule {
};
AddHealthCardPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
            _add_health_card_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddHealthCardPageRoutingModule"]
        ],
        declarations: [_add_health_card_page__WEBPACK_IMPORTED_MODULE_6__["AddHealthCardPage"]]
    })
], AddHealthCardPageModule);



/***/ }),

/***/ "yVFn":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/profile/cards/add-health-card/add-health-card.page.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".img-wrapperCard {\n  min-width: 88px;\n  display: block;\n  margin: auto;\n  margin-top: 10%;\n  margin-bottom: 10%;\n}\n\n.textMedium {\n  text-align: right;\n  color: #7f8c8d;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2FkZC1oZWFsdGgtY2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFDQTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtBQUVKIiwiZmlsZSI6ImFkZC1oZWFsdGgtY2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nLXdyYXBwZXJDYXJkIHtcbiAgbWluLXdpZHRoOiA4OHB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tdG9wOiAxMCU7XG4gIG1hcmdpbi1ib3R0b206IDEwJTtcbn1cbi50ZXh0TWVkaXVtIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBjb2xvcjogIzdmOGM4ZDtcbiAgfSJdfQ== */");

/***/ })

}]);
//# sourceMappingURL=add-health-card-add-health-card-module-es2015.js.map