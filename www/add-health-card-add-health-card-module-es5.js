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


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button text=\"Inicio\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{ 'Agregar Tarjeta Sanitaria' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content fullscreen>\n  <ion-grid>\n    <ion-row>\n      <ion-col size=\"12\">\n        <img class=\"img-wrapperCard\" src=\"assets/images/Subtract.png\">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n    </ion-row>\n  </ion-grid>\n\n\n  <ion-card class=\"cardProfile\">\n    <ion-list>\n      <ion-item lines=\"none\">\n        <ion-label>{{ 'Modalidad' | translate}}</ion-label>\n        <ion-select interface=\"action-sheet\" placeholder=\"Modalidad\">\n          <ion-select-option *ngFor=\"let card of cards\" [value]=\"card\">{{card.modality}}</ion-select-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n  <ion-card class=\"cardProfile\">\n    <ion-list>\n      <ion-item>\n        <ion-label>Nombre</ion-label>\n        <ion-label class=\"textMedium\">Nombre</ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{ 'Número Filiación' | translate}}</ion-label>\n        <ion-label class=\"textMedium\">Número Filiación</ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item>\n        <ion-label>{{ 'Caducidad' | translate}}</ion-label>\n        <ion-datetime displayFormat=\"DD MM YY\" placeholder=\"Caducidad\" min=\"1990-01-01\"></ion-datetime>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label lines=\"none\">{{ 'Fecha expedición' | translate}}</ion-label>\n        <ion-datetime displayFormat=\"DD MM YY\" placeholder=\"Fecha expedición\" min=\"1990-01-01\"></ion-datetime>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n\n</ion-content>";
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

      var AddHealthCardPage = /*#__PURE__*/function () {
        function AddHealthCardPage() {
          _classCallCheck(this, AddHealthCardPage);

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
        }

        _createClass(AddHealthCardPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return AddHealthCardPage;
      }();

      AddHealthCardPage.ctorParameters = function () {
        return [];
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
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], _add_health_card_routing_module__WEBPACK_IMPORTED_MODULE_5__["AddHealthCardPageRoutingModule"]],
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