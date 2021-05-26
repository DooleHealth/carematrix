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

      var VerificationPage = /*#__PURE__*/function () {
        function VerificationPage() {
          _classCallCheck(this, VerificationPage);
        }

        _createClass(VerificationPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return VerificationPage;
      }();

      VerificationPage.ctorParameters = function () {
        return [];
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

      var VerificationPageModule = function VerificationPageModule() {
        _classCallCheck(this, VerificationPageModule);
      };

      VerificationPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _verification_routing_module__WEBPACK_IMPORTED_MODULE_5__["VerificationPageRoutingModule"]],
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


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [text]=\"buttonText\" [icon]=\"buttonIcon\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"toolbarTitle\">Verificación de Identidad</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <div class=\"main-container\">\n    <ion-grid>\n      <h2 class=\"bold\">Confirma tu código de verificación</h2>\n      <ion-text>Te hemos enviado un SMS con un código para verificar tu número teléfonico y poder continuar.\n        Si no ha recibido ningún mensaje pulse </ion-text><a>aquí.</a>\n      <ion-col>\n        <div style=\"padding-top: 15%;\">\n          <ion-item-divider>\n            <ion-input placeholder=\"\">\n            </ion-input>\n          </ion-item-divider>\n          <ion-button type=\"button\" color=\"primary\" expand=\"block\" style=\"margin-top:15%;\" routerLink=\"/home\">\n          <ion-button type=\"button\" color=\"primary\" expand=\"block\" style=\"margin-top:15%;\" routerLink=\"intro\">\n\n            Continuar\n          </ion-button>\n        </div>\n      </ion-col>\n    </ion-grid>\n  </div>\n</ion-content>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=verification-verification-module-es5.js.map