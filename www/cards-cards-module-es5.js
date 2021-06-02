(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cards-cards-module"], {
    /***/
    "S7h8":
    /*!*****************************************************!*\
      !*** ./src/app/pages/profile/cards/cards.module.ts ***!
      \*****************************************************/

    /*! exports provided: CardsPageModule */

    /***/
    function S7h8(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CardsPageModule", function () {
        return CardsPageModule;
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


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var _cards_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./cards-routing.module */
      "eC4O");
      /* harmony import */


      var _cards_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./cards.page */
      "tTm4");

      var CardsPageModule = function CardsPageModule() {
        _classCallCheck(this, CardsPageModule);
      };

      CardsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"], _cards_routing_module__WEBPACK_IMPORTED_MODULE_6__["CardsPageRoutingModule"]],
        declarations: [_cards_page__WEBPACK_IMPORTED_MODULE_7__["CardsPage"]]
      })], CardsPageModule);
      /***/
    },

    /***/
    "eC4O":
    /*!*************************************************************!*\
      !*** ./src/app/pages/profile/cards/cards-routing.module.ts ***!
      \*************************************************************/

    /*! exports provided: CardsPageRoutingModule */

    /***/
    function eC4O(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CardsPageRoutingModule", function () {
        return CardsPageRoutingModule;
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


      var _cards_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./cards.page */
      "tTm4");

      var routes = [{
        path: '',
        component: _cards_page__WEBPACK_IMPORTED_MODULE_3__["CardsPage"]
      }, {
        path: 'addCard',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | add-health-card-add-health-card-module */
          "add-health-card-add-health-card-module").then(__webpack_require__.bind(null,
          /*! ./add-health-card/add-health-card.module */
          "tryS")).then(function (m) {
            return m.AddHealthCardPageModule;
          });
        }
      }, {
        path: 'detailCard',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | detail-health-card-detail-health-card-module */
          "detail-health-card-detail-health-card-module").then(__webpack_require__.bind(null,
          /*! ./detail-health-card/detail-health-card.module */
          "+4VH")).then(function (m) {
            return m.DetailHealthCardPageModule;
          });
        }
      }];

      var CardsPageRoutingModule = function CardsPageRoutingModule() {
        _classCallCheck(this, CardsPageRoutingModule);
      };

      CardsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], CardsPageRoutingModule);
      /***/
    },

    /***/
    "pmdc":
    /*!*******************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/cards/cards.page.html ***!
      \*******************************************************************************************/

    /*! exports provided: default */

    /***/
    function pmdc(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"Perfil\" ></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ 'health_card.header_card' | translate}}</ion-title>\n    <ion-buttons slot=\"end\" routerLink=\"addCard\" >\n    <ion-icon slot=\"icon-only\" name=\"add\" color=\"primary\"></ion-icon>\n  </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"listCard !== undefined\">\n  <ion-list *ngFor=\"let card of listCard\">\n    <ion-card class=\"cardProfile\" routerLink=\"detailCard\" [state]=\"{card:card}\">\n      <ion-card-content>\n        <ion-item lines=\"none\">\n            <img src=\"assets/images/tarjeta.png\">\n          <ion-label class=\"txtPaddingLeft\" >\n            <h3>{{ card.name}}</h3>\n            <div>\n              <p>{{ card.affiliation_number}}</p>\n              <p *ngIf=\"card.expiration_date !== null && card.expiration_date !== undefined\"> \n                {{ card.expiration_date | date: 'MM/yyyy'}}</p>\n            </div>\n            \n          </ion-label>\n        </ion-item>\n    </ion-card-content>\n  </ion-card>\n  </ion-list>\n</ion-content>\n";
      /***/
    },

    /***/
    "tTm4":
    /*!***************************************************!*\
      !*** ./src/app/pages/profile/cards/cards.page.ts ***!
      \***************************************************/

    /*! exports provided: CardsPage */

    /***/
    function tTm4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CardsPage", function () {
        return CardsPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_cards_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./cards.page.html */
      "pmdc");
      /* harmony import */


      var _cards_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./cards.page.scss */
      "wK/v");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");

      var CardsPage = /*#__PURE__*/function () {
        function CardsPage(router, translate, alertController, dooleService) {
          _classCallCheck(this, CardsPage);

          this.router = router;
          this.translate = translate;
          this.alertController = alertController;
          this.dooleService = dooleService;
          this.listCard = [];
        }

        _createClass(CardsPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getHealthCards();
          }
        }, {
          key: "getHealthCards",
          value: function getHealthCards() {
            var _this = this;

            this.dooleService.getAPIhealthCards().subscribe(function (res) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = console;
                        _context.next = 3;
                        return res;

                      case 3:
                        _context.t1 = _context.sent;

                        _context.t0.log.call(_context.t0, '[CardsPage] getHealthCards()', _context.t1);

                        this.listCard = res;

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }, function (err) {
              console.log('[CardsPage] getHealthCards() ERROR(' + err.code + '): ' + err.message);
              throw err;
            });
          }
        }, {
          key: "getDetailCard",
          value: function getDetailCard(card) {
            console.log('[CardsPage] getDetailCard()', card.name); //this.router.navigateByUrl('cards/detailCard')

            this.router.navigate(['cards/detailCard', {
              id: card.id
            }]);
          }
        }]);

        return CardsPage;
      }();

      CardsPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
        }, {
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_7__["DooleService"]
        }];
      };

      CardsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-cards',
        template: _raw_loader_cards_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_cards_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], CardsPage);
      /***/
    },

    /***/
    "wK/v":
    /*!*****************************************************!*\
      !*** ./src/app/pages/profile/cards/cards.page.scss ***!
      \*****************************************************/

    /*! exports provided: default */

    /***/
    function wKV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXJkcy5wYWdlLnNjc3MifQ== */";
      /***/
    }
  }]);
})();
//# sourceMappingURL=cards-cards-module-es5.js.map