(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sms-sms-module"], {
    /***/
    "OvAX":
    /*!*******************************************************!*\
      !*** ./src/app/pages/login/sms/sms-routing.module.ts ***!
      \*******************************************************/

    /*! exports provided: SmsPageRoutingModule */

    /***/
    function OvAX(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SmsPageRoutingModule", function () {
        return SmsPageRoutingModule;
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


      var _sms_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./sms.page */
      "gtvT");

      var routes = [{
        path: '',
        component: _sms_page__WEBPACK_IMPORTED_MODULE_3__["SmsPage"]
      }, {
        path: 'verification',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | verification-verification-module */
          "verification-verification-module").then(__webpack_require__.bind(null,
          /*! ../verification/verification.module */
          "EHAZ")).then(function (m) {
            return m.VerificationPageModule;
          });
        }
      }];

      var SmsPageRoutingModule = function SmsPageRoutingModule() {
        _classCallCheck(this, SmsPageRoutingModule);
      };

      SmsPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], SmsPageRoutingModule);
      /***/
    },

    /***/
    "cqrv":
    /*!***********************************************!*\
      !*** ./src/app/pages/login/sms/sms.page.scss ***!
      \***********************************************/

    /*! exports provided: default */

    /***/
    function cqrv(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbXMucGFnZS5zY3NzIn0= */";
      /***/
    },

    /***/
    "gtvT":
    /*!*********************************************!*\
      !*** ./src/app/pages/login/sms/sms.page.ts ***!
      \*********************************************/

    /*! exports provided: SmsPage */

    /***/
    function gtvT(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SmsPage", function () {
        return SmsPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_sms_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./sms.page.html */
      "wEmF");
      /* harmony import */


      var _sms_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./sms.page.scss */
      "cqrv");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var SmsPage = /*#__PURE__*/function () {
        function SmsPage() {
          _classCallCheck(this, SmsPage);
        }

        _createClass(SmsPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return SmsPage;
      }();

      SmsPage.ctorParameters = function () {
        return [];
      };

      SmsPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-sms',
        template: _raw_loader_sms_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_sms_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], SmsPage);
      /***/
    },

    /***/
    "o3pB":
    /*!***********************************************!*\
      !*** ./src/app/pages/login/sms/sms.module.ts ***!
      \***********************************************/

    /*! exports provided: SmsPageModule */

    /***/
    function o3pB(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SmsPageModule", function () {
        return SmsPageModule;
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


      var _sms_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./sms-routing.module */
      "OvAX");
      /* harmony import */


      var _sms_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./sms.page */
      "gtvT");

      var SmsPageModule = function SmsPageModule() {
        _classCallCheck(this, SmsPageModule);
      };

      SmsPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _sms_routing_module__WEBPACK_IMPORTED_MODULE_5__["SmsPageRoutingModule"]],
        declarations: [_sms_page__WEBPACK_IMPORTED_MODULE_6__["SmsPage"]]
      })], SmsPageModule);
      /***/
    },

    /***/
    "wEmF":
    /*!*************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/sms/sms.page.html ***!
      \*************************************************************************************/

    /*! exports provided: default */

    /***/
    function wEmF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [text]=\"buttonText\" [icon]=\"buttonIcon\">\n      </ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"toolbarTitle\">Verificación de Identidad</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <div class=\"main-container\">\n    <ion-grid>\n      <h2 class=\"bold\">Empezamos por tu número de teléfono</h2>\n      <ion-text>Recibirás un SMS con un código de verificación.\n        ¡Porque tu privacidad es lo más importante!</ion-text>\n      <ion-col>\n        <div style=\"padding-top: 15%;\">\n          <ion-item-divider>\n            <ion-input placeholder=\"+34\">\n            </ion-input>\n          </ion-item-divider>\n          <ion-button type=\"button\" color=\"primary\" expand=\"block\" style=\"margin-top:15%;\" routerLink=\"verification\">\n            Continuar\n          </ion-button>\n          <div style=\"padding-top:5%;\">\n            <ion-text>Tu número únicamente será utilizado para situaciones urgentes o de emergencia,\n              pero nunca será compartido con otras empresas o terceros.</ion-text>\n          </div>\n        </div>\n      </ion-col>\n    </ion-grid>\n  </div>\n</ion-content>";
      /***/
    }
  }]);
})();
//# sourceMappingURL=sms-sms-module-es5.js.map