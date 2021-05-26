(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contact-contact-module"], {
    /***/
    "AWMO":
    /*!******************************************************!*\
      !*** ./src/app/pages/home/contact/contact.module.ts ***!
      \******************************************************/

    /*! exports provided: ContactPageModule */

    /***/
    function AWMO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ContactPageModule", function () {
        return ContactPageModule;
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


      var _contact_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./contact-routing.module */
      "YyIk");
      /* harmony import */


      var _contact_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./contact.page */
      "fcYr");

      var ContactPageModule = function ContactPageModule() {
        _classCallCheck(this, ContactPageModule);
      };

      ContactPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _contact_routing_module__WEBPACK_IMPORTED_MODULE_5__["ContactPageRoutingModule"]],
        declarations: [_contact_page__WEBPACK_IMPORTED_MODULE_6__["ContactPage"]]
      })], ContactPageModule);
      /***/
    },

    /***/
    "CmhM":
    /*!******************************************************!*\
      !*** ./src/app/pages/home/contact/contact.page.scss ***!
      \******************************************************/

    /*! exports provided: default */

    /***/
    function CmhM(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250YWN0LnBhZ2Uuc2NzcyJ9 */";
      /***/
    },

    /***/
    "LlVn":
    /*!********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/contact/contact.page.html ***!
      \********************************************************************************************/

    /*! exports provided: default */

    /***/
    function LlVn(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>contact</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n";
      /***/
    },

    /***/
    "YyIk":
    /*!**************************************************************!*\
      !*** ./src/app/pages/home/contact/contact-routing.module.ts ***!
      \**************************************************************/

    /*! exports provided: ContactPageRoutingModule */

    /***/
    function YyIk(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ContactPageRoutingModule", function () {
        return ContactPageRoutingModule;
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


      var _contact_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./contact.page */
      "fcYr");

      var routes = [{
        path: '',
        component: _contact_page__WEBPACK_IMPORTED_MODULE_3__["ContactPage"]
      }];

      var ContactPageRoutingModule = function ContactPageRoutingModule() {
        _classCallCheck(this, ContactPageRoutingModule);
      };

      ContactPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ContactPageRoutingModule);
      /***/
    },

    /***/
    "fcYr":
    /*!****************************************************!*\
      !*** ./src/app/pages/home/contact/contact.page.ts ***!
      \****************************************************/

    /*! exports provided: ContactPage */

    /***/
    function fcYr(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ContactPage", function () {
        return ContactPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_contact_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./contact.page.html */
      "LlVn");
      /* harmony import */


      var _contact_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./contact.page.scss */
      "CmhM");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var ContactPage = /*#__PURE__*/function () {
        function ContactPage() {
          _classCallCheck(this, ContactPage);
        }

        _createClass(ContactPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return ContactPage;
      }();

      ContactPage.ctorParameters = function () {
        return [];
      };

      ContactPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-contact',
        template: _raw_loader_contact_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_contact_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ContactPage);
      /***/
    }
  }]);
})();
//# sourceMappingURL=contact-contact-module-es5.js.map