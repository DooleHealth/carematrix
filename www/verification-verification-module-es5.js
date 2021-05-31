(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["verification-verification-module"], {
    /***/
    "3Tn+":
    /*!***************************************************************!*\
      !*** ./src/app/pages/login/verification/verification.page.ts ***!
      \***************************************************************/

    /*! exports provided: VerificationPage */

    /***/
    function Tn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VerificationPage", function () {
        return VerificationPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_verification_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./verification.page.html */
      "Rz++");
      /* harmony import */


      var _verification_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./verification.page.scss */
      "PJ6W");
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


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");

      var Storage = _capacitor_core__WEBPACK_IMPORTED_MODULE_6__["Plugins"].Storage;

      var VerificationPage = /*#__PURE__*/function () {
        function VerificationPage(router, translate, alertController, dooleService) {
          _classCallCheck(this, VerificationPage);

          this.router = router;
          this.translate = translate;
          this.alertController = alertController;
          this.dooleService = dooleService;
          this.KEY_TELEPHONE_STORAGE = 'telephone';
          this.isSubmitted = false;
          this.code = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(4)]);
        }

        _createClass(VerificationPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "goIntro",
          value: function goIntro() {
            console.log('[VerificationPage] goIntro()', this.code.value);
            this.isSubmitted = true;

            if (!this.code.invalid) {
              this.checkCode(this.code.value);
            }
          }
        }, {
          key: "checkCode",
          value: function checkCode(code) {
            var _this = this;

            this.dooleService.postAPIsmsConfirmation(code).subscribe(function (res) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var isSuccess;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = console;
                        _context.next = 3;
                        return res;

                      case 3:
                        _context.t1 = _context.sent;

                        _context.t0.log.call(_context.t0, '[VerificationPage] checkCode()', _context.t1);

                        isSuccess = res.success;

                        if (isSuccess) {
                          this.router.navigateByUrl("intro");
                        } else {
                          this.dooleService.presentAlert(this.translate.instant("verification.alert_message"));
                        }

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }, function (err) {
              console.log('VerificationPage checkCode()  ERROR(' + err.code + '): ' + err.message);
              throw err;
            });
          }
        }, {
          key: "sendTelephone",
          value: function sendTelephone(telephone) {
            var _this2 = this;

            console.log('[VerificationPage] sendTelephone()', telephone);
            this.dooleService.postAPIsmsVerification(telephone).subscribe(function (res) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

                        _context2.t0.log.call(_context2.t0, '[LegalPage] sendTelephone()', _context2.t1);

                        isSuccess = res.success;

                        if (!isSuccess) {
                          _context2.next = 10;
                          break;
                        }

                        messagge = this.translate.instant("verification.send_telephone_alert_message");
                        _context2.next = 10;
                        return this.dooleService.presentAlert(messagge);

                      case 10:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));
            }, function (err) {
              console.log('getAll ERROR(' + err.code + '): ' + err.message);
              throw err;
            });
          }
        }, {
          key: "getVerificationCode",
          value: function getVerificationCode() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this3 = this;

              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      console.log('[VerificationPage] getVerificationCode()');
                      Storage.get({
                        key: this.KEY_TELEPHONE_STORAGE
                      }).then(function (data) {
                        var telephone = data.value;

                        _this3.sendTelephone(telephone);
                      });

                    case 2:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return VerificationPage;
      }();

      VerificationPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"]
        }, {
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_9__["DooleService"]
        }];
      };

      VerificationPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-verification',
        template: _raw_loader_verification_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_verification_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], VerificationPage);
      /***/
    },

    /***/
    "EHAZ":
    /*!*****************************************************************!*\
      !*** ./src/app/pages/login/verification/verification.module.ts ***!
      \*****************************************************************/

    /*! exports provided: VerificationPageModule */

    /***/
    function EHAZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VerificationPageModule", function () {
        return VerificationPageModule;
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


      var _verification_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./verification-routing.module */
      "LxuC");
      /* harmony import */


      var _verification_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./verification.page */
      "3Tn+");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var VerificationPageModule = function VerificationPageModule() {
        _classCallCheck(this, VerificationPageModule);
      };

      VerificationPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], _verification_routing_module__WEBPACK_IMPORTED_MODULE_5__["VerificationPageRoutingModule"]],
        declarations: [_verification_page__WEBPACK_IMPORTED_MODULE_6__["VerificationPage"]]
      })], VerificationPageModule);
      /***/
    },

    /***/
    "LxuC":
    /*!*************************************************************************!*\
      !*** ./src/app/pages/login/verification/verification-routing.module.ts ***!
      \*************************************************************************/

    /*! exports provided: VerificationPageRoutingModule */

    /***/
    function LxuC(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "VerificationPageRoutingModule", function () {
        return VerificationPageRoutingModule;
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


      var _verification_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./verification.page */
      "3Tn+");

      var routes = [{
        path: '',
        component: _verification_page__WEBPACK_IMPORTED_MODULE_3__["VerificationPage"]
      }, {
        path: 'intro',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | onboarding-intro-intro-module */
          "onboarding-intro-intro-module").then(__webpack_require__.bind(null,
          /*! ../../onboarding/intro/intro.module */
          "hxez")).then(function (m) {
            return m.IntroPageModule;
          });
        }
      }];

      var VerificationPageRoutingModule = function VerificationPageRoutingModule() {
        _classCallCheck(this, VerificationPageRoutingModule);
      };

      VerificationPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], VerificationPageRoutingModule);
      /***/
    },

    /***/
    "PJ6W":
    /*!*****************************************************************!*\
      !*** ./src/app/pages/login/verification/verification.page.scss ***!
      \*****************************************************************/

    /*! exports provided: default */

    /***/
    function PJ6W(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2ZXJpZmljYXRpb24ucGFnZS5zY3NzIn0= */";
      /***/
    },

    /***/
    "Rz++":
    /*!*******************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/verification/verification.page.html ***!
      \*******************************************************************************************************/

    /*! exports provided: default */

    /***/
    function Rz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [text]=\"buttonText\" [icon]=\"buttonIcon\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"toolbarTitle\">{{ 'verification.header' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <div class=\"main-container\">\n    <ion-grid>\n      <h2 class=\"bold\">{{ 'verification.title' | translate}}</h2>\n      <ion-text>{{ 'verification.text1' | translate}}</ion-text><a (click)=\"getVerificationCode()\">aquí.</a>\n      <ion-col>\n        <div style=\"padding-top: 15%;\">\n          <ion-item-divider>\n            <ion-input placeholder=\"\" [formControl]=\"code\" maxlength=\"4\" (ionInput)=\"isSubmitted = false\" required></ion-input>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmitted && this.code.hasError('required')\">\n              {{ 'verification.error_required' | translate}}\n            </ion-label>\n            <ion-label class=\"error ion-padding\" color=\"danger\" *ngIf=\"isSubmitted && this.code.hasError('minlength')\">\n              {{ 'verification.error_min_lenght' | translate}}\n            </ion-label>\n          </ion-item-divider>\n          <ion-button type=\"button\" color=\"primary\" expand=\"block\" style=\"margin-top:15%;\" (click)=\"goIntro()\">\n            {{ 'verification.next_button' | translate}}\n          </ion-button>\n        </div>\n      </ion-col>\n    </ion-grid>\n  </div>\n</ion-content>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=verification-verification-module-es5.js.map