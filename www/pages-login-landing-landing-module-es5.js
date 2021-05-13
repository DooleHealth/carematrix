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


      __webpack_exports__["default"] = "<ion-content fullscreen>\n    <div class=\"main-container\">\n        <img style=\"padding-top: 40%;\" src=\"/assets/images/logo.svg\" />\n        <ion-grid>\n            <ion-col>\n                <form [formGroup]=\"loginForm\" (ngSubmit)=\"doDooleAppLogin()\">\n                    <ion-item-divider>\n                        <ion-icon name=\"person\"></ion-icon>\n                        <ion-input type=\"text\" placeholder=\"Usuario\" formControlName=\"username\" >\n                        </ion-input>\n                    </ion-item-divider>\n                    <ion-item-divider>\n                        <ion-icon name=\"lock-closed\"></ion-icon>\n                        <ion-input type=\"password\" placeholder=\"Contraseña\" formControlName=\"password\">\n                        </ion-input>\n                    </ion-item-divider>\n                    <ion-text>\n                        <a> ¿Has olvidado la contraseña?</a>\n                    </ion-text>\n                  \n                    <!-- <ion-button type=\"submit\" color=\"primary\" expand=\"block\" class=\"enter-btn\" routerLink=\"legal\">\n                        Iniciar sesión\n                    </ion-button> -->\n\n                    <ion-button type=\"submit\" size=\"medium\" [disabled]=\"!loginForm.valid\"\n                    color=\"primary\" expand=\"block\" class=\"enter-btn\" routerLink=\"legal\">\n                        Iniciar sesión</ion-button>\n       \n                    <ion-button expand=\"block\" color=\"transparent\" class=\"buttonLink\">\n                        Crear Usuario\n                    </ion-button>\n                </form>\n            </ion-col>\n        </ion-grid>\n    </div>\n</ion-content>";
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

      var LandingPage = /*#__PURE__*/function () {
        function LandingPage() {
          _classCallCheck(this, LandingPage);

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
          key: "doDooleAppLogin",
          value: function doDooleAppLogin() {
            if (!this.loginForm.valid) {
              console.log('Please provide all the required values!');
              return false;
            } else {
              console.log(this.loginForm.value);
            }
          }
        }]);

        return LandingPage;
      }();

      LandingPage.ctorParameters = function () {
        return [];
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

      var LandingPageModule = function LandingPageModule() {
        _classCallCheck(this, LandingPageModule);
      };

      LandingPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _landing_routing_module__WEBPACK_IMPORTED_MODULE_5__["LandingPageRoutingModule"]],
        declarations: [_landing_page__WEBPACK_IMPORTED_MODULE_6__["LandingPage"]]
      })], LandingPageModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-login-landing-landing-module-es5.js.map