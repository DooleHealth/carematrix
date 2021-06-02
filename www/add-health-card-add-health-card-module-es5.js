(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["add-health-card-add-health-card-module"], {
    /***/
    "NxSy":
    /*!*********************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/cards/add-health-card/add-health-card.page.html ***!
      \*********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function NxSy(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-button slot=\"start\" fill=\"clear\" routerLink=\"/cards\">{{ 'health_card.button_return' | translate}}</ion-button>\n<!--     <ion-buttons slot=\"start\">\n      <ion-back-button text=\"Inicio\"></ion-back-button>\n    </ion-buttons> -->\n    <ion-title>{{ isAddCard? ('add_health_card.header_add_card' | translate) : ('edit_health_card.header_edit_card' | translate) }}</ion-title>\n    <ion-button slot=\"end\" fill=\"clear\" (click)=\"this.isAddCard? addCard(): editCard()\">\n      {{ isAddCard? ('add_health_card.button_add' | translate) : ('edit_health_card.button_edit' | translate) }}</ion-button>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <ion-grid>\n    <ion-row>\n      <ion-col size=\"12\">\n        <img class=\"img-wrapperCard\" src=\"assets/images/Subtract.png\">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n    </ion-row>\n  </ion-grid>\n\n  <form [formGroup]=\"formHealthCard\" (ngSubmit)=\"addCard()\">\n  <ion-card class=\"cardProfile\">\n    <ion-list>\n      <ion-item lines=\"none\">\n        <ion-label>{{ 'health_card.modality' | translate}}</ion-label>\n        <ion-select interface=\"action-sheet\" placeholder=\"Selecciona uno\" formControlName=\"modality\" required>\n          <ion-select-option *ngFor=\"let card of cards\" [value]=\"card.modality\">{{card.modality}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n  <ion-card class=\"cardProfile\">\n    <ion-list>\n      <ion-item>\n        <ion-label>{{ 'health_card.name' | translate}}</ion-label>\n        <ion-input formControlName=\"name\" placeholder=\"\" slot=\"end\" (ionInput)=\"isSubmitted = false\" maxlength=\"50\" required></ion-input>\n        <ion-label *ngIf=\"this.isSubmittedName && this.formHealthCard.get('name').invalid\" class=\"error ion-padding\" color=\"danger\" slot=\"end\"><p>{{ 'health_card.error_required' | translate}}</p></ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{ 'health_card.affiliation_number' | translate}}</ion-label>\n        <ion-input formControlName=\"affiliation_number\" placeholder=\"\" (ionInput)=\"isSubmittedAffiliationNumber = false\" maxlength=\"30\" required></ion-input>\n        <ion-label *ngIf=\"this.isSubmittedAffiliationNumber && this.formHealthCard.get('affiliation_number').invalid\" class=\"error ion-padding\" color=\"danger\" slot=\"end\"><p>{{ 'health_card.error_required' | translate}}</p></ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{ 'health_card.expiration_date' | translate}}</ion-label>\n        <ion-datetime formControlName=\"expiration_date\" displayFormat=\"DD/MM/YY\" placeholder=\"Opcional\" min=\"1990-01-01\" [max]=\"this.dateMax\"></ion-datetime>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label lines=\"none\">{{ 'health_card.expedition_date' | translate}}</ion-label>\n        <ion-datetime formControlName=\"expedition_date\" displayFormat=\"DD/MM/YY\" placeholder=\"Opcional\" min=\"1990-01-01\"></ion-datetime>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</form>\n</ion-content>";
      /***/
    },

    /***/
    "bKic":
    /*!*****************************************************************************!*\
      !*** ./src/app/pages/profile/cards/add-health-card/add-health-card.page.ts ***!
      \*****************************************************************************/

    /*! exports provided: AddHealthCardPage */

    /***/
    function bKic(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddHealthCardPage", function () {
        return AddHealthCardPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_add_health_card_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./add-health-card.page.html */
      "NxSy");
      /* harmony import */


      var _add_health_card_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./add-health-card.page.scss */
      "yVFn");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");

      var AddHealthCardPage = /*#__PURE__*/function () {
        function AddHealthCardPage(dooleService, formBuilder, alertController, router, translate) {
          _classCallCheck(this, AddHealthCardPage);

          this.dooleService = dooleService;
          this.formBuilder = formBuilder;
          this.alertController = alertController;
          this.router = router;
          this.translate = translate;
          this.cards = [{
            modality: "Mutuas Seguros",
            color: "BDC3C7"
          }, {
            modality: "Sanidad Pública",
            color: "2980B9"
          }, {
            modality: "Sanidad Privada",
            color: "09f"
          }];
          this.isSubmittedName = false;
          this.isSubmittedAffiliationNumber = false;
          this.isSubmittedModality = false;
          this.isAddCard = true;
        }

        _createClass(AddHealthCardPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.translateModalityCards();
            var year = new Date(Date.now()).getFullYear() + 20;
            this.dateMax = year;
            this.formHealthCard = this.formBuilder.group({
              modality: [this.cards[0].modality, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
              name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
              affiliation_number: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]],
              expiration_date: [''],
              expedition_date: ['']
            });
            this.getHealthCard();
          }
        }, {
          key: "getHealthCard",
          value: function getHealthCard() {
            this.card = history.state.card;
            console.log('[AddHealthCardPage] getHealthCard()', this.card);

            if (this.card) {
              this.isAddCard = false;
              this.showDetailCard();
            }
          }
        }, {
          key: "translateModalityCards",
          value: function translateModalityCards() {
            var _this = this;

            this.cards.forEach(function (card, index) {
              card.modality = _this.translate.instant("health_card.modality_type.text".concat(index));
            });
          }
        }, {
          key: "showDetailCard",
          value: function showDetailCard() {
            this.formHealthCard.get('modality').setValue(this.card.modality);
            this.formHealthCard.get('name').setValue(this.card.name);
            this.formHealthCard.get('affiliation_number').setValue(this.card.affiliation_number);
            this.formHealthCard.get('expiration_date').setValue(this.card.expiration_date ? this.card.expiration_date : '');
            this.formHealthCard.get('expedition_date').setValue(this.card.expedition_date ? this.card.expedition_date : '');
          }
        }, {
          key: "addCard",
          value: function addCard() {
            var _this2 = this;

            console.log('[AddHealthCardPage] addCard()', this.formHealthCard.value);
            this.isSubmittedFields(true);

            if (this.formHealthCard.valid) {
              this.dooleService.postAPIhealthCards(this.formHealthCard.value).subscribe(function (res) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var isSuccess, messagge;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.t0 = console;
                          _context.next = 3;
                          return res;

                        case 3:
                          _context.t1 = _context.sent;

                          _context.t0.log.call(_context.t0, '[AddHealthCardPage] addCard()', _context.t1);

                          isSuccess = res.success;

                          if (!isSuccess) {
                            _context.next = 11;
                            break;
                          }

                          messagge = this.translate.instant('add_health_card.alert_message_add_card');
                          this.presentAlert(messagge);
                          _context.next = 16;
                          break;

                        case 11:
                          _context.t2 = console;
                          _context.next = 14;
                          return res;

                        case 14:
                          _context.t3 = _context.sent;

                          _context.t2.log.call(_context.t2, '[AddHealthCardPage] addCard() Unsuccessful response', _context.t3);

                        case 16:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));
              }, function (err) {
                console.log('[AddHealthCardPage] addCard() ERROR(' + err.code + '): ' + err.message);

                _this2.dooleService.presentAlert(err.messagge);

                throw err;
              });
            }
          }
        }, {
          key: "editCard",
          value: function editCard() {
            var _this3 = this;

            console.log('[AddHealthCardPage] editCard()', this.formHealthCard.value);
            this.isSubmittedFields(true);

            if (this.formHealthCard.valid) {
              this.dooleService.putAPIhealthCard(this.formHealthCard.value).subscribe(function (res) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var isSuccess, messagge;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.t0 = console;
                          _context2.next = 3;
                          return res;

                        case 3:
                          _context2.t1 = _context2.sent;

                          _context2.t0.log.call(_context2.t0, '[AddHealthCardPage] editCard()', _context2.t1);

                          isSuccess = res.success;

                          if (!isSuccess) {
                            _context2.next = 11;
                            break;
                          }

                          messagge = this.translate.instant('edit_health_card.alert_message_edit_card');
                          this.presentAlert(messagge);
                          _context2.next = 16;
                          break;

                        case 11:
                          _context2.t2 = console;
                          _context2.next = 14;
                          return res;

                        case 14:
                          _context2.t3 = _context2.sent;

                          _context2.t2.log.call(_context2.t2, '[InitialPage] editCard() Unsuccessful response', _context2.t3);

                        case 16:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));
              }, function (err) {
                console.log('[InitialPage] editCard() ERROR(' + err.code + '): ' + err.message);

                _this3.dooleService.presentAlert(err.messagge);

                throw err;
              });
            }
          }
        }, {
          key: "presentAlert",
          value: function presentAlert(message) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this4 = this;

              var alert;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.alertController.create({
                        cssClass: 'my-alert-class',
                        message: message,
                        buttons: [{
                          text: this.translate.instant("alert.button_ok"),
                          handler: function handler() {
                            console.log('Confirm Okay');

                            _this4.router.navigateByUrl('/cards');
                          }
                        }],
                        backdropDismiss: false
                      });

                    case 2:
                      alert = _context3.sent;
                      _context3.next = 5;
                      return alert.present();

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "isSubmittedFields",
          value: function isSubmittedFields(isSubmitted) {
            this.isSubmittedName = isSubmitted;
            this.isSubmittedAffiliationNumber = isSubmitted;
            this.isSubmittedModality = isSubmitted;
          }
        }]);

        return AddHealthCardPage;
      }();

      AddHealthCardPage.ctorParameters = function () {
        return [{
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__["DooleService"]
        }, {
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]
        }];
      };

      AddHealthCardPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-add-health-card',
        template: _raw_loader_add_health_card_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_add_health_card_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], AddHealthCardPage);
      /***/
    },

    /***/
    "c/ys":
    /*!***************************************************************************************!*\
      !*** ./src/app/pages/profile/cards/add-health-card/add-health-card-routing.module.ts ***!
      \***************************************************************************************/

    /*! exports provided: AddHealthCardPageRoutingModule */

    /***/
    function cYs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddHealthCardPageRoutingModule", function () {
        return AddHealthCardPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _add_health_card_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./add-health-card.page */
      "bKic");

      var routes = [{
        path: '',
        component: _add_health_card_page__WEBPACK_IMPORTED_MODULE_3__["AddHealthCardPage"]
      }];

      var AddHealthCardPageRoutingModule = function AddHealthCardPageRoutingModule() {
        _classCallCheck(this, AddHealthCardPageRoutingModule);
      };

      AddHealthCardPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], AddHealthCardPageRoutingModule);
      /***/
    },

    /***/
    "tryS":
    /*!*******************************************************************************!*\
      !*** ./src/app/pages/profile/cards/add-health-card/add-health-card.module.ts ***!
      \*******************************************************************************/

    /*! exports provided: AddHealthCardPageModule */

    /***/
    function tryS(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AddHealthCardPageModule", function () {
        return AddHealthCardPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _add_health_card_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./add-health-card-routing.module */
      "c/ys");
      /* harmony import */


      var _add_health_card_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./add-health-card.page */
      "bKic");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var AddHealthCardPageModule = function AddHealthCardPageModule() {
        _classCallCheck(this, AddHealthCardPageModule);
      };

      AddHealthCardPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], _add_health_card_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddHealthCardPageRoutingModule"]],
        declarations: [_add_health_card_page__WEBPACK_IMPORTED_MODULE_6__["AddHealthCardPage"]]
      })], AddHealthCardPageModule);
      /***/
    },

    /***/
    "yVFn":
    /*!*******************************************************************************!*\
      !*** ./src/app/pages/profile/cards/add-health-card/add-health-card.page.scss ***!
      \*******************************************************************************/

    /*! exports provided: default */

    /***/
    function yVFn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".img-wrapperCard {\n  min-width: 88px;\n  display: block;\n  margin: auto;\n  margin-top: 10%;\n  margin-bottom: 10%;\n}\n\n.textMedium {\n  text-align: right;\n  color: #7f8c8d;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2FkZC1oZWFsdGgtY2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFDQTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtBQUVKIiwiZmlsZSI6ImFkZC1oZWFsdGgtY2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nLXdyYXBwZXJDYXJkIHtcbiAgbWluLXdpZHRoOiA4OHB4O1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tdG9wOiAxMCU7XG4gIG1hcmdpbi1ib3R0b206IDEwJTtcbn1cbi50ZXh0TWVkaXVtIHtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBjb2xvcjogIzdmOGM4ZDtcbiAgfSJdfQ== */";
      /***/
    }
  }]);
})();
//# sourceMappingURL=add-health-card-add-health-card-module-es5.js.map