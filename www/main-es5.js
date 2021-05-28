(function () {
  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /Users/dvalarezo/Documents/GitHub/Doolehealth/dooleApp/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "0Flm":
    /*!*********************************************!*\
      !*** ./src/app/services/logging.service.ts ***!
      \*********************************************/

    /*! exports provided: LoggingService */

    /***/
    function Flm(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LoggingService", function () {
        return LoggingService;
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


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");

      var LoggingService = /*#__PURE__*/function () {
        function LoggingService(platform) {
          _classCallCheck(this, LoggingService);

          this.platform = platform;
        }

        _createClass(LoggingService, [{
          key: "logError",
          value: function logError(message) {
            // Send errors to be saved here
            if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
              console.error("Error log: ", message);
            } else {
              console.error("Error log: ", message);
            }

            return;
          }
        }]);

        return LoggingService;
      }();

      LoggingService.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"]
        }];
      };

      LoggingService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], LoggingService);
      /***/
    },

    /***/
    "1JxX":
    /*!***********************************************************************!*\
      !*** ./src/app/components/custom-header/custom-header.component.scss ***!
      \***********************************************************************/

    /*! exports provided: default */

    /***/
    function JxX(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".logo-header {\n  width: 170px;\n  height: auto;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.header-one {\n  --background: rgba(255, 255, 255, 0.9);\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2N1c3RvbS1oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0VBRUEsWUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBR0U7RUFDRSxzQ0FBQTtFQUNBLDRFQUFBO0FBQUoiLCJmaWxlIjoiY3VzdG9tLWhlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dvLWhlYWRlciB7XG4gICAgd2lkdGg6IDE3MHB4O1xuXG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBcbiAgfVxuICAuaGVhZGVyLW9uZSB7XG4gICAgLS1iYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gICAgYm94LXNoYWRvdzogMCA0cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDZweCAyMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjE5KTtcbiAgfVxuICBcbiAgIl19 */";
      /***/
    },

    /***/
    "1oPy":
    /*!*************************************************!*\
      !*** ./src/app/utils/history-helper.service.ts ***!
      \*************************************************/

    /*! exports provided: HistoryHelperService */

    /***/
    function oPy(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HistoryHelperService", function () {
        return HistoryHelperService;
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


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var HistoryHelperService = function HistoryHelperService(router) {
        var _this = this;

        _classCallCheck(this, HistoryHelperService);

        this.router = router;
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (event) {
          return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"];
        })).subscribe(function (_ref) {
          var urlAfterRedirects = _ref.urlAfterRedirects;
          // console.log('previous URL', this.previousUrl);
          _this.previousUrl = urlAfterRedirects; // console.log('NEW previous URL', this.previousUrl);
        });
      };

      HistoryHelperService.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
        }];
      };

      HistoryHelperService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], HistoryHelperService);
      /***/
    },

    /***/
    "270b":
    /*!*********************************************!*\
      !*** ./src/app/utils/shell/shell.module.ts ***!
      \*********************************************/

    /*! exports provided: ShellModule */

    /***/
    function b(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ShellModule", function () {
        return ShellModule;
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


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _aspect_ratio_aspect_ratio_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./aspect-ratio/aspect-ratio.component */
      "nDLf");
      /* harmony import */


      var _image_shell_image_shell_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./image-shell/image-shell.component */
      "61hV");
      /* harmony import */


      var _text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./text-shell/text-shell.component */
      "WVQ6");

      var ShellModule = function ShellModule() {
        _classCallCheck(this, ShellModule);
      };

      ShellModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_aspect_ratio_aspect_ratio_component__WEBPACK_IMPORTED_MODULE_4__["AspectRatioComponent"], _image_shell_image_shell_component__WEBPACK_IMPORTED_MODULE_5__["ImageShellComponent"], _text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_6__["TextShellComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"]],
        exports: [_aspect_ratio_aspect_ratio_component__WEBPACK_IMPORTED_MODULE_4__["AspectRatioComponent"], _image_shell_image_shell_component__WEBPACK_IMPORTED_MODULE_5__["ImageShellComponent"], _text_shell_text_shell_component__WEBPACK_IMPORTED_MODULE_6__["TextShellComponent"]]
      })], ShellModule);
      /***/
    },

    /***/
    "2MtO":
    /*!***********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/rating-input/rating-input.component.html ***!
      \***********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function MtO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-button class=\"rating-icon\" fill=\"clear\" shape=\"round\" *ngFor=\"let r of range; let i = index\" (click)=\"rate(i + 1)\">\n\t<ion-icon slot=\"icon-only\" [name]=\"value === undefined ? (r === 1 ? 'star' : (r === 2 ? 'star-half' : 'star-outline')) : (value > i ? (value < i+1 ? 'star-half' : 'star') : 'star-outline')\"></ion-icon>\n</ion-button>\n";
      /***/
    },

    /***/
    "3TL5":
    /*!*******************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/checkbox-wrapper/checkbox-wrapper.component.html ***!
      \*******************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function TL5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ng-content></ng-content>\n  \n\n";
      /***/
    },

    /***/
    "4VlV":
    /*!*******************************************************************!*\
      !*** ./src/app/components/chat-bubble/chat-bubble.component.scss ***!
      \*******************************************************************/

    /*! exports provided: default */

    /***/
    function VlV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "@charset \"UTF-8\";\n/** Ionic CSS Variables **/\n:root {\n  /** font-family **/\n  --ion-font-family: \"Roboto-Regular\"!important;\n  /** background **/\n  --ion-background-color:#E5E5E5;\n  /** primary **/\n  --ion-color-primary: #3498DB;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #02859c;\n  --ion-color-primary-tint: #ca9b01;\n  /** secondary **/\n  --ion-color-secondary: #009cb3;\n  --ion-color-secondary-rgb: 61, 194, 255;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #36abe0;\n  --ion-color-secondary-tint: #50c8ff;\n  /** tertiary **/\n  --ion-color-tertiary: #F39C12;\n  --ion-color-tertiary-rgb: 82, 96, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #4854e0;\n  --ion-color-tertiary-tint: #6370ff;\n  /** success **/\n  --ion-color-success: #2dd36f;\n  --ion-color-success-rgb: 45, 211, 111;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #28ba62;\n  --ion-color-success-tint: #42d77d;\n  /** warning **/\n  --ion-color-warning: #ffc409;\n  --ion-color-warning-rgb: 255, 196, 9;\n  --ion-color-warning-contrast: #000000;\n  --ion-color-warning-contrast-rgb: 0, 0, 0;\n  --ion-color-warning-shade: #e0ac08;\n  --ion-color-warning-tint: #ffca22;\n  /** danger **/\n  --ion-color-danger: #eb445a;\n  --ion-color-danger-rgb: 235, 68, 90;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #cf3c4f;\n  --ion-color-danger-tint: #ed576b;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 36, 40;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #92949c;\n  --ion-color-medium-rgb: 146, 148, 156;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #808289;\n  --ion-color-medium-tint: #9d9fa6;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 245, 248;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9;\n}\n.custom-loading .ion-loading {\n  background-color: white;\n  --spinner-color: --ion-color-primary;\n  box-shadow: none;\n}\n.custom-loading ion-backdrop {\n  background-color: white;\n  --backdrop-opacity: 1;\n}\n.custom-loading .loading-wrapper {\n  background-color: white;\n  --spinner-color: --ion-color-primary;\n  box-shadow: none;\n}\nion-item {\n  --border-style:none !important;\n}\nchat-bubble .message {\n  font-size: medium;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\nchat-bubble .message-detail {\n  white-space: nowrap;\n  font-size: 12px;\n  padding-top: 5px;\n}\nchat-bubble .chat-bubble {\n  border-radius: 5px;\n  display: inline-block;\n  position: relative;\n  padding: 8px;\n  margin: 8px 12px;\n  max-width: 80%;\n}\nchat-bubble .chat-bubble:before {\n  content: \" \";\n  display: block;\n  height: 13px;\n  width: 9px;\n  position: absolute;\n  bottom: -0.5px;\n}\nchat-bubble .chat-bubble.left {\n  background-color: #F5F5F5;\n  color: black;\n  float: left;\n}\nchat-bubble .chat-bubble.right {\n  background-color: #3498DB;\n  color: white;\n  float: right;\n}\nchat-bubble .chat-bubble.left:before {\n  background-color: #F5F5F5;\n  left: -4px;\n  border-bottom-right-radius: 100%;\n  border-top-left-radius: 50%;\n  -webkit-transform: rotate(70deg) skew(5deg);\n}\nchat-bubble .chat-bubble.right:before {\n  background-color: #3498DB;\n  right: -4px;\n  border-bottom-left-radius: 50%;\n  border-top-right-radius: 100%;\n  -webkit-transform: rotate(118deg) skew(-5deg);\n}\nchat-bubble .uploading {\n  width: 80% !important;\n}\nchat-bubble .progress-outer {\n  width: 96%;\n  margin: 10px 2%;\n  padding: 3px;\n  text-align: center;\n  color: #fff;\n  border-radius: 20px;\n}\nchat-bubble .progress-inner {\n  min-width: 15%;\n  white-space: nowrap;\n  overflow: hidden;\n  padding: 5px;\n  border-radius: 20px;\n  background-color: #f4f4f4;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NoYXQtYnViYmxlLmNvbXBvbmVudC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdGhlbWUvdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDR2hCLDBCQUFBO0FBMEJBO0VBRUUsa0JBQUE7RUFDQSw2Q0FBQTtFQUNBLGlCQUFBO0VBQ0EsOEJBQUE7RUFDQSxjQUFBO0VBQ0EsNEJBQUE7RUFDQSxxQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsK0NBQUE7RUFDQSxrQ0FBQTtFQUNBLGlDQUFBO0VBRUEsZ0JBQUE7RUFDQSw4QkFBQTtFQUNBLHVDQUFBO0VBQ0EsdUNBQUE7RUFDQSxpREFBQTtFQUNBLG9DQUFBO0VBQ0EsbUNBQUE7RUFFQSxlQUFBO0VBQ0EsNkJBQUE7RUFDQSxxQ0FBQTtFQUNBLHNDQUFBO0VBQ0EsZ0RBQUE7RUFDQSxtQ0FBQTtFQUNBLGtDQUFBO0VBRUEsY0FBQTtFQUNBLDRCQUFBO0VBQ0EscUNBQUE7RUFDQSxxQ0FBQTtFQUNBLCtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxpQ0FBQTtFQUVBLGNBQUE7RUFDQSw0QkFBQTtFQUNBLG9DQUFBO0VBQ0EscUNBQUE7RUFDQSx5Q0FBQTtFQUNBLGtDQUFBO0VBQ0EsaUNBQUE7RUFFQSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxtQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsOENBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBRUEsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQ0FBQTtFQUNBLDRDQUFBO0VBQ0EsK0JBQUE7RUFDQSw4QkFBQTtFQUVBLGFBQUE7RUFDQSwyQkFBQTtFQUNBLHFDQUFBO0VBQ0Esb0NBQUE7RUFDQSw4Q0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0NBQUE7RUFFQSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxvQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsdUNBQUE7RUFDQSxnQ0FBQTtFQUNBLCtCQUFBO0FEbkNGO0FDeUNFO0VBQ0UsdUJBQUE7RUFDQSxvQ0FBQTtFQUNBLGdCQUFBO0FEdENKO0FDd0NFO0VBQ0ksdUJBQUE7RUFDQSxxQkFBQTtBRHRDTjtBQ3dDRTtFQUNFLHVCQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQkFBQTtBRHRDSjtBQW5GQTtFQUNFLDhCQUFBO0FBc0ZGO0FBakZFO0VBQ0UsaUJBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0FBb0ZKO0FBakZFO0VBQ0UsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFtRko7QUFoRkU7RUFDRSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBa0ZKO0FBL0VFO0VBQ0UsWUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQWlGSjtBQTlFRTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFnRko7QUE3RUU7RUFDRSx5QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBK0VKO0FBNUVFO0VBQ0UseUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0NBQUE7RUFDQSwyQkFBQTtFQUNBLDJDQUFBO0FBOEVKO0FBM0VFO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0VBQ0EsOEJBQUE7RUFDQSw2QkFBQTtFQUNBLDZDQUFBO0FBNkVKO0FBMUVFO0VBQ0UscUJBQUE7QUE0RUo7QUF6RUU7RUFDRSxVQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQTJFSjtBQXhFRTtFQUNJLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0FBMEVOIiwiZmlsZSI6ImNoYXQtYnViYmxlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi9zcmMvdGhlbWUvdmFyaWFibGVzXCI7XG5cbmlvbi1pdGVtIHtcbiAgLS1ib3JkZXItc3R5bGU6bm9uZSAhaW1wb3J0YW50O1xufVxuXG5jaGF0LWJ1YmJsZSB7XG4gIFxuICAubWVzc2FnZSB7XG4gICAgZm9udC1zaXplOiBtZWRpdW07XG4gICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgfVxuXG4gIC5tZXNzYWdlLWRldGFpbCB7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgcGFkZGluZy10b3A6IDVweDtcbiAgfVxuXG4gIC5jaGF0LWJ1YmJsZSB7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIG1hcmdpbjogOHB4IDEycHg7XG4gICAgbWF4LXdpZHRoOiA4MCU7XG4gIH1cblxuICAuY2hhdC1idWJibGU6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlxcMDBhMFwiO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogMTNweDtcbiAgICB3aWR0aDogOXB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IC0uNXB4O1xuICB9XG5cbiAgLmNoYXQtYnViYmxlLmxlZnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hcC1nZXQoJGNoYXQtYnViYmxlLCBiYWNrZ3JvdW5kLWxlZnQpO1xuICAgIGNvbG9yOiBtYXAtZ2V0KCRjaGF0LWJ1YmJsZSwgZm9udC1sZWZ0KTtcbiAgICBmbG9hdDogbGVmdDtcbiAgfVxuXG4gIC5jaGF0LWJ1YmJsZS5yaWdodCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFwLWdldCgkY2hhdC1idWJibGUsIGJhY2tncm91bmQtcmlnaHQpO1xuICAgIGNvbG9yOiBtYXAtZ2V0KCRjaGF0LWJ1YmJsZSwgZm9udC1yaWdodCk7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICB9XG5cbiAgLmNoYXQtYnViYmxlLmxlZnQ6YmVmb3JlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXAtZ2V0KCRjaGF0LWJ1YmJsZSwgYmFja2dyb3VuZC1sZWZ0KTtcbiAgICBsZWZ0OiAtNHB4O1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMDAlO1xuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDcwZGVnKSBza2V3KDVkZWcpO1xuICB9XG5cbiAgLmNoYXQtYnViYmxlLnJpZ2h0OmJlZm9yZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWFwLWdldCgkY2hhdC1idWJibGUsIGJhY2tncm91bmQtcmlnaHQpO1xuICAgIHJpZ2h0OiAtNHB4O1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwJTtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDExOGRlZykgc2tldygtNWRlZyk7XG4gIH1cblxuICAudXBsb2FkaW5ne1xuICAgIHdpZHRoOiA4MCUgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5wcm9ncmVzcy1vdXRlciB7XG4gICAgd2lkdGg6IDk2JTtcbiAgICBtYXJnaW46IDEwcHggMiU7XG4gICAgcGFkZGluZzogM3B4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjb2xvcjogI2ZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICB9XG5cbiAgLnByb2dyZXNzLWlubmVyIHtcbiAgICAgIG1pbi13aWR0aDogMTUlO1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICAgIGNvbG9yOmJsYWNrO1xuICB9XG5cbiAgICAgIFxufVxuICBcbiAgXG4iLCIvLyBJb25pYyBWYXJpYWJsZXMgYW5kIFRoZW1pbmcuIEZvciBtb3JlIGluZm8sIHBsZWFzZSBzZWU6XG4vLyBodHRwOi8vaW9uaWNmcmFtZXdvcmsuY29tL2RvY3MvdGhlbWluZy9cblxuLyoqIElvbmljIENTUyBWYXJpYWJsZXMgKiovXG5cbiRjb2xvcnM6IChcbiAgcHJpbWFyeTogICAjMzQ5OERCLFxuICBzZWNvbmRhcnk6ICAgIzAwOWNiMyxcbiAgdGVydGlhcnk6ICAgICNGMzlDMTIsXG4gIGdyZXk6ICAjQkRDM0M3LFxuICBkYW5nZXI6ICAgICAjZjUzZDNkLFxuICBsaWdodDogICAgICAjZjRmNGY0LFxuICBkYXJrOiAgICAgICAjMjIyXG4pO1xuXG4kY2hhdDogKFxuICBmb290ZXI6IHdoaXRlLFxuICBpbnB1dDogI0Y2RjhGQSxcbiAgaW5wdXQtYm9yZGVyOiAjZmZmLFxuKTtcblxuJGNoYXQtYnViYmxlOiAoXG4gIGJhY2tncm91bmQtbGVmdDogI0Y1RjVGNSxcbiAgZm9udC1sZWZ0OmJsYWNrLFxuICBmb250LXJpZ2h0OndoaXRlLFxuICBiYWNrZ3JvdW5kLXJpZ2h0OiBtYXAtZ2V0KCRjb2xvcnMsIHByaW1hcnkpXG4pO1xuXG5cbjpyb290IHtcbiAgXG4gIC8qKiBmb250LWZhbWlseSAqKi9cbiAgLS1pb24tZm9udC1mYW1pbHk6ICdSb2JvdG8tUmVndWxhcichaW1wb3J0YW50O1xuICAvKiogYmFja2dyb3VuZCAqKi9cbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjojRTVFNUU1O1xuICAvKiogcHJpbWFyeSAqKi9cbiAgLS1pb24tY29sb3ItcHJpbWFyeTogIzM0OThEQjtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1yZ2I6IDU2LCAxMjgsIDI1NTtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGU6ICMwMjg1OWM7IFxuICAtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQ6ICNjYTliMDE7IFxuXG4gIC8qKiBzZWNvbmRhcnkgKiovXG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeTogIzAwOWNiMztcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYjogNjEsIDE5NCwgMjU1O1xuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1zaGFkZTogIzM2YWJlMDtcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LXRpbnQ6ICM1MGM4ZmY7XG5cbiAgLyoqIHRlcnRpYXJ5ICoqL1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeTogI0YzOUMxMjtcbiAgLS1pb24tY29sb3ItdGVydGlhcnktcmdiOiA4MiwgOTYsIDI1NTtcbiAgLS1pb24tY29sb3ItdGVydGlhcnktY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3ItdGVydGlhcnktc2hhZGU6ICM0ODU0ZTA7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQ6ICM2MzcwZmY7XG5cbiAgLyoqIHN1Y2Nlc3MgKiovXG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3M6ICMyZGQzNmY7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiOiA0NSwgMjExLCAxMTE7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXN1Y2Nlc3MtY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLXNoYWRlOiAjMjhiYTYyO1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLXRpbnQ6ICM0MmQ3N2Q7XG5cbiAgLyoqIHdhcm5pbmcgKiovXG4gIC0taW9uLWNvbG9yLXdhcm5pbmc6ICNmZmM0MDk7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctcmdiOiAyNTUsIDE5NiwgOTtcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdDogIzAwMDAwMDtcbiAgLS1pb24tY29sb3Itd2FybmluZy1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctc2hhZGU6ICNlMGFjMDg7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctdGludDogI2ZmY2EyMjtcblxuICAvKiogZGFuZ2VyICoqL1xuICAtLWlvbi1jb2xvci1kYW5nZXI6ICNlYjQ0NWE7XG4gIC0taW9uLWNvbG9yLWRhbmdlci1yZ2I6IDIzNSwgNjgsIDkwO1xuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLWRhbmdlci1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLWRhbmdlci1zaGFkZTogI2NmM2M0ZjtcbiAgLS1pb24tY29sb3ItZGFuZ2VyLXRpbnQ6ICNlZDU3NmI7XG5cbiAgLyoqIGRhcmsgKiovXG4gIC0taW9uLWNvbG9yLWRhcms6ICMyMjI0Mjg7XG4gIC0taW9uLWNvbG9yLWRhcmstcmdiOiAzNCwgMzYsIDQwO1xuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1kYXJrLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3ItZGFyay1zaGFkZTogIzFlMjAyMztcbiAgLS1pb24tY29sb3ItZGFyay10aW50OiAjMzgzYTNlO1xuXG4gIC8qKiBtZWRpdW0gKiovXG4gIC0taW9uLWNvbG9yLW1lZGl1bTogIzkyOTQ5YztcbiAgLS1pb24tY29sb3ItbWVkaXVtLXJnYjogMTQ2LCAxNDgsIDE1NjtcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1tZWRpdW0tY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGU6ICM4MDgyODk7XG4gIC0taW9uLWNvbG9yLW1lZGl1bS10aW50OiAjOWQ5ZmE2O1xuXG4gIC8qKiBsaWdodCAqKi9cbiAgLS1pb24tY29sb3ItbGlnaHQ6ICNmNGY1Zjg7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LXJnYjogMjQ0LCAyNDUsIDI0ODtcbiAgLS1pb24tY29sb3ItbGlnaHQtY29udHJhc3Q6ICMwMDAwMDA7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0LXJnYjogMCwgMCwgMDtcbiAgLS1pb24tY29sb3ItbGlnaHQtc2hhZGU6ICNkN2Q4ZGE7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQ6ICNmNWY2Zjk7XG59XG5cblxuLmN1c3RvbS1sb2FkaW5nIHtcbiAgXG4gIC5pb24tbG9hZGluZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgLS1zcGlubmVyLWNvbG9yOiAtLWlvbi1jb2xvci1wcmltYXJ5O1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cbiAgaW9uLWJhY2tkcm9wIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgICAgIC0tYmFja2Ryb3Atb3BhY2l0eTogMTtcbiAgfVxuICAubG9hZGluZy13cmFwcGVye1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIC0tc3Bpbm5lci1jb2xvcjogLS1pb24tY29sb3ItcHJpbWFyeTtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG5cbn0iXX0= */";
      /***/
    },

    /***/
    "4n8L":
    /*!******************************************************************!*\
      !*** ./src/app/services/firebase/auth/firebase-profile.model.ts ***!
      \******************************************************************/

    /*! exports provided: FirebaseProfileModel */

    /***/
    function n8L(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FirebaseProfileModel", function () {
        return FirebaseProfileModel;
      });
      /* harmony import */


      var _utils_shell_data_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../utils/shell/data-store */
      "bdP1");

      var FirebaseProfileModel = /*#__PURE__*/function (_utils_shell_data_sto) {
        _inherits(FirebaseProfileModel, _utils_shell_data_sto);

        var _super = _createSuper(FirebaseProfileModel);

        function FirebaseProfileModel() {
          _classCallCheck(this, FirebaseProfileModel);

          return _super.call(this);
        }

        return FirebaseProfileModel;
      }(_utils_shell_data_store__WEBPACK_IMPORTED_MODULE_0__["ShellModel"]);
      /***/

    },

    /***/
    "5Pvz":
    /*!*************************************!*\
      !*** ./src/app/config/constants.ts ***!
      \*************************************/

    /*! exports provided: Constants */

    /***/
    function Pvz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Constants", function () {
        return Constants;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL"); // Angular Modules


      var Constants = function Constants() {
        _classCallCheck(this, Constants);

        /*     public readonly API_ENDPOINT: string = 'http://192.168.0.158:8000/api/';
            public readonly API_DOOLE_ENDPOINT: string = 'http://192.168.0.158:8000/api';
            public readonly DOOLE_ENDPOINT: string = 'http://192.168.0.158:8000'; */
        this.API_ENDPOINT = 'https://covid.doole.io/api';
        this.API_DOOLE_ENDPOINT = 'https://covid.doole.io/api';
        this.DOOLE_ENDPOINT = 'https://covid.doole.io';
        /*     public readonly API_ENDPOINT: string = 'https://mgc.doole.io/api/mgc';
            public readonly API_DOOLE_ENDPOINT: string = 'https://mgc.doole.io/api';
            public readonly DOOLE_ENDPOINT: string = 'https://mgc.doole.io'; */
      };

      Constants = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], Constants);
      /***/
    },

    /***/
    "61hV":
    /*!******************************************************************!*\
      !*** ./src/app/utils/shell/image-shell/image-shell.component.ts ***!
      \******************************************************************/

    /*! exports provided: ImageShellComponent */

    /***/
    function hV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImageShellComponent", function () {
        return ImageShellComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_image_shell_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./image-shell.component.html */
      "wSJU");
      /* harmony import */


      var _image_shell_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./image-shell.component.scss */
      "CC9f");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _transfer_state_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../transfer-state-helper */
      "O2zu");

      var ImageShellComponent = /*#__PURE__*/function () {
        function ImageShellComponent(transferStateHelper) {
          _classCallCheck(this, ImageShellComponent);

          this.transferStateHelper = transferStateHelper; // To debug shell styles, change configuration in the environment file

          this.debugDisplay = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].appShellConfig && src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].appShellConfig.debug ? src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].appShellConfig.debug : false; // tslint:disable-next-line:variable-name

          this._src = ''; // tslint:disable-next-line:variable-name

          this._alt = ''; // tslint:disable-next-line:variable-name

          this._loadingStrategy = 'lazy'; // tslint:disable-next-line:variable-name

          this._display = '';
          this.imageSSR = false;
          this.imageLoaded = false;
          this.imageError = false;
          this.errorMessage = 'Could not load image';
        }

        _createClass(ImageShellComponent, [{
          key: "display",
          get: function get() {
            return this._display;
          },
          set: function set(val) {
            this._display = val !== undefined && val !== null ? val : ''; // For display 'cover' we use a hidden aux image. As it's hidden, if set loading to 'lazy' it won't ever trigger the loading mechanism

            if (this._display === 'cover') {
              this._loadingStrategy = 'eager';
            }
          }
        }, {
          key: "src",
          set: function set(val) {
            if (!this.debugDisplay) {
              this._src = val !== undefined && val !== null ? val : '';
            } // When using SSR (Server Side Rendering), avoid the loading animation while the image resource is being loaded


            var imageState = this.transferStateHelper.checkImageShellState('shell-images-state', this._src);

            if (imageState === _transfer_state_helper__WEBPACK_IMPORTED_MODULE_5__["ImageShellState"].SSR || imageState === _transfer_state_helper__WEBPACK_IMPORTED_MODULE_5__["ImageShellState"].BROWSER_FROM_SSR) {
              this._imageProcessedInServer();
            } else {
              if (this._display === 'cover') {
                // Unset the background-image until the image is loaded
                this.backgroundImage = 'unset';
              }
            }
          }
        }, {
          key: "alt",
          set: function set(val) {
            this._alt = val !== undefined && val !== null ? val : '';
          }
        }, {
          key: "_imageProcessedInServer",
          value: function _imageProcessedInServer() {
            this.imageSSR = true; // Also set backgroundImage so it's ready when transitioning from SSR to the browser

            if (this._display === 'cover') {
              this.backgroundImage = 'url(' + this._src + ')';
            }
          }
        }, {
          key: "_imageLoaded",
          value: function _imageLoaded() {
            this.imageLoaded = true; // If it's a cover image then set the background-image property accordingly

            if (this._display === 'cover') {
              // Now that the image is loaded, set the background image
              this.backgroundImage = 'url(' + this._src + ')';
            }
          }
        }, {
          key: "_imageLoadError",
          value: function _imageLoadError(event) {
            var _this2 = this;

            // Image error event get's called when the src is empty. We use emty values for the shell.
            // (see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Image_loading_errors)
            // Avoid that shell case
            if (this._src && this._src !== '') {
              this.imageLoaded = false;
              this.imageSSR = false;
              setTimeout(function () {
                _this2.imageError = true;
              }, 500);
            }
          }
        }]);

        return ImageShellComponent;
      }();

      ImageShellComponent.ctorParameters = function () {
        return [{
          type: _transfer_state_helper__WEBPACK_IMPORTED_MODULE_5__["TransferStateHelper"]
        }];
      };

      ImageShellComponent.propDecorators = {
        imageSSR: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['class.img-ssr']
        }],
        imageLoaded: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['class.img-loaded']
        }],
        imageError: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['class.img-error']
        }],
        errorMessage: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['attr.data-error']
        }],
        backgroundImage: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['style.backgroundImage']
        }],
        display: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['attr.display']
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        src: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        alt: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      ImageShellComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-image-shell',
        template: _raw_loader_image_shell_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_image_shell_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ImageShellComponent);
      /***/
    },

    /***/
    "6ZdU":
    /*!********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utils/shell/text-shell/text-shell.component.html ***!
      \********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function ZdU(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ng-container>{{ _data }}</ng-container>\n";
      /***/
    },

    /***/
    "7Bqo":
    /*!***********************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/show-hide-password/show-hide-password.component.html ***!
      \***********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function Bqo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ng-content></ng-content>\n<a class=\"type-toggle\" (click)=\"toggleShow()\">\n\t<ion-icon class=\"show-option\" [hidden]=\"show\" name=\"eye-off-outline\"></ion-icon>\n\t<ion-icon class=\"hide-option\" [hidden]=\"!show\" name=\"eye-outline\"></ion-icon>\n  <!-- In case you want to use text instead of icons -->\n\t<!--\n  <span class=\"show-option\" [hidden]=\"show\">show</span>\n\t<span class=\"hide-option\" [hidden]=\"!show\">hide</span>\n  -->\n</a>\n";
      /***/
    },

    /***/
    "7R0Y":
    /*!***************************************************!*\
      !*** ./src/app/services/api-endpoints.service.ts ***!
      \***************************************************/

    /*! exports provided: ApiEndpointsService */

    /***/
    function R0Y(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ApiEndpointsService", function () {
        return ApiEndpointsService;
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


      var _shared_classes_url_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../shared/classes/url-builder */
      "jmeX");
      /* harmony import */


      var src_app_config_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/config/constants */
      "5Pvz"); // Angular Modules
      // Application Classes
      // Application Constants


      var ApiEndpointsService = /*#__PURE__*/function () {
        function ApiEndpointsService( // Application Constants
        constants) {
          var _this3 = this;

          _classCallCheck(this, ApiEndpointsService);

          this.constants = constants;

          this.getEndpoint = function (action) {
            return _this3.createUrl(action, false);
          };

          this.getDooleEndpoint = function (action) {
            return _this3.createUrl(action, true);
          };

          this.getEndpointWithParameters = function (action, parameters) {
            return _this3.createUrlWithQueryParameters(action, parameters);
          };
        }
        /* #region URL CREATOR */
        // URL


        _createClass(ApiEndpointsService, [{
          key: "createUrl",
          value: function createUrl(action) {
            var isDooleAPI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var urlBuilder = new _shared_classes_url_builder__WEBPACK_IMPORTED_MODULE_2__["UrlBuilder"](isDooleAPI ? this.constants.API_DOOLE_ENDPOINT : this.constants.API_ENDPOINT, action);
            return urlBuilder.toString();
          } // URL WITH QUERY PARAMS

        }, {
          key: "createUrlWithQueryParameters",
          value: function createUrlWithQueryParameters(action, queryStringHandler) {
            var urlBuilder = new _shared_classes_url_builder__WEBPACK_IMPORTED_MODULE_2__["UrlBuilder"](this.constants.API_ENDPOINT, action); // Push extra query string params

            if (queryStringHandler) {
              queryStringHandler(urlBuilder.queryString);
            }

            return urlBuilder.toString();
          } // URL WITH PATH VARIABLES

        }, {
          key: "createUrlWithPathVariables",
          value: function createUrlWithPathVariables(action) {
            var pathVariables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var encodedPathVariablesUrl = ''; // Push extra path variables

            var _iterator = _createForOfIteratorHelper(pathVariables),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var pathVariable = _step.value;

                if (pathVariable !== null) {
                  encodedPathVariablesUrl += "/".concat(encodeURIComponent(pathVariable.toString()));
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            var urlBuilder = new _shared_classes_url_builder__WEBPACK_IMPORTED_MODULE_2__["UrlBuilder"](this.constants.API_ENDPOINT, "".concat(action).concat(encodedPathVariablesUrl));
            return urlBuilder.toString();
          }
        }]);

        return ApiEndpointsService;
      }();

      ApiEndpointsService.ctorParameters = function () {
        return [{
          type: src_app_config_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"]
        }];
      };

      ApiEndpointsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], ApiEndpointsService);
      /***/
    },

    /***/
    "91zV":
    /*!*******************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/elastic-textarea/elastic-textarea.component.html ***!
      \*******************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function zV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-textarea #ionTxtArea\n              placeholder='{{placeholder}}'\n              [(ngModel)]=\"content\"\n              (ngModelChange)='onChange($event)'>\n</ion-textarea>\n";
      /***/
    },

    /***/
    "9W57":
    /*!**********************************************************************!*\
      !*** ./src/app/utils/shell/aspect-ratio/aspect-ratio.component.scss ***!
      \**********************************************************************/

    /*! exports provided: default */

    /***/
    function W57(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ":host {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n}\n:host .content-wrapper {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FzcGVjdC1yYXRpby5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQUNKO0FBQ0k7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFDTiIsImZpbGUiOiJhc3BlY3QtcmF0aW8uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIFxuICAgIC5jb250ZW50LXdyYXBwZXIge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwcHg7XG4gICAgICBib3R0b206IDBweDtcbiAgICAgIGxlZnQ6IDBweDtcbiAgICAgIHJpZ2h0OiAwcHg7XG4gICAgfVxuICB9XG4gICJdfQ== */";
      /***/
    },

    /***/
    "9vc0":
    /*!*******************************************!*\
      !*** ./src/app/services/error.service.ts ***!
      \*******************************************/

    /*! exports provided: ErrorService */

    /***/
    function vc0(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ErrorService", function () {
        return ErrorService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var ErrorService = /*#__PURE__*/function () {
        function ErrorService() {
          _classCallCheck(this, ErrorService);
        }

        _createClass(ErrorService, [{
          key: "getClientMessage",
          value: function getClientMessage(error) {
            if (error.constructor == Array) {
              return error.toString();
            } else if (error.constructor == Object) {
              return JSON.stringify(error);
            } else if (typeof error == 'object') {
              return error.message ? error.message : 'error';
            } else {
              return error;
            }
          }
        }, {
          key: "getClientStack",
          value: function getClientStack(error) {
            return error.stack;
          }
        }, {
          key: "getServerMessage",
          value: function getServerMessage(error) {
            if (error.constructor == Array) {
              return error;
            } else if (error.constructor == Object) {
              return JSON.stringify(error);
            } else if (typeof error == 'object') {
              return error.message;
            } else {
              return error;
            }
          }
        }, {
          key: "getServerStack",
          value: function getServerStack(error) {
            // handle stack trace
            return 'stack';
          }
        }]);

        return ErrorService;
      }();

      ErrorService.ctorParameters = function () {
        return [];
      };

      ErrorService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], ErrorService);
      /***/
    },

    /***/
    "A0kb":
    /*!*******************************************************************************!*\
      !*** ./src/app/components/show-hide-password/show-hide-password.component.ts ***!
      \*******************************************************************************/

    /*! exports provided: ShowHidePasswordComponent */

    /***/
    function A0kb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ShowHidePasswordComponent", function () {
        return ShowHidePasswordComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_show_hide_password_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./show-hide-password.component.html */
      "7Bqo");
      /* harmony import */


      var _show_hide_password_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./show-hide-password.component.scss */
      "iSCB");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");

      var ShowHidePasswordComponent = /*#__PURE__*/function () {
        function ShowHidePasswordComponent() {
          _classCallCheck(this, ShowHidePasswordComponent);

          this.show = false;
        }

        _createClass(ShowHidePasswordComponent, [{
          key: "toggleShow",
          value: function toggleShow() {
            this.show = !this.show;

            if (this.show) {
              this.input.type = 'text';
            } else {
              this.input.type = 'password';
            }
          }
        }]);

        return ShowHidePasswordComponent;
      }();

      ShowHidePasswordComponent.ctorParameters = function () {
        return [];
      };

      ShowHidePasswordComponent.propDecorators = {
        input: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"],
          args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInput"]]
        }]
      };
      ShowHidePasswordComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-show-hide-password',
        template: _raw_loader_show_hide_password_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_show_hide_password_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ShowHidePasswordComponent);
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      });
      /* harmony import */


      var zone_js_dist_zone_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! zone.js/dist/zone-error */
      "+Vou");
      /* harmony import */


      var zone_js_dist_zone_error__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone_error__WEBPACK_IMPORTED_MODULE_0__); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        appShellConfig: {
          debug: false,
          networkDelay: 500
        },
        firebase: {
          apiKey: "AIzaSyDcd9Q5boJJ46VGoGn1MYAN3BOJp6EaCv8",
          authDomain: "covid-39b96.firebaseapp.com",
          databaseURL: "https://covid-39b96.firebaseio.com/",
          projectId: "covid-39b96",
          storageBucket: "covid-39b96.appspot.com",
          messagingSenderId: "344383195320"
        }
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // Included with Angular CLI.

      /***/
    },

    /***/
    "B3O1":
    /*!*******************************************************************!*\
      !*** ./src/app/components/page-header/page-header.component.scss ***!
      \*******************************************************************/

    /*! exports provided: default */

    /***/
    function B3O1(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-img {\n  display: inline-block;\n}\n\n.rowTitle2 {\n  padding-left: 3%;\n}\n\n.icon-title {\n  width: 80px;\n  height: auto;\n  display: block;\n}\n\n.titule {\n  font-size: 20px;\n  font-weight: 600;\n}\n\n#container * {\n  margin: 0;\n  padding: 0;\n}\n\n#container {\n  width: 100%;\n  font-size: 0;\n}\n\n#left,\n#middle,\n#right {\n  display: inline-block;\n  *display: inline;\n  zoom: 1;\n  vertical-align: top;\n}\n\n#left {\n  width: 25%;\n}\n\n#middle {\n  vertical-align: bottom;\n  width: 60%;\n}\n\n#right {\n  vertical-align: bottom;\n  width: 15%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhZ2UtaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwicGFnZS1oZWFkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtBQUNGOztBQUNBO0VBQ0UsZ0JBQUE7QUFFRjs7QUFBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBQUdGOztBQURBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBSUY7O0FBREE7RUFDRSxTQUFBO0VBQ0EsVUFBQTtBQUlGOztBQUZBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFLRjs7QUFIQTs7O0VBR0UscUJBQUE7R0NNQSxlRExBO0VBQ0EsT0FBQTtFQUNBLG1CQUFBO0FBTUY7O0FBSkE7RUFDRSxVQUFBO0FBT0Y7O0FBTEE7RUFDRSxzQkFBQTtFQUNBLFVBQUE7QUFRRjs7QUFOQTtFQUNFLHNCQUFBO0VBQ0EsVUFBQTtBQVNGIiwiZmlsZSI6InBhZ2UtaGVhZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWltZyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cbi5yb3dUaXRsZTIge1xuICBwYWRkaW5nLWxlZnQ6IDMlO1xufVxuLmljb24tdGl0bGUge1xuICB3aWR0aDogODBweDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi50aXR1bGUge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbiNjb250YWluZXIgKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cbiNjb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC1zaXplOiAwO1xufVxuI2xlZnQsXG4jbWlkZGxlLFxuI3JpZ2h0IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAqZGlzcGxheTogaW5saW5lO1xuICB6b29tOiAxO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xufVxuI2xlZnQge1xuICB3aWR0aDogMjUlO1xufVxuI21pZGRsZSB7XG4gIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gIHdpZHRoOiA2MCU7XG59XG4jcmlnaHQge1xuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xuICB3aWR0aDogMTUlO1xufVxuIiwiaW9uLWltZyB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLnJvd1RpdGxlMiB7XG4gIHBhZGRpbmctbGVmdDogMyU7XG59XG5cbi5pY29uLXRpdGxlIHtcbiAgd2lkdGg6IDgwcHg7XG4gIGhlaWdodDogYXV0bztcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi50aXR1bGUge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbiNjb250YWluZXIgKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuI2NvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBmb250LXNpemU6IDA7XG59XG5cbiNsZWZ0LFxuI21pZGRsZSxcbiNyaWdodCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgKmRpc3BsYXk6IGlubGluZTtcbiAgem9vbTogMTtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuI2xlZnQge1xuICB3aWR0aDogMjUlO1xufVxuXG4jbWlkZGxlIHtcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgd2lkdGg6IDYwJTtcbn1cblxuI3JpZ2h0IHtcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgd2lkdGg6IDE1JTtcbn0iXX0= */";
      /***/
    },

    /***/
    "CC9f":
    /*!********************************************************************!*\
      !*** ./src/app/utils/shell/image-shell/image-shell.component.scss ***!
      \********************************************************************/

    /*! exports provided: default */

    /***/
    function CC9f(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ":host {\n  --image-shell-loading-background: #EEE;\n  --image-shell-border-radius: 0px;\n  --image-shell-color: #333;\n  display: block;\n  position: relative;\n  height: 100%;\n  border-radius: var(--image-shell-border-radius);\n  transition: all ease-in-out 0.3s;\n  z-index: 2;\n}\n:host > .spinner {\n  display: none;\n}\n:host::before {\n  content: \"\";\n  background: var(--image-shell-loading-background);\n  border-radius: var(--image-shell-border-radius);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n:host:not([display=cover]) {\n  width: 100%;\n  overflow: hidden;\n}\n:host:not([display=cover]) > .inner-img {\n  transition: visibility 0s linear, opacity 0.5s linear;\n  opacity: 0;\n  visibility: hidden;\n  width: 100%;\n  height: 100%;\n  border-radius: var(--image-shell-border-radius);\n  display: block;\n}\n:host:not([display=cover]).img-ssr::before, :host:not([display=cover]).img-loaded::before {\n  display: none;\n}\n:host:not([display=cover]).img-ssr > .inner-img, :host:not([display=cover]).img-loaded > .inner-img {\n  opacity: 1;\n  visibility: visible;\n}\n:host:not([display=cover]).img-error > .inner-img {\n  color: var(--image-shell-color);\n  font-size: 12px;\n}\n:host:not([display=cover]).img-error::after {\n  content: attr(data-error);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n  color: var(--image-shell-color);\n  background-color: var(--image-shell-loading-background);\n  font-size: 12px;\n}\n:host[display=cover] {\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n:host[display=cover]::before, :host[display=cover] > .spinner {\n  z-index: -1;\n}\n:host[display=cover] > .inner-img {\n  display: none;\n  visibility: hidden;\n}\n:host[display=cover].img-ssr::before, :host[display=cover].img-loaded::before {\n  display: none;\n}\n:host([animation=gradient]) {\n  --image-shell-loading-background: #EEE;\n  --image-shell-animation-color: #DDD;\n}\n:host([animation=gradient])::before {\n  background: linear-gradient(to right, var(--image-shell-loading-background) 8%, var(--image-shell-animation-color) 18%, var(--image-shell-loading-background) 33%);\n  background-size: 800px 104px;\n  -webkit-animation: animateBackground 2s ease-in-out infinite;\n          animation: animateBackground 2s ease-in-out infinite;\n}\n:host([animation=gradient]).img-ssr::before, :host([animation=gradient]).img-loaded::before, :host([animation=gradient]).img-error::before {\n  background: none;\n  -webkit-animation: 0;\n          animation: 0;\n}\n@-webkit-keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n@keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n:host([animation=spinner]) {\n  --image-shell-spinner-size: 28px;\n  --image-shell-spinner-color: #CCC;\n}\n:host([animation=spinner]) > .spinner {\n  display: block;\n  position: absolute;\n  top: calc(50% - calc(var(--image-shell-spinner-size) / 2));\n  left: calc(50% - calc(var(--image-shell-spinner-size) / 2));\n  width: var(--image-shell-spinner-size);\n  height: var(--image-shell-spinner-size);\n  font-size: var(--image-shell-spinner-size);\n  line-height: var(--image-shell-spinner-size);\n  color: var(--image-shell-spinner-color);\n}\n:host([animation=spinner]).img-ssr > .spinner, :host([animation=spinner]).img-loaded > .spinner, :host([animation=spinner]).img-error > .spinner {\n  display: none;\n  visibility: hidden;\n}\n:host(.add-overlay) {\n  --image-shell-overlay-background: rgba(0, 0, 0, .4);\n}\n:host(.add-overlay).img-ssr::before, :host(.add-overlay).img-loaded::before, :host(.add-overlay).img-error::before {\n  display: block;\n  background: var(--image-shell-overlay-background);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ltYWdlLXNoZWxsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksc0NBQUE7RUFDQSxnQ0FBQTtFQUNBLHlCQUFBO0VBRUEsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLCtDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxVQUFBO0FBQUo7QUFHSTtFQUNFLGFBQUE7QUFETjtBQUtJO0VBQ0UsV0FBQTtFQUNBLGlEQUFBO0VBQ0EsK0NBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7QUFITjtBQU1JO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0FBSk47QUFNTTtFQUNFLHFEQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSwrQ0FBQTtFQUVBLGNBQUE7QUFMUjtBQVdRO0VBQ0UsYUFBQTtBQVRWO0FBWVE7RUFDRSxVQUFBO0VBQ0EsbUJBQUE7QUFWVjtBQWVRO0VBRUUsK0JBQUE7RUFDQSxlQUFBO0FBZFY7QUFrQlE7RUFDRSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSwrQkFBQTtFQUNBLHVEQUFBO0VBQ0EsZUFBQTtBQWhCVjtBQXVCSTtFQUNFLHNCQUFBO0VBQ0EsNEJBQUE7QUFyQk47QUF3Qk07RUFFRSxXQUFBO0FBdkJSO0FBMEJNO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0FBeEJSO0FBOEJRO0VBQ0UsYUFBQTtBQTVCVjtBQWtDRTtFQUNFLHNDQUFBO0VBQ0EsbUNBQUE7QUEvQko7QUFrQ0k7RUFDRSxrS0FDRTtFQUNGLDRCQUFBO0VBQ0EsNERBQUE7VUFBQSxvREFBQTtBQWpDTjtBQXdDTTtFQUNFLGdCQUFBO0VBQ0Esb0JBQUE7VUFBQSxZQUFBO0FBdENSO0FBMENJO0VBQ0U7SUFDRSw2QkFBQTtFQXhDTjtFQTJDSTtJQUNFLDRCQUFBO0VBekNOO0FBQ0Y7QUFrQ0k7RUFDRTtJQUNFLDZCQUFBO0VBeENOO0VBMkNJO0lBQ0UsNEJBQUE7RUF6Q047QUFDRjtBQTZDRTtFQUNFLGdDQUFBO0VBQ0EsaUNBQUE7QUExQ0o7QUE0Q0k7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSwwREFBQTtFQUNBLDJEQUFBO0VBQ0Esc0NBQUE7RUFDQSx1Q0FBQTtFQUNBLDBDQUFBO0VBQ0EsNENBQUE7RUFDQSx1Q0FBQTtBQTFDTjtBQWdETTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtBQTlDUjtBQW1ERTtFQUNFLG1EQUFBO0FBaERKO0FBc0RNO0VBQ0UsY0FBQTtFQUNBLGlEQUFBO0FBcERSIiwiZmlsZSI6ImltYWdlLXNoZWxsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIC0taW1hZ2Utc2hlbGwtbG9hZGluZy1iYWNrZ3JvdW5kOiAjRUVFO1xuICAgIC0taW1hZ2Utc2hlbGwtYm9yZGVyLXJhZGl1czogMHB4O1xuICAgIC0taW1hZ2Utc2hlbGwtY29sb3I6ICMzMzM7XG4gIFxuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0taW1hZ2Utc2hlbGwtYm9yZGVyLXJhZGl1cyk7XG4gICAgdHJhbnNpdGlvbjogYWxsIGVhc2UtaW4tb3V0IC4zcztcbiAgICB6LWluZGV4OiAyO1xuICBcbiAgICAvLyBCeSBkZWZhdWx0LCBoaWRlIHRoZSBzcGlubmVyXG4gICAgJiA+IC5zcGlubmVyIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICBcbiAgICAvLyBMb2FkaW5nIGJhY2tncm91bmRcbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pbWFnZS1zaGVsbC1sb2FkaW5nLWJhY2tncm91bmQpO1xuICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0taW1hZ2Utc2hlbGwtYm9yZGVyLXJhZGl1cyk7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBib3R0b206IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgfVxuICBcbiAgICAmOm5vdChbZGlzcGxheT1cImNvdmVyXCJdKSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIFxuICAgICAgJiA+IC5pbm5lci1pbWcge1xuICAgICAgICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDBzIGxpbmVhciwgb3BhY2l0eSAuNXMgbGluZWFyO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWltYWdlLXNoZWxsLWJvcmRlci1yYWRpdXMpO1xuICAgICAgICAvLyBJbWFnZSBzaG91bGQgZmlsbCB0aGUgc3BhY2Ugd2hpbGUgbG9hZGluZ1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgXG4gICAgICAmLmltZy1zc3IsXG4gICAgICAmLmltZy1sb2FkZWQge1xuICAgICAgICAvLyBIaWRlIGxvYWRpbmcgYmFja2dyb3VuZCBvbmNlIHRoZSBpbWFnZSBoYXMgbG9hZGVkXG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuICBcbiAgICAgICAgJiA+IC5pbm5lci1pbWcge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAgICAgfVxuICAgICAgfVxuICBcbiAgICAgICYuaW1nLWVycm9yIHtcbiAgICAgICAgJiA+IC5pbm5lci1pbWcge1xuICAgICAgICAgIC8vIEZvciB0aGUgQWx0IHRleHRcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW1hZ2Utc2hlbGwtY29sb3IpO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgfVxuICBcbiAgICAgICAgLy8gQWRkIHBsYWNlaG9sZGVyIGJhY2tncm91bmRcbiAgICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1lcnJvcik7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW1hZ2Utc2hlbGwtY29sb3IpO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWltYWdlLXNoZWxsLWxvYWRpbmctYmFja2dyb3VuZCk7XG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgICAvLyAqIE5PVEU6IHdlIGRpZG4ndCBhZGQgLmltZy1lcnJvciBzdHlsZXMgZm9yICdjb3ZlcicgZGlzcGxheSBvbiBwdXJwb3NlLlxuICAgIC8vIElmIGl0IGlzIGRpc3BsYXk6IGNvdmVyXG4gICAgJltkaXNwbGF5PVwiY292ZXJcIl0ge1xuICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIFxuICAgICAgLy8gSW4gY292ZXIgZGlzcGxheSwgd2UgY2FuIGhhdmUgY29udGVudCBpbnNpZGUgdGhlIGVsZW1lbnQsIHRodXMgd2UgbmVlZCB0byBwdXQgdGhlc2UgZWxlbWVudHMgYmVuZWF0aFxuICAgICAgJjo6YmVmb3JlLFxuICAgICAgJiA+IC5zcGlubmVyIHtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgICB9XG4gIFxuICAgICAgJiA+IC5pbm5lci1pbWcge1xuICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICB9XG4gIFxuICAgICAgJi5pbWctc3NyLFxuICAgICAgJi5pbWctbG9hZGVkIHtcbiAgICAgICAgLy8gSGlkZSBsb2FkaW5nIGJhY2tncm91bmQgb25jZSB0aGUgaW1hZ2UgaGFzIGxvYWRlZFxuICAgICAgICAmOjpiZWZvcmUge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIDpob3N0KFthbmltYXRpb249XCJncmFkaWVudFwiXSkge1xuICAgIC0taW1hZ2Utc2hlbGwtbG9hZGluZy1iYWNrZ3JvdW5kOiAjRUVFO1xuICAgIC0taW1hZ2Utc2hlbGwtYW5pbWF0aW9uLWNvbG9yOiAjREREO1xuICBcbiAgICAvLyBUaGUgYW5pbWF0aW9uIHRoYXQgZ29lcyBiZW5lYXRoIHRoZSBtYXNrc1xuICAgICY6OmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHZhcigtLWltYWdlLXNoZWxsLWxvYWRpbmctYmFja2dyb3VuZCkgOCUsIHZhcigtLWltYWdlLXNoZWxsLWFuaW1hdGlvbi1jb2xvcikgMTglLCB2YXIoLS1pbWFnZS1zaGVsbC1sb2FkaW5nLWJhY2tncm91bmQpIDMzJSk7XG4gICAgICBiYWNrZ3JvdW5kLXNpemU6IDgwMHB4IDEwNHB4O1xuICAgICAgYW5pbWF0aW9uOiBhbmltYXRlQmFja2dyb3VuZCAycyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbiAgICB9XG4gIFxuICAgICYuaW1nLXNzcixcbiAgICAmLmltZy1sb2FkZWQsXG4gICAgJi5pbWctZXJyb3Ige1xuICAgICAgLy8gUmVzZXQgYmFja2dyb3VuZCBhbmltYXRpb25cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGFuaW1hdGlvbjogMDtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIEBrZXlmcmFtZXMgYW5pbWF0ZUJhY2tncm91bmQge1xuICAgICAgMCV7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC00NjhweCAwXG4gICAgICB9XG4gIFxuICAgICAgMTAwJXtcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNDY4cHggMFxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgOmhvc3QoW2FuaW1hdGlvbj1cInNwaW5uZXJcIl0pIHtcbiAgICAtLWltYWdlLXNoZWxsLXNwaW5uZXItc2l6ZTogMjhweDtcbiAgICAtLWltYWdlLXNoZWxsLXNwaW5uZXItY29sb3I6ICNDQ0M7XG4gIFxuICAgICYgPiAuc3Bpbm5lciB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogY2FsYyg1MCUgLSBjYWxjKHZhcigtLWltYWdlLXNoZWxsLXNwaW5uZXItc2l6ZSkgLyAyKSk7XG4gICAgICBsZWZ0OiBjYWxjKDUwJSAtIGNhbGModmFyKC0taW1hZ2Utc2hlbGwtc3Bpbm5lci1zaXplKSAvIDIpKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1pbWFnZS1zaGVsbC1zcGlubmVyLXNpemUpO1xuICAgICAgaGVpZ2h0OiB2YXIoLS1pbWFnZS1zaGVsbC1zcGlubmVyLXNpemUpO1xuICAgICAgZm9udC1zaXplOiB2YXIoLS1pbWFnZS1zaGVsbC1zcGlubmVyLXNpemUpO1xuICAgICAgbGluZS1oZWlnaHQ6IHZhcigtLWltYWdlLXNoZWxsLXNwaW5uZXItc2l6ZSk7XG4gICAgICBjb2xvcjogdmFyKC0taW1hZ2Utc2hlbGwtc3Bpbm5lci1jb2xvcik7XG4gICAgfVxuICBcbiAgICAmLmltZy1zc3IsXG4gICAgJi5pbWctbG9hZGVkLFxuICAgICYuaW1nLWVycm9yIHtcbiAgICAgICYgPiAuc3Bpbm5lciB7XG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIDpob3N0KC5hZGQtb3ZlcmxheSkge1xuICAgIC0taW1hZ2Utc2hlbGwtb3ZlcmxheS1iYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC40KTtcbiAgXG4gICAgJi5pbWctc3NyLFxuICAgICYuaW1nLWxvYWRlZCxcbiAgICAmLmltZy1lcnJvciB7XG4gICAgICAvLyBBZGQgYmFja2dyb3VuZCBvdmVybGF5IGFmdGVyIHRoZSBpbWFnZSBoYXMgbG9hZGVkXG4gICAgICAmOjpiZWZvcmUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW1hZ2Utc2hlbGwtb3ZlcmxheS1iYWNrZ3JvdW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgIl19 */";
      /***/
    },

    /***/
    "DsSi":
    /*!************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utils/shell/aspect-ratio/aspect-ratio.component.html ***!
      \************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function DsSi(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div class=\"content-wrapper\">\n  <ng-content></ng-content>\n</div>\n";
      /***/
    },

    /***/
    "FxdG":
    /*!*******************************************************************************!*\
      !*** ./src/app/components/slider-horizontal/slider-horizontal.component.scss ***!
      \*******************************************************************************/

    /*! exports provided: default */

    /***/
    function FxdG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".content1 {\n  max-height: 400px;\n}\n\n.content2 {\n  max-height: 220px;\n}\n\n.line {\n  display: inline-flex;\n}\n\n.title {\n  margin: 10px 0px 0px 15px;\n}\n\n.bottonTitle {\n  font-size: 10pt;\n  margin-left: 10px;\n}\n\n.customCard2 {\n  background-color: white;\n  width: 100%;\n}\n\n.customCard2 ion-card-content {\n  height: 90px;\n}\n\n.customCard1 {\n  background-color: white;\n  width: 100%;\n  height: 300px;\n}\n\n.customCard1 ion-icon {\n  padding: 5%;\n}\n\n.close-card {\n  float: right;\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NsaWRlci1ob3Jpem9udGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7QUFDSjs7QUFDQTtFQUNJLGlCQUFBO0FBRUo7O0FBQ0E7RUFDSSxvQkFBQTtBQUVKOztBQUNBO0VBQ0kseUJBQUE7QUFFSjs7QUFDQTtFQUNJLGVBQUE7RUFDQSxpQkFBQTtBQUVKOztBQUNBO0VBQ0ksdUJBQUE7RUFDQSxXQUFBO0FBRUo7O0FBQUk7RUFDSSxZQUFBO0FBRVI7O0FBR0E7RUFDSSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0FBQUo7O0FBRUk7RUFDSSxXQUFBO0FBQVI7O0FBSUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQURKIiwiZmlsZSI6InNsaWRlci1ob3Jpem9udGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQxe1xuICAgIG1heC1oZWlnaHQ6IDQwMHB4O1xufVxuLmNvbnRlbnQye1xuICAgIG1heC1oZWlnaHQ6IDIyMHB4O1xufVxuXG4ubGluZXtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDsgIFxufVxuXG4udGl0bGV7XG4gICAgbWFyZ2luOiAxMHB4IDBweCAwcHggMTVweDtcbn1cblxuLmJvdHRvblRpdGxle1xuICAgIGZvbnQtc2l6ZTogMTBwdDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbn1cblxuLmN1c3RvbUNhcmQye1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgaW9uLWNhcmQtY29udGVudHtcbiAgICAgICAgaGVpZ2h0OiA5MHB4O1xuICAgIH1cbn1cblxuXG4uY3VzdG9tQ2FyZDEge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMzAwcHg7XG5cbiAgICBpb24taWNvbntcbiAgICAgICAgcGFkZGluZzogNSU7XG4gICAgfVxuICB9XG5cbiAgLmNsb3NlLWNhcmQge1xuICAgIGZsb2F0OnJpZ2h0OyBcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuIl19 */";
      /***/
    },

    /***/
    "HAlI":
    /*!*************************************************************************!*\
      !*** ./src/app/components/slider-vertical/slider-vertical.component.ts ***!
      \*************************************************************************/

    /*! exports provided: SliderVerticalComponent */

    /***/
    function HAlI(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SliderVerticalComponent", function () {
        return SliderVerticalComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_slider_vertical_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./slider-vertical.component.html */
      "RvMG");
      /* harmony import */


      var _slider_vertical_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./slider-vertical.component.scss */
      "XWyM");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var SliderVerticalComponent = /*#__PURE__*/function () {
        function SliderVerticalComponent() {
          _classCallCheck(this, SliderVerticalComponent);

          this.isTitle = true;
          this.isHour = true;
          this.sliderConfig = {
            initialSlide: 0,
            slidesPerView: 1,
            direction: 'vertical',
            centeredSlides: false
          };
        }

        _createClass(SliderVerticalComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            if (this.information === undefined) {
              this.setUserInformation();
            }
          }
        }, {
          key: "setUserInformation",
          value: function setUserInformation() {
            var slider = {
              title: 'Medicación',
              image: 'assets/images/logo.svg',
              icon: 'assets/images/logo.svg',
              description: 'Plazo para reservar tu cita online abierto'
            };
            this.information = {
              title: 'Tu objetivo',
              subtitle: 'Tu objetivo',
              icon: 'assets/icons/Agenda.svg',
              hour: '12:00',
              content: [slider, slider, slider]
            };
          }
        }, {
          key: "isDefinedTitle",
          value: function isDefinedTitle() {
            var title = this.information.title;
            if (title !== null && title !== undefined) return this.isTitle = true;else return this.isTitle = false;
          }
        }, {
          key: "isDefinedHour",
          value: function isDefinedHour(hour) {
            console.log('[SliderVerticalComponent] isDefinedHour()', hour);

            if (hour !== null && hour !== undefined) {
              this.information.hour = hour;
              return this.isHour = true;
            } else return this.isHour = false;
          }
        }, {
          key: "slideChange",
          value: function slideChange() {
            var _this4 = this;

            this.slider.getActiveIndex().then(function (index) {
              console.log('[SliderVerticalComponent] ionSlideTouchEnd()', index);
              var slider = _this4.information.content[index];

              _this4.isDefinedHour(slider.hour);

              _this4.changeNameDiet(slider.title);
            });
          }
        }, {
          key: "changeNameDiet",
          value: function changeNameDiet(nameDiet) {
            console.log('[SliderVerticalComponent] isDefinedHour()', nameDiet);
            if (this.information.title !== 'Tu Dia') return;

            if (nameDiet !== null && nameDiet !== undefined) {
              this.information.subtitle = nameDiet;
            }
          }
        }]);

        return SliderVerticalComponent;
      }();

      SliderVerticalComponent.ctorParameters = function () {
        return [];
      };

      SliderVerticalComponent.propDecorators = {
        information: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        slider: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
          args: ['slider']
        }]
      };
      SliderVerticalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-slider-vertical',
        template: _raw_loader_slider_vertical_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_slider_vertical_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], SliderVerticalComponent);
      /***/
    },

    /***/
    "IUqK":
    /*!***************************************************************************!*\
      !*** ./src/app/components/countdown-timer/countdown-timer.component.scss ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function IUqK(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ":host {\n  --countdown-margin: 0px;\n  --countdown-padding: 0px;\n  --countdown-time-margin: 0px;\n  --countdown-time-padding: 0px;\n  --countdown-inner-time-margin: 2px;\n  --countdown-inner-time-padding: 0px;\n  --countdown-fill-border: none;\n  --countdown-fill-border-radius: 0px;\n  --countdown-fill-background: transparent;\n  --countdown-fill-shadow: none;\n  --countdown-value-color: #CCC;\n  --countdown-unit-color: #CCC;\n  --countdown-time-flex-direction: row-reverse;\n  display: block;\n}\n:host .countdown {\n  margin: var(--countdown-margin);\n  padding: var(--countdown-padding);\n  justify-content: center;\n  flex-wrap: nowrap;\n}\n:host .time {\n  padding: var(--countdown-time-padding);\n  margin: var(--countdown-time-margin);\n  display: flex;\n  flex-direction: var(--countdown-time-flex-direction);\n  align-items: center;\n  justify-content: center;\n}\n:host .time .time-unit {\n  display: block;\n  color: var(--countdown-unit-color);\n  font-size: 0.7em;\n  text-align: center;\n  text-transform: uppercase;\n  width: 2ex;\n}\n:host .time .time-value {\n  display: block;\n  color: var(--countdown-value-color);\n  text-align: center;\n  font-size: 1em;\n  line-height: 1em;\n  min-height: 1em;\n  min-width: 2.2ex;\n  min-width: 2.1ch;\n}\n:host .inner-time {\n  margin: var(--countdown-inner-time-margin);\n  padding: var(--countdown-inner-time-padding);\n}\n:host([fill=countdown]) .countdown {\n  border: var(--countdown-fill-border);\n  border-radius: var(--countdown-fill-border-radius);\n  background-color: var(--countdown-fill-background);\n  box-shadow: var(--countdown-fill-shadow);\n}\n:host([fill=time]) .time {\n  border: var(--countdown-fill-border);\n  border-radius: var(--countdown-fill-border-radius);\n  background-color: var(--countdown-fill-background);\n  box-shadow: var(--countdown-fill-shadow);\n}\n:host([fill=inner-time]) .inner-time {\n  border: var(--countdown-fill-border);\n  border-radius: var(--countdown-fill-border-radius);\n  background-color: var(--countdown-fill-background);\n  box-shadow: var(--countdown-fill-shadow);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvdW50ZG93bi10aW1lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQTtFQUNFLHVCQUFBO0VBQ0Esd0JBQUE7RUFDQSw0QkFBQTtFQUNBLDZCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUVBLDZCQUFBO0VBQ0EsbUNBQUE7RUFDQSx3Q0FBQTtFQUNBLDZCQUFBO0VBRUEsNkJBQUE7RUFDQSw0QkFBQTtFQUVBLDRDQUFBO0VBRUEsY0FBQTtBQVZGO0FBWUU7RUFDRSwrQkFBQTtFQUNBLGlDQUFBO0VBRUEsdUJBQUE7RUFDQSxpQkFBQTtBQVhKO0FBY0U7RUFDRSxzQ0FBQTtFQUNBLG9DQUFBO0VBRUEsYUFBQTtFQUNBLG9EQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQWJKO0FBZUk7RUFDRSxjQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxVQUFBO0FBYk47QUFnQkk7RUFDRSxjQUFBO0VBQ0EsbUNBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFLQSxnQkFBQTtFQUNBLGdCQUFBO0FBbEJOO0FBc0JFO0VBQ0UsMENBQUE7RUFDQSw0Q0FBQTtBQXBCSjtBQXlCRTtFQTNFQSxvQ0FBQTtFQUNBLGtEQUFBO0VBQ0Esa0RBQUE7RUFDQSx3Q0FBQTtBQXNERjtBQXdCRTtFQWpGQSxvQ0FBQTtFQUNBLGtEQUFBO0VBQ0Esa0RBQUE7RUFDQSx3Q0FBQTtBQTZERjtBQXVCRTtFQXZGQSxvQ0FBQTtFQUNBLGtEQUFBO0VBQ0Esa0RBQUE7RUFDQSx3Q0FBQTtBQW9FRiIsImZpbGUiOiJjb3VudGRvd24tdGltZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWl4aW4gZmlsbC1jb250YWluZXIoKXtcbiAgYm9yZGVyOiB2YXIoLS1jb3VudGRvd24tZmlsbC1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1jb3VudGRvd24tZmlsbC1ib3JkZXItcmFkaXVzKTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY291bnRkb3duLWZpbGwtYmFja2dyb3VuZCk7XG4gIGJveC1zaGFkb3c6IHZhcigtLWNvdW50ZG93bi1maWxsLXNoYWRvdyk7XG59XG5cbjpob3N0IHtcbiAgLS1jb3VudGRvd24tbWFyZ2luOiAwcHg7XG4gIC0tY291bnRkb3duLXBhZGRpbmc6IDBweDtcbiAgLS1jb3VudGRvd24tdGltZS1tYXJnaW46IDBweDtcbiAgLS1jb3VudGRvd24tdGltZS1wYWRkaW5nOiAwcHg7XG4gIC0tY291bnRkb3duLWlubmVyLXRpbWUtbWFyZ2luOiAycHg7XG4gIC0tY291bnRkb3duLWlubmVyLXRpbWUtcGFkZGluZzogMHB4O1xuXG4gIC0tY291bnRkb3duLWZpbGwtYm9yZGVyOiBub25lO1xuICAtLWNvdW50ZG93bi1maWxsLWJvcmRlci1yYWRpdXM6IDBweDtcbiAgLS1jb3VudGRvd24tZmlsbC1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1jb3VudGRvd24tZmlsbC1zaGFkb3c6IG5vbmU7XG5cbiAgLS1jb3VudGRvd24tdmFsdWUtY29sb3I6ICNDQ0M7XG4gIC0tY291bnRkb3duLXVuaXQtY29sb3I6ICNDQ0M7XG5cbiAgLS1jb3VudGRvd24tdGltZS1mbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XG5cbiAgZGlzcGxheTogYmxvY2s7XG5cbiAgLmNvdW50ZG93biB7XG4gICAgbWFyZ2luOiB2YXIoLS1jb3VudGRvd24tbWFyZ2luKTtcbiAgICBwYWRkaW5nOiB2YXIoLS1jb3VudGRvd24tcGFkZGluZyk7XG5cbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgfVxuXG4gIC50aW1lIHtcbiAgICBwYWRkaW5nOiB2YXIoLS1jb3VudGRvd24tdGltZS1wYWRkaW5nKTtcbiAgICBtYXJnaW46IHZhcigtLWNvdW50ZG93bi10aW1lLW1hcmdpbik7XG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiB2YXIoLS1jb3VudGRvd24tdGltZS1mbGV4LWRpcmVjdGlvbik7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIC50aW1lLXVuaXQge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBjb2xvcjogdmFyKC0tY291bnRkb3duLXVuaXQtY29sb3IpO1xuICAgICAgZm9udC1zaXplOiAwLjdlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICB3aWR0aDogMmV4O1xuICAgIH1cblxuICAgIC50aW1lLXZhbHVlIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgY29sb3I6IHZhcigtLWNvdW50ZG93bi12YWx1ZS1jb2xvcik7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDFlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XG4gICAgICBtaW4taGVpZ2h0OiAxZW07XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBhbHdheXMgaGF2ZSBzcGFjZSBmb3IgdHdvIGNoYXJhY3RlcnNcbiAgICAgIC8vIEFzIGNoICh3aWR0aCBvZiB0aGUgY2hhcmFjdGVyICcwJykgdW5pdCBpcyBub3QgMTAwJSBzdXBwb3J0ZWQsIHdlIHdpbGwgdXNlIGV4IChoZWlnaHQgb2YgdGhlICd4JyBjaGFyYWN0ZXIpIGFzIGEgZmFsbGJhY2tcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvY3NzL3VuaXRzLXZhbHVlcy9cbiAgICAgIG1pbi13aWR0aDogMi4yZXg7IC8vIFRoZSAneCcgY2hhcmFjdGVyIGlzIHNlbWktc3F1YXJlIGNoYXIsIHRoYXQncyB3aHkgd2Ugc2V0IDIuMmV4XG4gICAgICBtaW4td2lkdGg6IDIuMWNoOyAvLyBjaCBpcyB0aGUgb25seSBmb250IHVuaXQgYmFzZWQgb24gdGhlIHdpZHRoIG9mIGNoYXJhY3RlcnNcbiAgICB9XG4gIH1cblxuICAuaW5uZXItdGltZSB7XG4gICAgbWFyZ2luOiB2YXIoLS1jb3VudGRvd24taW5uZXItdGltZS1tYXJnaW4pO1xuICAgIHBhZGRpbmc6IHZhcigtLWNvdW50ZG93bi1pbm5lci10aW1lLXBhZGRpbmcpO1xuICB9XG59XG5cbjpob3N0KFtmaWxsPVwiY291bnRkb3duXCJdKSB7XG4gIC5jb3VudGRvd24ge1xuICAgIEBpbmNsdWRlIGZpbGwtY29udGFpbmVyKCk7XG4gIH1cbn1cblxuOmhvc3QoW2ZpbGw9XCJ0aW1lXCJdKSB7XG4gIC50aW1lIHtcbiAgICBAaW5jbHVkZSBmaWxsLWNvbnRhaW5lcigpO1xuICB9XG59XG5cbjpob3N0KFtmaWxsPVwiaW5uZXItdGltZVwiXSkge1xuICAuaW5uZXItdGltZSB7XG4gICAgQGluY2x1ZGUgZmlsbC1jb250YWluZXIoKTtcbiAgfVxufVxuIl19 */";
      /***/
    },

    /***/
    "J+cp":
    /*!*****************************************************!*\
      !*** ./src/app/interceptors/timeout.interceptor.ts ***!
      \*****************************************************/

    /*! exports provided: DEFAULT_TIMEOUT, TimeoutInterceptor */

    /***/
    function JCp(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DEFAULT_TIMEOUT", function () {
        return DEFAULT_TIMEOUT;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TimeoutInterceptor", function () {
        return TimeoutInterceptor;
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


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var DEFAULT_TIMEOUT = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('defaultTimeout');

      var TimeoutInterceptor = /*#__PURE__*/function () {
        function TimeoutInterceptor(defaultTimeout) {
          _classCallCheck(this, TimeoutInterceptor);

          this.defaultTimeout = defaultTimeout;
        }

        _createClass(TimeoutInterceptor, [{
          key: "intercept",
          value: function intercept(req, next) {
            if (!window.navigator.onLine) {
              console.log('TimeoutInterceptor: ERR_INTERNET_DISCONNECTED');
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])({
                status: 0,
                message: 'ERR_INTERNET_DISCONNECTED'
              });
            } else {
              var timeoutValue = req.headers.get('timeout') || this.defaultTimeout;
              var timeoutValueNumeric = Number(timeoutValue);
              return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["timeout"])(timeoutValueNumeric));
            }
          }
        }]);

        return TimeoutInterceptor;
      }();

      TimeoutInterceptor.ctorParameters = function () {
        return [{
          type: Number,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
            args: [DEFAULT_TIMEOUT]
          }]
        }];
      };

      TimeoutInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], TimeoutInterceptor);
      /***/
    },

    /***/
    "Ja7l":
    /*!*****************************************************************!*\
      !*** ./src/app/components/chat-bubble/chat-bubble.component.ts ***!
      \*****************************************************************/

    /*! exports provided: ChatBubbleComponent */

    /***/
    function Ja7l(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ChatBubbleComponent", function () {
        return ChatBubbleComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_chat_bubble_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./chat-bubble.component.html */
      "lhNS");
      /* harmony import */


      var _chat_bubble_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./chat-bubble.component.scss */
      "4VlV");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! moment */
      "wd/R");
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");
      /* harmony import */


      var _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic-native/document-viewer/ngx */
      "LfQc");

      var ChatBubbleComponent_1;

      var ChatBubbleComponent = ChatBubbleComponent_1 = /*#__PURE__*/function () {
        function ChatBubbleComponent(dooleService, document) {
          _classCallCheck(this, ChatBubbleComponent);

          this.dooleService = dooleService;
          this.document = document;
          this.localfile = '';
          this.localfileNormalized = '';
          this.temporaryUrl = '';
          this.downloaded = false;
          this.status = '';
          this.percent = 0;
        }

        _createClass(ChatBubbleComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.format(this.message);
            console.log("Init");
          }
        }, {
          key: "nl2br",
          value: function nl2br(text) {
            return text.replace(/(\\n)/, "<br/>");
          }
        }, {
          key: "format",
          value: function format(message) {
            var _this5 = this;

            console.log(message);

            if (message.mediaType == "TEXT") {
              if (message.message) {
                message.message = this.nl2br(message.message);
                message.message = message.message.replace(String.fromCharCode(92), ''); //treiem \'

                message.message = message.message.replace("\\/", "/");
                this.message.message = message.message;
                console.log(this.message.message);
              }
            } else if (message.mediaType == "FILE") {
              this.dooleService.downloadFile(this.message.fileUrl, message.timestamp + ".pdf").subscribe(function (data) {
                //downloadFile subscribefile:///var/mobile/Containers/Data/Application/4D8A5FB4-B486-498D-97E8-76F404A6315F/Documents/1535373755996
                //downloadFile subscribehttp://localhost:8080/var/mobile/Containers/Data/Application/946A8956-0513-469B-803D-4C6F34087DDC/Library/Caches/1535374599756
                console.log('res in chat bubble: ', data);
                _this5.localfile = data.file;
                _this5.localfileNormalized = data.fileNormalized;
              });
            } else if (message.mediaType == "GEOLOCATION") {
              var t = message.message;
              var array_message = t.split(",");
              this.lat = array_message[0].substring(5);
              this.lon = array_message[1].substring(4, array_message[1].length - 1);
              console.log(this.lat, this.lon);
            }
          }
        }, {
          key: "formatEpoch",
          value: function formatEpoch(epoch) {
            return ChatBubbleComponent_1.getCalendarDay(epoch);
          }
        }, {
          key: "openFile",
          value: function openFile(message) {
            var _this6 = this;

            this.target = message.timestamp;
            var dict = [];
            console.log("clicked message: ", message.fileUrl);
            dict.push({
              file: message.fileUrl
            });
            this.dooleService.post("message/temporaryUrl", {
              file: message.fileUrl
            }).subscribe(function (data) {
              console.log('post("message/temporaryUrl"', data);
              _this6.temporaryUrl = data.temporaryUrl;

              _this6.dooleService.downloadFile(data.temporaryUrl, _this6.target).subscribe(function (datad) {
                console.log("***", datad); //console.log("downloadFile subscribe"+datad.fileNormalized);
                //console.log(data.percent);

                _this6.percent = datad.percent;
                _this6.status = datad.status; //downloadFile subscribefile:///var/mobile/Containers/Data/Application/4D8A5FB4-B486-498D-97E8-76F404A6315F/Documents/1535373755996
                //downloadFile subscribehttp://localhost:8080/var/mobile/Containers/Data/Application/946A8956-0513-469B-803D-4C6F34087DDC/Library/Caches/1535374599756

                _this6.localfile = datad.file;
                _this6.localfileNormalized = datad.fileNormalized;
                _this6.downloaded = datad.downloaded;
                window.open(_this6.temporaryUrl, ""); //window.open("data:application/pdf," + encodeURI(this.localfile)); 
                //this.document.viewDocument(this.localfile, 'application/pdf',null);
              });
            });
          }
        }], [{
          key: "getEpoch",
          value: function getEpoch() {
            return moment__WEBPACK_IMPORTED_MODULE_5___default()().unix();
          }
        }, {
          key: "getCalendarDay",
          value: function getCalendarDay(epoch) {
            if (!epoch) {
              return null;
            }

            var timeString = 'h:mm A';
            return moment__WEBPACK_IMPORTED_MODULE_5___default()(epoch).calendar(null, {
              sameDay: '[Hoy] ' + timeString,
              lastDay: '[Ayer] ' + timeString,
              sameElse: 'DD/MM/YY ' + timeString
            });
          }
        }]);

        return ChatBubbleComponent;
      }();

      ChatBubbleComponent.ctorParameters = function () {
        return [{
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"]
        }, {
          type: _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_7__["DocumentViewer"]
        }];
      };

      ChatBubbleComponent.propDecorators = {
        message: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['chatMessage']
        }]
      };
      ChatBubbleComponent = ChatBubbleComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'chat-bubble',
        template: _raw_loader_chat_bubble_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [{
          provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
          useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function () {
            return ChatBubbleComponent_1;
          }),
          multi: true
        }],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
        styles: [_chat_bubble_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ChatBubbleComponent);
      /***/
    },

    /***/
    "KPww":
    /*!*******************************************************************!*\
      !*** ./src/app/components/file-upload/file-upload.component.scss ***!
      \*******************************************************************/

    /*! exports provided: default */

    /***/
    function KPww(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmaWxlLXVwbG9hZC5jb21wb25lbnQuc2NzcyJ9 */";
      /***/
    },

    /***/
    "KwcL":
    /*!*************************************************************************************************************************************************!*\
      !*** ./node_modules/@ionic/pwa-elements/dist/esm lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
      \*************************************************************************************************************************************************/

    /*! no static exports found */

    /***/
    function KwcL(module, exports, __webpack_require__) {
      var map = {
        "./pwa-action-sheet.entry.js": ["jDxf", 43],
        "./pwa-camera-modal-instance.entry.js": ["37vE", 44],
        "./pwa-camera-modal.entry.js": ["cJxf", 45],
        "./pwa-camera.entry.js": ["eGHz", 46],
        "./pwa-toast.entry.js": ["fHjd", 47]
      };

      function webpackAsyncContext(req) {
        if (!__webpack_require__.o(map, req)) {
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          });
        }

        var ids = map[req],
            id = ids[0];
        return __webpack_require__.e(ids[1]).then(function () {
          return __webpack_require__(id);
        });
      }

      webpackAsyncContext.keys = function webpackAsyncContextKeys() {
        return Object.keys(map);
      };

      webpackAsyncContext.id = "KwcL";
      module.exports = webpackAsyncContext;
      /***/
    },

    /***/
    "KzMd":
    /*!*************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/custom-header/custom-header.component.html ***!
      \*************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function KzMd(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n\n<ion-header>\n  <ion-toolbar class=\"header-one\">\n    <ion-buttons  slot=\"start\">\n      <ion-back-button text=\"\" slot=\"start\" [defaultHref]=\"this.backButtonRoute ? this.backButtonRoute : 'app/home'\"></ion-back-button>\n    </ion-buttons>\n    <ion-buttons slot=\"primary\">\n      <ion-button>\n        <ion-menu-button auto-hide=\"false\"></ion-menu-button>\n      </ion-button>\n    </ion-buttons>\n    <div [routerLink]=\"['/app/home']\">\n   </div>\n  </ion-toolbar>\n\n</ion-header>";
      /***/
    },

    /***/
    "N+K7":
    /*!******************************************!*\
      !*** ./src/app/services/http.service.ts ***!
      \******************************************/

    /*! exports provided: HttpService */

    /***/
    function NK7(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HttpService", function () {
        return HttpService;
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


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var HttpService = /*#__PURE__*/function () {
        function HttpService(http, httpBackend) {
          _classCallCheck(this, HttpService);

          this.http = http;
          this.httpBackend = httpBackend;
          this.httpWithoutInterceptor = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"](httpBackend);
        }

        _createClass(HttpService, [{
          key: "formatErrors",
          value: function formatErrors(error) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      return _context.abrupt("return", error);

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
          }
        }, {
          key: "get",
          value: function get(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
            return this.http.get("".concat(path), {
              params: params
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "put",
          value: function put(path) {
            var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return this.http.put("".concat(path), JSON.stringify(body)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "post",
          value: function post(path) {
            var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var httpOptions = this.setHttpOptions(options);
            console.log("url: ", path);
            console.log("body: ", body);
            return this.http.post("".concat(path), JSON.stringify(body), httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "delete",
          value: function _delete(path) {
            return this.http["delete"]("".concat(path)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "_get",
          value: function _get(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
            return this.httpWithoutInterceptor.get("".concat(path), {
              params: params
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "_put",
          value: function _put(path) {
            var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return this.httpWithoutInterceptor.put("".concat(path), JSON.stringify(body)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "_post",
          value: function _post(path) {
            var _this7 = this;

            var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var httpOptions = this.setHttpOptions(options);
            var params = this.setHttpParams(body);
            return this.httpWithoutInterceptor.post("".concat(path), JSON.stringify(body), httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) {
              return _this7.formatErrors(error);
            }));
          }
        }, {
          key: "_delete",
          value: function _delete(path) {
            return this.httpWithoutInterceptor["delete"]("".concat(path)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.formatErrors));
          }
        }, {
          key: "setHttpParams",
          value: function setHttpParams(body) {
            var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
            if (body != null) for (var key in body) {
              params = params.append(key, body[key]);
            }
            return params;
          }
        }, {
          key: "setHttpOptions",
          value: function setHttpOptions(options) {
            var httpOptions = {
              headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            };
            return httpOptions;
          }
        }]);

        return HttpService;
      }();

      HttpService.ctorParameters = function () {
        return [{
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
        }, {
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpBackend"]
        }];
      };

      HttpService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], HttpService);
      /***/
    },

    /***/
    "O2zu":
    /*!************************************************!*\
      !*** ./src/app/utils/transfer-state-helper.ts ***!
      \************************************************/

    /*! exports provided: ImageShellState, TransferStateHelper */

    /***/
    function O2zu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImageShellState", function () {
        return ImageShellState;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TransferStateHelper", function () {
        return TransferStateHelper;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var ImageShellState;

      (function (ImageShellState) {
        ImageShellState["SSR"] = "ssr-loaded";
        ImageShellState["BROWSER_FROM_SSR"] = "browser-loaded-from-ssr";
        ImageShellState["NOT_FOUND"] = "not-found";
      })(ImageShellState || (ImageShellState = {}));

      var TransferStateHelper = /*#__PURE__*/function () {
        function TransferStateHelper(platformId, state) {
          _classCallCheck(this, TransferStateHelper);

          this.platformId = platformId;
          this.state = state;
        } // Method with generic param


        _createClass(TransferStateHelper, [{
          key: "checkDataSourceState",
          value: function checkDataSourceState(stateKey, dataSource) {
            var _this8 = this;

            var dataKey = Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["makeStateKey"])(stateKey);

            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId)) {
              // When loading resource in the server, store the result in the TransferState
              // to use when transitioning to the browser from the SSR rendered app
              return dataSource.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (data) {
                _this8.state.set(dataKey, data);
              }));
            } else {
              // Check if we have data in the TransferState
              if (this.state.hasKey(dataKey)) {
                var stateData = this.state.get(dataKey, null);

                if (stateData && stateData !== null) {
                  var cachedDataSource = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(stateData); // After using it, remove data from state
                  // this.state.remove(dataKey);
                  // Set a flag to track if the dataSource is being cached in the server state or not

                  Object.assign(cachedDataSource, {
                    ssr_state: true
                  });
                  return cachedDataSource;
                } else {
                  return dataSource;
                }
              } else {
                return dataSource;
              }
            }
          } // This method checks if a specific image was previously handled in the server

        }, {
          key: "checkImageShellState",
          value: function checkImageShellState(stateKey, imageSource) {
            var imageState = ImageShellState.NOT_FOUND; // Make sure we are not dealing with empty image sources

            if (imageSource !== '') {
              // We will store a collection of image sources in the state
              var dataKey = Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["makeStateKey"])(stateKey);

              if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId)) {
                // When loading resource in the server, store the result in the TransferState
                // to use when transitioning to the browser from the SSR rendered app
                var stateImages = this.state.get(dataKey, []);
                stateImages.push(imageSource);
                this.state.set(dataKey, stateImages); // Running in the server, in this execution the image is set in the transfer state for the first time

                imageState = ImageShellState.SSR;
              } else {
                // Check if we have data in the TransferState
                if (this.state.hasKey(dataKey)) {
                  var stateData = this.state.get(dataKey, []); // Check if the image was previously loaded in the server

                  if (stateData.includes(imageSource)) {
                    imageState = ImageShellState.BROWSER_FROM_SSR;
                  }
                }
              }
            }

            return imageState;
          }
        }]);

        return TransferStateHelper;
      }();

      TransferStateHelper.ctorParameters = function () {
        return [{
          type: Object,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]]
          }]
        }, {
          type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["TransferState"]
        }];
      };

      TransferStateHelper = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
      })], TransferStateHelper);
      /***/
    },

    /***/
    "OC8m":
    /*!**************************************************!*\
      !*** ./src/app/services/notification.service.ts ***!
      \**************************************************/

    /*! exports provided: NotificationService */

    /***/
    function OC8m(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "NotificationService", function () {
        return NotificationService;
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


      var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/snack-bar */
      "dNgK");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var NotificationService = /*#__PURE__*/function () {
        function NotificationService(snackBar, zone, alertCtrl, translate) {
          _classCallCheck(this, NotificationService);

          this.snackBar = snackBar;
          this.zone = zone;
          this.alertCtrl = alertCtrl;
          this.translate = translate;
        }

        _createClass(NotificationService, [{
          key: "showSuccess",
          value: function showSuccess(message) {
            var _this9 = this;

            // Had an issue with the snackbar being ran outside of angular's zone.
            this.zone.run(function () {
              // The second parameter is the text in the button. 
              // In the third, we send in the css class for the snack bar.
              var config = new _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarConfig"]();
              config.panelClass = ['example-pizza-party'];
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 3000;

              _this9.snackBar.open(message, '', config);
            });
          }
        }, {
          key: "showError",
          value: function showError(error) {
            var _this10 = this;

            var message;
            if (error.includes('ERR_INTERNET_DISCONNECTED') || error.toLowerCase().includes('network error')) message = this.translate.instant('commons.error-network');else if (error.includes('Timeout has occurred')) message = this.translate.instant('commons.error-timeout');else message = error;
            this.zone.run(function () {
              var config = new _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__["MatSnackBarConfig"]();
              config.panelClass = ['example-pizza-party'];
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 3000;

              _this10.snackBar.open(message, 'X', config);

              console.log("NotificationService", message);
            });
          }
        }]);

        return NotificationService;
      }();

      NotificationService.ctorParameters = function () {
        return [{
          type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]
        }];
      };

      NotificationService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], NotificationService);
      /***/
    },

    /***/
    "Q5Wo":
    /*!*****************************************************************************!*\
      !*** ./src/app/components/slider-horizontal/slider-horizontal.component.ts ***!
      \*****************************************************************************/

    /*! exports provided: SliderHorizontalComponent */

    /***/
    function Q5Wo(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SliderHorizontalComponent", function () {
        return SliderHorizontalComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_slider_horizontal_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./slider-horizontal.component.html */
      "yfhX");
      /* harmony import */


      var _slider_horizontal_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./slider-horizontal.component.scss */
      "FxdG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var SliderHorizontalComponent = /*#__PURE__*/function () {
        function SliderHorizontalComponent() {
          _classCallCheck(this, SliderHorizontalComponent);

          this.slidesType = 1;
          this.sliderConfig = {
            initialSlide: 0,
            slidesPerView: 1.1,
            spaceBetween: 4,
            centeredSlides: false
          };
        }

        _createClass(SliderHorizontalComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            if (this.information === undefined) {
              this.setUserInformation();
            }
          }
        }, {
          key: "setUserInformation",
          value: function setUserInformation() {
            var slider = {
              title: 'CITA MEDICA',
              subtitle: 'Dr Ricardo Sanchez',
              image: 'assets/images/logo.svg',
              icon: 'assets/icons/Agenda.svg',
              description: 'Plazo para reservar tu cita online abierto',
              hour: 'Lunes, 15 Noviembre 15:00'
            };
            this.information = {
              title: 'Novedades y Consejos',
              bar: true,

              /*  textTitleButton: 'Ver todas', */
              content: [slider, slider, slider]
            };
          }
        }]);

        return SliderHorizontalComponent;
      }();

      SliderHorizontalComponent.ctorParameters = function () {
        return [];
      };

      SliderHorizontalComponent.propDecorators = {
        slidesType: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        information: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      SliderHorizontalComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-slider-horizontal',
        template: _raw_loader_slider_horizontal_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_slider_horizontal_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], SliderHorizontalComponent);
      /***/
    },

    /***/
    "RDNO":
    /*!**************************************************!*\
      !*** ./src/app/interceptors/auth.interceptor.ts ***!
      \**************************************************/

    /*! exports provided: TokenInterceptorService */

    /***/
    function RDNO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TokenInterceptorService", function () {
        return TokenInterceptorService;
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


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/authentication.service */
      "ej43");
      /**
       * This interceptor automatically adds the token header needed by our backend API if such token is present
       * in the current state of the application.
       */


      var TokenInterceptorService = /*#__PURE__*/function () {
        function TokenInterceptorService(loginService) {
          _classCallCheck(this, TokenInterceptorService);

          this.loginService = loginService;
        }

        _createClass(TokenInterceptorService, [{
          key: "intercept",
          value: function intercept(req, next) {
            var token = this.loginService.getAuthToken();

            if (token) {
              req = req.clone({
                setHeaders: {
                  Authorization: "Bearer " + token,
                  'Content-Type': 'application/json'
                }
              });
            }

            return next.handle(req);
          }
        }]);

        return TokenInterceptorService;
      }();

      TokenInterceptorService.ctorParameters = function () {
        return [{
          type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]
        }];
      };

      TokenInterceptorService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], TokenInterceptorService);
      /***/
    },

    /***/
    "RnhZ":
    /*!**************************************************!*\
      !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
      \**************************************************/

    /*! no static exports found */

    /***/
    function RnhZ(module, exports, __webpack_require__) {
      var map = {
        "./af": "K/tc",
        "./af.js": "K/tc",
        "./ar": "jnO4",
        "./ar-dz": "o1bE",
        "./ar-dz.js": "o1bE",
        "./ar-kw": "Qj4J",
        "./ar-kw.js": "Qj4J",
        "./ar-ly": "HP3h",
        "./ar-ly.js": "HP3h",
        "./ar-ma": "CoRJ",
        "./ar-ma.js": "CoRJ",
        "./ar-sa": "gjCT",
        "./ar-sa.js": "gjCT",
        "./ar-tn": "bYM6",
        "./ar-tn.js": "bYM6",
        "./ar.js": "jnO4",
        "./az": "SFxW",
        "./az.js": "SFxW",
        "./be": "H8ED",
        "./be.js": "H8ED",
        "./bg": "hKrs",
        "./bg.js": "hKrs",
        "./bm": "p/rL",
        "./bm.js": "p/rL",
        "./bn": "kEOa",
        "./bn-bd": "loYQ",
        "./bn-bd.js": "loYQ",
        "./bn.js": "kEOa",
        "./bo": "0mo+",
        "./bo.js": "0mo+",
        "./br": "aIdf",
        "./br.js": "aIdf",
        "./bs": "JVSJ",
        "./bs.js": "JVSJ",
        "./ca": "1xZ4",
        "./ca.js": "1xZ4",
        "./cs": "PA2r",
        "./cs.js": "PA2r",
        "./cv": "A+xa",
        "./cv.js": "A+xa",
        "./cy": "l5ep",
        "./cy.js": "l5ep",
        "./da": "DxQv",
        "./da.js": "DxQv",
        "./de": "tGlX",
        "./de-at": "s+uk",
        "./de-at.js": "s+uk",
        "./de-ch": "u3GI",
        "./de-ch.js": "u3GI",
        "./de.js": "tGlX",
        "./dv": "WYrj",
        "./dv.js": "WYrj",
        "./el": "jUeY",
        "./el.js": "jUeY",
        "./en-au": "Dmvi",
        "./en-au.js": "Dmvi",
        "./en-ca": "OIYi",
        "./en-ca.js": "OIYi",
        "./en-gb": "Oaa7",
        "./en-gb.js": "Oaa7",
        "./en-ie": "4dOw",
        "./en-ie.js": "4dOw",
        "./en-il": "czMo",
        "./en-il.js": "czMo",
        "./en-in": "7C5Q",
        "./en-in.js": "7C5Q",
        "./en-nz": "b1Dy",
        "./en-nz.js": "b1Dy",
        "./en-sg": "t+mt",
        "./en-sg.js": "t+mt",
        "./eo": "Zduo",
        "./eo.js": "Zduo",
        "./es": "iYuL",
        "./es-do": "CjzT",
        "./es-do.js": "CjzT",
        "./es-mx": "tbfe",
        "./es-mx.js": "tbfe",
        "./es-us": "Vclq",
        "./es-us.js": "Vclq",
        "./es.js": "iYuL",
        "./et": "7BjC",
        "./et.js": "7BjC",
        "./eu": "D/JM",
        "./eu.js": "D/JM",
        "./fa": "jfSC",
        "./fa.js": "jfSC",
        "./fi": "gekB",
        "./fi.js": "gekB",
        "./fil": "1ppg",
        "./fil.js": "1ppg",
        "./fo": "ByF4",
        "./fo.js": "ByF4",
        "./fr": "nyYc",
        "./fr-ca": "2fjn",
        "./fr-ca.js": "2fjn",
        "./fr-ch": "Dkky",
        "./fr-ch.js": "Dkky",
        "./fr.js": "nyYc",
        "./fy": "cRix",
        "./fy.js": "cRix",
        "./ga": "USCx",
        "./ga.js": "USCx",
        "./gd": "9rRi",
        "./gd.js": "9rRi",
        "./gl": "iEDd",
        "./gl.js": "iEDd",
        "./gom-deva": "qvJo",
        "./gom-deva.js": "qvJo",
        "./gom-latn": "DKr+",
        "./gom-latn.js": "DKr+",
        "./gu": "4MV3",
        "./gu.js": "4MV3",
        "./he": "x6pH",
        "./he.js": "x6pH",
        "./hi": "3E1r",
        "./hi.js": "3E1r",
        "./hr": "S6ln",
        "./hr.js": "S6ln",
        "./hu": "WxRl",
        "./hu.js": "WxRl",
        "./hy-am": "1rYy",
        "./hy-am.js": "1rYy",
        "./id": "UDhR",
        "./id.js": "UDhR",
        "./is": "BVg3",
        "./is.js": "BVg3",
        "./it": "bpih",
        "./it-ch": "bxKX",
        "./it-ch.js": "bxKX",
        "./it.js": "bpih",
        "./ja": "B55N",
        "./ja.js": "B55N",
        "./jv": "tUCv",
        "./jv.js": "tUCv",
        "./ka": "IBtZ",
        "./ka.js": "IBtZ",
        "./kk": "bXm7",
        "./kk.js": "bXm7",
        "./km": "6B0Y",
        "./km.js": "6B0Y",
        "./kn": "PpIw",
        "./kn.js": "PpIw",
        "./ko": "Ivi+",
        "./ko.js": "Ivi+",
        "./ku": "JCF/",
        "./ku.js": "JCF/",
        "./ky": "lgnt",
        "./ky.js": "lgnt",
        "./lb": "RAwQ",
        "./lb.js": "RAwQ",
        "./lo": "sp3z",
        "./lo.js": "sp3z",
        "./lt": "JvlW",
        "./lt.js": "JvlW",
        "./lv": "uXwI",
        "./lv.js": "uXwI",
        "./me": "KTz0",
        "./me.js": "KTz0",
        "./mi": "aIsn",
        "./mi.js": "aIsn",
        "./mk": "aQkU",
        "./mk.js": "aQkU",
        "./ml": "AvvY",
        "./ml.js": "AvvY",
        "./mn": "lYtQ",
        "./mn.js": "lYtQ",
        "./mr": "Ob0Z",
        "./mr.js": "Ob0Z",
        "./ms": "6+QB",
        "./ms-my": "ZAMP",
        "./ms-my.js": "ZAMP",
        "./ms.js": "6+QB",
        "./mt": "G0Uy",
        "./mt.js": "G0Uy",
        "./my": "honF",
        "./my.js": "honF",
        "./nb": "bOMt",
        "./nb.js": "bOMt",
        "./ne": "OjkT",
        "./ne.js": "OjkT",
        "./nl": "+s0g",
        "./nl-be": "2ykv",
        "./nl-be.js": "2ykv",
        "./nl.js": "+s0g",
        "./nn": "uEye",
        "./nn.js": "uEye",
        "./oc-lnc": "Fnuy",
        "./oc-lnc.js": "Fnuy",
        "./pa-in": "8/+R",
        "./pa-in.js": "8/+R",
        "./pl": "jVdC",
        "./pl.js": "jVdC",
        "./pt": "8mBD",
        "./pt-br": "0tRk",
        "./pt-br.js": "0tRk",
        "./pt.js": "8mBD",
        "./ro": "lyxo",
        "./ro.js": "lyxo",
        "./ru": "lXzo",
        "./ru.js": "lXzo",
        "./sd": "Z4QM",
        "./sd.js": "Z4QM",
        "./se": "//9w",
        "./se.js": "//9w",
        "./si": "7aV9",
        "./si.js": "7aV9",
        "./sk": "e+ae",
        "./sk.js": "e+ae",
        "./sl": "gVVK",
        "./sl.js": "gVVK",
        "./sq": "yPMs",
        "./sq.js": "yPMs",
        "./sr": "zx6S",
        "./sr-cyrl": "E+lV",
        "./sr-cyrl.js": "E+lV",
        "./sr.js": "zx6S",
        "./ss": "Ur1D",
        "./ss.js": "Ur1D",
        "./sv": "X709",
        "./sv.js": "X709",
        "./sw": "dNwA",
        "./sw.js": "dNwA",
        "./ta": "PeUW",
        "./ta.js": "PeUW",
        "./te": "XLvN",
        "./te.js": "XLvN",
        "./tet": "V2x9",
        "./tet.js": "V2x9",
        "./tg": "Oxv6",
        "./tg.js": "Oxv6",
        "./th": "EOgW",
        "./th.js": "EOgW",
        "./tk": "Wv91",
        "./tk.js": "Wv91",
        "./tl-ph": "Dzi0",
        "./tl-ph.js": "Dzi0",
        "./tlh": "z3Vd",
        "./tlh.js": "z3Vd",
        "./tr": "DoHr",
        "./tr.js": "DoHr",
        "./tzl": "z1FC",
        "./tzl.js": "z1FC",
        "./tzm": "wQk9",
        "./tzm-latn": "tT3J",
        "./tzm-latn.js": "tT3J",
        "./tzm.js": "wQk9",
        "./ug-cn": "YRex",
        "./ug-cn.js": "YRex",
        "./uk": "raLr",
        "./uk.js": "raLr",
        "./ur": "UpQW",
        "./ur.js": "UpQW",
        "./uz": "Loxo",
        "./uz-latn": "AQ68",
        "./uz-latn.js": "AQ68",
        "./uz.js": "Loxo",
        "./vi": "KSF8",
        "./vi.js": "KSF8",
        "./x-pseudo": "/X5v",
        "./x-pseudo.js": "/X5v",
        "./yo": "fzPg",
        "./yo.js": "fzPg",
        "./zh-cn": "XDpg",
        "./zh-cn.js": "XDpg",
        "./zh-hk": "SatO",
        "./zh-hk.js": "SatO",
        "./zh-mo": "OmwH",
        "./zh-mo.js": "OmwH",
        "./zh-tw": "kOpN",
        "./zh-tw.js": "kOpN"
      };

      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }

      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }

        return map[req];
      }

      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };

      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = "RnhZ";
      /***/
    },

    /***/
    "RvMG":
    /*!*****************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/slider-vertical/slider-vertical.component.html ***!
      \*****************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function RvMG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-content class=\"content\">\n  <div *ngIf='this.isTitle' class=\"title\">\n    {{information.title}}</div>\n  <ion-card class=\"card\">\n    <ion-card-header class=\"line\">\n      <div class=\"line\">\n        <ion-img  [src]=\"information.icon\" style=\"margin-right: 5px;\"></ion-img><br>\n        <ion-card-subtitle [ngStyle]=\"{color: information.color}\">{{information.subtitle}}</ion-card-subtitle>\n      </div>\n      <div class=\"line\">\n        <ion-card-subtitle *ngIf='this.isHour'>{{information.hour}}</ion-card-subtitle>\n        <ion-icon name=\"chevron-forward-outline\" style=\"margin-left: 5px;\"></ion-icon>\n      </div>\n    </ion-card-header>\n  \n    <ion-card-content>\n      <ion-slides #slider pager=\"true\" [options]=\"sliderConfig\" class=\"slides\" (ionSlideDidChange)='slideChange()'>\n        <ion-slide *ngFor=\"let slide of this.information.content\" class=\"block\">\n         <ion-progress-bar *ngIf='slide.porcentage as Number' [value]=\"slide.porcentage\"></ion-progress-bar>\n          <h2>{{slide.description}}</h2>\n        </ion-slide>\n        \n      </ion-slides>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n\n";
      /***/
    },

    /***/
    "S72r":
    /*!***********************************************************!*\
      !*** ./src/app/shared/classes/query-string-parameters.ts ***!
      \***********************************************************/

    /*! exports provided: QueryStringParameters */

    /***/
    function S72r(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "QueryStringParameters", function () {
        return QueryStringParameters;
      });

      var QueryStringParameters = /*#__PURE__*/function () {
        function QueryStringParameters() {
          var _this11 = this;

          _classCallCheck(this, QueryStringParameters);

          this.toString = function () {
            return _this11.paramsAndValues.join('&');
          };

          this.paramsAndValues = [];
        }

        _createClass(QueryStringParameters, [{
          key: "push",
          value: function push(key, value) {
            value = encodeURIComponent(value.toString());
            this.paramsAndValues.push([key, value].join('='));
          }
        }]);

        return QueryStringParameters;
      }();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./app.component.html */
      "VzVu");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _services_firebase_auth_firebase_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./services/firebase/auth/firebase-auth.service */
      "ejKP");
      /* harmony import */


      var _services_language_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./services/language.service */
      "kyOO");
      /* harmony import */


      var _utils_history_helper_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./utils/history-helper.service */
      "1oPy");
      /* harmony import */


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./services/authentication.service */
      "ej43");
      /* harmony import */


      var _services_storage_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./services/storage.service */
      "n90K");
      /* harmony import */


      var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ionic-native/network/ngx */
      "kwrG");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs */
      "qCKp");

      var PushNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].PushNotifications;
      var BiometricAuth = _capacitor_core__WEBPACK_IMPORTED_MODULE_4__["Plugins"].BiometricAuth;

      var AppComponent = /*#__PURE__*/function () {
        // Inject HistoryHelperService in the app.components.ts so its available app-wide
        function AppComponent(router, menu, translate, historyHelper, firebaseService, authService, languageService, alertController, platform, storageService, modalCtrl, navCtrl, network) {
          _classCallCheck(this, AppComponent);

          this.router = router;
          this.menu = menu;
          this.translate = translate;
          this.historyHelper = historyHelper;
          this.firebaseService = firebaseService;
          this.authService = authService;
          this.languageService = languageService;
          this.alertController = alertController;
          this.platform = platform;
          this.storageService = storageService;
          this.modalCtrl = modalCtrl;
          this.navCtrl = navCtrl;
          this.network = network;
          this.selectedIndex = 0;
          this.appPages = [{
            title: 'home.emergency',
            url: '/app/home/emergency',
            image: '../../assets/icons/i_em_trobo_malament.svg'
          }, {
            title: 'home.assistencia',
            url: 'app/home/healthcare',
            image: '../../assets/icons/i_assistencia_medica.svg'
          }, {
            title: 'home.salut',
            url: 'app/home/',
            image: '../../assets/icons/i_la_meva_salut.svg'
          }, {
            title: 'home.tramits',
            url: 'app/home/',
            image: '../../assets/icons/i_tramits_i_gestions.svg'
          }, {
            title: 'side-menu.contact',
            url: 'app/home/',
            image: '../../assets/icons/i_contactar.svg'
          }, {
            title: 'side-menu.settings',
            url: 'app/home/',
            image: '../../assets/icons/i_configuracio.svg'
          }];
          this.previousUrl = null;
          this.currentUrl = null;
          this.textDir = 'ltr';
          this.available_languages = [];
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this12 = this;

            this.setLanguage();
            this.translate.onLangChange.subscribe(function () {
              return _this12.getTranslations();
            });
            this.storageService.isFirstTimeLoad();
            this.platform.ready().then(function () {
              // Request permission to use push notifications
              // iOS will prompt user and return if they granted permission or not
              // Android will just grant without prompting
              if (!_this12.platform.is('mobileweb') && !_this12.platform.is('desktop')) {
                PushNotifications.requestPermission().then(function (result) {
                  if (result.granted) {
                    // Register with Apple / Google to receive push via APNS/FCM
                    PushNotifications.register();
                  } else {// Show some error
                  }
                }); // On success, we should be able to receive notifications

                PushNotifications.addListener('registration', function (token) {
                  var platform = 'ios';

                  if (_this12.platform.is('android')) {
                    platform = 'android';
                  }

                  _this12.authService.devicePlatform = platform;
                  _this12.authService.deviceToken = token.value;
                }); // Some issue with our setup and push will not work

                PushNotifications.addListener('registrationError', function (error) {
                  alert('Error on registration: ' + JSON.stringify(error));
                }); // Show us the notification payload if the app is open on our device

                PushNotifications.addListener('pushNotificationReceived', function (notification) {}); // Method called when tapping on a notification

                PushNotifications.addListener('pushNotificationActionPerformed', function (notification) {
                  var action = notification.notification.data.data.action;
                  var id = notification.notification.data.data.id;

                  _this12.router.navigate(['/app/home/wellbeing/metgetutor/messageslist/messagedetail', {
                    'id': id
                  }]);
                }); // Lock phone after 2 minutes in pause

                _this12.lastResume = new Date();

                _this12.platform.pause.subscribe(function (e) {
                  // Saves the time of pause to be used in resume
                  _this12.lastResume = new Date();
                });

                _this12.platform.resume.subscribe(function (e) {
                  return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this12, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var secondsPassed;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (this.router.url.includes('app')) {
                              // App will lock after 2 minutes
                              secondsPassed = (new Date().getTime() - this.lastResume.getTime()) / 1000;

                              if (secondsPassed >= 120) {// Must implement lock-screen
                              }
                            }

                          case 1:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));
                }); // To avoid going back with device's back button from home or after creating an appointment, 


                _this12.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (event) {
                  return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"];
                })).subscribe(function (event) {
                  _this12.previousUrl = _this12.currentUrl;
                  _this12.currentUrl = event.url;
                });

                _this12.platform.backButton.subscribeWithPriority(9999, function (processNextHandler) {
                  if (_this12.currentUrl.includes('/login')) {
                    _this12.router.navigateByUrl('/landing');
                  }
                }); // check internet status on mobile


                _this12.listenConnection();
              }
            });
          }
        }, {
          key: "listenConnection",
          value: function listenConnection() {
            this.network.onDisconnect().subscribe(function () {
              console.log('* onDisconnect');
              Object(rxjs__WEBPACK_IMPORTED_MODULE_14__["throwError"])({
                status: 0,
                message: 'ERR_INTERNET_DISCONNECTED'
              });
            });
          }
        }, {
          key: "setLanguage",
          value: function setLanguage() {
            // this language will be used as a fallback when a translation isn't found in the current language
            this.translate.setDefaultLang('ca'); // the lang to use, if the lang isn't available, it will use the current loader to get them

            var userLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : this.languageService.getCurrent();
            this.languageService.changeLanguage(userLanguage); // this is to determine the text direction depending on the selected language
            // for the purpose of this example we determine that only arabic and hebrew are RTL.
            // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
            // });
          }
        }, {
          key: "getTranslations",
          value: function getTranslations() {
            var _this13 = this;

            // get translations for this page to use in the Language Chooser Alert
            this.translate.getTranslation(this.languageService.getCurrent()).subscribe(function (translations) {
              _this13.translations = translations;
            });
          }
        }, {
          key: "openLanguageChooser",
          value: function openLanguageChooser() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this14 = this;

              var alert;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      this.available_languages = this.languageService.getLanguages().map(function (item) {
                        return {
                          name: item.name,
                          type: 'radio',
                          label: item.name,
                          value: item.code,
                          checked: item.code === _this14.languageService.getCurrent()
                        };
                      });
                      _context3.next = 3;
                      return this.alertController.create({
                        header: this.translations.language.select_language,
                        inputs: this.available_languages,
                        cssClass: 'language-alert',
                        buttons: [{
                          text: this.translations.language.cancel,
                          role: 'cancel',
                          cssClass: 'secondary',
                          handler: function handler() {}
                        }, {
                          text: this.translations.language.ok,
                          handler: function handler(lang) {
                            if (lang) {
                              console.log("selected language: ", lang);

                              _this14.languageService.changeLanguage(lang);
                            }
                          }
                        }]
                      });

                    case 3:
                      alert = _context3.sent;
                      _context3.next = 6;
                      return alert.present();

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["MenuController"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateService"]
        }, {
          type: _utils_history_helper_service__WEBPACK_IMPORTED_MODULE_10__["HistoryHelperService"]
        }, {
          type: _services_firebase_auth_firebase_auth_service__WEBPACK_IMPORTED_MODULE_8__["FirebaseAuthService"]
        }, {
          type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_11__["AuthenticationService"]
        }, {
          type: _services_language_service__WEBPACK_IMPORTED_MODULE_9__["LanguageService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["AlertController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["Platform"]
        }, {
          type: _services_storage_service__WEBPACK_IMPORTED_MODULE_12__["StorageService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["ModalController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["NavController"]
        }, {
          type: _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_13__["Network"]
        }];
      };

      AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"]
      })], AppComponent);
      /***/
    },

    /***/
    "TyAs":
    /*!******************************************************************!*\
      !*** ./src/app/utils/shell/text-shell/text-shell.component.scss ***!
      \******************************************************************/

    /*! exports provided: default */

    /***/
    function TyAs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ":host {\n  --text-shell-background: transparent;\n  --text-shell-line-color: #EEE;\n  --text-shell-line-height: 16px;\n  --text-shell-line-gutter: 3px;\n  display: block;\n  position: relative;\n  color: transparent;\n  background-color: var(--text-shell-background);\n  transform-style: preserve-3d;\n  background-clip: content-box;\n}\n\n:host(:not([animation])) {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 89% , var(--text-shell-background, #FFF) 89%);\n  background-position: 0 0px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n:host(:not([animation]))[lines=\"1\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 93% , var(--text-shell-background, #FFF) 93%);\n  background-position: 0 0px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n:host(:not([animation]))[lines=\"2\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 90% , var(--text-shell-background, #FFF) 90%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 49% , var(--text-shell-background, #FFF) 49%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n}\n\n:host(:not([animation]))[lines=\"3\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 60% , var(--text-shell-background, #FFF) 60%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 36% , var(--text-shell-background, #FFF) 36%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n}\n\n:host(:not([animation]))[lines=\"4\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 95% , var(--text-shell-background, #FFF) 95%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 67% , var(--text-shell-background, #FFF) 67%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 67% , var(--text-shell-background, #FFF) 67%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 32% , var(--text-shell-background, #FFF) 32%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n}\n\n:host(:not([animation]))[lines=\"5\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 93% , var(--text-shell-background, #FFF) 93%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 75% , var(--text-shell-background, #FFF) 75%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 70% , var(--text-shell-background, #FFF) 70%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 76% , var(--text-shell-background, #FFF) 76%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 42% , var(--text-shell-background, #FFF) 42%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n}\n\n:host(:not([animation]))[lines=\"6\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 91% , var(--text-shell-background, #FFF) 91%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 78% , var(--text-shell-background, #FFF) 78%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 64% , var(--text-shell-background, #FFF) 64%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 64% , var(--text-shell-background, #FFF) 64%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 68% , var(--text-shell-background, #FFF) 68%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 38% , var(--text-shell-background, #FFF) 38%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n}\n\n:host(:not([animation])).text-loaded {\n  background: none;\n  min-height: inherit;\n  color: inherit;\n}\n\n:host([animation=bouncing]) {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 91% , var(--text-shell-background, #FFF) 91%);\n  background-position: 0 0px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n  -webkit-animation-name: animateLine;\n          animation-name: animateLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@-webkit-keyframes animateLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px);\n  }\n}\n\n@keyframes animateLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing])[lines=\"1\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 87% , var(--text-shell-background, #FFF) 87%);\n  background-position: 0 0px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  -webkit-animation-direction: alternate;\n          animation-direction: alternate;\n  -webkit-animation-name: animateLine;\n          animation-name: animateLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing])[lines=\"2\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 36% , var(--text-shell-background, #FFF) 36%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@-webkit-keyframes animateMultiLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing])[lines=\"3\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 86% , var(--text-shell-background, #FFF) 86%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 62% , var(--text-shell-background, #FFF) 62%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 49% , var(--text-shell-background, #FFF) 49%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing])[lines=\"4\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 67% , var(--text-shell-background, #FFF) 67%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 72% , var(--text-shell-background, #FFF) 72%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 34% , var(--text-shell-background, #FFF) 34%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing])[lines=\"5\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 94% , var(--text-shell-background, #FFF) 94%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 65% , var(--text-shell-background, #FFF) 65%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 66% , var(--text-shell-background, #FFF) 66%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 62% , var(--text-shell-background, #FFF) 62%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 36% , var(--text-shell-background, #FFF) 36%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing])[lines=\"6\"] {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 88% , var(--text-shell-background, #FFF) 88%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 72% , var(--text-shell-background, #FFF) 72%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 69% , var(--text-shell-background, #FFF) 69%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 63% , var(--text-shell-background, #FFF) 63%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 75% , var(--text-shell-background, #FFF) 75%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 41% , var(--text-shell-background, #FFF) 41%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  animation-direction: alternate-reverse;\n  -webkit-animation-name: animateMultiLine;\n          animation-name: animateMultiLine;\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-timing-function: ease-in-out;\n          animation-timing-function: ease-in-out;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n}\n\n@keyframes animateMultiLine {\n  0% {\n    background-size: 85% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  75% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  55% var(--text-shell-line-height, 16px);\n  }\n  100% {\n    background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  }\n}\n\n:host([animation=bouncing]).text-loaded {\n  background: none;\n  min-height: inherit;\n  color: inherit;\n  -webkit-animation: 0;\n          animation: 0;\n}\n\n:host([animation=gradient]) {\n  --text-shell-background: #FFF;\n  --text-shell-line-color: transparent !important;\n  --text-shell-animation-background: #EEE;\n  --text-shell-animation-color: #DDD;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n:host([animation=gradient])::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: linear-gradient(to right, var(--text-shell-animation-background) 8%, var(--text-shell-animation-color) 18%, var(--text-shell-animation-background) 33%);\n  background-size: 800px 104px;\n  -webkit-animation: animateBackground 2s ease-in-out infinite;\n          animation: animateBackground 2s ease-in-out infinite;\n}\n\n@-webkit-keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n\n@keyframes animateBackground {\n  0% {\n    background-position: -468px 0;\n  }\n  100% {\n    background-position: 468px 0;\n  }\n}\n\n:host([animation=gradient])::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 94% , var(--text-shell-background, #FFF) 94%);\n  background-position: 0 0px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n:host([animation=gradient])[lines=\"1\"] {\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n:host([animation=gradient])[lines=\"1\"]::after {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 85% , var(--text-shell-background, #FFF) 85%);\n  background-position: 0 0px;\n  background-size: 100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 1) + (var(--text-shell-line-gutter, 3px) * (1 - 1)));\n}\n\n:host([animation=gradient])[lines=\"2\"] {\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n}\n\n:host([animation=gradient])[lines=\"2\"]::after {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 90% , var(--text-shell-background, #FFF) 90%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 43% , var(--text-shell-background, #FFF) 43%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 2) + (var(--text-shell-line-gutter, 3px) * (2 - 1)));\n}\n\n:host([animation=gradient])[lines=\"3\"] {\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n}\n\n:host([animation=gradient])[lines=\"3\"]::after {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 94% , var(--text-shell-background, #FFF) 94%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 74% , var(--text-shell-background, #FFF) 74%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 32% , var(--text-shell-background, #FFF) 32%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 3) + (var(--text-shell-line-gutter, 3px) * (3 - 1)));\n}\n\n:host([animation=gradient])[lines=\"4\"] {\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n}\n\n:host([animation=gradient])[lines=\"4\"]::after {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 89% , var(--text-shell-background, #FFF) 89%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 61% , var(--text-shell-background, #FFF) 61%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 68% , var(--text-shell-background, #FFF) 68%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 41% , var(--text-shell-background, #FFF) 41%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 4) + (var(--text-shell-line-gutter, 3px) * (4 - 1)));\n}\n\n:host([animation=gradient])[lines=\"5\"] {\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n}\n\n:host([animation=gradient])[lines=\"5\"]::after {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 89% , var(--text-shell-background, #FFF) 89%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 60% , var(--text-shell-background, #FFF) 60%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 67% , var(--text-shell-background, #FFF) 67%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 67% , var(--text-shell-background, #FFF) 67%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 33% , var(--text-shell-background, #FFF) 33%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 5) + (var(--text-shell-line-gutter, 3px) * (5 - 1)));\n}\n\n:host([animation=gradient])[lines=\"6\"] {\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n}\n\n:host([animation=gradient])[lines=\"6\"]::after {\n  background-image: linear-gradient(to right, var(--text-shell-line-color, #CCC) 91% , var(--text-shell-background, #FFF) 91%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 61% , var(--text-shell-background, #FFF) 61%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 69% , var(--text-shell-background, #FFF) 69%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 65% , var(--text-shell-background, #FFF) 65%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 73% , var(--text-shell-background, #FFF) 73%),  linear-gradient(to right, var(--text-shell-background, #FFF) 100%, var(--text-shell-background, #FFF) 100%),  linear-gradient(to right, var(--text-shell-line-color, #CCC) 40% , var(--text-shell-background, #FFF) 40%);\n  background-position: 0 0px,  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (2 - 1)) + (var(--text-shell-line-gutter, 3px) * (2 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (3 - 1)) + (var(--text-shell-line-gutter, 3px) * (3 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (4 - 1)) + (var(--text-shell-line-gutter, 3px) * (4 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (5 - 1)) + (var(--text-shell-line-gutter, 3px) * (5 - 1))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 2))),  0 calc((var(--text-shell-line-height, 16px) * (6 - 1)) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n  background-size: 100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px),  100% var(--text-shell-line-gutter, 3px),  100% var(--text-shell-line-height, 16px);\n  background-repeat: no-repeat;\n  min-height: calc((var(--text-shell-line-height, 16px) * 6) + (var(--text-shell-line-gutter, 3px) * (6 - 1)));\n}\n\n:host([animation=gradient]).text-loaded {\n  background: none;\n  min-height: inherit;\n  color: inherit;\n}\n\n:host([animation=gradient]).text-loaded::before, :host([animation=gradient]).text-loaded::after {\n  background: none;\n  -webkit-animation: 0;\n          animation: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RleHQtc2hlbGwuY29tcG9uZW50LnNjc3MiLCIuLi8uLi8uLi8uLi8uLi9taXhpbnMvbWFza2VkLWxpbmVzLWJhY2tncm91bmQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uL21peGlucy9iYWNrZ3JvdW5kLWhlaWdodC5zY3NzIiwiLi4vLi4vLi4vLi4vLi4vbWl4aW5zL2JvdW5jaW5nLWxpbmVzLWJhY2tncm91bmQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtFQUNFLG9DQUFBO0VBQ0EsNkJBQUE7RUFDQSw4QkFBQTtFQUNBLDZCQUFBO0VBRUEsY0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4Q0FBQTtFQUNBLDRCQUFBO0VBR0EsNEJBQUE7QUFSRjs7QUFZQTtFQ1BJLDRIQUFBO0VBQ0EsMEJBQUE7RUFDQSx5REFBQTtFQUNBLDRCQUFBO0VDZkYsNEdBQUE7QUZlRjs7QUFVSTtFQ2JBLDRIQUFBO0VBQ0EsMEJBQUE7RUFDQSx5REFBQTtFQUNBLDRCQUFBO0VDZkYsNEdBQUE7QUZzQkY7O0FBR0k7RUNnQkEsdVZBQUE7RUFDQSxnUEFBQTtFQUNBLDhJQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsNEdBQUE7QUY2QkY7O0FBSkk7RUNnQkEsa2pCQUFBO0VBQ0Esc2NBQUE7RUFDQSxtT0FBQTtFQUNBLDRCQUFBO0VDNUNGLDRHQUFBO0FGb0NGOztBQVhJO0VDZ0JBLDZ3QkFBQTtFQUNBLDRwQkFBQTtFQUNBLHdUQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsNEdBQUE7QUYyQ0Y7O0FBbEJJO0VDZ0JBLHcrQkFBQTtFQUNBLGszQkFBQTtFQUNBLDZZQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsNEdBQUE7QUZrREY7O0FBekJJO0VDZ0JBLG1zQ0FBQTtFQUNBLHdrQ0FBQTtFQUNBLGtlQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsNEdBQUE7QUZ5REY7O0FBM0JFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUE2Qko7O0FBeEJBO0VHekJJLDRIQUFBO0VBQ0EsMEJBQUE7RUFDQSx5REFBQTtFQUNBLDRCQUFBO0VBRUEsc0NBQUE7VUFBQSw4QkFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RURuQkYsNEdBQUE7RUNtRkEscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtBSFZGOztBR3ZESTtFQUNFO0lBQ0Usd0RBQUE7RUh5RE47RUd0REk7SUFDRSx5REFBQTtFSHdETjtBQUNGOztBRy9ESTtFQUNFO0lBQ0Usd0RBQUE7RUh5RE47RUd0REk7SUFDRSx5REFBQTtFSHdETjtBQUNGOztBQXhDSTtFRy9CQSw0SEFBQTtFQUNBLDBCQUFBO0VBQ0EseURBQUE7RUFDQSw0QkFBQTtFQUVBLHNDQUFBO1VBQUEsOEJBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0VEbkJGLDRHQUFBO0VDbUZBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUhXRjs7QUc1RUk7RUFDRTtJQUNFLHdEQUFBO0VIOEVOO0VHM0VJO0lBQ0UseURBQUE7RUg2RU47QUFDRjs7QUE3REk7RUdrQkEsdVZBQUE7RUFDQSxnUEFBQTtFQUNBLDhJQUFBO0VBQ0EsNEJBQUE7RUFFQSxzQ0FBQTtFQUNBLHdDQUFBO1VBQUEsZ0NBQUE7RURwRUYsNEdBQUE7RUNtRkEscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtBSGdDRjs7QUdoREk7RUFDRTtJQUNFLDRJQUFBO0VIa0ROO0VHL0NJO0lBQ0UsOElBQUE7RUhpRE47QUFDRjs7QUd4REk7RUFDRTtJQUNFLDRJQUFBO0VIa0ROO0VHL0NJO0lBQ0UsOElBQUE7RUhpRE47QUFDRjs7QUFsRkk7RUdrQkEsa2pCQUFBO0VBQ0Esc2NBQUE7RUFDQSxtT0FBQTtFQUNBLDRCQUFBO0VBRUEsc0NBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0VEcEVGLDRHQUFBO0VDbUZBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUhxREY7O0FHckVJO0VBQ0U7SUFDRSxnT0FBQTtFSHVFTjtFR3BFSTtJQUNFLG1PQUFBO0VIc0VOO0FBQ0Y7O0FBdkdJO0VHa0JBLDZ3QkFBQTtFQUNBLDRwQkFBQTtFQUNBLHdUQUFBO0VBQ0EsNEJBQUE7RUFFQSxzQ0FBQTtFQUNBLHdDQUFBO1VBQUEsZ0NBQUE7RURwRUYsNEdBQUE7RUNtRkEscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7RUFDQSw4Q0FBQTtVQUFBLHNDQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtBSDBFRjs7QUcxRkk7RUFDRTtJQUNFLG9UQUFBO0VINEZOO0VHekZJO0lBQ0Usd1RBQUE7RUgyRk47QUFDRjs7QUE1SEk7RUdrQkEsdytCQUFBO0VBQ0EsazNCQUFBO0VBQ0EsNllBQUE7RUFDQSw0QkFBQTtFQUVBLHNDQUFBO0VBQ0Esd0NBQUE7VUFBQSxnQ0FBQTtFRHBFRiw0R0FBQTtFQ21GQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0EsMkNBQUE7VUFBQSxtQ0FBQTtFQUNBLDhDQUFBO1VBQUEsc0NBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0FIK0ZGOztBRy9HSTtFQUNFO0lBQ0Usd1lBQUE7RUhpSE47RUc5R0k7SUFDRSw2WUFBQTtFSGdITjtBQUNGOztBQWpKSTtFR2tCQSxtc0NBQUE7RUFDQSx3a0NBQUE7RUFDQSxrZUFBQTtFQUNBLDRCQUFBO0VBRUEsc0NBQUE7RUFDQSx3Q0FBQTtVQUFBLGdDQUFBO0VEcEVGLDRHQUFBO0VDbUZBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQ0FBQTtVQUFBLG1DQUFBO0VBQ0EsOENBQUE7VUFBQSxzQ0FBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUhvSEY7O0FHcElJO0VBQ0U7SUFDRSw0ZEFBQTtFSHNJTjtFR25JSTtJQUNFLGtlQUFBO0VIcUlOO0FBQ0Y7O0FBaktFO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFFQSxvQkFBQTtVQUFBLFlBQUE7QUFrS0o7O0FBN0pBO0VBQ0UsNkJBQUE7RUFDQSwrQ0FBQTtFQUNBLHVDQUFBO0VBQ0Esa0NBQUE7RUUvREEsNEdBQUE7QUZnT0Y7O0FBMUpFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLG1LQUNFO0VBQ0YsNEJBQUE7RUFDQSw0REFBQTtVQUFBLG9EQUFBO0FBMkpKOztBQXhKRTtFQUNFO0lBQ0UsNkJBQUE7RUEwSko7RUF2SkU7SUFDRSw0QkFBQTtFQXlKSjtBQUNGOztBQWhLRTtFQUNFO0lBQ0UsNkJBQUE7RUEwSko7RUF2SkU7SUFDRSw0QkFBQTtFQXlKSjtBQUNGOztBQXJKRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFFBQUE7RUN4RkEsNEhBQUE7RUFDQSwwQkFBQTtFQUNBLHlEQUFBO0VBQ0EsNEJBQUE7RUNmRiw0R0FBQTtBRmdRRjs7QUFwSkk7RUU1R0YsNEdBQUE7QUZtUUY7O0FBbkpNO0VDcEdGLDRIQUFBO0VBQ0EsMEJBQUE7RUFDQSx5REFBQTtFQUNBLDRCQUFBO0VDZkYsNEdBQUE7QUYwUUY7O0FBOUpJO0VFNUdGLDRHQUFBO0FGNlFGOztBQTdKTTtFQ3ZFRix1VkFBQTtFQUNBLGdQQUFBO0VBQ0EsOElBQUE7RUFDQSw0QkFBQTtFQzVDRiw0R0FBQTtBRm9SRjs7QUF4S0k7RUU1R0YsNEdBQUE7QUZ1UkY7O0FBdktNO0VDdkVGLGtqQkFBQTtFQUNBLHNjQUFBO0VBQ0EsbU9BQUE7RUFDQSw0QkFBQTtFQzVDRiw0R0FBQTtBRjhSRjs7QUFsTEk7RUU1R0YsNEdBQUE7QUZpU0Y7O0FBakxNO0VDdkVGLDZ3QkFBQTtFQUNBLDRwQkFBQTtFQUNBLHdUQUFBO0VBQ0EsNEJBQUE7RUM1Q0YsNEdBQUE7QUZ3U0Y7O0FBNUxJO0VFNUdGLDRHQUFBO0FGMlNGOztBQTNMTTtFQ3ZFRix3K0JBQUE7RUFDQSxrM0JBQUE7RUFDQSw2WUFBQTtFQUNBLDRCQUFBO0VDNUNGLDRHQUFBO0FGa1RGOztBQXRNSTtFRTVHRiw0R0FBQTtBRnFURjs7QUFyTU07RUN2RUYsbXNDQUFBO0VBQ0Esd2tDQUFBO0VBQ0Esa2VBQUE7RUFDQSw0QkFBQTtFQzVDRiw0R0FBQTtBRjRURjs7QUF0TUU7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQXdNSjs7QUF0TUk7RUFFRSxnQkFBQTtFQUNBLG9CQUFBO1VBQUEsWUFBQTtBQXVNTiIsImZpbGUiOiJ0ZXh0LXNoZWxsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4vbWl4aW5zL2JhY2tncm91bmQtaGVpZ2h0XCI7XG5AaW1wb3J0IFwiLi9taXhpbnMvbWFza2VkLWxpbmVzLWJhY2tncm91bmRcIjtcbkBpbXBvcnQgXCIuL21peGlucy9ib3VuY2luZy1saW5lcy1iYWNrZ3JvdW5kXCI7XG5cbiRtYXgtbGluZXMtY291bnQ6IDY7XG5cbjpob3N0IHtcbiAgLS10ZXh0LXNoZWxsLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLXRleHQtc2hlbGwtbGluZS1jb2xvcjogI0VFRTtcbiAgLS10ZXh0LXNoZWxsLWxpbmUtaGVpZ2h0OiAxNnB4O1xuICAtLXRleHQtc2hlbGwtbGluZS1ndXR0ZXI6IDNweDtcblxuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBjb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRleHQtc2hlbGwtYmFja2dyb3VuZCk7XG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XG4gIC8vIFRvIGZpeCAxcHggbGluZSBtaXNhbGlnbm1lbnQgaW4gY2hyb21lOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvYmFja2dyb3VuZC1jbGlwXG4gIC8vIChJIGFsc28gbm90aWNlZCB0aGF0IGlmIEkgc2V0IHRoZSBjb2xvciB0byBhIHNvbGlkIGNvbG9yIGluc3RlYWQgb2YgaGF2aW5nIG9wYWNpdHksIHRoZSBpc3N1ZSBkb2Vzbid0IGhhcHBlbilcbiAgYmFja2dyb3VuZC1jbGlwOiBjb250ZW50LWJveDtcbn1cblxuLy8gRGVmYXVsdCBzdHlsZXMuIFdoZW4gbm8gYW5pbWF0aW9uIGF0dHJpYnV0ZSBpcyBwcm92aWRlZFxuOmhvc3QoOm5vdChbYW5pbWF0aW9uXSkpIHtcbiAgLy8gRGVmYXVsdCBvbmUgbGluZSB0ZXh0LXNoZWxsXG4gIEBpbmNsdWRlIG1hc2tlZC1saW5lcy1iYWNrZ3JvdW5kKDEpO1xuXG4gIC8vIFN1cHBvcnQgZm9yIFtsaW5lc10gYXR0cmlidXRlXG4gIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggJG1heC1saW5lcy1jb3VudCB7XG4gICAgJltsaW5lcz1cIiN7ICRpIH1cIl0ge1xuICAgICAgQGluY2x1ZGUgbWFza2VkLWxpbmVzLWJhY2tncm91bmQoJGkpO1xuICAgIH1cbiAgfVxuXG4gICYudGV4dC1sb2FkZWQge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgbWluLWhlaWdodDogaW5oZXJpdDtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgfVxufVxuXG4vLyBCb3VuY2luZyBsaW5lIGxvYWRpbmcgYW5pbWF0aW9uXG46aG9zdChbYW5pbWF0aW9uPVwiYm91bmNpbmdcIl0pIHtcbiAgLy8gRGVmYXVsdCBvbmUgbGluZSB0ZXh0LXNoZWxsXG4gIEBpbmNsdWRlIGJvdW5jaW5nLWxpbmVzLWJhY2tncm91bmQoMSk7XG5cbiAgLy8gU3VwcG9ydCBmb3IgW2xpbmVzXSBhdHRyaWJ1dGVcbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4LWxpbmVzLWNvdW50IHtcbiAgICAmW2xpbmVzPVwiI3sgJGkgfVwiXSB7XG4gICAgICBAaW5jbHVkZSBib3VuY2luZy1saW5lcy1iYWNrZ3JvdW5kKCRpKTtcbiAgICB9XG4gIH1cblxuICAmLnRleHQtbG9hZGVkIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgLy8gMCBpcyB0aGUgZGVmYXVsdCB2YWx1ZSAoc2VlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTU5NjMwNDQvMTExNjk1OSlcbiAgICBhbmltYXRpb246IDA7XG4gIH1cbn1cblxuLy8gQmFja2dyb3VuZCBncmFkaWVudCBiZW5lYXRoIG1hc2tlZCBsaW5lc1xuOmhvc3QoW2FuaW1hdGlvbj1cImdyYWRpZW50XCJdKSB7XG4gIC0tdGV4dC1zaGVsbC1iYWNrZ3JvdW5kOiAjRkZGO1xuICAtLXRleHQtc2hlbGwtbGluZS1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgLS10ZXh0LXNoZWxsLWFuaW1hdGlvbi1iYWNrZ3JvdW5kOiAjRUVFO1xuICAtLXRleHQtc2hlbGwtYW5pbWF0aW9uLWNvbG9yOiAjREREO1xuXG5cbiAgLy8gQ2FsY3VsYXRlIGRlZmF1bHQgaGVpZ2h0IGZvciAxIGxpbmVcbiAgQGluY2x1ZGUgYmFja2dyb3VuZC1oZWlnaHQobWluLWhlaWdodCwgMSk7XG5cbiAgLy8gVGhlIGFuaW1hdGlvbiB0aGF0IGdvZXMgYmVuZWF0aCB0aGUgbWFza3NcbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYmFja2dyb3VuZDpcbiAgICAgIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgdmFyKC0tdGV4dC1zaGVsbC1hbmltYXRpb24tYmFja2dyb3VuZCkgOCUsIHZhcigtLXRleHQtc2hlbGwtYW5pbWF0aW9uLWNvbG9yKSAxOCUsIHZhcigtLXRleHQtc2hlbGwtYW5pbWF0aW9uLWJhY2tncm91bmQpIDMzJSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiA4MDBweCAxMDRweDtcbiAgICBhbmltYXRpb246IGFuaW1hdGVCYWNrZ3JvdW5kIDJzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xuICB9XG5cbiAgQGtleWZyYW1lcyBhbmltYXRlQmFja2dyb3VuZCB7XG4gICAgMCV7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtNDY4cHggMFxuICAgIH1cblxuICAgIDEwMCV7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0NjhweCAwXG4gICAgfVxuICB9XG5cbiAgLy8gVGhlIG1hc2tzXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG5cbiAgICAvLyBEZWZhdWx0IG9uZSBsaW5lIHRleHQtc2hlbGxcbiAgICBAaW5jbHVkZSBtYXNrZWQtbGluZXMtYmFja2dyb3VuZCgxKTtcbiAgfVxuXG4gIC8vIFN1cHBvcnQgZm9yIFtsaW5lc10gYXR0cmlidXRlXG4gIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggJG1heC1saW5lcy1jb3VudCB7XG4gICAgJltsaW5lcz1cIiN7ICRpIH1cIl0ge1xuICAgICAgLy8gQ2FsY3VsYXRlIGRlZmF1bHQgaGVpZ2h0IGZvciAkaSBsaW5lc1xuICAgICAgQGluY2x1ZGUgYmFja2dyb3VuZC1oZWlnaHQobWluLWhlaWdodCwgJGkpO1xuXG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIEBpbmNsdWRlIG1hc2tlZC1saW5lcy1iYWNrZ3JvdW5kKCRpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLnRleHQtbG9hZGVkIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIG1pbi1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgY29sb3I6IGluaGVyaXQ7XG5cbiAgICAmOjpiZWZvcmUsXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgIGFuaW1hdGlvbjogMDtcbiAgICB9XG4gIH1cbn1cbiIsIkBpbXBvcnQgXCIuL3V0aWxzXCI7XG5AaW1wb3J0IFwiLi9iYWNrZ3JvdW5kLWhlaWdodFwiO1xuXG5AbWl4aW4gbWFza2VkLWxpbmVzLWJhY2tncm91bmQoJGxpbmVzOiAxKSB7XG4gICRsaW5lLWhlaWdodDogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWhlaWdodCwgMTZweCk7XG4gICRsaW5lLXNwYWNpbmc6IHZhcigtLXRleHQtc2hlbGwtbGluZS1ndXR0ZXIsIDNweCk7XG4gICRiZy1jb2xvcjogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWNvbG9yLCAjQ0NDKTtcbiAgJG1hc2stY29sb3I6IHZhcigtLXRleHQtc2hlbGwtYmFja2dyb3VuZCwgI0ZGRik7XG4gICRsaW5lLWJnLWNvbG9yOiB2YXIoLS10ZXh0LXNoZWxsLWJhY2tncm91bmQsICNGRkYpO1xuICAkYmcteS1wb3M6IDBweDtcbiAgJHJhbmQtd2lkdGg6ICN7cmFuZG9tTnVtKDg1LCA5NSl9O1xuICAkYmctaW1hZ2U6ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICcgKyAkYmctY29sb3IgKyAnICcgKyAkcmFuZC13aWR0aCArICclICwgJyArICRtYXNrLWNvbG9yICsgJyAnICsgJHJhbmQtd2lkdGggKyAnJSknO1xuICAkYmctcG9zaXRpb246ICcwICcgKyAkYmcteS1wb3M7XG4gICRiZy1zaXplOiAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0O1xuXG4gIEBpZiAoJGxpbmVzID09IDEpIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAjeyRiZy1pbWFnZX07XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogI3skYmctcG9zaXRpb259O1xuICAgIGJhY2tncm91bmQtc2l6ZTogI3skYmctc2l6ZX07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgfSBAZWxzZSB7XG4gICAgQGZvciAkaSBmcm9tIDIgdGhyb3VnaCAkbGluZXMge1xuICAgICAgLy8gQWRkIHNlcGFyYXRvciBiZXR3ZWVuIGxpbmVzXG4gICAgICAkYmctaW1hZ2U6IGFwcGVuZCgkYmctaW1hZ2UsIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI3skbGluZS1iZy1jb2xvcn0gMTAwJSwgI3skbGluZS1iZy1jb2xvcn0gMTAwJSkpO1xuICAgICAgLy8gVGhpcyBsaW5lYXItZ3JhZGllbnQgYXMgc2VwYXJhdG9yIHN0YXJ0cyBiZWxvdyB0aGUgbGFzdCBsaW5lLFxuICAgICAgLy8gc28gd2UgaGF2ZSB0byBhZGQgJGxpbmUtaGVpZ2h0IHRvIG91ciB5LXBvcyBwb2ludGVyXG4gICAgICAkYmcteS1wb3M6IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICgjeyRpfSAtIDEpKSArICgjeyRsaW5lLXNwYWNpbmd9ICogKCN7JGl9IC0gMikpKTtcbiAgICAgICRiZy1wb3NpdGlvbjogYXBwZW5kKCRiZy1wb3NpdGlvbiwgJzAgJyArICRiZy15LXBvcyk7XG4gICAgICAkYmctc2l6ZTogYXBwZW5kKCRiZy1zaXplLCAnMTAwJSAnICsgJGxpbmUtc3BhY2luZyk7XG5cbiAgICAgIC8vIEFkZCBuZXcgbGluZVxuICAgICAgLy8gVGhlIGxhc3QgbGluZSBzaG91bGQgYmUgbmFycm93IHRoYW4gdGhlIG90aGVyc1xuICAgICAgQGlmICgkaSA9PSAkbGluZXMpIHtcbiAgICAgICAgJHJhbmQtd2lkdGg6ICN7cmFuZG9tTnVtKDMwLCA1MCl9O1xuICAgICAgfSBAZWxzZSB7XG4gICAgICAgICRyYW5kLXdpZHRoOiAje3JhbmRvbU51bSg2MCwgODApfTtcbiAgICAgIH1cbiAgICAgICRiZy1pbWFnZTogYXBwZW5kKCRiZy1pbWFnZSwgJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgJyArICRiZy1jb2xvciArICcgJyArICRyYW5kLXdpZHRoICsgJyUgLCAnICsgJG1hc2stY29sb3IgKyAnICcgKyAkcmFuZC13aWR0aCArICclKScpO1xuICAgICAgLy8gVGhpcyBuZXcgbGluZSBzdGFydHMgYmVsb3cgdGhlIHBydmlvdXNseSBhZGRlZCBzZXBhcmF0b3IsXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIGFkZCAkbGluZS1zcGFjaW5nIHRvIG91ciB5LXBvcyBwb2ludGVyXG4gICAgICAkYmcteS1wb3M6IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICgjeyRpfSAtIDEpKSArICgjeyRsaW5lLXNwYWNpbmd9ICogKCN7JGl9IC0gMSkpKTtcbiAgICAgICRiZy1wb3NpdGlvbjogYXBwZW5kKCRiZy1wb3NpdGlvbiwgJzAgJyArICRiZy15LXBvcyk7XG4gICAgICAkYmctc2l6ZTogYXBwZW5kKCRiZy1zaXplLCAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAje3RvLXN0cmluZygkYmctaW1hZ2UsICcsICcpfTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAje3RvLXN0cmluZygkYmctcG9zaXRpb24sICcsICcpfTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6ICN7dG8tc3RyaW5nKCRiZy1zaXplLCAnLCAnKX07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgfVxuXG4gIEBpbmNsdWRlIGJhY2tncm91bmQtaGVpZ2h0KG1pbi1oZWlnaHQsICRsaW5lcyk7XG59XG4iLCJAbWl4aW4gYmFja2dyb3VuZC1oZWlnaHQoJHByb3BlcnR5LCAkbGluZXM6IDEpIHtcbiAgJGxpbmUtaGVpZ2h0OiB2YXIoLS10ZXh0LXNoZWxsLWxpbmUtaGVpZ2h0LCAxNnB4KTtcbiAgJGxpbmUtc3BhY2luZzogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWd1dHRlciwgM3B4KTtcblxuICAjeyRwcm9wZXJ0eX06IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICN7JGxpbmVzfSkgKyAoI3skbGluZS1zcGFjaW5nfSAqICgjeyRsaW5lc30gLSAxKSkpO1xufVxuIiwiQGltcG9ydCBcIi4vdXRpbHNcIjtcblxuQG1peGluIGJvdW5jaW5nLWxpbmVzLWJhY2tncm91bmQoJGxpbmVzOiAxKSB7XG4gICRsaW5lLWhlaWdodDogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWhlaWdodCwgMTZweCk7XG4gICRsaW5lLXNwYWNpbmc6IHZhcigtLXRleHQtc2hlbGwtbGluZS1ndXR0ZXIsIDNweCk7XG4gICRiZy1jb2xvcjogdmFyKC0tdGV4dC1zaGVsbC1saW5lLWNvbG9yLCAjQ0NDKTtcbiAgJG1hc2stY29sb3I6IHZhcigtLXRleHQtc2hlbGwtYmFja2dyb3VuZCwgI0ZGRik7XG4gICRsaW5lLWJnLWNvbG9yOiB2YXIoLS10ZXh0LXNoZWxsLWJhY2tncm91bmQsICNGRkYpO1xuICAkYmcteS1wb3M6IDBweDtcbiAgJHJhbmQtd2lkdGg6ICN7cmFuZG9tTnVtKDg1LCA5NSl9O1xuICAkYmctaW1hZ2U6ICdsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICcgKyAkYmctY29sb3IgKyAnICcgKyAkcmFuZC13aWR0aCArICclICwgJyArICRtYXNrLWNvbG9yICsgJyAnICsgJHJhbmQtd2lkdGggKyAnJSknO1xuICAkYmctcG9zaXRpb246ICcwICcgKyAkYmcteS1wb3M7XG4gICRiZy1zaXplOiAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0O1xuICAkYmctc2l6ZS1hbmltYXRpb24tZnJvbTogJzg1JSAnICsgJGxpbmUtaGVpZ2h0O1xuICAkYmctc2l6ZS1hbmltYXRpb24tdG86ICcxMDAlICcgKyAkbGluZS1oZWlnaHQ7XG5cbiAgQGlmICgkbGluZXMgPT0gMSkge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6ICN7JGJnLWltYWdlfTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAjeyRiZy1wb3NpdGlvbn07XG4gICAgYmFja2dyb3VuZC1zaXplOiAjeyRiZy1zaXplfTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXG4gICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xuICAgIGFuaW1hdGlvbi1uYW1lOiBhbmltYXRlTGluZTtcblxuICAgIEBrZXlmcmFtZXMgYW5pbWF0ZUxpbmUge1xuICAgICAgMCV7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogI3skYmctc2l6ZS1hbmltYXRpb24tZnJvbX07XG4gICAgICB9XG5cbiAgICAgIDEwMCV7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogI3skYmctc2l6ZS1hbmltYXRpb24tdG99O1xuICAgICAgfVxuICAgIH1cbiAgfSBAZWxzZSB7XG4gICAgQGZvciAkaSBmcm9tIDIgdGhyb3VnaCAkbGluZXMge1xuICAgICAgLy8gQWRkIHNlcGFyYXRvciBiZXR3ZWVuIGxpbmVzXG4gICAgICAkYmctaW1hZ2U6IGFwcGVuZCgkYmctaW1hZ2UsIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI3skbGluZS1iZy1jb2xvcn0gMTAwJSwgI3skbGluZS1iZy1jb2xvcn0gMTAwJSkpO1xuICAgICAgLy8gVGhpcyBsaW5lYXItZ3JhZGllbnQgYXMgc2VwYXJhdG9yIHN0YXJ0cyBiZWxvdyB0aGUgbGFzdCBsaW5lLFxuICAgICAgLy8gc28gd2UgaGF2ZSB0byBhZGQgJGxpbmUtaGVpZ2h0IHRvIG91ciB5LXBvcyBwb2ludGVyXG4gICAgICAkYmcteS1wb3M6IGNhbGMoKCN7JGxpbmUtaGVpZ2h0fSAqICgjeyRpfSAtIDEpKSArICgjeyRsaW5lLXNwYWNpbmd9ICogKCN7JGl9IC0gMikpKTtcbiAgICAgICRiZy1wb3NpdGlvbjogYXBwZW5kKCRiZy1wb3NpdGlvbiwgJzAgJyArICRiZy15LXBvcyk7XG4gICAgICAkYmctc2l6ZTogYXBwZW5kKCRiZy1zaXplLCAnMTAwJSAnICsgJGxpbmUtc3BhY2luZyk7XG4gICAgICAvLyBzZXBhcmF0b3IgbGluZXMgaGF2ZSB0aGUgc2FtZSBpbml0aWFsIGFuZCBlbmQgc3RhdGUsIHRodXMgbm8gYW5pbWF0aW9uIG9jY3Vyc1xuICAgICAgJGJnLXNpemUtYW5pbWF0aW9uLWZyb206IGFwcGVuZCgkYmctc2l6ZS1hbmltYXRpb24tZnJvbSwgJzEwMCUgJyArICRsaW5lLXNwYWNpbmcpO1xuICAgICAgJGJnLXNpemUtYW5pbWF0aW9uLXRvOiBhcHBlbmQoJGJnLXNpemUtYW5pbWF0aW9uLXRvLCAnMTAwJSAnICsgJGxpbmUtc3BhY2luZyk7XG5cbiAgICAgIC8vIEFkZCBuZXcgbGluZVxuICAgICAgLy8gVGhlIGxhc3QgbGluZSBzaG91bGQgYmUgbmFycm93IHRoYW4gdGhlIG90aGVyc1xuICAgICAgQGlmICgkaSA9PSAkbGluZXMpIHtcbiAgICAgICAgJHJhbmQtd2lkdGg6ICN7cmFuZG9tTnVtKDMwLCA1MCl9O1xuICAgICAgICAkYmctc2l6ZS1hbmltYXRpb24tZnJvbTogYXBwZW5kKCRiZy1zaXplLWFuaW1hdGlvbi1mcm9tLCAnNTUlICcgKyAkbGluZS1oZWlnaHQpO1xuICAgICAgfSBAZWxzZSB7XG4gICAgICAgICRyYW5kLXdpZHRoOiAje3JhbmRvbU51bSg2MCwgODApfTtcbiAgICAgICAgJGJnLXNpemUtYW5pbWF0aW9uLWZyb206IGFwcGVuZCgkYmctc2l6ZS1hbmltYXRpb24tZnJvbSwgJzc1JSAnICsgJGxpbmUtaGVpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgJGJnLWltYWdlOiBhcHBlbmQoJGJnLWltYWdlLCAnbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAnICsgJGJnLWNvbG9yICsgJyAnICsgJHJhbmQtd2lkdGggKyAnJSAsICcgKyAkbWFzay1jb2xvciArICcgJyArICRyYW5kLXdpZHRoICsgJyUpJyk7XG4gICAgICAvLyBUaGlzIG5ldyBsaW5lIHN0YXJ0cyBiZWxvdyB0aGUgcHJ2aW91c2x5IGFkZGVkIHNlcGFyYXRvcixcbiAgICAgIC8vIHNvIHdlIGhhdmUgdG8gYWRkICRsaW5lLXNwYWNpbmcgdG8gb3VyIHktcG9zIHBvaW50ZXJcbiAgICAgICRiZy15LXBvczogY2FsYygoI3skbGluZS1oZWlnaHR9ICogKCN7JGl9IC0gMSkpICsgKCN7JGxpbmUtc3BhY2luZ30gKiAoI3skaX0gLSAxKSkpO1xuICAgICAgJGJnLXBvc2l0aW9uOiBhcHBlbmQoJGJnLXBvc2l0aW9uLCAnMCAnICsgJGJnLXktcG9zKTtcbiAgICAgICRiZy1zaXplOiBhcHBlbmQoJGJnLXNpemUsICcxMDAlICcgKyAkbGluZS1oZWlnaHQpO1xuICAgICAgJGJnLXNpemUtYW5pbWF0aW9uLXRvOiBhcHBlbmQoJGJnLXNpemUtYW5pbWF0aW9uLXRvLCAnMTAwJSAnICsgJGxpbmUtaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAje3RvLXN0cmluZygkYmctaW1hZ2UsICcsICcpfTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAje3RvLXN0cmluZygkYmctcG9zaXRpb24sICcsICcpfTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6ICN7dG8tc3RyaW5nKCRiZy1zaXplLCAnLCAnKX07XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcblxuICAgIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZS1yZXZlcnNlO1xuICAgIGFuaW1hdGlvbi1uYW1lOiBhbmltYXRlTXVsdGlMaW5lO1xuXG4gICAgQGtleWZyYW1lcyBhbmltYXRlTXVsdGlMaW5lIHtcbiAgICAgIDAle1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6ICN7dG8tc3RyaW5nKCRiZy1zaXplLWFuaW1hdGlvbi1mcm9tLCAnLCAnKX07XG4gICAgICB9XG5cbiAgICAgIDEwMCV7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogI3t0by1zdHJpbmcoJGJnLXNpemUtYW5pbWF0aW9uLXRvLCAnLCAnKX07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGluY2x1ZGUgYmFja2dyb3VuZC1oZWlnaHQobWluLWhlaWdodCwgJGxpbmVzKTtcblxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0O1xuICBhbmltYXRpb24tZHVyYXRpb246IDFzO1xufVxuIl19 */";
      /***/
    },

    /***/
    "VzVu":
    /*!**************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
      \**************************************************************************/

    /*! exports provided: default */

    /***/
    function VzVu(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-app dir=\"{{textDir}}\">\n  <ion-router-outlet></ion-router-outlet>\n</ion-app>";
      /***/
    },

    /***/
    "WVQ6":
    /*!****************************************************************!*\
      !*** ./src/app/utils/shell/text-shell/text-shell.component.ts ***!
      \****************************************************************/

    /*! exports provided: TextShellComponent */

    /***/
    function WVQ6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "TextShellComponent", function () {
        return TextShellComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_text_shell_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./text-shell.component.html */
      "6ZdU");
      /* harmony import */


      var _text_shell_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./text-shell.component.scss */
      "TyAs");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");

      var TextShellComponent = /*#__PURE__*/function () {
        function TextShellComponent() {
          _classCallCheck(this, TextShellComponent);

          // To debug shell styles, change configuration in the environment file
          this.debugMode = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].appShellConfig && src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].appShellConfig.debug ? src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].appShellConfig.debug : false;
          this.textLoaded = false;
        }

        _createClass(TextShellComponent, [{
          key: "data",
          set: function set(val) {
            if (!this.debugMode) {
              this._data = val !== undefined && val !== null ? val : '';
            }

            if (this._data && this._data !== '') {
              this.textLoaded = true;
            } else {
              this.textLoaded = false;
            }
          }
        }]);

        return TextShellComponent;
      }();

      TextShellComponent.ctorParameters = function () {
        return [];
      };

      TextShellComponent.propDecorators = {
        textLoaded: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['class.text-loaded']
        }],
        data: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      TextShellComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-text-shell',
        template: _raw_loader_text_shell_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_text_shell_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], TextShellComponent);
      /***/
    },

    /***/
    "XWyM":
    /*!***************************************************************************!*\
      !*** ./src/app/components/slider-vertical/slider-vertical.component.scss ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function XWyM(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".content {\n  max-height: 200px;\n}\n.content .title {\n  margin: 10px 0px 0px 15px;\n}\n.line {\n  display: inline-flex;\n}\n.block {\n  display: inline-block;\n}\n.card {\n  background-color: white;\n  max-height: 200px;\n}\n.card ion-card-content {\n  height: 80px;\n}\n.slides {\n  font-size: 12px;\n}\n.slides h2 {\n  margin-right: 25px;\n}\nion-progress-bar {\n  height: 20px;\n  max-width: 92%;\n  margin-right: 25px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NsaWRlci12ZXJ0aWNhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0FBQ0o7QUFDSTtFQUNJLHlCQUFBO0FBQ1I7QUFHQTtFQUNJLG9CQUFBO0FBQUo7QUFHQTtFQUNJLHFCQUFBO0FBQUo7QUFHQTtFQUNJLHVCQUFBO0VBQ0EsaUJBQUE7QUFBSjtBQUVJO0VBQ0ksWUFBQTtBQUFSO0FBTUE7RUFDSSxlQUFBO0FBSEo7QUFLSTtFQUNJLGtCQUFBO0FBSFI7QUFPQTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFKSiIsImZpbGUiOiJzbGlkZXItdmVydGljYWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudHtcbiAgICBtYXgtaGVpZ2h0OiAyMDBweDtcblxuICAgIC50aXRsZXtcbiAgICAgICAgbWFyZ2luOiAxMHB4IDBweCAwcHggMTVweDtcbiAgICB9XG59XG5cbi5saW5le1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4OyAgXG59XG5cbi5ibG9ja3tcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICBcbn1cblxuLmNhcmR7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgbWF4LWhlaWdodDogMjAwcHg7XG5cbiAgICBpb24tY2FyZC1jb250ZW50e1xuICAgICAgICBoZWlnaHQ6IDgwcHg7XG5cbiAgICB9XG59XG5cblxuLnNsaWRlc3tcbiAgICBmb250LXNpemU6IDEycHg7XG5cbiAgICBoMntcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyNXB4O1xuICAgIH1cbn1cblxuaW9uLXByb2dyZXNzLWJhcntcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgbWF4LXdpZHRoOiA5MiU7XG4gICAgbWFyZ2luLXJpZ2h0OiAyNXB4O1xufSJdfQ== */";
      /***/
    },

    /***/
    "XmS3":
    /*!*****************************************************************************!*\
      !*** ./src/app/components/checkbox-wrapper/checkbox-wrapper.component.scss ***!
      \*****************************************************************************/

    /*! exports provided: default */

    /***/
    function XmS3(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ":host {\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NoZWNrYm94LXdyYXBwZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoiY2hlY2tib3gtd3JhcHBlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iXX0= */";
      /***/
    },

    /***/
    "Y9a+":
    /*!*****************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/image-download/image-download.html ***!
      \*****************************************************************************************************/

    /*! exports provided: default */

    /***/
    function Y9a(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<!-- Generated template for the ImageDownloadComponent component -->\n<div>\n\n  <div *ngIf=\"!downloaded\">\n      <div *ngIf=\"status == 'downloading'\">\n        <div class=\"progress-outer\">\n          <div class=\"progress-inner\" [style.width]=\"percentage + '%'\">\n            {{percent}} %\n        </div>\n      </div>\n    </div>\n  </div>\n  <img src=\"{{temporaryUrl}}\" (click)=\"openImage()\"> \n  <!--<div *ngIf=\"downloaded\"><img src=\"{{localfileNormalized}}\" (click)=\"openImage()\"></div>-->\n</div>\n";
      /***/
    },

    /***/
    "Z8da":
    /*!*****************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/countdown-timer/countdown-timer.component.html ***!
      \*****************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function Z8da(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-row class=\"countdown\">\n  <ion-col class=\"time\" *ngIf=\"_initialUnit === 'day'\">\n    <span class=\"time-unit\">D</span>\n    <div class=\"inner-time\">\n      <span class=\"time-value\">{{ _daysLeft }}</span>\n    </div>\n  </ion-col>\n  <ion-col class=\"time\" *ngIf=\"(_initialUnit === 'day' && _endingUnit !== 'day') || _initialUnit === 'hour' || _endingUnit === 'hour'\">\n    <span class=\"time-unit\">H</span>\n    <div class=\"inner-time\">\n      <span class=\"time-value\">{{ _hoursLeft }}</span>\n    </div>\n  </ion-col>\n  <ion-col class=\"time\" *ngIf=\"(_initialUnit === 'day' && (_endingUnit !== 'day' && _endingUnit !== 'hour')) || (_initialUnit === 'hour' && _endingUnit !== 'hour') || _initialUnit === 'minute'\">\n    <span class=\"time-unit\">M</span>\n    <div class=\"inner-time\">\n      <span class=\"time-value\">{{ _minutesLeft }}</span>\n    </div>\n  </ion-col>\n  <ion-col class=\"time\" *ngIf=\"_endingUnit === 'second'\">\n    <span class=\"time-unit\">S</span>\n    <div class=\"inner-time\">\n      <span class=\"time-value\">{{ _secondsLeft }}</span>\n    </div>\n  </ion-col>\n</ion-row>\n";
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: createTranslateLoader, AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function () {
        return createTranslateLoader;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
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


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic-native/splash-screen/ngx */
      "54vc");
      /* harmony import */


      var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic-native/status-bar/ngx */
      "VYYF");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/http-loader */
      "mqiu");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../app/interceptors/auth.interceptor */
      "RDNO");
      /* harmony import */


      var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ionic-native/file/ngx */
      "FAH8");
      /* harmony import */


      var _app_interceptors_fake_backend_interceptor__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../app/interceptors/fake-backend.interceptor */
      "raSH");
      /* harmony import */


      var _ionic_native_fingerprint_aio_ngx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ionic-native/fingerprint-aio/ngx */
      "59pt");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _shared_classes_global_error_handler__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./shared/classes/global-error-handler */
      "urw2");
      /* harmony import */


      var _app_interceptors_server_error_interceptor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ../app/interceptors/server-error.interceptor */
      "nQZB");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "R1ws");
      /* harmony import */


      var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/material/snack-bar */
      "dNgK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var ng2_search_filter__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! ng2-search-filter */
      "cZdB");
      /* harmony import */


      var _components_components_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! ./components/components.module */
      "j1ZV");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _nguniversal_express_engine_tokens__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @nguniversal/express-engine/tokens */
      "a4Kx");
      /* harmony import */


      var _angular_fire__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/fire */
      "spgP");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_fire_database__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @angular/fire/database */
      "sSZD");
      /* harmony import */


      var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
      /*! @angular/fire/storage */
      "Vaw3");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
      /*! ../environments/environment */
      "AytR");
      /* harmony import */


      var _services_language_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
      /*! ./services/language.service */
      "kyOO");
      /* harmony import */


      var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
      /*! @ionic-native/file-transfer/ngx */
      "B7Rs");
      /* harmony import */


      var _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
      /*! @ionic-native/document-viewer/ngx */
      "LfQc");
      /* harmony import */


      var _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(
      /*! @ionic-native/photo-viewer/ngx */
      "U3FU");
      /* harmony import */


      var _ionic_native_health_ngx__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(
      /*! @ionic-native/health/ngx */
      "e7Ar");
      /* harmony import */


      var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(
      /*! @ionic-native/social-sharing/ngx */
      "/XPu");
      /* harmony import */


      var _ionic_native_calendar_ngx__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(
      /*! @ionic-native/calendar/ngx */
      "8P2a");
      /* harmony import */


      var _ionic_storage__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(
      /*! @ionic/storage */
      "e8h1");
      /* harmony import */


      var _angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(
      /*! @angular/common/locales/ca */
      "hDpI");
      /* harmony import */


      var _angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_38__);
      /* harmony import */


      var _angular_common_locales_es__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(
      /*! @angular/common/locales/es */
      "2Yyj");
      /* harmony import */


      var _angular_common_locales_es__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_es__WEBPACK_IMPORTED_MODULE_39__);
      /* harmony import */


      var _interceptors_timeout_interceptor__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(
      /*! ./interceptors/timeout.interceptor */
      "J+cp");
      /* harmony import */


      var _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(
      /*! @ionic-native/network/ngx */
      "kwrG");

      Object(_angular_common__WEBPACK_IMPORTED_MODULE_23__["registerLocaleData"])(_angular_common_locales_es__WEBPACK_IMPORTED_MODULE_39___default.a);
      Object(_angular_common__WEBPACK_IMPORTED_MODULE_23__["registerLocaleData"])(_angular_common_locales_ca__WEBPACK_IMPORTED_MODULE_38___default.a);

      function createTranslateLoader(http) {
        return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_8__["TranslateHttpLoader"](http, "./assets/i18n/", ".json");
      }

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"].withServerTransition({
          appId: 'serverApp'
        }), _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserTransferStateModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClientModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_20__["FormsModule"], _ionic_storage__WEBPACK_IMPORTED_MODULE_37__["IonicStorageModule"].forRoot(), _angular_forms__WEBPACK_IMPORTED_MODULE_20__["ReactiveFormsModule"], _components_components_module__WEBPACK_IMPORTED_MODULE_22__["ComponentsModule"], ng2_search_filter__WEBPACK_IMPORTED_MODULE_21__["Ng2SearchPipeModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"].forRoot({
          loader: {
            provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateLoader"],
            useFactory: createTranslateLoader,
            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HttpClient"]]
          },
          defaultLanguage: "ca"
        }), _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_19__["MatSnackBarModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_25__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_29__["environment"].firebase), _angular_fire_auth__WEBPACK_IMPORTED_MODULE_26__["AngularFireAuthModule"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_27__["AngularFireDatabaseModule"], _angular_fire_storage__WEBPACK_IMPORTED_MODULE_28__["AngularFireStorageModule"]],
        providers: [_ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_6__["StatusBar"], _ionic_native_splash_screen_ngx__WEBPACK_IMPORTED_MODULE_5__["SplashScreen"], ng2_search_filter__WEBPACK_IMPORTED_MODULE_21__["Ng2SearchPipeModule"], {
          provide: _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouteReuseStrategy"],
          useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicRouteStrategy"]
        }, {
          provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"],
          useClass: _shared_classes_global_error_handler__WEBPACK_IMPORTED_MODULE_16__["GlobalErrorHandler"]
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HTTP_INTERCEPTORS"],
          useClass: _app_interceptors_server_error_interceptor__WEBPACK_IMPORTED_MODULE_17__["ServerErrorInterceptor"],
          multi: true
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HTTP_INTERCEPTORS"],
          useClass: _interceptors_timeout_interceptor__WEBPACK_IMPORTED_MODULE_40__["TimeoutInterceptor"],
          multi: true
        }, {
          provide: _interceptors_timeout_interceptor__WEBPACK_IMPORTED_MODULE_40__["DEFAULT_TIMEOUT"],
          useValue: 20000
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__["HTTP_INTERCEPTORS"],
          useClass: _app_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_11__["TokenInterceptorService"],
          multi: true
        }, {
          provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"],
          useValue: 'ca-ES'
        }, _services_language_service__WEBPACK_IMPORTED_MODULE_30__["LanguageService"], _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_31__["FileTransfer"], _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__["File"], _ionic_native_document_viewer_ngx__WEBPACK_IMPORTED_MODULE_32__["DocumentViewer"], _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_33__["PhotoViewer"], _ionic_native_health_ngx__WEBPACK_IMPORTED_MODULE_34__["Health"], _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_35__["SocialSharing"], _ionic_native_calendar_ngx__WEBPACK_IMPORTED_MODULE_36__["Calendar"], _ionic_native_fingerprint_aio_ngx__WEBPACK_IMPORTED_MODULE_14__["FingerprintAIO"], _ionic_native_network_ngx__WEBPACK_IMPORTED_MODULE_41__["Network"], _app_interceptors_fake_backend_interceptor__WEBPACK_IMPORTED_MODULE_13__["fakeBackendProvider"], {
          provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
          useFactory: function useFactory(platformId, response) {
            return function () {
              // In the server.ts we added a custom response header with information about the device requesting the app
              if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_23__["isPlatformServer"])(platformId)) {
                if (response && response !== null) {
                  // Get custom header from the response sent from the server.ts
                  var mobileDeviceHeader = response.get('mobile-device'); // Set Ionic config mode?
                }
              }
            };
          },
          deps: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"], [new _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"](), _nguniversal_express_engine_tokens__WEBPACK_IMPORTED_MODULE_24__["RESPONSE"]]],
          multi: true
        }],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
      })], AppModule);
      /***/
    },

    /***/
    "ZntH":
    /*!*****************************************************************!*\
      !*** ./src/app/components/file-upload/file-upload.component.ts ***!
      \*****************************************************************/

    /*! exports provided: FileUploadComponent */

    /***/
    function ZntH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FileUploadComponent", function () {
        return FileUploadComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_file_upload_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./file-upload.component.html */
      "bKO5");
      /* harmony import */


      var _file_upload_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./file-upload.component.scss */
      "KPww");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic-native/chooser/ngx */
      "UWV4");
      /* harmony import */


      var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic-native/in-app-browser/ngx */
      "m/P+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["Plugins"].Camera;

      var FileUploadComponent = /*#__PURE__*/function () {
        function FileUploadComponent(platform, iab, alertCtrl, translate, actionSheetCtrl, chooser, sanitizer) {
          _classCallCheck(this, FileUploadComponent);

          this.platform = platform;
          this.iab = iab;
          this.alertCtrl = alertCtrl;
          this.translate = translate;
          this.actionSheetCtrl = actionSheetCtrl;
          this.chooser = chooser;
          this.sanitizer = sanitizer;
          this.files = [];
        }

        _createClass(FileUploadComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {} // Used for browser direct file upload

        }, {
          key: "uploadFile",
          value: function uploadFile(event) {
            var eventObj = event;
            var target = eventObj.target;
            var file = target.files[0]; //this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
            //  this.images.push(newImage);
            //});
          }
        }, {
          key: "selectSource",
          value: function selectSource() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _this15 = this;

              var buttons, actionSheet;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      buttons = [{
                        text: this.translate.instant('Cámara'),
                        icon: 'camera',
                        handler: function handler() {
                          _this15.addImage(_capacitor_core__WEBPACK_IMPORTED_MODULE_5__["CameraSource"].Camera);
                        }
                      }, {
                        text: this.translate.instant('videocall.pictures'),
                        icon: 'image',
                        handler: function handler() {
                          _this15.addImage(_capacitor_core__WEBPACK_IMPORTED_MODULE_5__["CameraSource"].Photos);
                        }
                      }, {
                        text: this.translate.instant('videocall.choose-file'),
                        icon: 'document',
                        handler: function handler() {
                          _this15.addFile();
                        }
                      }]; // Only allow file selection inside a browser

                      if (!this.platform.is('hybrid')) {
                        buttons.push({
                          text: 'Choose a File',
                          icon: 'attach',
                          handler: function handler() {
                            _this15.fileInput.nativeElement.click();
                          }
                        });
                      }

                      _context4.next = 4;
                      return this.actionSheetCtrl.create({
                        buttons: buttons
                      });

                    case 4:
                      actionSheet = _context4.sent;
                      _context4.next = 7;
                      return actionSheet.present();

                    case 7:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "addFile",
          value: function addFile() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var _this16 = this;

              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      this.chooser.getFile().then(function (file) {
                        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this16, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                          return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  //console.log(file ? file : 'canceled');
                                  if (file) {
                                    //console.log("file", file);
                                    //console.log(" base64result.split(',')[1] ", file.dataURI.split(',')[1]);
                                    this.files.push({
                                      name: file.name,
                                      file: file.dataURI.split(',')[1],
                                      type: file.mediaType
                                    });
                                  }

                                case 1:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5, this);
                        }));
                      })["catch"](function (error) {
                        console.error(error);
                      });

                    case 1:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }, {
          key: "addImage",
          value: function addImage(source) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var image;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return Camera.getPhoto({
                        quality: 60,
                        allowEditing: false,
                        resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["CameraResultType"].Base64,
                        source: source
                      })["catch"](function (e) {
                        console.log('cancelled');
                      });

                    case 2:
                      image = _context7.sent;

                      if (image) {
                        this.file64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:' + "image/".concat(image.format) + ';base64,' + image.base64String);
                        this.files.push({
                          name: Date.now() + '.' + image.format,
                          file: image.base64String,
                          type: image.format
                        }); // this.form.patchValue({
                        //   auto: 'data:' + `image/${image.format}` + ';base64,' + image.base64String
                        // });
                      }

                    case 4:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "uploadFileFromBrowser",
          value: function uploadFileFromBrowser(event) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var eventObj, target, file, toBase64, result, base64result;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      eventObj = event;
                      target = eventObj.target;
                      file = target.files[0];

                      toBase64 = function toBase64(file) {
                        return new Promise(function (resolve, reject) {
                          var reader = new FileReader();
                          reader.readAsDataURL(file);

                          reader.onload = function () {
                            return resolve(reader.result);
                          };

                          reader.onerror = function (error) {
                            return reject(error);
                          };
                        });
                      };

                      _context8.next = 6;
                      return toBase64(file)["catch"](function (e) {
                        return Error(e);
                      });

                    case 6:
                      result = _context8.sent;
                      base64result = result; //console.log(" base64result.split(',')[1] ", base64result.split(',')[1]);

                      this.files.push({
                        name: file.name,
                        file: base64result.split(',')[1],
                        type: file.type
                      }); // this.form.patchValue({
                      //   auto: result
                      // });

                    case 9:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "fileError",
          value: function fileError(error) {
            console.log(error);
          }
        }, {
          key: "removeFile",
          value: function removeFile(name) {
            var _this17 = this;

            console.log("removeFile: ", name);
            this.files.forEach(function (element, index) {
              if (element.name == name) _this17.files.splice(index, 1);
            });
          }
        }, {
          key: "openFile",
          value: function openFile(file) {
            //console.log("openFile", file);
            var type = file.type;

            if (type.includes('image') || type.includes('jpeg') || type.includes('jpg') || type.includes('png')) {
              var image = new Image();
              image.src = "data:" + file.type + ";base64," + file.file;

              if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
                var pageContent = '<html><head></head><body>' + image.outerHTML + '</body></html>';
                var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
                this.openWithInAppBrowser(pageContentUrl);
              } else {
                var w = window.open("");
                w.document.write(image.outerHTML);
              }
            } else if (type.includes('pdf')) {
              if (!this.platform.is('mobileweb') && !this.platform.is('desktop')) {
                var pageContent = "<html><head></head><body><iframe width='100%' height='100%' src='data:application/pdf;base64, " + file.file + "'></iframe></body></html>";
                var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
                this.openWithInAppBrowser(pageContentUrl);
              } else {
                var pdfWindow = window.open("");
                pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(file.file) + "'></iframe>");
              }
            } else this.presentAlert();
          }
        }, {
          key: "openWithInAppBrowser",
          value: function openWithInAppBrowser(url) {
            var options = {
              location: 'yes',
              hideurlbar: 'yes',
              hidden: 'no',
              clearcache: 'yes',
              clearsessioncache: 'yes',
              enableViewPortScale: 'yes',
              zoom: 'yes',
              hardwareback: 'yes',
              mediaPlaybackRequiresUserAction: 'no',
              shouldPauseOnSuspend: 'no',
              closebuttoncaption: 'Close',
              disallowoverscroll: 'no',
              toolbar: 'yes',
              enableViewportScale: 'no',
              allowInlineMediaPlayback: 'no',
              presentationstyle: 'pagesheet',
              fullscreen: 'yes'
            };
            var target = "_blank";
            this.iab.create(url, target, options);
          }
        }, {
          key: "presentAlert",
          value: function presentAlert() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var alert;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return this.alertCtrl.create({
                        cssClass: 'my-custom-class',
                        message: this.translate.instant("videocall.file_type_not supported"),
                        buttons: [{
                          text: 'Ok'
                        }]
                      });

                    case 2:
                      alert = _context9.sent;
                      _context9.next = 5;
                      return alert.present();

                    case 5:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }]);

        return FileUploadComponent;
      }();

      FileUploadComponent.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["Platform"]
        }, {
          type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_7__["InAppBrowser"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["AlertController"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__["ActionSheetController"]
        }, {
          type: _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_6__["Chooser"]
        }, {
          type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]
        }];
      };

      FileUploadComponent.propDecorators = {
        fileInput: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
          args: ['fileInput', {
            "static": false
          }]
        }],
        text: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['text']
        }],
        form: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['form']
        }],
        files: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['files']
        }]
      };
      FileUploadComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-file-upload',
        template: _raw_loader_file_upload_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_file_upload_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], FileUploadComponent);
      /***/
    },

    /***/
    "aSMC":
    /*!***************************************************************!*\
      !*** ./src/app/components/google-map/google-map.component.ts ***!
      \***************************************************************/

    /*! exports provided: GoogleMapComponent */

    /***/
    function aSMC(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GoogleMapComponent", function () {
        return GoogleMapComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var GoogleMapComponent = /*#__PURE__*/function () {
        function GoogleMapComponent(_elementRef, platformId) {
          _classCallCheck(this, GoogleMapComponent);

          this._elementRef = _elementRef;
          this.platformId = platformId;
          this.$mapReady = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
          this._mapIdledOnce = false;
        }

        _createClass(GoogleMapComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            // there are some issues with maps in server side
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this.platformId)) {
              this.initMap();
            }
          }
        }, {
          key: "initMap",
          value: function initMap() {
            var _this18 = this;

            this._el = this._elementRef.nativeElement;
            this._map = new google.maps.Map(this._el, this.mapOptions); // Workarround for init method: try to catch the first idle event after the map creation
            // (this._mapIdledOnce). The following idle events don't matter.

            var _ready_listener = this._map.addListener('idle', function () {
              console.log('mapReady - IDLE');

              if (!_this18._mapIdledOnce) {
                _this18.$mapReady.emit(_this18._map);

                _this18._mapIdledOnce = true; // Stop listening to event, the map is ready

                google.maps.event.removeListener(_ready_listener);
              }
            });
          }
        }]);

        return GoogleMapComponent;
      }();

      GoogleMapComponent.ctorParameters = function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]
        }, {
          type: Object,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"]]
          }]
        }];
      };

      GoogleMapComponent.propDecorators = {
        mapOptions: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }]
      };
      GoogleMapComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'google-map',
        template: ''
      })], GoogleMapComponent);
      /***/
    },

    /***/
    "bKO5":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/file-upload/file-upload.component.html ***!
      \*********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function bKO5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-nav-link (click)=\"selectSource()\" expand=\"block\" color=\"dark\">\n  <ion-icon size=\"large\" name=\"attach\"></ion-icon>{{ this.text }}</ion-nav-link\n>\n<input\n  type=\"file\"\n  #fileInput\n  (change)=\"uploadFileFromBrowser($event)\"\n  hidden=\"true\"\n  accept=\"image/*, application/pdf, video/*, audio/*, .doc,.docx,application/msword\">\n\n\n<div id=\"container\" style=\"margin-top: 10px;\">\n  <div *ngFor=\"let file of this.files\">\n  <div id=\"left\">\n    <ion-icon name=\"open\" color=\"primary\" (click)=\"openFile(file)\"></ion-icon>\n  </div>\n  <div id=\"middle\">\n    <p class=\"titule\">{{ file.name }}</p>\n  </div>\n  <div id=\"right\">\n    <ion-icon name=\"close-circle\" color=\"primary\" (click)=\"removeFile(file.name)\"></ion-icon>\n</div>\n";
      /***/
    },

    /***/
    "bdP1":
    /*!*******************************************!*\
      !*** ./src/app/utils/shell/data-store.ts ***!
      \*******************************************/

    /*! exports provided: ShellModel, DataStore */

    /***/
    function bdP1(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ShellModel", function () {
        return ShellModel;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DataStore", function () {
        return DataStore;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");

      var ShellModel = function ShellModel() {
        _classCallCheck(this, ShellModel);

        this.isShell = false;
      };

      var DataStore = /*#__PURE__*/function () {
        function DataStore(shellModel) {
          _classCallCheck(this, DataStore);

          this.shellModel = shellModel; // We wait on purpose 2 secs on local environment when fetching from json to simulate the backend roundtrip.
          // However, in production you should set this delay to 0 in the environment.prod file.
          // tslint:disable-next-line:max-line-length

          this.networkDelay = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].appShellConfig && src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].appShellConfig.networkDelay ? src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].appShellConfig.networkDelay : 0;
          this.timeline = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        } // Static function with generics
        // (ref: https://stackoverflow.com/a/24293088/1116959)
        // Append a shell (T & ShellModel) to every value (T) emmited to the timeline


        _createClass(DataStore, [{
          key: "load",
          value: function load(dataSourceObservable, networkDelay) {
            var _this19 = this;

            // tslint:disable-next-line:no-shadowed-variable
            var delay = typeof networkDelay === 'number' ? networkDelay : this.networkDelay;
            var processedDataSource; // If no network delay, then don't show shell

            if (delay === 0) {
              processedDataSource = dataSourceObservable;
            } else {
              processedDataSource = DataStore.AppendShell(dataSourceObservable, this.shellModel, delay);
            }

            processedDataSource.subscribe(function (dataValue) {
              _this19.timeline.next(dataValue);
            });
          }
        }, {
          key: "state",
          get: function get() {
            return this.timeline.asObservable();
          }
        }], [{
          key: "AppendShell",
          value: function AppendShell(dataObservable, shellModel) {
            var networkDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
            var delayObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["delay"])(networkDelay)); // Assign shell flag accordingly
            // (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])([delayObservable, dataObservable]).pipe( // Dismiss unnecessary delayValue
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  delayValue = _ref3[0],
                  dataValue = _ref3[1];

              return Object.assign(dataValue, {
                isShell: false
              });
            }), // Set the shell model as the initial value
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(Object.assign(shellModel, {
              isShell: true
            })));
          }
        }]);

        return DataStore;
      }();
      /***/

    },

    /***/
    "dAQS":
    /*!*************************************************************************!*\
      !*** ./src/app/components/countdown-timer/countdown-timer.component.ts ***!
      \*************************************************************************/

    /*! exports provided: CountdownTimerComponent */

    /***/
    function dAQS(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CountdownTimerComponent", function () {
        return CountdownTimerComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_countdown_timer_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./countdown-timer.component.html */
      "Z8da");
      /* harmony import */


      var _countdown_timer_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./countdown-timer.component.scss */
      "IUqK");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var dayjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! dayjs */
      "Wgwc");
      /* harmony import */


      var dayjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_7__);

      var CountdownTimerComponent = /*#__PURE__*/function () {
        function CountdownTimerComponent(platformId) {
          var _this20 = this;

          _classCallCheck(this, CountdownTimerComponent);

          this.platformId = platformId;
          this._initialUnit = 'hour';
          this._endingUnit = 'second';
          this._updateInterval = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["interval"])(1000);
          this._unsubscribeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"](); // DIVISORS
          // 60 seconds * 60 (minutes) * 24 (hours) = 86400 seconds = 1 day

          this._dayDivisor = 60 * 60 * 24; // 60 seconds * 60 (minutes) = 3600 seconds = 1 hour

          this._hourDivisor = 60 * 60; // 60 seconds = 1 minute

          this._minuteDivisor = 60;
          this._secondDivisor = 1; // MODULUS
          // Neutral modulus

          this._dayModulus = function (secondsLeft) {
            return secondsLeft;
          }; // The modulus operator (%) returns the division remainder.
          // To figure out how many hours are left after taking in consideration the days, we should do:
          //    (secondsLeft % hourModulus) / hourDivisor
          // In 1 day there are 86400 seconds, and in 1 hour 3600 seconds. 1 day + 1 hour = 90000 seconds
          //    (90000s % 86400s) / 3600s = 1h


          this._hourModulus = function (secondsLeft) {
            return secondsLeft % _this20._dayDivisor;
          };

          this._minuteModulus = function (secondsLeft) {
            return secondsLeft % _this20._hourDivisor;
          };

          this._secondModulus = function (secondsLeft) {
            return secondsLeft % _this20._minuteDivisor;
          };
        }

        _createClass(CountdownTimerComponent, [{
          key: "end",
          set: function set(endingTime) {
            this._endingTime = endingTime !== undefined && endingTime !== null ? dayjs__WEBPACK_IMPORTED_MODULE_7___default()(endingTime) : dayjs__WEBPACK_IMPORTED_MODULE_7___default()();
          }
        }, {
          key: "units",
          set: function set(units) {
            // 'day', 'hour, 'minute', 'second'
            this._initialUnit = units !== undefined && units.from !== undefined && units.from !== null ? units.from : 'hour';
            this._endingUnit = units !== undefined && units.to !== undefined && units.to !== null ? units.to : 'second'; // For 'day' unit, use the default modulus
            // Adjust modulus depending on the unit

            if (this._initialUnit === 'hour') {
              // Cancelation modulus
              this._dayModulus = function (secondsLeft) {
                return 1;
              }; // Neutral modulus


              this._hourModulus = function (secondsLeft) {
                return secondsLeft;
              };
            }

            if (this._initialUnit === 'minute') {
              // Cancelation modulus
              this._dayModulus = function (secondsLeft) {
                return 1;
              };

              this._hourModulus = function (secondsLeft) {
                return 1;
              }; // Neutral modulus


              this._minuteModulus = function (secondsLeft) {
                return secondsLeft;
              };
            }

            if (this._initialUnit === 'second') {
              // Cancelation modulus
              this._dayModulus = function (secondsLeft) {
                return 1;
              };

              this._hourModulus = function (secondsLeft) {
                return 1;
              };

              this._minuteModulus = function (secondsLeft) {
                return 1;
              }; // Neutral modulus


              this._secondModulus = function (secondsLeft) {
                return secondsLeft;
              };
            }
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this21 = this;

            // I believe if we run this on SSR, it won't ever trigger the change detection and thus the server will be stuck loading
            if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_4__["isPlatformBrowser"])(this.platformId)) {
              this._updateInterval.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this._unsubscribeSubject)).subscribe(function (val) {
                _this21.updateValues();
              }, function (error) {
                return console.error(error);
              }, function () {
                return console.log('[takeUntil] complete');
              });
            } else {
              this.updateValues();
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this._unsubscribeSubject.next();

            this._unsubscribeSubject.complete();
          }
        }, {
          key: "updateValues",
          value: function updateValues() {
            var secondsLeft = this._endingTime.diff(dayjs__WEBPACK_IMPORTED_MODULE_7___default()(), 'second');

            this._daysLeft = Math.floor(this._dayModulus(secondsLeft) / this._dayDivisor);
            this._hoursLeft = Math.floor(this._hourModulus(secondsLeft) / this._hourDivisor);
            this._minutesLeft = Math.floor(this._minuteModulus(secondsLeft) / this._minuteDivisor);
            this._secondsLeft = Math.floor(this._secondModulus(secondsLeft) / this._secondDivisor);
          }
        }]);

        return CountdownTimerComponent;
      }();

      CountdownTimerComponent.ctorParameters = function () {
        return [{
          type: Object,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["PLATFORM_ID"]]
          }]
        }];
      };

      CountdownTimerComponent.propDecorators = {
        end: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        units: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      CountdownTimerComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-countdown-timer',
        template: _raw_loader_countdown_timer_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_countdown_timer_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], CountdownTimerComponent);
      /***/
    },

    /***/
    "e6VL":
    /*!***********************************************************************!*\
      !*** ./src/app/components/counter-input/counter-input.component.scss ***!
      \***********************************************************************/

    /*! exports provided: default */

    /***/
    function e6VL(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "app-counter-input {\n  --counter-background: #000;\n  --counter-color: #FFF;\n  --counter-color-activated: #FFF;\n  --counter-border-color: #000;\n  --counter-border-radius-outer: 50%;\n  --counter-border-radius-inner: 50%;\n  --counter-size: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\napp-counter-input ion-button.counter-icon {\n  margin: 0px;\n}\napp-counter-input ion-button.counter-icon.button-solid {\n  --background: var(--counter-background);\n  --background-activated: var(--counter-color);\n  --color: var(--counter-color);\n  --color-activated: var(--counter-color-activated);\n  --border-width: 1px;\n  --border-style: solid;\n  --border-color: var(--counter-border-color);\n  --box-shadow: none;\n  --border-radius: var(--counter-border-radius-outer) var(--counter-border-radius-inner) var(--counter-border-radius-inner) var(--counter-border-radius-outer);\n  --padding-bottom: 3px;\n  --padding-end: 3px;\n  --padding-start: 3px;\n  --padding-top: 3px;\n}\napp-counter-input .counter-value {\n  color: var(--counter-color);\n  margin: 0px 10px;\n  width: 2.2ch;\n  text-align: center;\n  font-feature-settings: \"tnum\";\n  font-variant-numeric: tabular-nums;\n}\napp-counter-input:not([basic]) .button-outer {\n  width: var(--counter-size);\n}\napp-counter-input:not([basic]) .button-outer .button-wrapper {\n  display: block;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  padding-bottom: 100%;\n}\napp-counter-input:not([basic]) .button-outer .button-wrapper .counter-icon {\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  height: auto;\n  width: 100%;\n}\napp-counter-input[basic] {\n  --counter-border-radius-outer: 12px;\n  --counter-border-radius-inner: 0px;\n}\napp-counter-input[basic] .counter-value {\n  display: none;\n}\napp-counter-input[basic] .button-outer:first-child ion-button.counter-icon {\n  --border-radius: var(--counter-border-radius-outer) var(--counter-border-radius-inner) var(--counter-border-radius-inner) var(--counter-border-radius-outer);\n}\napp-counter-input[basic] .button-outer:last-child {\n  margin-left: -1px;\n}\napp-counter-input[basic] .button-outer:last-child ion-button.counter-icon {\n  --border-radius: var(--counter-border-radius-inner) var(--counter-border-radius-outer) var(--counter-border-radius-outer) var(--counter-border-radius-inner);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvdW50ZXItaW5wdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsK0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxvQkFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQUY7QUFFRTtFQWlCRSxXQUFBO0FBaEJKO0FBQUk7RUFDRSx1Q0FBQTtFQUNBLDRDQUFBO0VBQ0EsNkJBQUE7RUFDQSxpREFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSwyQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsNEpBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQUVOO0FBSUU7RUFDRSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQ0FBQTtBQUZKO0FBT0k7RUFDRSwwQkFBQTtBQUxOO0FBT007RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtBQUxSO0FBT1E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUxWO0FBV0U7RUFDRSxtQ0FBQTtFQUNBLGtDQUFBO0FBVEo7QUFXSTtFQUNFLGFBQUE7QUFUTjtBQWNRO0VBQ0UsNEpBQUE7QUFaVjtBQWdCTTtFQUVFLGlCQUFBO0FBZlI7QUFpQlE7RUFDRSw0SkFBQTtBQWZWIiwiZmlsZSI6ImNvdW50ZXItaW5wdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAtY291bnRlci1pbnB1dCB7XG4gIC0tY291bnRlci1iYWNrZ3JvdW5kOiAjMDAwO1xuICAtLWNvdW50ZXItY29sb3I6ICNGRkY7XG4gIC0tY291bnRlci1jb2xvci1hY3RpdmF0ZWQ6ICNGRkY7XG4gIC0tY291bnRlci1ib3JkZXItY29sb3I6ICMwMDA7XG4gIC0tY291bnRlci1ib3JkZXItcmFkaXVzLW91dGVyOiA1MCU7XG4gIC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyOiA1MCU7XG4gIC0tY291bnRlci1zaXplOiAzMHB4O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgaW9uLWJ1dHRvbi5jb3VudGVyLWljb24ge1xuICAgICYuYnV0dG9uLXNvbGlkIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0tY291bnRlci1iYWNrZ3JvdW5kKTtcbiAgICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHZhcigtLWNvdW50ZXItY29sb3IpO1xuICAgICAgLS1jb2xvcjogdmFyKC0tY291bnRlci1jb2xvcik7XG4gICAgICAtLWNvbG9yLWFjdGl2YXRlZDogdmFyKC0tY291bnRlci1jb2xvci1hY3RpdmF0ZWQpO1xuICAgICAgLS1ib3JkZXItd2lkdGg6IDFweDtcbiAgICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgIC0tYm9yZGVyLWNvbG9yOiB2YXIoLS1jb3VudGVyLWJvcmRlci1jb2xvcik7XG4gICAgICAtLWJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAtLWJvcmRlci1yYWRpdXM6IHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcikgdmFyKC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyKSB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpIHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcik7XG4gICAgICAtLXBhZGRpbmctYm90dG9tOiAzcHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiAzcHg7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDNweDtcbiAgICAgIC0tcGFkZGluZy10b3A6IDNweDtcbiAgICB9XG5cbiAgICBtYXJnaW46IDBweDtcbiAgfVxuXG4gIC5jb3VudGVyLXZhbHVlIHtcbiAgICBjb2xvcjogdmFyKC0tY291bnRlci1jb2xvcik7XG4gICAgbWFyZ2luOiAwcHggMTBweDtcbiAgICB3aWR0aDogMi4yY2g7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogJ3RudW0nO1xuICAgIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG4gIH1cblxuICAmOm5vdChbYmFzaWNdKSB7XG4gICAgLy8gRm9yY2UgZWFjaCBjb3VudGVyIGJ1dHRvbiB0byBoYXZlIGEgMToxIGFzcGVjdCByYXRpb1xuICAgIC5idXR0b24tb3V0ZXIge1xuICAgICAgd2lkdGg6IHZhcigtLWNvdW50ZXItc2l6ZSk7XG5cbiAgICAgIC5idXR0b24td3JhcHBlciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcblxuICAgICAgICAuY291bnRlci1pY29uIHtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiAwcHg7XG4gICAgICAgICAgYm90dG9tOiAwcHg7XG4gICAgICAgICAgbGVmdDogMHB4O1xuICAgICAgICAgIHJpZ2h0OiAwcHg7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJltiYXNpY10ge1xuICAgIC0tY291bnRlci1ib3JkZXItcmFkaXVzLW91dGVyOiAxMnB4O1xuICAgIC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyOiAwcHg7XG5cbiAgICAuY291bnRlci12YWx1ZSB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5idXR0b24tb3V0ZXIge1xuICAgICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICAgIGlvbi1idXR0b24uY291bnRlci1pY29uIHtcbiAgICAgICAgICAtLWJvcmRlci1yYWRpdXM6IHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcikgdmFyKC0tY291bnRlci1ib3JkZXItcmFkaXVzLWlubmVyKSB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpIHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgLy8gVG8gYXZvaWQgZG91YmxlIGJvcmRlclxuICAgICAgICBtYXJnaW4tbGVmdDogLTFweDtcblxuICAgICAgICBpb24tYnV0dG9uLmNvdW50ZXItaWNvbiB7XG4gICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpIHZhcigtLWNvdW50ZXItYm9yZGVyLXJhZGl1cy1vdXRlcikgdmFyKC0tY291bnRlci1ib3JkZXItcmFkaXVzLW91dGVyKSB2YXIoLS1jb3VudGVyLWJvcmRlci1yYWRpdXMtaW5uZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */";
      /***/
    },

    /***/
    "ej43":
    /*!****************************************************!*\
      !*** ./src/app/services/authentication.service.ts ***!
      \****************************************************/

    /*! exports provided: User, AuthenticationService */

    /***/
    function ej43(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "User", function () {
        return User;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AuthenticationService", function () {
        return AuthenticationService;
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


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _services_api_endpoints_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../services/api-endpoints.service */
      "7R0Y");
      /* harmony import */


      var _services_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../services/http.service */
      "N+K7");
      /* harmony import */


      var _config_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../config/constants */
      "5Pvz");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var Storage = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__["Plugins"].Storage;
      var TOKEN_KEY = 'token';

      var User = function User() {
        _classCallCheck(this, User);
      };

      User.ctorParameters = function () {
        return [];
      };

      User = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], User);

      var AuthenticationService = /*#__PURE__*/function () {
        function AuthenticationService(http, api, constants, platform, firebaseAuth, router, platformId) {
          _classCallCheck(this, AuthenticationService);

          this.http = http;
          this.api = api;
          this.constants = constants;
          this.platform = platform;
          this.firebaseAuth = firebaseAuth;
          this.router = router;
          this.platformId = platformId;
          this.isAuthenticated = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
          this.isRecovery = false;
          this.agendaUser = [];
        }

        _createClass(AuthenticationService, [{
          key: "getAuthToken",
          value: function getAuthToken() {
            var token = localStorage.getItem(TOKEN_KEY);
            return token;
          }
        }, {
          key: "hasToken",
          value: function hasToken() {
            return !!localStorage.getItem(TOKEN_KEY);
          }
        }, {
          key: "loadToken",
          value: function loadToken() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              var token;
              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return Storage.get({
                        key: TOKEN_KEY
                      });

                    case 2:
                      token = _context10.sent;

                      if (token && token.value) {
                        this.isAuthenticated.next(true);
                      } else {
                        this.isAuthenticated.next(false);
                      }

                    case 4:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, this);
            }));
          }
        }, {
          key: "setAuthToken",
          value: function setAuthToken(token) {
            localStorage.setItem(TOKEN_KEY, token);
          }
        }, {
          key: "login",
          value: function login(credentials) {
            var _this22 = this;

            var endpoint = this.api.getEndpoint('patient/login');
            return this.http.post(endpoint, credentials).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              console.log("Login res: ", res);

              if (!res.success) {
                _this22.throwError(res);
              } // save user's token


              if (res.token) localStorage.setItem(TOKEN_KEY, res.token);

              if (res.firebaseToken) {
                _this22.firebaseAuth.signInWithCustomToken(res.firebaseToken).then(function (data) {
                  if (!_this22.platform.is('mobileweb') && !_this22.platform.is('desktop')) {
                    _this22.registerDevice();
                  }
                }, function (error) {
                  console.log(error);
                });
              } // user's data


              return res.data;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_) {
              _this22.isAuthenticated.next(true);
            }));
          }
        }, {
          key: "logout",
          value: function logout() {
            console.log('logout');
            this.isAuthenticated.next(false);
            return Storage.remove({
              key: TOKEN_KEY
            });
          }
        }, {
          key: "validateCredentials",
          value: function validateCredentials(credentials, resource) {
            var _this23 = this;

            var endpoint = this.api.getEndpoint('appamiq/' + resource); //console.log("endpoint_ ", endpoint);

            return this.http.post(endpoint, credentials).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              if (res.status != 200) _this23.throwError(res);else return res.data;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (_) {
              _this23.isAuthenticated.next(true);
            }));
          }
        }, {
          key: "get",
          value: function get(endpt) {
            var endpoint = this.api.getDooleEndpoint(endpt);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              return res;
            }));
          }
        }, {
          key: "post",
          value: function post(endpt, items) {
            var endpoint = this.api.getDooleEndpoint(endpt);
            return this.http.post(endpoint, items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
              return res;
            }));
          }
        }, {
          key: "throwError",
          value: function throwError(error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpErrorResponse"]) throw new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpErrorResponse"](error);else throw new Error(error);
          }
        }, {
          key: "registerDevice",
          value: function registerDevice() {
            var _this24 = this;

            //console.log("register device token:"+this.deviceToken+" "+this.devicePlatform);
            var postData = {
              token: this.deviceToken,
              platform: this.devicePlatform
            };
            this.post('user/device/register', postData).subscribe(function (data) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this24, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));
            }, function (error) {
              // Called when error
              console.log('error: ', error);
              throw new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpErrorResponse"](error);
            }, function () {// Called when operation is complete (both success and error)
              // loading.dismiss();
            });
          }
        }]);

        return AuthenticationService;
      }();

      AuthenticationService.ctorParameters = function () {
        return [{
          type: _services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"]
        }, {
          type: _services_api_endpoints_service__WEBPACK_IMPORTED_MODULE_5__["ApiEndpointsService"]
        }, {
          type: _config_constants__WEBPACK_IMPORTED_MODULE_7__["Constants"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"]
        }, {
          type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_10__["AngularFireAuth"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"]
        }, {
          type: Object,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]]
          }]
        }];
      };

      AuthenticationService.propDecorators = {
        outlet: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
          args: [_angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterOutlet"]]
        }]
      };
      AuthenticationService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], AuthenticationService);
      /***/
    },

    /***/
    "ejKP":
    /*!*****************************************************************!*\
      !*** ./src/app/services/firebase/auth/firebase-auth.service.ts ***!
      \*****************************************************************/

    /*! exports provided: FirebaseAuthService */

    /***/
    function ejKP(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FirebaseAuthService", function () {
        return FirebaseAuthService;
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


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _utils_shell_data_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../utils/shell/data-store */
      "bdP1");
      /* harmony import */


      var _firebase_profile_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./firebase-profile.model */
      "4n8L");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var firebase_app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! firebase/app */
      "Wcq6");
      /* harmony import */


      var firebase_app__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_8__);
      /* harmony import */


      var capacitor_firebase_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! capacitor-firebase-auth */
      "wqjM");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var FirebaseAuthService = /*#__PURE__*/function () {
        function FirebaseAuthService(angularFire, platform, platformId) {
          var _this25 = this;

          _classCallCheck(this, FirebaseAuthService);

          this.angularFire = angularFire;
          this.platform = platform;
          this.platformId = platformId;
          this.redirectResult = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();

          if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_10__["isPlatformBrowser"])(this.platformId)) {
            this.angularFire.onAuthStateChanged(function (user) {
              if (user) {
                // User is signed in.
                _this25.currentUser = user;
              } else {
                // No user is signed in.
                _this25.currentUser = null;
              }
            });

            if (!this.platform.is('capacitor')) {
              // when using signInWithRedirect, this listens for the redirect results
              this.angularFire.getRedirectResult().then(function (result) {
                // result.credential.accessToken gives you the Provider Access Token. You can use it to access the Provider API.
                if (result.user) {
                  _this25.userProviderAdditionalInfo = result.additionalUserInfo.profile;

                  _this25.redirectResult.next(result);
                }
              }, function (error) {
                _this25.redirectResult.next({
                  error: error.code
                });
              });
            }
          }
        }

        _createClass(FirebaseAuthService, [{
          key: "getRedirectResult",
          value: function getRedirectResult() {
            return this.redirectResult.asObservable();
          }
        }, {
          key: "getPhotoURL",
          value: function getPhotoURL(signInProviderId, photoURL) {
            // Default imgs are too small and our app needs a bigger image
            switch (signInProviderId) {
              case 'facebook.com':
                return photoURL + '?height=400';

              case 'password':
                return 'https://s3-us-west-2.amazonaws.com/ionicthemes/otros/avatar-placeholder.png';

              case 'twitter.com':
                return photoURL.replace('_normal', '_400x400');

              case 'google.com':
                return photoURL.split('=')[0];

              default:
                return photoURL;
            }
          }
        }, {
          key: "signOut",
          value: function signOut() {
            if (this.platform.is('capacitor')) {
              return Object(capacitor_firebase_auth__WEBPACK_IMPORTED_MODULE_9__["cfaSignOut"])();
            } else {
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.angularFire.signOut());
            }
          }
        }, {
          key: "signInWithEmail",
          value: function signInWithEmail(email, password) {
            return this.angularFire.signInWithEmailAndPassword(email, password);
          }
        }, {
          key: "signUpWithEmail",
          value: function signUpWithEmail(email, password) {
            return this.angularFire.createUserWithEmailAndPassword(email, password);
          }
        }, {
          key: "socialSignIn",
          value: function socialSignIn(providerName, scopes) {
            if (this.platform.is('capacitor')) {
              return Object(capacitor_firebase_auth__WEBPACK_IMPORTED_MODULE_9__["cfaSignIn"])(providerName);
            } else {
              var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_8__["auth"].OAuthProvider(providerName); //console.log("provider. ", provider);

              if (scopes) {
                scopes.forEach(function (scope) {
                  provider.addScope(scope);
                });
              }

              if (this.platform.is('desktop')) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.angularFire.signInWithPopup(provider));
              } else {
                // web but not desktop, for example mobile PWA
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.angularFire.signInWithRedirect(provider));
              }
            }
          }
        }, {
          key: "signInWithGoogle",
          value: function signInWithGoogle() {
            var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_8__["auth"].GoogleAuthProvider(); //console.log("provider: ", provider);

            var scopes = ['profile', 'email'];
            return this.socialSignIn(provider.providerId, scopes);
          }
        }, {
          key: "signInWithTwitter",
          value: function signInWithTwitter() {
            var provider = new firebase_app__WEBPACK_IMPORTED_MODULE_8__["auth"].TwitterAuthProvider();
            return this.socialSignIn(provider.providerId);
          }
        }, {
          key: "getProfileDataSource",
          value: function getProfileDataSource() {
            var _this26 = this;

            // we need to do this differentiation because there is a bug in
            // platform capacitor ios when executing this.angularFire.user
            if (this.platform.is('capacitor')) {
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(this.setUserModelForProfile());
            } else {
              return this.angularFire.user.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (user) {
                return user != null;
              }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (user) {
                return _this26.setUserModelForProfile();
              }));
            }
          }
        }, {
          key: "setUserModelForProfile",
          value: function setUserModelForProfile() {
            var userModel = new _firebase_profile_model__WEBPACK_IMPORTED_MODULE_5__["FirebaseProfileModel"]();
            var provierData = this.currentUser.providerData[0];
            var userData = this.userProviderAdditionalInfo ? this.userProviderAdditionalInfo : provierData;
            userModel.image = this.getPhotoURL(provierData.providerId, provierData.photoURL);
            userModel.name = userData.name || userData.displayName || 'What\'s your name?';
            userModel.role = 'How would you describe yourself?';
            userModel.description = userData.description || 'Anything else you would like to share with the world?';
            userModel.phoneNumber = userData.phoneNumber || 'Is there a number where I can reach you?';
            userModel.email = userData.email || 'Where can I send you emails?';
            userModel.provider = provierData.providerId !== 'password' ? provierData.providerId : 'Credentials';
            return userModel;
          }
        }, {
          key: "getProfileStore",
          value: function getProfileStore(dataSource) {
            // Initialize the model specifying that it is a shell model
            var shellModel = new _firebase_profile_model__WEBPACK_IMPORTED_MODULE_5__["FirebaseProfileModel"]();
            this.profileDataStore = new _utils_shell_data_store__WEBPACK_IMPORTED_MODULE_4__["DataStore"](shellModel); // Trigger the loading mechanism (with shell) in the dataStore

            this.profileDataStore.load(dataSource);
            return this.profileDataStore;
          }
        }]);

        return FirebaseAuthService;
      }();

      FirebaseAuthService.ctorParameters = function () {
        return [{
          type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["Platform"]
        }, {
          type: Object,
          decorators: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
            args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["PLATFORM_ID"]]
          }]
        }];
      };

      FirebaseAuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], FirebaseAuthService);
      /***/
    },

    /***/
    "fpyr":
    /*!***************************************************************************!*\
      !*** ./src/app/components/checkbox-wrapper/checkbox-wrapper.component.ts ***!
      \***************************************************************************/

    /*! exports provided: CheckboxWrapperComponent */

    /***/
    function fpyr(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CheckboxWrapperComponent", function () {
        return CheckboxWrapperComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_checkbox_wrapper_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./checkbox-wrapper.component.html */
      "3TL5");
      /* harmony import */


      var _checkbox_wrapper_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./checkbox-wrapper.component.scss */
      "XmS3");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/"); // Reference to the @ionic/angular Components List:
      // https://github.com/ionic-team/ionic/blob/master/angular/src/directives/proxies.ts


      var CheckboxWrapperComponent = /*#__PURE__*/function () {
        function CheckboxWrapperComponent() {
          _classCallCheck(this, CheckboxWrapperComponent);
        }

        _createClass(CheckboxWrapperComponent, [{
          key: "ngAfterContentInit",
          value: function ngAfterContentInit() {
            var _this27 = this;

            // ContentChild is set
            this.isChecked = this.checkbox.checked; // Subscribe to changes

            this.checkbox.ionChange.subscribe(function (changes) {
              _this27.isChecked = changes.detail.checked;
            });
          }
        }]);

        return CheckboxWrapperComponent;
      }();

      CheckboxWrapperComponent.ctorParameters = function () {
        return [];
      };

      CheckboxWrapperComponent.propDecorators = {
        checkbox: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"],
          args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonCheckbox"]]
        }],
        isChecked: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['class.checkbox-checked']
        }]
      };
      CheckboxWrapperComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-checkbox-wrapper',
        template: _raw_loader_checkbox_wrapper_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_checkbox_wrapper_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], CheckboxWrapperComponent);
      /***/
    },

    /***/
    "gLxg":
    /*!*******************************************************************!*\
      !*** ./src/app/components/rating-input/rating-input.component.ts ***!
      \*******************************************************************/

    /*! exports provided: RatingInputComponent */

    /***/
    function gLxg(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RatingInputComponent", function () {
        return RatingInputComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_rating_input_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./rating-input.component.html */
      "2MtO");
      /* harmony import */


      var _rating_input_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./rating-input.component.scss */
      "reyE");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");

      var RatingInputComponent_1;

      var RatingInputComponent = RatingInputComponent_1 = /*#__PURE__*/function () {
        function RatingInputComponent() {
          _classCallCheck(this, RatingInputComponent);

          this.max = 5;
          this.readOnly = false;

          this.propagateChange = function () {}; // Noop function

        }

        _createClass(RatingInputComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var states = [];

            for (var i = 0; i < this.max; i++) {
              if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
              } else if (this.innerValue > i) {
                states[i] = 1;
              } else {
                states[i] = 0;
              }
            }

            this.range = states;
          }
        }, {
          key: "value",
          get: function get() {
            return this.innerValue;
          },
          set: function set(val) {
            if (val !== this.innerValue) {
              this.innerValue = val;
              this.propagateChange(val);
            }
          }
        }, {
          key: "writeValue",
          value: function writeValue(value) {
            if (value !== this.innerValue) {
              this.innerValue = value;
            }
          }
        }, {
          key: "registerOnChange",
          value: function registerOnChange(fn) {
            this.propagateChange = fn;
          }
        }, {
          key: "registerOnTouched",
          value: function registerOnTouched() {}
        }, {
          key: "rate",
          value: function rate(amount) {
            if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
              this.value = amount;
            }
          }
        }]);

        return RatingInputComponent;
      }();

      RatingInputComponent.propDecorators = {
        max: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }],
        readOnly: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      RatingInputComponent = RatingInputComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-rating-input',
        template: _raw_loader_rating_input_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [{
          provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
          useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function () {
            return RatingInputComponent_1;
          }),
          multi: true
        }],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
        styles: [_rating_input_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], RatingInputComponent);
      /***/
    },

    /***/
    "iSCB":
    /*!*********************************************************************************!*\
      !*** ./src/app/components/show-hide-password/show-hide-password.component.scss ***!
      \*********************************************************************************/

    /*! exports provided: default */

    /***/
    function iSCB(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ":host {\n  display: flex;\n  width: 100%;\n  align-items: center;\n}\n:host .type-toggle {\n  -webkit-padding-start: 0.5rem;\n          padding-inline-start: 0.5rem;\n}\n:host .type-toggle .show-option,\n:host .type-toggle .hide-option {\n  font-size: 1.2rem;\n  display: block;\n}\n:host .type-toggle .show-option:not(ion-icon),\n:host .type-toggle .hide-option:not(ion-icon) {\n  text-transform: uppercase;\n  font-size: 1rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Nob3ctaGlkZS1wYXNzd29yZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUFDSjtBQUNJO0VBQ0UsNkJBQUE7VUFBQSw0QkFBQTtBQUNOO0FBQ007O0VBRUUsaUJBQUE7RUFDQSxjQUFBO0FBQ1I7QUFFUTs7RUFDRSx5QkFBQTtFQUNBLGVBQUE7QUFDViIsImZpbGUiOiJzaG93LWhpZGUtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBcbiAgICAudHlwZS10b2dnbGUge1xuICAgICAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDAuNXJlbTtcbiAgXG4gICAgICAuc2hvdy1vcHRpb24sXG4gICAgICAuaGlkZS1vcHRpb24ge1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gIFxuICAgICAgICAvLyBJbiBjYXNlIHlvdSB3YW50IHRvIHVzZSB0ZXh0IGluc3RlYWQgb2YgaWNvbnNcbiAgICAgICAgJjpub3QoaW9uLWljb24pIHtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAiXX0= */";
      /***/
    },

    /***/
    "j1ZV":
    /*!*************************************************!*\
      !*** ./src/app/components/components.module.ts ***!
      \*************************************************/

    /*! exports provided: ComponentsModule */

    /***/
    function j1ZV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ComponentsModule", function () {
        return ComponentsModule;
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


      var _utils_shell_shell_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../utils/shell/shell.module */
      "270b");
      /* harmony import */


      var _checkbox_wrapper_checkbox_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./checkbox-wrapper/checkbox-wrapper.component */
      "fpyr");
      /* harmony import */


      var _show_hide_password_show_hide_password_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./show-hide-password/show-hide-password.component */
      "A0kb");
      /* harmony import */


      var _countdown_timer_countdown_timer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./countdown-timer/countdown-timer.component */
      "dAQS");
      /* harmony import */


      var _counter_input_counter_input_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./counter-input/counter-input.component */
      "lfmG");
      /* harmony import */


      var _rating_input_rating_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./rating-input/rating-input.component */
      "gLxg");
      /* harmony import */


      var _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./google-map/google-map.component */
      "aSMC");
      /* harmony import */


      var _chat_bubble_chat_bubble_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./chat-bubble/chat-bubble.component */
      "Ja7l");
      /* harmony import */


      var _elastic_textarea_elastic_textarea_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./elastic-textarea/elastic-textarea.component */
      "v1UO");
      /* harmony import */


      var _image_download_image_download__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./image-download/image-download */
      "xYRE");
      /* harmony import */


      var _custom_header_custom_header_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./custom-header/custom-header.component */
      "uuHY");
      /* harmony import */


      var _page_header_page_header_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./page-header/page-header.component */
      "tGzp");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! ./file-upload/file-upload.component */
      "ZntH");
      /* harmony import */


      var _slider_vertical_slider_vertical_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! ./slider-vertical/slider-vertical.component */
      "HAlI");
      /* harmony import */


      var _slider_horizontal_slider_horizontal_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! ./slider-horizontal/slider-horizontal.component */
      "Q5Wo");

      var ComponentsModule = function ComponentsModule() {
        _classCallCheck(this, ComponentsModule);
      };

      ComponentsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _utils_shell_shell_module__WEBPACK_IMPORTED_MODULE_5__["ShellModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _angular_router__WEBPACK_IMPORTED_MODULE_17__["RouterModule"]],
        declarations: [_checkbox_wrapper_checkbox_wrapper_component__WEBPACK_IMPORTED_MODULE_6__["CheckboxWrapperComponent"], _show_hide_password_show_hide_password_component__WEBPACK_IMPORTED_MODULE_7__["ShowHidePasswordComponent"], _countdown_timer_countdown_timer_component__WEBPACK_IMPORTED_MODULE_8__["CountdownTimerComponent"], _counter_input_counter_input_component__WEBPACK_IMPORTED_MODULE_9__["CounterInputComponent"], _rating_input_rating_input_component__WEBPACK_IMPORTED_MODULE_10__["RatingInputComponent"], _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_11__["GoogleMapComponent"], _image_download_image_download__WEBPACK_IMPORTED_MODULE_14__["ImageDownloadComponent"], _elastic_textarea_elastic_textarea_component__WEBPACK_IMPORTED_MODULE_13__["ElasticTextareaComponent"], _chat_bubble_chat_bubble_component__WEBPACK_IMPORTED_MODULE_12__["ChatBubbleComponent"], _custom_header_custom_header_component__WEBPACK_IMPORTED_MODULE_15__["CustomHeaderComponent"], _page_header_page_header_component__WEBPACK_IMPORTED_MODULE_16__["PageHeaderComponent"], _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_18__["FileUploadComponent"], _slider_vertical_slider_vertical_component__WEBPACK_IMPORTED_MODULE_19__["SliderVerticalComponent"], _slider_horizontal_slider_horizontal_component__WEBPACK_IMPORTED_MODULE_20__["SliderHorizontalComponent"]],
        exports: [_utils_shell_shell_module__WEBPACK_IMPORTED_MODULE_5__["ShellModule"], _checkbox_wrapper_checkbox_wrapper_component__WEBPACK_IMPORTED_MODULE_6__["CheckboxWrapperComponent"], _show_hide_password_show_hide_password_component__WEBPACK_IMPORTED_MODULE_7__["ShowHidePasswordComponent"], _countdown_timer_countdown_timer_component__WEBPACK_IMPORTED_MODULE_8__["CountdownTimerComponent"], _counter_input_counter_input_component__WEBPACK_IMPORTED_MODULE_9__["CounterInputComponent"], _rating_input_rating_input_component__WEBPACK_IMPORTED_MODULE_10__["RatingInputComponent"], _google_map_google_map_component__WEBPACK_IMPORTED_MODULE_11__["GoogleMapComponent"], _image_download_image_download__WEBPACK_IMPORTED_MODULE_14__["ImageDownloadComponent"], _elastic_textarea_elastic_textarea_component__WEBPACK_IMPORTED_MODULE_13__["ElasticTextareaComponent"], _chat_bubble_chat_bubble_component__WEBPACK_IMPORTED_MODULE_12__["ChatBubbleComponent"], _custom_header_custom_header_component__WEBPACK_IMPORTED_MODULE_15__["CustomHeaderComponent"], _page_header_page_header_component__WEBPACK_IMPORTED_MODULE_16__["PageHeaderComponent"], _file_upload_file_upload_component__WEBPACK_IMPORTED_MODULE_18__["FileUploadComponent"], _slider_vertical_slider_vertical_component__WEBPACK_IMPORTED_MODULE_19__["SliderVerticalComponent"], _slider_horizontal_slider_horizontal_component__WEBPACK_IMPORTED_MODULE_20__["SliderHorizontalComponent"]]
      })], ComponentsModule);
      /***/
    },

    /***/
    "jmeX":
    /*!***********************************************!*\
      !*** ./src/app/shared/classes/url-builder.ts ***!
      \***********************************************/

    /*! exports provided: UrlBuilder */

    /***/
    function jmeX(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UrlBuilder", function () {
        return UrlBuilder;
      });
      /* harmony import */


      var _query_string_parameters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./query-string-parameters */
      "S72r"); // Application Classes


      var UrlBuilder = /*#__PURE__*/function () {
        function UrlBuilder(baseUrl, action, queryString) {
          _classCallCheck(this, UrlBuilder);

          this.baseUrl = baseUrl;
          this.action = action;
          this.url = [baseUrl, action].join('/');
          this.queryString = queryString || new _query_string_parameters__WEBPACK_IMPORTED_MODULE_0__["QueryStringParameters"]();
        }

        _createClass(UrlBuilder, [{
          key: "toString",
          value: function toString() {
            var qs = this.queryString ? this.queryString.toString() : '';
            return qs ? "".concat(this.url, "?").concat(qs) : this.url;
          }
        }]);

        return UrlBuilder;
      }();
      /***/

    },

    /***/
    "k4KX":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/page-header/page-header.component.html ***!
      \*********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function k4KX(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div id=\"container\">\n  <div id=\"left\">\n    <ion-img class=\"icon-title\" src=\"{{this.icon}}\"></ion-img>\n  </div>\n  <div id=\"middle\">\n    <p class=\"titule\">{{this.title}}</p>\n  </div>\n  <div id=\"right\">\n    <div *ngIf=\"this.info\">\n    <ion-img (click)=\"presentAlert()\" src=\"assets/icons/interrogant.svg\" style=\"width: 24px;\">\n    </ion-img>\n  </div>\n</div>\n</div>\n\n";
      /***/
    },

    /***/
    "kLfG":
    /*!*****************************************************************************************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
      \*****************************************************************************************************************************************/

    /*! no static exports found */

    /***/
    function kLfG(module, exports, __webpack_require__) {
      var map = {
        "./ion-action-sheet.entry.js": ["dUtr", "common", 0],
        "./ion-alert.entry.js": ["Q8AI", "common", 1],
        "./ion-app_8.entry.js": ["hgI1", "common", 2],
        "./ion-avatar_3.entry.js": ["CfoV", "common", 3],
        "./ion-back-button.entry.js": ["Nt02", "common", 4],
        "./ion-backdrop.entry.js": ["Q2Bp", 5],
        "./ion-button_2.entry.js": ["0Pbj", "common", 6],
        "./ion-card_5.entry.js": ["ydQj", "common", 7],
        "./ion-checkbox.entry.js": ["4fMi", "common", 8],
        "./ion-chip.entry.js": ["czK9", "common", 9],
        "./ion-col_3.entry.js": ["/CAe", 10],
        "./ion-datetime_3.entry.js": ["WgF3", "common", 11],
        "./ion-fab_3.entry.js": ["uQcF", "common", 12],
        "./ion-img.entry.js": ["wHD8", 13],
        "./ion-infinite-scroll_2.entry.js": ["2lz6", 14],
        "./ion-input.entry.js": ["ercB", "common", 15],
        "./ion-item-option_3.entry.js": ["MGMP", "common", 16],
        "./ion-item_8.entry.js": ["9bur", "common", 17],
        "./ion-loading.entry.js": ["cABk", "common", 18],
        "./ion-menu_3.entry.js": ["kyFE", "common", 19],
        "./ion-modal.entry.js": ["TvZU", "common", 20],
        "./ion-nav_2.entry.js": ["vnES", "common", 21],
        "./ion-popover.entry.js": ["qCuA", "common", 22],
        "./ion-progress-bar.entry.js": ["0tOe", "common", 23],
        "./ion-radio_2.entry.js": ["h11V", "common", 24],
        "./ion-range.entry.js": ["XGij", "common", 25],
        "./ion-refresher_2.entry.js": ["nYbb", "common", 26],
        "./ion-reorder_2.entry.js": ["smMY", "common", 27],
        "./ion-ripple-effect.entry.js": ["STjf", 28],
        "./ion-route_4.entry.js": ["k5eQ", "common", 29],
        "./ion-searchbar.entry.js": ["OR5t", "common", 30],
        "./ion-segment_2.entry.js": ["fSgp", "common", 31],
        "./ion-select_3.entry.js": ["lfGF", "common", 32],
        "./ion-slide_2.entry.js": ["5xYT", 33],
        "./ion-spinner.entry.js": ["nI0H", "common", 34],
        "./ion-split-pane.entry.js": ["NAQR", 35],
        "./ion-tab-bar_2.entry.js": ["knkW", "common", 36],
        "./ion-tab_2.entry.js": ["TpdJ", "common", 37],
        "./ion-text.entry.js": ["ISmu", "common", 38],
        "./ion-textarea.entry.js": ["U7LX", "common", 39],
        "./ion-toast.entry.js": ["L3sA", "common", 40],
        "./ion-toggle.entry.js": ["IUOf", "common", 41],
        "./ion-virtual-scroll.entry.js": ["8Mb5", 42]
      };

      function webpackAsyncContext(req) {
        if (!__webpack_require__.o(map, req)) {
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          });
        }

        var ids = map[req],
            id = ids[0];
        return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function () {
          return __webpack_require__(id);
        });
      }

      webpackAsyncContext.keys = function webpackAsyncContextKeys() {
        return Object.keys(map);
      };

      webpackAsyncContext.id = "kLfG";
      module.exports = webpackAsyncContext;
      /***/
    },

    /***/
    "kyOO":
    /*!**********************************************!*\
      !*** ./src/app/services/language.service.ts ***!
      \**********************************************/

    /*! exports provided: LanguageService */

    /***/
    function kyOO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LanguageService", function () {
        return LanguageService;
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


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var LanguageService = /*#__PURE__*/function () {
        function LanguageService(translate) {
          _classCallCheck(this, LanguageService);

          this.translate = translate;
          this.languages = new Array();
          this.languages.push({
            name: 'Català',
            code: 'ca'
          }, {
            name: 'Español',
            code: 'es'
          }, {
            name: 'English',
            code: 'en'
          });
        }

        _createClass(LanguageService, [{
          key: "getLanguages",
          value: function getLanguages() {
            return this.languages;
          }
        }, {
          key: "changeLanguage",
          value: function changeLanguage(langCode) {
            this.translate.use(langCode);
          }
        }, {
          key: "getCurrent",
          value: function getCurrent() {
            var lang = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
            return lang;
          }
        }, {
          key: "getLanguageAPI",
          value: function getLanguageAPI() {
            var lang = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
            return lang == 'es' ? 'cs' : lang;
          }
        }]);

        return LanguageService;
      }();

      LanguageService.ctorParameters = function () {
        return [{
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]
        }];
      };

      LanguageService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], LanguageService);
      /***/
    },

    /***/
    "lfmG":
    /*!*********************************************************************!*\
      !*** ./src/app/components/counter-input/counter-input.component.ts ***!
      \*********************************************************************/

    /*! exports provided: counterRangeValidator, CounterInputComponent */

    /***/
    function lfmG(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "counterRangeValidator", function () {
        return counterRangeValidator;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CounterInputComponent", function () {
        return CounterInputComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_counter_input_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./counter-input.component.html */
      "sMFE");
      /* harmony import */


      var _counter_input_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./counter-input.component.scss */
      "e6VL");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");

      var CounterInputComponent_1;

      function counterRangeValidator(minValue, maxValue) {
        return function (c) {
          var err = {
            rangeError: {
              given: c.value,
              min: minValue || 0,
              max: maxValue || 10
            }
          };
          return c.value > +maxValue || c.value < +minValue ? err : null;
        };
      }

      var CounterInputComponent = CounterInputComponent_1 = /*#__PURE__*/function () {
        function CounterInputComponent() {
          _classCallCheck(this, CounterInputComponent);

          // tslint:disable-next-line:no-input-rename
          this._counterValue = 0;

          this.propagateChange = function () {}; // Noop function


          this.validateFn = function () {}; // Noop function

        }

        _createClass(CounterInputComponent, [{
          key: "counterValue",
          get: function get() {
            return this._counterValue;
          },
          set: function set(val) {
            this._counterValue = val;
            this.propagateChange(val);
          }
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(inputs) {
            if (inputs.counterRangeMax || inputs.counterRangeMin) {
              this.validateFn = counterRangeValidator(this.counterRangeMin, this.counterRangeMax);
            }
          }
        }, {
          key: "writeValue",
          value: function writeValue(value) {
            if (value) {
              this.counterValue = value;
            }
          }
        }, {
          key: "registerOnChange",
          value: function registerOnChange(fn) {
            this.propagateChange = fn;
          }
        }, {
          key: "registerOnTouched",
          value: function registerOnTouched() {}
        }, {
          key: "increase",
          value: function increase() {
            this.counterValue++;
          }
        }, {
          key: "decrease",
          value: function decrease() {
            this.counterValue--;
          }
        }, {
          key: "validate",
          value: function validate(c) {
            return this.validateFn(c);
          }
        }]);

        return CounterInputComponent;
      }();

      CounterInputComponent.propDecorators = {
        _counterValue: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['counterValue']
        }],
        counterRangeMax: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['max']
        }],
        counterRangeMin: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['min']
        }]
      };
      CounterInputComponent = CounterInputComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-counter-input',
        template: _raw_loader_counter_input_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [{
          provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
          useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function () {
            return CounterInputComponent_1;
          }),
          multi: true
        }, {
          provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALIDATORS"],
          useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])(function () {
            return CounterInputComponent_1;
          }),
          multi: true
        }],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
        styles: [_counter_input_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], CounterInputComponent);
      /***/
    },

    /***/
    "lhNS":
    /*!*********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/chat-bubble/chat-bubble.component.html ***!
      \*********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function lhNS(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<!-- Generated template for the ChatBubbleComponent component -->\n<ng-content></ng-content>\n<div>\n  <div class=\"chat-bubble {{message.from == 'message_response' ? 'right' : 'left'}} {{message.mediaType == 'UPLOADING' ? 'uploading' : ''}}\"   >\n    <div>\n      <div class=\"message\">{{message.fromName}}</div>\n    </div>\n    <div *ngIf=\"message.mediaType=='UPLOADING'\">\n      <div class=\"message\">\n        <div class=\"progress-outer\">\n          <div class=\"progress-inner\" [style.width]=\"message.percentage + '%'\">\n            {{message.percentage}} %\n          </div>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"message.mediaType=='TEXT'\">\n      <div class=\"message\" [innerHtml]=\"message.message\"></div>\n    </div>\n    <div *ngIf=\"message.mediaType=='GEOLOCATION'\">\n      <img [src]=\"'https://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lon+'&zoom=16&size=600x400&key=AIzaSyCSG5Itu_gLT4XZO2u3DK46Q-RCAVvPX5c'\">\n    </div>\n\n    <div *ngIf=\"message.mediaType=='PHOTO'\">\n      <image-download [url]=\"message.fileUrl\" [target]=\"message.timestamp\" [clickable]=\"true\"></image-download>\n    </div>\n    <div *ngIf=\"message.mediaType=='FILE'\">\n      <div class=\"message\" (click)=\"openFile(message)\"><a>Obrir arxiu</a></div>\n    </div>\n    <div class=\"message-detail\" style=\"float:right\">\n      <span>{{formatEpoch(message.timestamp)}}</span>\n    </div>\n  </div>\n</div>\n";
      /***/
    },

    /***/
    "n90K":
    /*!*********************************************!*\
      !*** ./src/app/services/storage.service.ts ***!
      \*********************************************/

    /*! exports provided: StorageService */

    /***/
    function n90K(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "StorageService", function () {
        return StorageService;
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


      var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/storage */
      "e8h1");

      var StorageService = /*#__PURE__*/function () {
        function StorageService(storage) {
          _classCallCheck(this, StorageService);

          this.storage = storage;
        }

        _createClass(StorageService, [{
          key: "saveFirstTimeLoad",
          value: function saveFirstTimeLoad(val) {
            this.storage.set('firstTime', val);
          }
        }, {
          key: "saveFirstTimeLoad2",
          value: function saveFirstTimeLoad2(val) {
            this.storage.set('firstTime2', val);
          }
        }, {
          key: "isFirstTimeLoad",
          value: function isFirstTimeLoad() {
            return this.storage.get("firstTime").then(function (result) {
              if (result == null) {
                //si no hay valor previo
                return true; //retornamos true
              }

              return result; //si hay valor guardado, devolvemos el valor
            })["catch"](function (err) {
              return false; //en caso de error, retornamos false
            });
          }
        }, {
          key: "isFirstTimeLoad2",
          value: function isFirstTimeLoad2() {
            return this.storage.get("firstTime2").then(function (result) {
              if (result == null) {
                //si no hay valor previo
                return true; //retornamos true
              }

              return result; //si hay valor guardado, devolvemos el valor
            })["catch"](function (err) {
              return false; //en caso de error, retornamos false
            });
          }
        }]);

        return StorageService;
      }();

      StorageService.ctorParameters = function () {
        return [{
          type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]
        }];
      };

      StorageService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], StorageService);
      /***/
    },

    /***/
    "nDLf":
    /*!********************************************************************!*\
      !*** ./src/app/utils/shell/aspect-ratio/aspect-ratio.component.ts ***!
      \********************************************************************/

    /*! exports provided: AspectRatioComponent */

    /***/
    function nDLf(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AspectRatioComponent", function () {
        return AspectRatioComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_aspect_ratio_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./aspect-ratio.component.html */
      "DsSi");
      /* harmony import */


      var _aspect_ratio_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./aspect-ratio.component.scss */
      "9W57");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AspectRatioComponent = /*#__PURE__*/function () {
        function AspectRatioComponent() {
          _classCallCheck(this, AspectRatioComponent);

          this.ratioPadding = '0px';
        }

        _createClass(AspectRatioComponent, [{
          key: "ratio",
          set: function set(ratio) {
            ratio = ratio !== undefined && ratio !== null ? ratio : {
              w: 1,
              h: 1
            };
            var heightRatio = ratio.h / ratio.w * 100 + '%'; // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)

            this.ratioPadding = '0px 0px ' + heightRatio + ' 0px';
          }
        }]);

        return AspectRatioComponent;
      }();

      AspectRatioComponent.ctorParameters = function () {
        return [];
      };

      AspectRatioComponent.propDecorators = {
        ratioPadding: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"],
          args: ['style.padding']
        }],
        ratio: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"]
        }]
      };
      AspectRatioComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-aspect-ratio',
        template: _raw_loader_aspect_ratio_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_aspect_ratio_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], AspectRatioComponent);
      /***/
    },

    /***/
    "nQZB":
    /*!**********************************************************!*\
      !*** ./src/app/interceptors/server-error.interceptor.ts ***!
      \**********************************************************/

    /*! exports provided: ServerErrorInterceptor */

    /***/
    function nQZB(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ServerErrorInterceptor", function () {
        return ServerErrorInterceptor;
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


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var ServerErrorInterceptor = /*#__PURE__*/function () {
        function ServerErrorInterceptor(router) {
          _classCallCheck(this, ServerErrorInterceptor);

          this.router = router;
        }

        _createClass(ServerErrorInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var _this28 = this;

            return next.handle(request).pipe( // TODO: SET RETRY TO 1
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (error) {
              console.log('ServerErrorInterceptor -> ', error);

              if (error.message == 'ERR_INTERNET_DISCONNECTED' || error.status == 0 || error.message == 'Timeout has occurred') {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error.message);
              } else if (error.status === 401) {
                _this28.router.navigate(['login']);

                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error.error.message);
              } else if (error.status === 400) {
                console.log('error 400');
                return [];
              } else if (error.status === 402) {
                console.log('error 402');
                return [];
              } else if (error.status === 404) {
                console.log('error 404');
                return [];
              } else if (error.status === 500) {
                console.log('err 500', error);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
              } else {
                console.log('error code not found ', error);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
              }
            }));
          }
        }]);

        return ServerErrorInterceptor;
      }();

      ServerErrorInterceptor.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }];
      };

      ServerErrorInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], ServerErrorInterceptor);
      /***/
    },

    /***/
    "raSH":
    /*!**********************************************************!*\
      !*** ./src/app/interceptors/fake-backend.interceptor.ts ***!
      \**********************************************************/

    /*! exports provided: FakeBackendInterceptor, fakeBackendProvider */

    /***/
    function raSH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FakeBackendInterceptor", function () {
        return FakeBackendInterceptor;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "fakeBackendProvider", function () {
        return fakeBackendProvider;
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


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var FakeBackendInterceptor = /*#__PURE__*/function () {
        function FakeBackendInterceptor() {
          _classCallCheck(this, FakeBackendInterceptor);
        }

        _createClass(FakeBackendInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var url = request.url,
                method = request.method,
                headers = request.headers,
                body = request.body; // wrap in delayed observable to simulate server api call

            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(handleRoute)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["materialize"])()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(500)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["dematerialize"])());

            function handleRoute() {
              switch (true) {
                case url.includes('login') && method === 'POST':
                  return authenticate();

                case url.endsWith('/user/informationUser') && method === 'GET':
                  return informationUser();

                case url.endsWith('/user/legal') && method === 'GET':
                  return legalInformation();

                case url.endsWith('user/legal') && method === 'POST':
                  return confirmLegal();

                case url.endsWith('/user/element/goals') && method === 'GET':
                  return goalsUser();

                case url.endsWith('/user/profiles') && method === 'GET':
                  return userProfile();

                case url.endsWith('user/changePassword') && method === 'POST':
                  return changePassword();

                case url.endsWith('user/smsVerification') && method === 'POST':
                  return smsVerification();

                case url.endsWith('user/smsConfirmation') && method === 'POST':
                  return smsConfirmation();

                case url.endsWith('user/familyUnit') && method === 'GET':
                  return familyUnit();

                case url.endsWith('user/healthCards') && method === 'GET':
                  return getAPhealthCards();

                default:
                  // pass through any requests not handled above 
                  return next.handle(request);
              }
            }

            function authenticate() {
              return ok({
                success: true,
                idUser: 15183,
                message: "Success! you are logged in successfully",
                //token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGRmMmJhODUzNjEwYTk2MmExZWNmYjI5YWIyZTUyOTY4NzI2NTI2MmMyNmQ3MjY5MzI1Y2U5ODEyMWZkYWIzNjE1ODFmOGI3ZDZkNDcyMmMiLCJpYXQiOjE2MjEyNzA0NzIsIm5iZiI6MTYyMTI3MDQ3MiwiZXhwIjoxNjUyODA2NDcyLCJzdWIiOiIxNTE4MyIsInNjb3BlcyI6W119.flXERBucYoy2Rywip-eZ7SV91Mc9laXGoS2wiIbbTSH7cC8cHvJKIGuHnrSXQdc0ZZzvnEaLUTIRwkIbPPStFhiZFsCBY88ji5qFGicyQu2xs5095QONUTeip-TWPDe4eSLrW4-5AKkDGwfR2-DhTUbkQeNxiviW77vu-pxv1vZM7ogzfs1NzD2Z-a6Ejp96sd1pz_ILheT7Z03jZj45ZAXdB5CsgD6FIqiN0U7bxv6xwjqHtM1iWzQSk-79aRQua6WPn3IqhafulN1fCsSNqF3pJIHAKSBKOjdAH-r5MOohjaPvmnsOojj1wE8EjG7WJZLaadsInt1prp-zGiOGyMoHNmTK75V_30Xm7sG019EBuzBTqn5jwu9v5AjGVuruYzaqwpqyTT3zSzjektR5SJMNBuO8-2t9m2wwwKSSDEGmu75lMRsc9rM7JErA931h27CI0k4jAIXbCUODVSwGzBcQleaS45cRY0GHxpI65c3qtetNFotR9Q_TWdQpp0PcCAMHO1D3hzQgJue_awpzYqdKwT3MteL4IH_zcsgP6XfYIsKOznku2UfY1UO4ZpUlnE_ZbXSB5-_WIySBzEj9nsnDw5WNooJH5iz9vxzNjOeSdgvC9ZopfWPnWJDoSjl0fjYS4ZZyWqxRofOTmjPC_u7uz4AbWZZTT_SE1u1MUQM",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWUwNzAyMzQ2Mjc5NDNiNGI3ZjdkNGIwMGRjOTdlNmZjYmY1N2FmNTg1MDhmMDk5MmEwOWQyNWU0Yjk4MDcxMmU5MmQzOGIyMjM3MWJjYTciLCJpYXQiOjE2MjIwMjQ5MTAsIm5iZiI6MTYyMjAyNDkxMCwiZXhwIjoxNjUzNTYwOTEwLCJzdWIiOiIxNTE4MyIsInNjb3BlcyI6W119.CDMeoHnmdnGG06pFiyD7gJ4ukOqxt5Xey1etsRuLr5vmq3BOHryyKKxAbWS737o9gD-kAIOwtbqioYV-QG5DfdLulEFrV49IHelZS9k3j3apNFToeUF5vqoA1XrRp8faHqrjIRGSfHK76Pak0hQ4p-cMIv8-wFmxPJJDqfkiyhuKoPry2wcXucywggjtRD3b7fpsP524aubogv-aGHkUnRjPyZlKYFMwOzOL3Q3aNoZ9Ak8wxMcgRT_AhR1Di276XXRnr62XE5Z1P4J28y1shMjeMJcZkacIDHVw8sguL1T3BC39O-SLhAwTzADLT43U2ixJFYQGUWkovvIagHL60VmUEgX63mUOnUctSir3vmUQB8Tn9Jyo8q7Q11hUrG--1SyDBimKZUtZk_6mMTY1w4HQhAGwkoBXp6aUWpskuTDMbBLutfYR8Q5rCeICJtcUstg4Eqt8bVIK-DPj_vpFrLBG97nIOcrjYjLiUA7_IhHsFeSaWeKjZBJnASkqtsgfUDW__WEw8LR6cVoU0IDzhhxfVBy0ic_NhaqqppC-KyhSrUmt6ppZH5QvW8j4NBCTZfaWt5LfT9DCpTUQ-N6v8tjdPL4uyvFfzE3Qk2HYnnXc_X6MQh-AtsycOHIdMpnwUCUoOVfj62LzL7kYNmC32ZzZ_KMSJ8zAuRKiQDCT88E",
                roles: ["patient", "staff", "superadmin"],
                //firebaseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay15cnc1aUBjb3ZpZC0zOWI5Ni5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXlydzVpQGNvdmlkLTM5Yjk2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbVwvZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJ1aWQiOiIxNTE4MyIsImlhdCI6MTYyMTI3MDQ3MiwiZXhwIjoxNjIxMjc0MDcyfQ.NqEtC0WbUdKdBYvw29FoGVQRwy765fMfsFeLRZsfXWJ85mUb0467cXFsglpiFx0b0gzkjS4hVGmJAHwmQZyCsiBzUiUZiiuLpWo2w3BgBpqVMWoG2cjmx-_V7MNLtYoeCKpN8Yi6cYdHVEf_qSxyMbOga5jUnR4RozL4oF_o26PKhdJkBEN2bl98epdB4so9drY8NtWdVCdZCyaZA3KB65y-mwu02lawA6v_JVELVRmtV-GrRX8d8gDvo2tOusGkVqEipN9IFtnAGX4heIoD_g1ySpeLPFMjrDwU8KxD5I6z487gA7U58tvCZrw9QhsRsDRQs7dsMUMptV5AR8xWtw",
                firebaseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay15cnc1aUBjb3ZpZC0zOWI5Ni5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXlydzVpQGNvdmlkLTM5Yjk2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbVwvZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJ1aWQiOiIxNTE4MyIsImlhdCI6MTYyMjAyNDkxMCwiZXhwIjoxNjIyMDI4NTEwfQ.emChHusTaUnIsJLoj3DbYahGwqlumm8iAbS3Hxf3JteKW-v-_JjrprSWjkvkWw60ZO6leaeW8TDR4hPr23e6-J_zUiu9ZX0qdJTM4pL3EUyQskPqs_ZImnZg7h4K0-BYxTly9-OoqPCqkncxjX0dfeKaufkl3E20LshXThvXMG1rv49HhuNtdd3oDwQF97ttu-HJlxdt6rssf3EtgYBgmQaMOfh43kbZhNMDbI0MkDl-IfmtfjRx4dB3grZ2NVxtR0Bsg5IZxHFqes-77Y8GTIASyMs7SW7JwnNLm3W1bBnsZn7djsmLfPyRUHlCKrzvZUhy7TzwyyEIz-IktoHSXA",
                familyUnit: []
              });
            }

            function smsVerification() {
              return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
              });
            }

            function smsConfirmation() {
              return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
              });
            }

            function changePassword() {
              return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
              });
            }

            function userProfile() {
              return ok({
                idUser: 15183,
                image: 'assets/icons/Mi Perfil.svg',
                first_name: 'David',
                last_name: 'Valarezo León',
                blood_group: 'O+',
                birthdate_european: null,
                gender: 'Masculino',
                weight: '53 Kg',
                height: '165 cm',
                diagnostics: ['Diabetes', 'Anemia'],
                allergies: ['Melocotón', 'Frutos secos']
              });
            }

            function informationUser() {
              return ok({
                username: 'David Valarezo León',
                idUser: 15183,
                image: 'assets/icons/Mi Perfil.svg',
                agendas: [{
                  id: 668,
                  title: 'Dermatología',
                  doctor: 'Dr. Ricardo Sánchez',
                  description: '',
                  start_time: "11:00",
                  start_date: "31/05/2021 11:00",
                  end_date: "31/05/2021 11:15",
                  start_date_iso8601: "2021-05-31T11:00:00+02:00",
                  hide: false
                }, {
                  id: 669,
                  title: 'Cardiología',
                  doctor: 'Dra. Viviana Molina',
                  description: '',
                  start_time: "09:00",
                  start_date: "30/06/2021 09:00",
                  end_date: "30/06/2021 09:00",
                  start_date_iso8601: "2021-06-30T09:00:00+02:00",
                  hide: false
                }, {
                  id: 889,
                  title: 'Pediatría',
                  doctor: 'Dr. Antonio Castellanos Mejía',
                  description: '',
                  start_time: "12:00",
                  start_date: "20/09/2021 12:00",
                  end_date: "20/09/2021 12:00",
                  start_date_iso8601: "2021-09-20T12:00:00+02:00",
                  hide: false
                }],
                advices: [{
                  name: "Vídeo - Què és el coronavirus/ Qué es el coronavirus?",
                  id: 1,
                  image: 'https://www.emaratalyoum.com/polopoly_fs/1.1438180.1610014833!/image/image.jpg',
                  description: 'Plazo para reserva tu cita online abierto. Este año #yomevacuno'
                }, {
                  name: "Aïllament / Aislamiento domiciliario",
                  id: 2,
                  image: 'https://eleconomista.com.ar/wp-content/uploads/2020/05/coronavirus-vaccine-bottles-1024x576.jpg',
                  description: 'Plazo para reserva tu cita online abierto. Este año #yomevacuno'
                }, {
                  name: "Vídeo - Per què hi ha tantes mesures de contenció front al coronavirus",
                  id: 3,
                  image: null,
                  description: 'Plazo para reserva tu cita online abierto. Este año #yomevacuno'
                }],
                diets: [{
                  name: "Desayuno",
                  id: 0,
                  hour: '09:00',
                  start_date: "30/06/2021 09:00",
                  image: null,
                  description: "Yogurt desnatado con semillas de linaza"
                }, {
                  name: "Almuerzo",
                  id: 1,
                  hour: '12:00',
                  start_date: "30/06/2021 12:00",
                  image: null,
                  description: "Yogurt desnatado con semillas de linaza, frutos secos"
                }, {
                  name: "Hora del Café",
                  id: 0,
                  hour: '15:00',
                  start_date: "30/06/2021 15:00",
                  image: null,
                  description: "Café negro, 2 croissant de chocolate"
                }, {
                  name: "Cena",
                  id: 2,
                  hour: '18:00',
                  start_date: "30/06/2021 18:00",
                  image: null,
                  description: "Rollitos de queso"
                }, {
                  name: "Merienda",
                  id: 3,
                  hour: '21:00',
                  start_date: "30/06/2021 21:00",
                  image: null,
                  description: "Jamón de pavo, Rollitos de queso"
                }],
                drugs: [{
                  id: 1,
                  name: "Prueba Ibuprofeno (1g)",
                  date_intake: "2021-05-17 12:00:00",
                  hour_intake: "12:00"
                }, {
                  id: 2,
                  name: "Cefazolina (500 mg)",
                  date_intake: "2021-05-17 12:30:00",
                  hour_intake: "12:30"
                }, {
                  id: 3,
                  name: "Cefuroxima Apotex (200 mg)",
                  date_intake: "2021-05-17 18:00:00",
                  hour_intake: "18:00"
                }, {
                  id: 4,
                  name: "Gamalate B6 (500 mg)",
                  date_intake: "2021-05-17 12:30:00",
                  hour_intake: "12:30"
                }, {
                  id: 5,
                  name: "Pastilla Cetirizina (20 mg)",
                  date_intake: "2021-05-17 18:00:00",
                  hour_intake: "18:00"
                }],
                games: [{
                  name: "Epidemia The Game",
                  id: 4
                }, {
                  name: "Epidemia The Game II",
                  id: 46
                }],
                goals: [{
                  id: 66,
                  name: 'Peso',
                  description: "Continua realizando los retos para bajar de peso",
                  min: 0,
                  max: 10,
                  steps: 0.6
                }, {
                  id: 67,
                  name: 'Temperatura',
                  description: "Continua realizando los retos y alcanza tu objetivo",
                  min: 0,
                  max: 10,
                  steps: 0.3
                }, {
                  id: 68,
                  name: 'Correr',
                  description: "Kilometros recorridos",
                  min: 0,
                  max: 100,
                  steps: 0.53
                }]
              });
            }

            function goalsUser() {
              {
                return ok({
                  success: true,
                  goals: [{
                    id: 22,
                    user_id: 12473,
                    element_id: 71,
                    from_date: "2020-11-29 00:00:00",
                    to_date: null,
                    goalType: "a<x<b",
                    value1: "65",
                    value2: "68",
                    frequency: "daily",
                    score: 10,
                    created_at: "2020-11-30T09:56:45.000000Z",
                    updated_at: "2020-11-30T09:56:45.000000Z",
                    deleted_at: null,
                    typeString: " Entre 65 y 68",
                    frequencyString: "Cada dia",
                    element: {
                      id: 71,
                      center_id: 10,
                      name: "Peso",
                      element_type: "constant",
                      element_group_id: 2,
                      description: null,
                      min: "0",
                      max: "1000",
                      steps: "0",
                      data_type: "numeric",
                      ext_code: "weight",
                      ext_id: null,
                      order: null,
                      units: "",
                      element_unit_id: 57,
                      vat_id: null,
                      price: null,
                      created_at: "2020-08-19T09:26:15.000000Z",
                      updated_at: "2021-02-24T11:16:31.000000Z",
                      deleted_at: null,
                      name_for_form: "Peso",
                      element_unit: {
                        id: 57,
                        center_id: 10,
                        name: "Kilogramos",
                        abbreviation: "kg",
                        description: null,
                        ext_code: "",
                        created_at: "2020-08-19T09:25:53.000000Z",
                        updated_at: "2020-08-19T09:25:53.000000Z",
                        deleted_at: null
                      }
                    }
                  }, {
                    id: 27,
                    user_id: 12473,
                    element_id: 71,
                    from_date: null,
                    to_date: null,
                    goalType: "<",
                    value1: "65",
                    value2: null,
                    frequency: "daily",
                    score: 10,
                    created_at: "2021-04-08T15:57:42.000000Z",
                    updated_at: "2021-04-08T15:57:42.000000Z",
                    deleted_at: null,
                    typeString: " Menor que 65",
                    frequencyString: "Cada dia",
                    element: {
                      id: 71,
                      center_id: 10,
                      name: "Peso",
                      element_type: "constant",
                      element_group_id: 2,
                      description: null,
                      min: "0",
                      max: "1000",
                      steps: "0",
                      data_type: "numeric",
                      ext_code: "weight",
                      ext_id: null,
                      order: null,
                      units: "",
                      element_unit_id: 57,
                      vat_id: null,
                      price: null,
                      created_at: "2020-08-19T09:26:15.000000Z",
                      updated_at: "2021-02-24T11:16:31.000000Z",
                      deleted_at: null,
                      name_for_form: "Peso",
                      element_unit: {
                        id: 57,
                        center_id: 10,
                        name: "Kilogramos",
                        abbreviation: "kg",
                        description: null,
                        ext_code: "",
                        created_at: "2020-08-19T09:25:53.000000Z",
                        updated_at: "2020-08-19T09:25:53.000000Z",
                        deleted_at: null
                      }
                    }
                  }, {
                    id: 27,
                    user_id: 12473,
                    element_id: 71,
                    from_date: null,
                    to_date: "2021-10-29 00:00:00",
                    goalType: "<",
                    value1: "65",
                    value2: null,
                    frequency: "daily",
                    score: 6,
                    created_at: "2021-04-08T15:57:42.000000Z",
                    updated_at: "2021-04-08T15:57:42.000000Z",
                    deleted_at: null,
                    typeString: " Menor que 65",
                    frequencyString: "Cada dia",
                    element: {
                      id: 71,
                      center_id: 10,
                      name: "Peso",
                      element_type: "constant",
                      element_group_id: 2,
                      description: null,
                      min: "0",
                      max: "1000",
                      steps: "0",
                      data_type: "numeric",
                      ext_code: "weight",
                      ext_id: null,
                      order: null,
                      units: "",
                      element_unit_id: 57,
                      vat_id: null,
                      price: null,
                      created_at: "2020-08-19T09:26:15.000000Z",
                      updated_at: "2021-02-24T11:16:31.000000Z",
                      deleted_at: null,
                      name_for_form: "Peso",
                      element_unit: {
                        id: 57,
                        center_id: 10,
                        name: "Kilogramos",
                        abbreviation: "kg",
                        description: null,
                        ext_code: "",
                        created_at: "2020-08-19T09:25:53.000000Z",
                        updated_at: "2020-08-19T09:25:53.000000Z",
                        deleted_at: null
                      }
                    }
                  }, {
                    id: 27,
                    user_id: 12473,
                    element_id: 71,
                    from_date: "2021-1-29 00:00:00",
                    to_date: "2021-12-29 00:00:00",
                    goalType: "<",
                    value1: "65",
                    value2: null,
                    frequency: "daily",
                    score: 7,
                    created_at: "2021-04-08T15:57:42.000000Z",
                    updated_at: "2021-04-08T15:57:42.000000Z",
                    deleted_at: null,
                    typeString: " Menor que 65",
                    frequencyString: "Cada dia",
                    element: {
                      id: 71,
                      center_id: 10,
                      name: "Peso",
                      element_type: "constant",
                      element_group_id: 2,
                      description: null,
                      min: "0",
                      max: "1000",
                      steps: "0",
                      data_type: "numeric",
                      ext_code: "weight",
                      ext_id: null,
                      order: null,
                      units: "",
                      element_unit_id: 57,
                      vat_id: null,
                      price: null,
                      created_at: "2020-08-19T09:26:15.000000Z",
                      updated_at: "2021-02-24T11:16:31.000000Z",
                      deleted_at: null,
                      name_for_form: "Peso",
                      element_unit: {
                        id: 57,
                        center_id: 10,
                        name: "Kilogramos",
                        abbreviation: "kg",
                        description: null,
                        ext_code: "",
                        created_at: "2020-08-19T09:25:53.000000Z",
                        updated_at: "2020-08-19T09:25:53.000000Z",
                        deleted_at: null
                      }
                    }
                  }]
                });
              }
            }

            function familyUnit() {
              return ok([{
                id: 12737,
                name: "Castañeda, Juanito",
                initials: "CJ",
                age: null,
                thumbnail: "https://via.placeholder.com/300x300.png?text=CJ",
                family_relationship: "Relación familiar"
              }, {
                id: 13015,
                name: "adjunto, Tania",
                initials: "AD",
                age: null,
                thumbnail: "https://via.placeholder.com/300x300.png?text=AD",
                family_relationship: "Relación familiar"
              }]);
            }

            function getAPhealthCards() {
              return ok([{
                id: 12737,
                name: "Seguridad Social",
                modality: "Mutuas Seguros",
                affiliation_number: "0006852369517",
                expiration_date: "2022-04-01T15:57:42.000000Z",
                thumbnail: "https://via.placeholder.com/300x200/09f/fff?text=Seguridad+S"
              }, {
                id: 13015,
                name: "Seguro Asisa",
                modality: "Sanidad Pública",
                affiliation_number: "147852369517",
                expiration_date: "2023-08-08T15:57:42.000000Z",
                thumbnail: "https://via.placeholder.com/300x300.png?text=AD"
              }, {
                id: 12739,
                name: "Cat Salut",
                modality: "Sanidad Publica",
                affiliation_number: "VALE0900413002",
                expiration_date: null,
                thumbnail: "https://via.placeholder.com/300x200/09f/fff?text=Seguridad+S"
              }, {
                id: 13089,
                name: "Seguros Catalana Occidente",
                modality: "Sanidad Privada",
                affiliation_number: "DDD 007852369517",
                expiration_date: "2021-04-15T15:57:42.000000Z",
                thumbnail: "https://via.placeholder.com/300x300.png?text=AD"
              }]);
            }

            function confirmLegal() {
              return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
              });
            }

            function legalInformation() {
              return ok({
                id: 12737,
                title: "PRIVACIDAD Y TRATAMIENTO DE LA INFORMACIÓN Doole Health",
                introduction: ["La App de Doole Health es una aplicación que facilita la comunicación entre usuarios y profesionales sanitarios así como determinadas actividades sanitarias y " + "de atención social. Su objetivo es sustituir aquellas actividades o acciones presenciales susceptibles de realizarse a distancia para su mayor comodidad, mejora de la atención prestada, disminución de desplazamientos -y contaminación asociada- y optimización de los recursos disponibles.", "Al utilizarla, usted está dando su consentimiento para que los profesionales " + "sanitarios o sociosanitarios se comuniquen con usted por este medio a través de " + "mensajería segura, videoconferencia u otros sistemas de comunicación o almacenaje " + "de información.", "Estos sistemas no evitan que usted en cualquier momento pueda utilizar " + "los canales de atención convencionales (presencia física, comunicación " + "telefónica, etc). De hecho, si por cualquier motivo usted no recibe una " + "respuesta adecuada a través de +Apropp, deberá recurrir a estos canales " + "convencionales.", "La App de Doole Health es pues una herramienta que quiere hacerle la vida más fácil pero " + "como el tipo de información y datos con los que trabaja son de alta " + "confidencialidad (aspecto que nos tomamos como de máxima importancia) " + "queremos detallarle los aspectos legales de esta relación."],
                sections: [{
                  title: "1.- DERECHO DE INFORMACIÓN",
                  description: ["De acuerdo con lo dispuesto en el artículo 11 de la Ley Orgánica 3/2018, de " + "5 de diciembre, de Protección de Datos Personales y garantía de los " + "derechos digitales (en adelante LOPDGDD) y el artículo 13 del Reglamento " + "General de Protección de datos 2016/679 le informamos de:"]
                }]
              });
            } // helper functions


            function ok(body) {
              console.log("fake backend for :", url);
              console.log("fake backend response :", body);
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]({
                status: 200,
                body: body
              }));
            }
          }
        }]);

        return FakeBackendInterceptor;
      }();

      FakeBackendInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], FakeBackendInterceptor);
      var fakeBackendProvider = {
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
        useClass: FakeBackendInterceptor,
        multi: true
      };
      /***/
    },

    /***/
    "reyE":
    /*!*********************************************************************!*\
      !*** ./src/app/components/rating-input/rating-input.component.scss ***!
      \*********************************************************************/

    /*! exports provided: default */

    /***/
    function reyE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "app-rating-input {\n  --rating-background: transparent;\n  --rating-color: #000;\n  --rating-size: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\napp-rating-input ion-button.rating-icon {\n  --background: var(--rating-background);\n  --color: var(--rating-color);\n  --color-activated: var(--rating-color);\n  --box-shadow: none;\n  --padding-bottom: 0px;\n  --padding-end: 4px;\n  --padding-start: 4px;\n  --padding-top: 0px;\n  margin: 0px;\n  flex: 1;\n  width: var(--rating-size);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3JhdGluZy1pbnB1dC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdDQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUVBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQUY7QUFFQztFQUNHLHNDQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFFQSxXQUFBO0VBQ0YsT0FBQTtFQUNDLHlCQUFBO0FBREgiLCJmaWxlIjoicmF0aW5nLWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYXBwLXJhdGluZy1pbnB1dCB7XG4gIC0tcmF0aW5nLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLXJhdGluZy1jb2xvcjogIzAwMDtcbiAgLS1yYXRpbmctc2l6ZTogMzJweDtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuXG5cdGlvbi1idXR0b24ucmF0aW5nLWljb24ge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0tcmF0aW5nLWJhY2tncm91bmQpO1xuICAgIC0tY29sb3I6IHZhcigtLXJhdGluZy1jb2xvcik7XG4gICAgLS1jb2xvci1hY3RpdmF0ZWQ6IHZhcigtLXJhdGluZy1jb2xvcik7XG4gICAgLS1ib3gtc2hhZG93OiBub25lO1xuICAgIC0tcGFkZGluZy1ib3R0b206IDBweDtcbiAgICAtLXBhZGRpbmctZW5kOiA0cHg7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA0cHg7XG4gICAgLS1wYWRkaW5nLXRvcDogMHB4O1xuXG4gICAgbWFyZ2luOiAwcHg7XG5cdFx0ZmxleDogMTtcblx0ICB3aWR0aDogdmFyKC0tcmF0aW5nLXNpemUpO1xuXHR9XG59XG4iXX0= */";
      /***/
    },

    /***/
    "riPR":
    /*!********************************************!*\
      !*** ./src/app/services/events.service.ts ***!
      \********************************************/

    /*! exports provided: Events */

    /***/
    function riPR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "Events", function () {
        return Events;
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


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /**
       * A custom Events service just like Ionic 3 Events https://ionicframework.com/docs/v3/api/util/Events/ which got removed in Ionic 5.
       *
       * @author Shashank Agrawal
       */


      var Events = /*#__PURE__*/function () {
        function Events() {
          _classCallCheck(this, Events);

          this.channels = {};
        }
        /**
         * Subscribe to a topic and provide a single handler/observer.
         * @param topic The name of the topic to subscribe to.
         * @param observer The observer or callback function to listen when changes are published.
         *
         * @returns Subscription from which you can unsubscribe to release memory resources and to prevent memory leak.
         */


        _createClass(Events, [{
          key: "subscribe",
          value: function subscribe(topic, observer) {
            console.log("subscribe topic: ", topic);

            if (!this.channels[topic]) {
              // You can also use ReplaySubject with one concequence
              this.channels[topic] = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
            }

            return this.channels[topic].subscribe(observer);
          }
          /**
           * Publish some data to the subscribers of the given topic.
           * @param topic The name of the topic to emit data to.
           * @param data data in any format to pass on.
           */

        }, {
          key: "publish",
          value: function publish(topic, data) {
            var subject = this.channels[topic];

            if (!subject) {
              // Or you can create a new subject for future subscribers
              return;
            }

            subject.next(data);
          }
          /**
           * When you are sure that you are done with the topic and the subscribers no longer needs to listen to a particular topic, you can
           * destroy the observable of the topic using this method.
           * @param topic The name of the topic to destroy.
           */

        }, {
          key: "destroy",
          value: function destroy(topic) {
            var subject = this.channels[topic];

            if (!subject) {
              return;
            }

            subject.complete();
            delete this.channels[topic];
          }
        }]);

        return Events;
      }();

      Events = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], Events);
      /***/
    },

    /***/
    "sMFE":
    /*!*************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/counter-input/counter-input.component.html ***!
      \*************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function sMFE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div class=\"button-outer\">\n  <div class=\"button-wrapper\">\n    <ion-button class=\"counter-icon\" (click)=\"decrease()\">\n      <ion-icon slot=\"icon-only\" name=\"remove\"></ion-icon>\n    </ion-button>\n  </div>\n</div>\n<span class=\"counter-value\">{{ _counterValue }}</span>\n<div class=\"button-outer\">\n  <div class=\"button-wrapper\">\n    <ion-button class=\"counter-icon\" (click)=\"increase()\">\n      <ion-icon slot=\"icon-only\" name=\"add\"></ion-icon>\n    </ion-button>\n  </div>\n</div>\n";
      /***/
    },

    /***/
    "sSwE":
    /*!*****************************************************************************!*\
      !*** ./src/app/components/elastic-textarea/elastic-textarea.component.scss ***!
      \*****************************************************************************/

    /*! exports provided: default */

    /***/
    function sSwE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "/** Ionic CSS Variables **/\n:root {\n  /** font-family **/\n  --ion-font-family: \"Roboto-Regular\"!important;\n  /** background **/\n  --ion-background-color:#E5E5E5;\n  /** primary **/\n  --ion-color-primary: #3498DB;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #02859c;\n  --ion-color-primary-tint: #ca9b01;\n  /** secondary **/\n  --ion-color-secondary: #009cb3;\n  --ion-color-secondary-rgb: 61, 194, 255;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #36abe0;\n  --ion-color-secondary-tint: #50c8ff;\n  /** tertiary **/\n  --ion-color-tertiary: #F39C12;\n  --ion-color-tertiary-rgb: 82, 96, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #4854e0;\n  --ion-color-tertiary-tint: #6370ff;\n  /** success **/\n  --ion-color-success: #2dd36f;\n  --ion-color-success-rgb: 45, 211, 111;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #28ba62;\n  --ion-color-success-tint: #42d77d;\n  /** warning **/\n  --ion-color-warning: #ffc409;\n  --ion-color-warning-rgb: 255, 196, 9;\n  --ion-color-warning-contrast: #000000;\n  --ion-color-warning-contrast-rgb: 0, 0, 0;\n  --ion-color-warning-shade: #e0ac08;\n  --ion-color-warning-tint: #ffca22;\n  /** danger **/\n  --ion-color-danger: #eb445a;\n  --ion-color-danger-rgb: 235, 68, 90;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #cf3c4f;\n  --ion-color-danger-tint: #ed576b;\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 36, 40;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n  /** medium **/\n  --ion-color-medium: #92949c;\n  --ion-color-medium-rgb: 146, 148, 156;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #808289;\n  --ion-color-medium-tint: #9d9fa6;\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 245, 248;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9;\n}\n.custom-loading .ion-loading {\n  background-color: white;\n  --spinner-color: --ion-color-primary;\n  box-shadow: none;\n}\n.custom-loading ion-backdrop {\n  background-color: white;\n  --backdrop-opacity: 1;\n}\n.custom-loading .loading-wrapper {\n  background-color: white;\n  --spinner-color: --ion-color-primary;\n  box-shadow: none;\n}\nelastic-textarea .text-input {\n  margin: 6px 10px !important;\n  padding: 0;\n  width: calc(100% - 20px) !important;\n}\nelastic-textarea ion-textarea {\n  border: 1px solid #fff;\n  border-radius: 18px;\n  background-color: #F6F8FA;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RoZW1lL3ZhcmlhYmxlcy5zY3NzIiwiLi4vLi4vLi4vLi4vZWxhc3RpYy10ZXh0YXJlYS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSwwQkFBQTtBQTBCQTtFQUVFLGtCQUFBO0VBQ0EsNkNBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsY0FBQTtFQUNBLDRCQUFBO0VBQ0EscUNBQUE7RUFDQSxxQ0FBQTtFQUNBLCtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxpQ0FBQTtFQUVBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSx1Q0FBQTtFQUNBLHVDQUFBO0VBQ0EsaURBQUE7RUFDQSxvQ0FBQTtFQUNBLG1DQUFBO0VBRUEsZUFBQTtFQUNBLDZCQUFBO0VBQ0EscUNBQUE7RUFDQSxzQ0FBQTtFQUNBLGdEQUFBO0VBQ0EsbUNBQUE7RUFDQSxrQ0FBQTtFQUVBLGNBQUE7RUFDQSw0QkFBQTtFQUNBLHFDQUFBO0VBQ0EscUNBQUE7RUFDQSwrQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsaUNBQUE7RUFFQSxjQUFBO0VBQ0EsNEJBQUE7RUFDQSxvQ0FBQTtFQUNBLHFDQUFBO0VBQ0EseUNBQUE7RUFDQSxrQ0FBQTtFQUNBLGlDQUFBO0VBRUEsYUFBQTtFQUNBLDJCQUFBO0VBQ0EsbUNBQUE7RUFDQSxvQ0FBQTtFQUNBLDhDQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQ0FBQTtFQUVBLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0Esa0NBQUE7RUFDQSw0Q0FBQTtFQUNBLCtCQUFBO0VBQ0EsOEJBQUE7RUFFQSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxxQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsOENBQUE7RUFDQSxpQ0FBQTtFQUNBLGdDQUFBO0VBRUEsWUFBQTtFQUNBLDBCQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQ0FBQTtFQUNBLHVDQUFBO0VBQ0EsZ0NBQUE7RUFDQSwrQkFBQTtBQ3BDRjtBRDBDRTtFQUNFLHVCQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQkFBQTtBQ3ZDSjtBRHlDRTtFQUNJLHVCQUFBO0VBQ0EscUJBQUE7QUN2Q047QUR5Q0U7RUFDRSx1QkFBQTtFQUNBLG9DQUFBO0VBQ0EsZ0JBQUE7QUN2Q0o7QUFqRkk7RUFDSSwyQkFBQTtFQUNBLFVBQUE7RUFDQSxtQ0FBQTtBQW9GUjtBQWxGSTtFQUNJLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtBQW9GUiIsImZpbGUiOiJlbGFzdGljLXRleHRhcmVhLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgVmFyaWFibGVzIGFuZCBUaGVtaW5nLiBGb3IgbW9yZSBpbmZvLCBwbGVhc2Ugc2VlOlxuLy8gaHR0cDovL2lvbmljZnJhbWV3b3JrLmNvbS9kb2NzL3RoZW1pbmcvXG5cbi8qKiBJb25pYyBDU1MgVmFyaWFibGVzICoqL1xuXG4kY29sb3JzOiAoXG4gIHByaW1hcnk6ICAgIzM0OThEQixcbiAgc2Vjb25kYXJ5OiAgICMwMDljYjMsXG4gIHRlcnRpYXJ5OiAgICAjRjM5QzEyLFxuICBncmV5OiAgI0JEQzNDNyxcbiAgZGFuZ2VyOiAgICAgI2Y1M2QzZCxcbiAgbGlnaHQ6ICAgICAgI2Y0ZjRmNCxcbiAgZGFyazogICAgICAgIzIyMlxuKTtcblxuJGNoYXQ6IChcbiAgZm9vdGVyOiB3aGl0ZSxcbiAgaW5wdXQ6ICNGNkY4RkEsXG4gIGlucHV0LWJvcmRlcjogI2ZmZixcbik7XG5cbiRjaGF0LWJ1YmJsZTogKFxuICBiYWNrZ3JvdW5kLWxlZnQ6ICNGNUY1RjUsXG4gIGZvbnQtbGVmdDpibGFjayxcbiAgZm9udC1yaWdodDp3aGl0ZSxcbiAgYmFja2dyb3VuZC1yaWdodDogbWFwLWdldCgkY29sb3JzLCBwcmltYXJ5KVxuKTtcblxuXG46cm9vdCB7XG4gIFxuICAvKiogZm9udC1mYW1pbHkgKiovXG4gIC0taW9uLWZvbnQtZmFtaWx5OiAnUm9ib3RvLVJlZ3VsYXInIWltcG9ydGFudDtcbiAgLyoqIGJhY2tncm91bmQgKiovXG4gIC0taW9uLWJhY2tncm91bmQtY29sb3I6I0U1RTVFNTtcbiAgLyoqIHByaW1hcnkgKiovXG4gIC0taW9uLWNvbG9yLXByaW1hcnk6ICMzNDk4REI7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktcmdiOiA1NiwgMTI4LCAyNTU7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3Q6ICNmZmZmZmY7XG4gIC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlOiAjMDI4NTljOyBcbiAgLS1pb24tY29sb3ItcHJpbWFyeS10aW50OiAjY2E5YjAxOyBcblxuICAvKiogc2Vjb25kYXJ5ICoqL1xuICAtLWlvbi1jb2xvci1zZWNvbmRhcnk6ICMwMDljYjM7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2I6IDYxLCAxOTQsIDI1NTtcbiAgLS1pb24tY29sb3Itc2Vjb25kYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1zZWNvbmRhcnktc2hhZGU6ICMzNmFiZTA7XG4gIC0taW9uLWNvbG9yLXNlY29uZGFyeS10aW50OiAjNTBjOGZmO1xuXG4gIC8qKiB0ZXJ0aWFyeSAqKi9cbiAgLS1pb24tY29sb3ItdGVydGlhcnk6ICNGMzlDMTI7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYjogODIsIDk2LCAyNTU7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLXRlcnRpYXJ5LXNoYWRlOiAjNDg1NGUwO1xuICAtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50OiAjNjM3MGZmO1xuXG4gIC8qKiBzdWNjZXNzICoqL1xuICAtLWlvbi1jb2xvci1zdWNjZXNzOiAjMmRkMzZmO1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLXJnYjogNDUsIDIxMSwgMTExO1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1zdWNjZXNzLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy1zaGFkZTogIzI4YmE2MjtcbiAgLS1pb24tY29sb3Itc3VjY2Vzcy10aW50OiAjNDJkNzdkO1xuXG4gIC8qKiB3YXJuaW5nICoqL1xuICAtLWlvbi1jb2xvci13YXJuaW5nOiAjZmZjNDA5O1xuICAtLWlvbi1jb2xvci13YXJuaW5nLXJnYjogMjU1LCAxOTYsIDk7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3Q6ICMwMDAwMDA7XG4gIC0taW9uLWNvbG9yLXdhcm5pbmctY29udHJhc3QtcmdiOiAwLCAwLCAwO1xuICAtLWlvbi1jb2xvci13YXJuaW5nLXNoYWRlOiAjZTBhYzA4O1xuICAtLWlvbi1jb2xvci13YXJuaW5nLXRpbnQ6ICNmZmNhMjI7XG5cbiAgLyoqIGRhbmdlciAqKi9cbiAgLS1pb24tY29sb3ItZGFuZ2VyOiAjZWI0NDVhO1xuICAtLWlvbi1jb2xvci1kYW5nZXItcmdiOiAyMzUsIDY4LCA5MDtcbiAgLS1pb24tY29sb3ItZGFuZ2VyLWNvbnRyYXN0OiAjZmZmZmZmO1xuICAtLWlvbi1jb2xvci1kYW5nZXItY29udHJhc3QtcmdiOiAyNTUsIDI1NSwgMjU1O1xuICAtLWlvbi1jb2xvci1kYW5nZXItc2hhZGU6ICNjZjNjNGY7XG4gIC0taW9uLWNvbG9yLWRhbmdlci10aW50OiAjZWQ1NzZiO1xuXG4gIC8qKiBkYXJrICoqL1xuICAtLWlvbi1jb2xvci1kYXJrOiAjMjIyNDI4O1xuICAtLWlvbi1jb2xvci1kYXJrLXJnYjogMzQsIDM2LCA0MDtcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3ItZGFyay1jb250cmFzdC1yZ2I6IDI1NSwgMjU1LCAyNTU7XG4gIC0taW9uLWNvbG9yLWRhcmstc2hhZGU6ICMxZTIwMjM7XG4gIC0taW9uLWNvbG9yLWRhcmstdGludDogIzM4M2EzZTtcblxuICAvKiogbWVkaXVtICoqL1xuICAtLWlvbi1jb2xvci1tZWRpdW06ICM5Mjk0OWM7XG4gIC0taW9uLWNvbG9yLW1lZGl1bS1yZ2I6IDE0NiwgMTQ4LCAxNTY7XG4gIC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdDogI2ZmZmZmZjtcbiAgLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0LXJnYjogMjU1LCAyNTUsIDI1NTtcbiAgLS1pb24tY29sb3ItbWVkaXVtLXNoYWRlOiAjODA4Mjg5O1xuICAtLWlvbi1jb2xvci1tZWRpdW0tdGludDogIzlkOWZhNjtcblxuICAvKiogbGlnaHQgKiovXG4gIC0taW9uLWNvbG9yLWxpZ2h0OiAjZjRmNWY4O1xuICAtLWlvbi1jb2xvci1saWdodC1yZ2I6IDI0NCwgMjQ1LCAyNDg7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LWNvbnRyYXN0OiAjMDAwMDAwO1xuICAtLWlvbi1jb2xvci1saWdodC1jb250cmFzdC1yZ2I6IDAsIDAsIDA7XG4gIC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlOiAjZDdkOGRhO1xuICAtLWlvbi1jb2xvci1saWdodC10aW50OiAjZjVmNmY5O1xufVxuXG5cbi5jdXN0b20tbG9hZGluZyB7XG4gIFxuICAuaW9uLWxvYWRpbmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIC0tc3Bpbm5lci1jb2xvcjogLS1pb24tY29sb3ItcHJpbWFyeTtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG4gIGlvbi1iYWNrZHJvcCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XG4gICAgICAtLWJhY2tkcm9wLW9wYWNpdHk6IDE7XG4gIH1cbiAgLmxvYWRpbmctd3JhcHBlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAtLXNwaW5uZXItY29sb3I6IC0taW9uLWNvbG9yLXByaW1hcnk7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgfVxuXG59IiwiQGltcG9ydCBcIi9zcmMvdGhlbWUvdmFyaWFibGVzXCI7XG5cbmVsYXN0aWMtdGV4dGFyZWEge1xuICAgIC50ZXh0LWlucHV0IHtcbiAgICAgICAgbWFyZ2luOiA2cHggMTBweCAhaW1wb3J0YW50O1xuICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB3aWR0aDogY2FsYygxMDAlIC0gMjBweCkgIWltcG9ydGFudDtcbiAgICB9XG4gICAgaW9uLXRleHRhcmVhIHtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgbWFwLWdldCgkY2hhdCwgaW5wdXQtYm9yZGVyKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWFwLWdldCgkY2hhdCwgaW5wdXQpO1xuICAgIH1cbn1cbiJdfQ== */";
      /***/
    },

    /***/
    "tE2R":
    /*!*******************************************!*\
      !*** ./src/app/services/doole.service.ts ***!
      \*******************************************/

    /*! exports provided: DooleService */

    /***/
    function tE2R(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DooleService", function () {
        return DooleService;
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


      var _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic-native/file-transfer/ngx */
      "B7Rs");
      /* harmony import */


      var _api_endpoints_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./api-endpoints.service */
      "7R0Y");
      /* harmony import */


      var _events_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./events.service */
      "riPR");
      /* harmony import */


      var _http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./http.service */
      "N+K7");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic-native/file/ngx */
      "FAH8");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var DooleService = /*#__PURE__*/function () {
        function DooleService(transfer, file, http, api, events, platform, alertController) {
          _classCallCheck(this, DooleService);

          this.transfer = transfer;
          this.file = file;
          this.http = http;
          this.api = api;
          this.events = events;
          this.platform = platform;
          this.alertController = alertController;
        }

        _createClass(DooleService, [{
          key: "uploadFile",
          value: function uploadFile(image, id) {
            console.log("uploading ", image);
            var token = localStorage.getItem('token');
            var options = {
              fileKey: 'file',
              fileName: 'name.jpg',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
              },
              params: {
                id: id
              }
            };
            var fileTransfer = this.transfer.create(); // Add files for new or saved diagnostics. 
            // uses diagnostic/media when diagnostic is new 
            //const endpoint = id ? this.api.getEndpoint('diagnostic/media'):this.api.getDooleEndpoint('media/upload/temp') ;

            var endpoint = this.api.getEndpoint('media/upload/temp');
            console.log("* uploadFile endpoint", endpoint);
            return new Promise(function (resolve, reject) {
              fileTransfer.upload(image, endpoint, options).then(function (data) {
                console.log(data);
                resolve(JSON.parse(data.response));
              }, function (err) {
                console.log(err);
                reject(err);
              });
            });
          }
        }, {
          key: "uploadMessageImage",
          value: function uploadMessageImage(idMessageHeader, idUserTo, message, fileUrl, id_usuari_amiq) {
            var _this29 = this;

            var token = localStorage.getItem('token');
            var options = {
              fileKey: 'file',
              fileName: 'name.pdf',
              headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
              },
              params: {
                idUser: id_usuari_amiq,
                secret: token,
                value: "",
                id: idMessageHeader
              }
            };
            console.log("options: ", options);
            var fileTransfer = this.transfer.create();
            fileTransfer.onProgress(function (progressEvent) {
              if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);

                _this29.events.publish("uploadMessageImage", {
                  fileUrl: fileUrl,
                  perc: perc
                });
              } else {
                console.log("progressEvent - ", progressEvent);
              }
            });
            var endpoint = this.api.getDooleEndpoint('message');
            return new Promise(function (resolve, reject) {
              fileTransfer.upload(fileUrl, endpoint, options).then(function (data) {
                console.log("success fileTransfer.upload", JSON.parse(data.response));
                resolve(JSON.parse(data.response));
              }, function (err) {
                console.log("** error ** fileTransfer.upload: ", err);
                reject(fileTransfer.upload);
              });
            });
          }
        }, {
          key: "b64toBlob",
          value: function b64toBlob(b64Data) {
            var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var sliceSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              var slice = byteCharacters.slice(offset, offset + sliceSize);
              var byteNumbers = new Array(slice.length);

              for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }

              var byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
              type: contentType
            });
            return blob;
          }
        }, {
          key: "downloadFile",
          value: function downloadFile(url, destination) {
            var _this30 = this;

            var result = [];
            var fileTransfer = this.transfer.create();
            var path = null;

            if (this.platform.is('ios')) {
              path = this.file.documentsDirectory;
            } else {
              path = this.file.dataDirectory;
            }

            console.log("downloadFile", url, destination, 'path,destination', path, destination);
            return new rxjs__WEBPACK_IMPORTED_MODULE_6__["Observable"](function (observer) {
              _this30.file.checkFile(path, destination).then(function (res) {
                console.log("*res*", res);

                if (res) {
                  console.log("exists", res);
                  result["success"] = true;
                  result["downloaded"] = true;
                  result["file"] = path + destination; //normalizeURL(this.file.cacheDirectory + destination);

                  result["fileNormalized"] = _capacitor_core__WEBPACK_IMPORTED_MODULE_9__["Capacitor"].convertFileSrc(path + destination);
                  return observer.next(result);
                }
              }, function (error) {
                //console.log("not exists");
                fileTransfer.onProgress(function (event) {
                  if (event.lengthComputable) {
                    //console.log(event.loaded / event.total);
                    result["status"] = "downloading";
                    result["downloaded"] = false;
                    result["percent"] = Math.round(event.loaded / event.total * 100);
                    return observer.next(result);
                  }
                });
                return fileTransfer.download(url, path + destination).then(function (entry) {
                  console.log('*download:* ' + url + " " + entry.toURL());
                  result["success"] = true;
                  result["downloaded"] = true;
                  result["file"] = entry.toURL(); //normalizeURL(this.file.cacheDirectory + destination);

                  result["fileNormalized"] = _capacitor_core__WEBPACK_IMPORTED_MODULE_9__["Capacitor"].convertFileSrc(path + destination);
                  return observer.next(result);
                }, function (error) {
                  console.log(error);
                  result["success"] = false;
                  result["downloaded"] = false;
                  console.log("error download " + url);
                  console.log(result);
                  return observer.next(result);
                });
              });
            });
          }
        }, {
          key: "showAlert",
          value: function showAlert(message) {
            return this.alertController.create({
              header: 'Info',
              message: message,
              buttons: ['OK'],
              backdropDismiss: false
            });
          }
        }, {
          key: "presentAlert",
          value: function presentAlert(message, button) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
              var buttonName, alert;
              return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      buttonName = button !== undefined ? button : 'Ok';
                      _context12.next = 3;
                      return this.alertController.create({
                        cssClass: 'my-alert-class',
                        message: message,
                        buttons: [buttonName]
                      });

                    case 3:
                      alert = _context12.sent;
                      _context12.next = 6;
                      return alert.present();

                    case 6:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _callee12, this);
            }));
          }
        }, {
          key: "getAPILegalInformation",
          value: function getAPILegalInformation() {
            var path = '/user/legal';
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPILegalInformation(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "postAPILegalConfirmation",
          value: function postAPILegalConfirmation(params) {
            var path = '/user/legal';
            var endpoint = this.api.getEndpoint(path);
            return this.http.post(endpoint, params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] postAPIConfirmationLegal(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "getAPIhome",
          value: function getAPIhome(path) {
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPIhome(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "getAPIgoals",
          value: function getAPIgoals() {
            var path = '/user/element/goals';
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPIhomeInitial(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "getAPIinformationUser",
          value: function getAPIinformationUser() {
            var path = '/user/informationUser';
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPIhomeInitial(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "getAPIuserProfile",
          value: function getAPIuserProfile() {
            var path = '/user/profiles';
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPIhomeInitial(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "postAPIhomeInitial",
          value: function postAPIhomeInitial(path, params) {
            var endpoint = this.api.getEndpoint(path);
            return this.http.post(endpoint, params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] postAPIhomeInitial(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "postAPIChangePassword",
          value: function postAPIChangePassword(params) {
            var path = 'user/changePassword';
            var endpoint = this.api.getEndpoint(path);
            return this.http.post(endpoint, params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] postAPIChangePassword(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "getAPIFamilyUnit",
          value: function getAPIFamilyUnit() {
            var path = 'user/familyUnit';
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPIFamilyUnit(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "postAPIReportProblem",
          value: function postAPIReportProblem(params) {
            var path = 'user/reportProblem'; // 'media/upload/temp' 

            var endpoint = this.api.getEndpoint(path);
            return this.http.post(endpoint, params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] postAPIReportProblem(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "postAPIsmsVerification",
          value: function postAPIsmsVerification(params) {
            var path = 'user/smsVerification';
            var endpoint = this.api.getEndpoint(path);
            return this.http.post(endpoint, params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] postAPIReportProblem(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "postAPIsmsConfirmation",
          value: function postAPIsmsConfirmation(params) {
            var path = 'user/smsConfirmation';
            var endpoint = this.api.getEndpoint(path);
            return this.http.post(endpoint, params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] postAPIReportProblem(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }, {
          key: "get",
          value: function get(endpt) {
            var endpoint = this.api.getDooleEndpoint(endpt);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              return res;
            }));
          }
        }, {
          key: "post",
          value: function post(endpt, items) {
            var endpoint = this.api.getDooleEndpoint(endpt);
            return this.http.post(endpoint, items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              return res;
            }));
          }
        }, {
          key: "getAPIhealthCards",
          value: function getAPIhealthCards() {
            var path = 'user/healthCards';
            var endpoint = this.api.getEndpoint(path);
            return this.http.get(endpoint).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(function (res) {
              console.log("[DooleService] getAPhealthCards(".concat(path, ") res: "), res);
              return res;
            }));
          }
        }]);

        return DooleService;
      }();

      DooleService.ctorParameters = function () {
        return [{
          type: _ionic_native_file_transfer_ngx__WEBPACK_IMPORTED_MODULE_2__["FileTransfer"]
        }, {
          type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_8__["File"]
        }, {
          type: _http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"]
        }, {
          type: _api_endpoints_service__WEBPACK_IMPORTED_MODULE_3__["ApiEndpointsService"]
        }, {
          type: _events_service__WEBPACK_IMPORTED_MODULE_4__["Events"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["Platform"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__["AlertController"]
        }];
      };

      DooleService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], DooleService);
      /***/
    },

    /***/
    "tGzp":
    /*!*****************************************************************!*\
      !*** ./src/app/components/page-header/page-header.component.ts ***!
      \*****************************************************************/

    /*! exports provided: PageHeaderComponent */

    /***/
    function tGzp(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "PageHeaderComponent", function () {
        return PageHeaderComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_page_header_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./page-header.component.html */
      "k4KX");
      /* harmony import */


      var _page_header_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./page-header.component.scss */
      "B3O1");
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

      var PageHeaderComponent = /*#__PURE__*/function () {
        function PageHeaderComponent(translate, alertController) {
          _classCallCheck(this, PageHeaderComponent);

          this.translate = translate;
          this.alertController = alertController;
        }

        _createClass(PageHeaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "presentAlert",
          value: function presentAlert() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
              var _this31 = this;

              return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      this.translate.get('success.button').subscribe(function (button) {
                        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this31, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                          var alert;
                          return regeneratorRuntime.wrap(function _callee13$(_context13) {
                            while (1) {
                              switch (_context13.prev = _context13.next) {
                                case 0:
                                  _context13.next = 2;
                                  return this.alertController.create({
                                    cssClass: "alertClass",
                                    header: this.translate.instant('Information'),
                                    // subHeader: 'Subtitle',
                                    message: this.info,
                                    buttons: [button]
                                  });

                                case 2:
                                  alert = _context13.sent;
                                  _context13.next = 5;
                                  return alert.present();

                                case 5:
                                case "end":
                                  return _context13.stop();
                              }
                            }
                          }, _callee13, this);
                        }));
                      });

                    case 1:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, _callee14, this);
            }));
          }
        }]);

        return PageHeaderComponent;
      }();

      PageHeaderComponent.ctorParameters = function () {
        return [{
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]
        }];
      };

      PageHeaderComponent.propDecorators = {
        title: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['title']
        }],
        icon: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['icon']
        }],
        info: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['info']
        }]
      };
      PageHeaderComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'page-header',
        template: _raw_loader_page_header_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_page_header_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], PageHeaderComponent);
      /***/
    },

    /***/
    "urw2":
    /*!********************************************************!*\
      !*** ./src/app/shared/classes/global-error-handler.ts ***!
      \********************************************************/

    /*! exports provided: GlobalErrorHandler */

    /***/
    function urw2(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "GlobalErrorHandler", function () {
        return GlobalErrorHandler;
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


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _services_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../services/logging.service */
      "0Flm");
      /* harmony import */


      var _services_error_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../services/error.service */
      "9vc0");
      /* harmony import */


      var _services_notification_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../services/notification.service */
      "OC8m");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");

      var GlobalErrorHandler = /*#__PURE__*/function () {
        // Error handling is important and needs to be loaded first.
        // Because of this we should manually inject the services with Injector.
        function GlobalErrorHandler(injector, router) {
          _classCallCheck(this, GlobalErrorHandler);

          this.injector = injector;
          this.router = router;
        }

        _createClass(GlobalErrorHandler, [{
          key: "handleError",
          value: function handleError(error) {
            var errorService = this.injector.get(_services_error_service__WEBPACK_IMPORTED_MODULE_4__["ErrorService"]);
            var logger = this.injector.get(_services_logging_service__WEBPACK_IMPORTED_MODULE_3__["LoggingService"]);
            var notifier = this.injector.get(_services_notification_service__WEBPACK_IMPORTED_MODULE_5__["NotificationService"]); //const loading = this.injector.get(LoadingController);

            var message;
            var stackTrace;

            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
              // Server Error
              message = errorService.getServerMessage(error); // Always log errors

              notifier.showError(message);
            } else {
              // Client Error
              message = errorService.getClientMessage(error); // Always log errors

              notifier.showError(message);
            } //logger.logError(error);

          }
        }]);

        return GlobalErrorHandler;
      }();

      GlobalErrorHandler.ctorParameters = function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]
        }];
      };

      GlobalErrorHandler = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], GlobalErrorHandler);
      /***/
    },

    /***/
    "uuHY":
    /*!*********************************************************************!*\
      !*** ./src/app/components/custom-header/custom-header.component.ts ***!
      \*********************************************************************/

    /*! exports provided: CustomHeaderComponent */

    /***/
    function uuHY(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "CustomHeaderComponent", function () {
        return CustomHeaderComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_custom_header_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./custom-header.component.html */
      "KzMd");
      /* harmony import */


      var _custom_header_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./custom-header.component.scss */
      "1JxX");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var CustomHeaderComponent = /*#__PURE__*/function () {
        function CustomHeaderComponent(translate) {
          _classCallCheck(this, CustomHeaderComponent);

          this.translate = translate;
        }

        _createClass(CustomHeaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return CustomHeaderComponent;
      }();

      CustomHeaderComponent.ctorParameters = function () {
        return [{
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]
        }];
      };

      CustomHeaderComponent.propDecorators = {
        backButtonRoute: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
          args: ['backButtonRoute']
        }]
      };
      CustomHeaderComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'custom-header',
        template: _raw_loader_custom_header_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_custom_header_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], CustomHeaderComponent);
      /***/
    },

    /***/
    "v1UO":
    /*!***************************************************************************!*\
      !*** ./src/app/components/elastic-textarea/elastic-textarea.component.ts ***!
      \***************************************************************************/

    /*! exports provided: ElasticTextareaComponent */

    /***/
    function v1UO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ElasticTextareaComponent", function () {
        return ElasticTextareaComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_elastic_textarea_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./elastic-textarea.component.html */
      "91zV");
      /* harmony import */


      var _elastic_textarea_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./elastic-textarea.component.scss */
      "sSwE");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");

      var ElasticTextareaComponent = /*#__PURE__*/function () {
        function ElasticTextareaComponent() {
          _classCallCheck(this, ElasticTextareaComponent);

          this.content = "";
          this.lineHeight = 20;
          this.maxExpand = 5;
          this.maxHeight = this.lineHeight * this.maxExpand;
        }

        _createClass(ElasticTextareaComponent, [{
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            this.txtArea = this.ionTxtArea.nativeElement;
            this.txtArea.style.height = this.lineHeight + "px";
            this.maxHeight = this.lineHeight * this.maxExpand;
            this.txtArea.style.resize = 'none';
          }
        }, {
          key: "onChange",
          value: function onChange(event) {
            this.txtArea.style.height = this.lineHeight + "px";

            if (this.txtArea.scrollHeight < this.maxHeight) {
              this.txtArea.style.height = this.txtArea.scrollHeight + "px";
            } else {
              this.txtArea.style.height = this.maxHeight + "px";
            }
          }
        }, {
          key: "clearInput",
          value: function clearInput() {
            this.content = "";
            this.txtArea.style.height = this.lineHeight + "px";
          }
        }, {
          key: "setFocus",
          value: function setFocus() {
            this.txtArea.setFocus();
          }
        }]);

        return ElasticTextareaComponent;
      }();

      ElasticTextareaComponent.ctorParameters = function () {
        return [];
      };

      ElasticTextareaComponent.propDecorators = {
        ionTxtArea: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"],
          args: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInput"], {
            read: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]
          }]
        }]
      };
      ElasticTextareaComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'elastic-textarea',
        template: _raw_loader_elastic_textarea_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        inputs: ['placeholder', 'lineHeight', 'maxExpand'],
        styles: [_elastic_textarea_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ElasticTextareaComponent);
      /***/
    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
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


      var _angular_fire__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/fire */
      "spgP");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/environments/environment */
      "AytR");
      /* harmony import */


      var _services_firebase_auth_firebase_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./services/firebase/auth/firebase-auth.service */
      "ejKP");
      /* harmony import */


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./services/authentication.service */
      "ej43");

      var routes = [{
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
      }, {
        path: 'landing',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-login-landing-landing-module */
          "pages-login-landing-landing-module").then(__webpack_require__.bind(null,
          /*! ./pages/login/landing/landing.module */
          "uOmu")).then(function (m) {
            return m.LandingPageModule;
          });
        }
      }, {
        path: 'legal',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-login-legal-legal-module */
          "legal-legal-module").then(__webpack_require__.bind(null,
          /*! ./pages/login/legal/legal.module */
          "XR32")).then(function (m) {
            return m.LegalPageModule;
          });
        }
      }, {
        path: 'sms',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-login-sms-sms-module */
          "sms-sms-module").then(__webpack_require__.bind(null,
          /*! ./pages/login/sms/sms.module */
          "o3pB")).then(function (m) {
            return m.SmsPageModule;
          });
        }
      }, {
        path: 'verification',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-login-verification-verification-module */
          "verification-verification-module").then(__webpack_require__.bind(null,
          /*! ./pages/login/verification/verification.module */
          "EHAZ")).then(function (m) {
            return m.VerificationPageModule;
          });
        }
      }, {
        path: 'home',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-home-home-module */
          "pages-home-home-module").then(__webpack_require__.bind(null,
          /*! ./pages/home/home.module */
          "99Un")).then(function (m) {
            return m.HomePageModule;
          });
        }
      }, {
        path: 'intro',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-onboarding-intro-intro-module */
          "onboarding-intro-intro-module").then(__webpack_require__.bind(null,
          /*! ./pages/onboarding/intro/intro.module */
          "hxez")).then(function (m) {
            return m.IntroPageModule;
          });
        }
      }, {
        path: 'goals',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-goals-goals-module */
          "goals-goals-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/goals/goals.module */
          "nS1m")).then(function (m) {
            return m.GoalsPageModule;
          });
        }
      }, {
        path: 'activity-goal',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-activity-goal-activity-goal-module */
          "pages-profile-activity-goal-activity-goal-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/activity-goal/activity-goal.module */
          "kshx")).then(function (m) {
            return m.ActivityGoalPageModule;
          });
        }
      }, {
        path: 'profile',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-profile-module */
          "profile-profile-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/profile.module */
          "723k")).then(function (m) {
            return m.ProfilePageModule;
          });
        }
      }, {
        path: 'personal',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-personal-personal-module */
          "personal-personal-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/personal/personal.module */
          "c7e1")).then(function (m) {
            return m.PersonalPageModule;
          });
        }
      }, {
        path: 'family-unit',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-family-unit-family-unit-module */
          "family-unit-family-unit-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/family-unit/family-unit.module */
          "CKOg")).then(function (m) {
            return m.FamilyUnitPageModule;
          });
        }
      }, {
        path: 'settings',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-settings-settings-module */
          "settings-settings-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/settings/settings.module */
          "zKZX")).then(function (m) {
            return m.SettingsPageModule;
          });
        }
      }, {
        path: 'password',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-settings-password-password-module */
          "password-password-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/settings/password/password.module */
          "Ul5O")).then(function (m) {
            return m.PasswordPageModule;
          });
        }
      }, {
        path: 'cards',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-cards-cards-module */
          "cards-cards-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile//cards/cards.module */
          "S7h8")).then(function (m) {
            return m.CardsPageModule;
          });
        }
      }, {
        path: 'add-health-card',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | pages-profile-cards-add-health-card-add-health-card-module */
          "add-health-card-add-health-card-module").then(__webpack_require__.bind(null,
          /*! ./pages/profile/cards/add-health-card/add-health-card.module */
          "tryS")).then(function (m) {
            return m.AddHealthCardPageModule;
          });
        }
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot(routes, {
          // This value is required for server-side rendering to work.
          initialNavigation: 'enabled',
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled'
        }), _angular_fire__WEBPACK_IMPORTED_MODULE_2__["AngularFireModule"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].firebase), _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuthModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]],
        providers: [_services_firebase_auth_firebase_auth_service__WEBPACK_IMPORTED_MODULE_6__["FirebaseAuthService"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"]]
      })], AppRoutingModule);
      /***/
    },

    /***/
    "wSJU":
    /*!**********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/utils/shell/image-shell/image-shell.component.html ***!
      \**********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function wSJU(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-spinner class=\"spinner\"></ion-spinner>\n<img class=\"inner-img\" [src]=\"_src\" [alt]=\"_alt\" [attr.loading]=\"_loadingStrategy\" (load)=\"_imageLoaded()\" (error)=\"_imageLoadError($event)\"/>\n<ng-content *ngIf=\"_display === 'cover'\"></ng-content>\n";
      /***/
    },

    /***/
    "xYRE":
    /*!*************************************************************!*\
      !*** ./src/app/components/image-download/image-download.ts ***!
      \*************************************************************/

    /*! exports provided: ImageDownloadComponent */

    /***/
    function xYRE(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ImageDownloadComponent", function () {
        return ImageDownloadComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_image_download_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./image-download.html */
      "Y9a+");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic-native/photo-viewer/ngx */
      "U3FU");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");
      /* harmony import */


      var src_app_services_http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/services/http.service */
      "N+K7");
      /* harmony import */


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../services/authentication.service */
      "ej43");
      /**
       * Generated class for the ImageDownloadComponent component.
       *
       * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
       * for more info on Angular Components.
       */


      var ImageDownloadComponent = /*#__PURE__*/function () {
        function ImageDownloadComponent(photoViewer, http, doole, auth) {
          _classCallCheck(this, ImageDownloadComponent);

          this.photoViewer = photoViewer;
          this.http = http;
          this.doole = doole;
          this.auth = auth;
          this.localfile = '';
          this.localfileNormalized = '';
          this.temporaryUrl = '';
          this.downloaded = false;
          this.status = '';
          this.percent = 0;
        }

        _createClass(ImageDownloadComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            //console.log("url:"+this.url);
            //console.log("target:"+this.target);
            this.loadData();
          }
        }, {
          key: "loadData",
          value: function loadData() {
            var _this32 = this;

            var postData = {
              file: this.url
            }; //this.post('user/device/register', postData).subscribe(

            this.auth.post("message/temporaryUrl", postData).subscribe(function (data) {
              _this32.temporaryUrl = data.temporaryUrl;

              _this32.doole.downloadFile(data.temporaryUrl, _this32.target).subscribe(function (datad) {
                //console.log(datad);
                //console.log("downloadFile subscribe"+datad.fileNormalized);
                //console.log(data.percent);
                _this32.percent = datad.percent;
                _this32.status = datad.status; //downloadFile subscribefile:///var/mobile/Containers/Data/Application/4D8A5FB4-B486-498D-97E8-76F404A6315F/Documents/1535373755996
                //downloadFile subscribehttp://localhost:8080/var/mobile/Containers/Data/Application/946A8956-0513-469B-803D-4C6F34087DDC/Library/Caches/1535374599756

                _this32.localfile = datad.file;
                _this32.localfileNormalized = datad.fileNormalized;
                _this32.downloaded = datad.downloaded;
              });
            });
          }
        }, {
          key: "openImage",
          value: function openImage() {
            if (this.clickable) this.photoViewer.show(this.localfile);
          }
        }]);

        return ImageDownloadComponent;
      }();

      ImageDownloadComponent.ctorParameters = function () {
        return [{
          type: _ionic_native_photo_viewer_ngx__WEBPACK_IMPORTED_MODULE_3__["PhotoViewer"]
        }, {
          type: src_app_services_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"]
        }, {
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_4__["DooleService"]
        }, {
          type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]
        }];
      };

      ImageDownloadComponent.propDecorators = {
        url: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
          args: ['url']
        }],
        target: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
          args: ['target']
        }],
        clickable: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
          args: ['clickable']
        }]
      };
      ImageDownloadComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'image-download',
        template: _raw_loader_image_download_html__WEBPACK_IMPORTED_MODULE_1__["default"]
      })], ImageDownloadComponent);
      /***/
    },

    /***/
    "yfhX":
    /*!*********************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/slider-horizontal/slider-horizontal.component.html ***!
      \*********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function yfhX(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-content [ngClass]=\"[slidesType==1? 'content1' : 'content2']\">\n  <div class=\"line\">\n    <div class=\"title\" >{{information.title}}</div>\n    <ion-button slot=\"end\" *ngIf=\"information.bar\" fill=\"clear\" class=\"bottonTitle\">Ver todas</ion-button>\n  </div>\n\n  <ion-slides *ngIf=\"slidesType == 1\" #slider pager=\"true\" pager=\"false\" [options]=\"sliderConfig\">\n    <ion-slide *ngFor=\"let slide of this.information.content\">\n      <ion-card class=\"customCard1\">\n        <ion-icon name=\"close-circle\" class=\"close-card\"></ion-icon> \n        <ion-img  [src]=\"slide.image\"></ion-img><br>\n        <ion-card-title>{{slide.title}}</ion-card-title>\n        <ion-card-subtitle>{{slide.description}}</ion-card-subtitle>\n        <ion-button>Inscribirme</ion-button>\n      </ion-card>\n    </ion-slide> \n  </ion-slides>\n\n  <ion-slides *ngIf=\"slidesType == 2\" #slider pager=\"true\" pager=\"false\" [options]=\"sliderConfig\">\n    <ion-slide *ngFor=\"let slide of this.information.content\">\n      <ion-card class=\"customCard2\">\n        <ion-card-header class=\"line\">\n            <ion-card-subtitle>{{slide.title}}</ion-card-subtitle>\n            <ion-icon name=\"close\" class=\"close-card\"></ion-icon> \n        </ion-card-header>\n\n        <ion-card-content>\n          <ion-grid>\n            <ion-row>\n              <ion-col size=\"2\">\n                <ion-img  src=\"assets/icons/agenda2.svg\"></ion-img>\n              </ion-col>\n              <ion-col size=\"10\">\n                <ion-card-subtitle>{{slide.subtitle}}</ion-card-subtitle>\n                <ion-card-subtitle>{{slide.hour}}</ion-card-subtitle>\n                <ion-button size=\"small\" fill=\"clear\">\n                  Detalle</ion-button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </ion-card-content>\n      </ion-card>\n    </ion-slide>  \n    \n  </ion-slides>\n\n</ion-content>\n";
      /***/
    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser-dynamic */
      "a3Wg");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _ionic_pwa_elements_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/pwa-elements/loader */
      "2Zi2");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      document.addEventListener('DOMContentLoaded', function () {
        Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
          return console.log(err);
        });
      }); // Call the element loader after the platform has been bootstrapped

      Object(_ionic_pwa_elements_loader__WEBPACK_IMPORTED_MODULE_4__["defineCustomElements"])(window);
      /***/
    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map