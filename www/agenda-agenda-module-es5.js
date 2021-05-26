(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["agenda-agenda-module"], {
    /***/
    "2Blx":
    /*!****************************************************!*\
      !*** ./src/app/pages/home/agenda/agenda.page.scss ***!
      \****************************************************/

    /*! exports provided: default */

    /***/
    function Blx(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZ2VuZGEucGFnZS5zY3NzIn0= */";
      /***/
    },

    /***/
    "Kt1X":
    /*!******************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/agenda/agenda.page.html ***!
      \******************************************************************************************/

    /*! exports provided: default */

    /***/
    function Kt1X(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>agenda</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n";
      /***/
    },

    /***/
    "LHsY":
    /*!****************************************************!*\
      !*** ./src/app/pages/home/agenda/agenda.module.ts ***!
      \****************************************************/

    /*! exports provided: AgendaPageModule */

    /***/
    function LHsY(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AgendaPageModule", function () {
        return AgendaPageModule;
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


      var _agenda_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./agenda-routing.module */
      "iWQv");
      /* harmony import */


      var _agenda_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./agenda.page */
      "LgUQ");

      var AgendaPageModule = function AgendaPageModule() {
        _classCallCheck(this, AgendaPageModule);
      };

      AgendaPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _agenda_routing_module__WEBPACK_IMPORTED_MODULE_5__["AgendaPageRoutingModule"]],
        declarations: [_agenda_page__WEBPACK_IMPORTED_MODULE_6__["AgendaPage"]]
      })], AgendaPageModule);
      /***/
    },

    /***/
    "LgUQ":
    /*!**************************************************!*\
      !*** ./src/app/pages/home/agenda/agenda.page.ts ***!
      \**************************************************/

    /*! exports provided: AgendaPage */

    /***/
    function LgUQ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AgendaPage", function () {
        return AgendaPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_agenda_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./agenda.page.html */
      "Kt1X");
      /* harmony import */


      var _agenda_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./agenda.page.scss */
      "2Blx");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AgendaPage = /*#__PURE__*/function () {
        function AgendaPage() {
          _classCallCheck(this, AgendaPage);
        }

        _createClass(AgendaPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return AgendaPage;
      }();

      AgendaPage.ctorParameters = function () {
        return [];
      };

      AgendaPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-agenda',
        template: _raw_loader_agenda_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_agenda_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], AgendaPage);
      /***/
    },

    /***/
    "iWQv":
    /*!************************************************************!*\
      !*** ./src/app/pages/home/agenda/agenda-routing.module.ts ***!
      \************************************************************/

    /*! exports provided: AgendaPageRoutingModule */

    /***/
    function iWQv(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AgendaPageRoutingModule", function () {
        return AgendaPageRoutingModule;
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


      var _agenda_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./agenda.page */
      "LgUQ");

      var routes = [{
        path: '',
        component: _agenda_page__WEBPACK_IMPORTED_MODULE_3__["AgendaPage"]
      }];

      var AgendaPageRoutingModule = function AgendaPageRoutingModule() {
        _classCallCheck(this, AgendaPageRoutingModule);
      };

      AgendaPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], AgendaPageRoutingModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=agenda-agenda-module-es5.js.map