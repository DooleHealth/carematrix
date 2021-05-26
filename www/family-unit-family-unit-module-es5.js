(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["family-unit-family-unit-module"], {
    /***/
    "CKOg":
    /*!*****************************************************************!*\
      !*** ./src/app/pages/profile/family-unit/family-unit.module.ts ***!
      \*****************************************************************/

    /*! exports provided: FamilyUnitPageModule */

    /***/
    function CKOg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FamilyUnitPageModule", function () {
        return FamilyUnitPageModule;
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


      var _family_unit_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./family-unit-routing.module */
      "EQY+");
      /* harmony import */


      var _family_unit_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./family-unit.page */
      "sIj7");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var FamilyUnitPageModule = function FamilyUnitPageModule() {
        _classCallCheck(this, FamilyUnitPageModule);
      };

      FamilyUnitPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], _family_unit_routing_module__WEBPACK_IMPORTED_MODULE_5__["FamilyUnitPageRoutingModule"]],
        declarations: [_family_unit_page__WEBPACK_IMPORTED_MODULE_6__["FamilyUnitPage"]]
      })], FamilyUnitPageModule);
      /***/
    },

    /***/
    "EQY+":
    /*!*************************************************************************!*\
      !*** ./src/app/pages/profile/family-unit/family-unit-routing.module.ts ***!
      \*************************************************************************/

    /*! exports provided: FamilyUnitPageRoutingModule */

    /***/
    function EQY(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FamilyUnitPageRoutingModule", function () {
        return FamilyUnitPageRoutingModule;
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


      var _family_unit_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./family-unit.page */
      "sIj7");

      var routes = [{
        path: '',
        component: _family_unit_page__WEBPACK_IMPORTED_MODULE_3__["FamilyUnitPage"]
      }];

      var FamilyUnitPageRoutingModule = function FamilyUnitPageRoutingModule() {
        _classCallCheck(this, FamilyUnitPageRoutingModule);
      };

      FamilyUnitPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], FamilyUnitPageRoutingModule);
      /***/
    },

    /***/
    "FvjZ":
    /*!*******************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/family-unit/family-unit.page.html ***!
      \*******************************************************************************************************/

    /*! exports provided: default */

    /***/
    function FvjZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"{{'setting.button_profile' | translate }}\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ 'setting.family_unit.title_family_unit' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content *ngIf=\"listFamilyUnit !== undefined\">\n  <ion-list *ngFor=\"let family of this.listFamilyUnit\">\n    <ion-card class=\"cardProfile\" (click)=\"changeAccount(family)\">\n      <ion-card-content>\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <img [src]=\"family.thumbnail\">\n      </ion-avatar>\n      <ion-label >\n        <h3>{{family.name}}</h3>\n        <p>{{family.family_relationship}}</p>\n      </ion-label>\n    </ion-item>\n  </ion-card-content>\n  </ion-card>\n  </ion-list>\n</ion-content>\n";
      /***/
    },

    /***/
    "J0l7":
    /*!*****************************************************************!*\
      !*** ./src/app/pages/profile/family-unit/family-unit.page.scss ***!
      \*****************************************************************/

    /*! exports provided: default */

    /***/
    function J0l7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmYW1pbHktdW5pdC5wYWdlLnNjc3MifQ== */";
      /***/
    },

    /***/
    "sIj7":
    /*!***************************************************************!*\
      !*** ./src/app/pages/profile/family-unit/family-unit.page.ts ***!
      \***************************************************************/

    /*! exports provided: FamilyUnitPage */

    /***/
    function sIj7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FamilyUnitPage", function () {
        return FamilyUnitPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_family_unit_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./family-unit.page.html */
      "FvjZ");
      /* harmony import */


      var _family_unit_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./family-unit.page.scss */
      "J0l7");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");

      var FamilyUnitPage = /*#__PURE__*/function () {
        function FamilyUnitPage(dooleService, alertController, translate) {
          _classCallCheck(this, FamilyUnitPage);

          this.dooleService = dooleService;
          this.alertController = alertController;
          this.translate = translate;
        }

        _createClass(FamilyUnitPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getFamilyUnitData();
          }
        }, {
          key: "getFamilyUnitData",
          value: function getFamilyUnitData() {
            var _this = this;

            this.dooleService.getAPIFamilyUnit().subscribe(function (res) {
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

                        _context.t0.log.call(_context.t0, '[FamilyUnitPage] getFamilyUnitData()', _context.t1);

                        this.listFamilyUnit = res;

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }, function (err) {
              console.log('[FamilyUnitPage] getFamilyUnitData() ERROR(' + err.code + '): ' + err.message);
              throw err;
            });
          }
        }, {
          key: "changeAccount",
          value: function changeAccount(family) {
            console.log('[FamilyUnitPage] changeAccount()', family.name);
            this.presentAlertConfirm(family);
          }
        }, {
          key: "presentAlertConfirm",
          value: function presentAlertConfirm(family) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var alert;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.alertController.create({
                        cssClass: 'my-alert-class',
                        header: family.name,
                        message: this.translate.instant("setting.family_unit.msg_alert_change_perfil"),
                        buttons: [{
                          text: this.translate.instant("alert.button_cancel"),
                          role: 'cancel',
                          cssClass: 'secondary',
                          handler: function handler(blah) {
                            console.log('Confirm Cancel: blah');
                          }
                        }, {
                          text: this.translate.instant("alert.button_change"),
                          handler: function handler() {
                            console.log('Confirm Okay');
                            console.log('[FamilyUnitPage] presentAlertConfirm() Cuenta de:', family.name);
                          }
                        }]
                      });

                    case 2:
                      alert = _context2.sent;
                      _context2.next = 5;
                      return alert.present();

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }]);

        return FamilyUnitPage;
      }();

      FamilyUnitPage.ctorParameters = function () {
        return [{
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]
        }];
      };

      FamilyUnitPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-family-unit',
        template: _raw_loader_family_unit_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_family_unit_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], FamilyUnitPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=family-unit-family-unit-module-es5.js.map