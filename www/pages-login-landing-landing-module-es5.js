(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-landing-landing-module"], {
    /***/
    "Ci23":
    /*!*********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/landing/landing.page.html ***!
      \*********************************************************************************************/

    /*! exports provided: default */

    /***/
    function Ci23(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-content fullscreen>\n    <div class=\"main-container\">\n        <img style=\"padding-top: 40%;\" src=\"/assets/images/logo.svg\" />\n        <ion-grid>\n            <ion-col>\n                <form [formGroup]=\"loginForm\" (ngSubmit)=\"doDooleAppLogin()\">\n                    <ion-item-divider>\n                        <ion-icon name=\"person\"></ion-icon>\n                        <ion-input type=\"text\" placeholder=\"{{'landing.user_placeholder' | translate }}\" formControlName=\"username\" >\n                        </ion-input>\n                    </ion-item-divider>\n                    <ion-item-divider>\n                        <ion-icon name=\"lock-closed\"></ion-icon>\n                        <app-show-hide-password>\n                            <ion-input type=\"password\" placeholder=\"{{'landing.password_placeholder' | translate }}\" formControlName=\"password\">\n                            </ion-input>\n                        </app-show-hide-password>\n                    </ion-item-divider>\n                    <ion-text (click)=\"passwordRecovery()\">\n                        <a>{{ 'landing.password_recovery' | translate}}</a>\n                    </ion-text>\n                  \n                    <!-- <ion-button type=\"submit\" color=\"primary\" expand=\"block\" class=\"enter-btn\" routerLink=\"legal\">\n                        Iniciar sesión\n                    </ion-button> -->\n\n                    <ion-button type=\"submit\" size=\"medium\" [disabled]=\"!loginForm.valid\"\n                    color=\"primary\" expand=\"block\" class=\"enter-btn\">\n                    {{ 'landing.button_signin' | translate}}</ion-button>\n       \n                    <ion-button expand=\"block\" color=\"transparent\" class=\"buttonLink\">\n                        {{ 'landing.button_registre' | translate}}\n                    </ion-button>\n                </form>\n            </ion-col>\n        </ion-grid>\n    </div>\n</ion-content>";
      /***/
    },

    /***/
    "Ibm1":
    /*!***************************************************************!*\
      !*** ./src/app/pages/login/landing/landing-routing.module.ts ***!
      \***************************************************************/

    /*! exports provided: LandingPageRoutingModule */

    /***/
    function Ibm1(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LandingPageRoutingModule", function () {
        return LandingPageRoutingModule;
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


      var _landing_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./landing.page */
      "tV2Q");

      var routes = [{
        path: '',
        component: _landing_page__WEBPACK_IMPORTED_MODULE_3__["LandingPage"]
      }, {
        path: 'legal',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | legal-legal-module */
          "legal-legal-module").then(__webpack_require__.bind(null,
          /*! ../legal/legal.module */
          "XR32")).then(function (m) {
            return m.LegalPageModule;
          });
        }
      }];

      var LandingPageRoutingModule = function LandingPageRoutingModule() {
        _classCallCheck(this, LandingPageRoutingModule);
      };

      LandingPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], LandingPageRoutingModule);
      /***/
    },

    /***/
    "T6vd":
    /*!*******************************************************!*\
      !*** ./src/app/pages/login/landing/landing.page.scss ***!
      \*******************************************************/

    /*! exports provided: default */

    /***/
    function T6vd(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".enter-btn {\n  margin-top: 10%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xhbmRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZUFBQTtBQUNKIiwiZmlsZSI6ImxhbmRpbmcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVudGVyLWJ0bntcbiAgICBtYXJnaW4tdG9wOiAxMCU7XG59Il19 */";
      /***/
    },

    /***/
    "tV2Q":
    /*!*****************************************************!*\
      !*** ./src/app/pages/login/landing/landing.page.ts ***!
      \*****************************************************/

    /*! exports provided: LandingPage */

    /***/
    function tV2Q(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LandingPage", function () {
        return LandingPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_landing_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./landing.page.html */
      "Ci23");
      /* harmony import */


      var _landing_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./landing.page.scss */
      "T6vd");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! src/app/services/authentication.service */
      "ej43");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var src_app_services_language_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! src/app/services/language.service */
      "kyOO");

      var Storage = _capacitor_core__WEBPACK_IMPORTED_MODULE_10__["Plugins"].Storage;

      var LandingPage = /*#__PURE__*/function () {
        function LandingPage(router, route, translate, loadingController, location, authService, alertController, ngZone, languageService) {
          _classCallCheck(this, LandingPage);

          this.router = router;
          this.route = route;
          this.translate = translate;
          this.loadingController = loadingController;
          this.location = location;
          this.authService = authService;
          this.alertController = alertController;
          this.ngZone = ngZone;
          this.languageService = languageService;
          this.validation_messages = {
            'username': [{
              type: 'required',
              message: 'login.username_val'
            }],
            'password': [{
              type: 'required',
              message: 'login.password_val'
            }]
          };
          this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required])),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]))
          });
        }

        _createClass(LandingPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "showAlert",
          value: function showAlert(message) {
            this.alertController.create({
              header: 'Error',
              message: message,
              buttons: ['OK']
            }).then(function (res) {
              res.present();
            });
          }
        }, {
          key: "dismissLoading",
          value: function dismissLoading() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (this.redirectLoader) {
                        console.log("dismissLoading");
                        this.redirectLoader.dismiss();
                      }

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "resetSubmitError",
          value: function resetSubmitError() {
            this.submitError = null;
          } // Once the auth provider finished the authentication flow, and the auth redirect completes,
          // hide the loader and redirect the user to the profile page

        }, {
          key: "redirectLoggedUserToHomePage",
          value: function redirectLoggedUserToHomePage() {
            var _this = this;

            console.log('[LandingPage] redirectLoggedUserToHomePage()'); //this.dismissLoading();
            // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
            // That's why we need to wrap the router navigation call inside an ngZone wrapper

            this.ngZone.run(function () {
              //this.router.navigate(['app/home']);
              _this.router.navigate(['home']);
            });
          }
        }, {
          key: "doDooleAppLogin",
          value: function doDooleAppLogin() {
            var _this2 = this;

            var text = this.translate.instant('login.submit');
            this.loadingController.create({
              spinner: 'lines',
              message: text + 'DooleApp',
              cssClass: 'custom-loading',
              backdropDismiss: false
            }).then(function (loader) {
              var currentUrl = _this2.location.path();

              _this2.redirectLoader = loader;

              _this2.redirectLoader.present();

              _this2.authService.login(_this2.loginForm.value).subscribe(function (res) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.t0 = console;
                          _context2.next = 3;
                          return res;

                        case 3:
                          _context2.t1 = _context2.sent;

                          _context2.t0.log.call(_context2.t0, '[LandingPage] doDooleAppLogin()', _context2.t1);

                          this.dismissLoading(); //this.checkConditionLegal(res.condicion_legal)

                          this.router.navigate(['/legal']);

                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));
              }, function (error) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.t0 = console;
                          _context3.next = 3;
                          return error;

                        case 3:
                          _context3.t1 = _context3.sent;

                          _context3.t0.log.call(_context3.t0, 'doDooleAppLogin() ERROR', _context3.t1);

                          this.dismissLoading();
                          throw error;

                        case 7:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));
              });
            });
          }
        }, {
          key: "checkConditionLegal",
          value: function checkConditionLegal(condicion) {
            if (!condicion) this.router.navigate(['/legal']);else this.redirectLoggedUserToHomePage();
          }
        }, {
          key: "saveInLocalStorage",
          value: function saveInLocalStorage(data) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return Storage.set({
                        key: 'mutua',
                        value: data
                      });

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4);
            }));
          }
        }, {
          key: "passwordRecovery",
          value: function passwordRecovery() {
            console.log('[LandingPage] passwordRecovery()');
          }
        }]);

        return LandingPage;
      }();

      LandingPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["LoadingController"]
        }, {
          type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]
        }, {
          type: src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]
        }, {
          type: src_app_services_language_service__WEBPACK_IMPORTED_MODULE_11__["LanguageService"]
        }];
      };

      LandingPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-landing',
        template: _raw_loader_landing_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_landing_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], LandingPage);
      /***/
    },

    /***/
    "uOmu":
    /*!*******************************************************!*\
      !*** ./src/app/pages/login/landing/landing.module.ts ***!
      \*******************************************************/

    /*! exports provided: LandingPageModule */

    /***/
    function uOmu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LandingPageModule", function () {
        return LandingPageModule;
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


      var _landing_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./landing-routing.module */
      "Ibm1");
      /* harmony import */


      var _landing_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./landing.page */
      "tV2Q");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! src/app/components/components.module */
      "j1ZV");

      var routes = [{
        path: '',
        component: _landing_page__WEBPACK_IMPORTED_MODULE_6__["LandingPage"]
      }];

      var LandingPageModule = function LandingPageModule() {
        _classCallCheck(this, LandingPageModule);
      };

      LandingPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], src_app_components_components_module__WEBPACK_IMPORTED_MODULE_9__["ComponentsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild(routes), _landing_routing_module__WEBPACK_IMPORTED_MODULE_5__["LandingPageRoutingModule"]],
        declarations: [_landing_page__WEBPACK_IMPORTED_MODULE_6__["LandingPage"]]
      })], LandingPageModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-login-landing-landing-module-es5.js.map