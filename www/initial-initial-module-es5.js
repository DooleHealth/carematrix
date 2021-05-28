(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["initial-initial-module"], {
    /***/
    "Etnz":
    /*!****************************************************!*\
      !*** ./src/app/pages/home/initial/initial.page.ts ***!
      \****************************************************/

    /*! exports provided: InitialPage */

    /***/
    function Etnz(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InitialPage", function () {
        return InitialPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_initial_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./initial.page.html */
      "aVnH");
      /* harmony import */


      var _initial_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./initial.page.scss */
      "rrks");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");

      var InitialPage = /*#__PURE__*/function () {
        function InitialPage(router, dooleService) {
          _classCallCheck(this, InitialPage);

          this.router = router;
          this.dooleService = dooleService;
          this.PATH_USERDATA = '/user/informationUser';
          this.dietInfo = {};
          this.drugInfo = {};
          this.playInfo = {};
          this.activityInfo = {};
          this.goalInfo = {};
          this.advicesInfo = {};
          this.appointment = {};
          this.username = 'New User';
          this.userImage = 'assets/icons/user_icon.svg';
          this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        }

        _createClass(InitialPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getUserInformation();
          }
        }, {
          key: "showInformation",
          value: function showInformation() {
            this.userImg();
            this.showGoals();
            this.showDiets();
            this.showDrugs();
            this.showGames();
            this.showPhysical();
            this.showAgenda();
            this.showAdvices();
          }
        }, {
          key: "userImg",
          value: function userImg() {
            if (this.userDoole.image !== null && this.userDoole.image !== undefined && this.userDoole.image !== '') this.userImage = this.userDoole.image;
            this.username = this.userDoole.username;
          }
        }, {
          key: "getUserInformation",
          value: function getUserInformation() {
            var _this = this;

            this.dooleService.getAPIinformationUser().subscribe(function (res) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        //console.log('[InitialPage] getUserProfile()', await res);
                        this.userDoole = res;
                        this.showInformation();

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }, function (err) {
              console.log('[InitialPage] getUserProfile() ERROR(' + err.code + '): ' + err.message);
              throw err;
            });
          }
        }, {
          key: "showDiets",
          value: function showDiets() {
            var sliders = [];
            this.dietInfo.title = 'Tu Dia';
            this.dietInfo.subtitle = 'Almuerzo', this.dietInfo.icon = 'assets/icons/apple-diet.svg';
            this.dietInfo.hour = '00:00';
            this.dietInfo.color = '#E67E22';
            this.userDoole.diets.forEach(function (diet) {
              var slider = {
                title: diet.name,
                hour: diet.hour,
                description: diet.description
              };
              sliders.push(slider);
            });
            this.dietInfo.content = sliders; //  console.log('[InitialPage] showDiets() diet', this.dietInfo);
          }
        }, {
          key: "showGames",
          value: function showGames() {
            var sliders = [];
            this.playInfo.subtitle = 'Juegos';
            this.playInfo.icon = 'assets/icons/game.svg';
            this.playInfo.color = '#9B59B6';
            this.userDoole.games.forEach(function (game) {
              var slider = {};
              slider.description = game.name;
              sliders.push(slider);
            });
            this.playInfo.content = sliders; //  console.log('[InitialPage] showGames()', this.playInfo);
          }
        }, {
          key: "showGoals",
          value: function showGoals() {
            var sliders = [];
            this.goalInfo.title = 'Tu Objetivo';
            this.goalInfo.subtitle = 'Tu Objetivo Diario';
            this.goalInfo.icon = 'assets/icons/goals.svg';
            this.goalInfo.color = '#F39C12';
            this.goalInfo.bar = true;
            this.userDoole.goals.forEach(function (goal) {
              var slider = {};
              slider.description = goal.description;
              slider.porcentage = goal.steps;
              sliders.push(slider);
            });
            this.goalInfo.content = sliders; // console.log('[InitialPage] showGames()', this.goalInfo);
          }
        }, {
          key: "showDrugs",
          value: function showDrugs() {
            var sliders = [];
            this.drugInfo.subtitle = 'Medication';
            this.drugInfo.icon = 'assets/icons/medication.svg';
            this.drugInfo.hour = '00:00';
            this.drugInfo.color = '#2ECC71';
            this.userDoole.drugs.forEach(function (drug) {
              var slider = {
                title: drug.name,
                hour: drug.hour_intake,
                description: drug.name
              };
              sliders.push(slider);
            });
            this.drugInfo.content = sliders; // console.log('[InitialPage] showParamsDiets()', this.drugInfo);
            //return this.DrugInfo
          }
        }, {
          key: "showPhysical",
          value: function showPhysical() {
            var sliders = [];
            this.activityInfo.subtitle = 'Actividad Física';
            this.activityInfo.icon = 'assets/icons/fire.svg';
            this.activityInfo.color = '#E74C3C';
            var slider = {};
            slider.title = '';
            slider.description = '456 Cal';
            sliders.push(slider);
            sliders.push(slider);
            this.activityInfo.content = sliders;
          }
        }, {
          key: "showAdvices",
          value: function showAdvices() {
            var sliders = [];
            this.advicesInfo.title = 'Novedades y Consejos';
            this.advicesInfo.bar = true;
            var listAvices = this.userDoole.advices;
            listAvices.forEach(function (advice) {
              var slider = {};
              slider.title = advice.name;
              slider.description = advice.description;
              slider.image = advice.image;
              sliders.push(slider);
            });
            this.advicesInfo.content = sliders;
            console.log('[InitialPage] showAdvices()', this.advicesInfo);
          }
        }, {
          key: "showAgenda",
          value: function showAgenda() {
            var sliders = [];
            this.appointment.title = 'Recordatorios';
            this.appointment.bar = false;
            var listAgenda = this.userDoole.agendas;
            console.log('[InitialPage] showAgenda() 1', listAgenda);
            listAgenda.forEach(function (agenda) {
              var slider = {};
              slider.title = agenda.title;
              slider.subtitle = agenda.doctor;
              slider.hour = agenda.start_date;
              sliders.push(slider);
            });
            this.appointment.content = sliders;
            console.log('[InitialPage] showParamsDiets()', this.appointment);
          }
        }]);

        return InitialPage;
      }();

      InitialPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }, {
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"]
        }];
      };

      InitialPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-initial',
        template: _raw_loader_initial_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_initial_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], InitialPage);
      /***/
    },

    /***/
    "FXXI":
    /*!******************************************************!*\
      !*** ./src/app/pages/home/initial/initial.module.ts ***!
      \******************************************************/

    /*! exports provided: InitialPageModule */

    /***/
    function FXXI(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InitialPageModule", function () {
        return InitialPageModule;
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


      var _initial_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./initial-routing.module */
      "GSP4");
      /* harmony import */


      var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/components/components.module */
      "j1ZV");
      /* harmony import */


      var _initial_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./initial.page */
      "Etnz");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var InitialPageModule = function InitialPageModule() {
        _classCallCheck(this, InitialPageModule);
      };

      InitialPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], src_app_components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentsModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__["TranslateModule"], _initial_routing_module__WEBPACK_IMPORTED_MODULE_5__["InitialPageRoutingModule"]],
        declarations: [_initial_page__WEBPACK_IMPORTED_MODULE_7__["InitialPage"]]
      })], InitialPageModule);
      /***/
    },

    /***/
    "GSP4":
    /*!**************************************************************!*\
      !*** ./src/app/pages/home/initial/initial-routing.module.ts ***!
      \**************************************************************/

    /*! exports provided: InitialPageRoutingModule */

    /***/
    function GSP4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InitialPageRoutingModule", function () {
        return InitialPageRoutingModule;
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


      var _initial_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./initial.page */
      "Etnz");

      var routes = [{
        path: '',
        component: _initial_page__WEBPACK_IMPORTED_MODULE_3__["InitialPage"]
      }, {
        path: 'profile',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | profile-profile-module */
          "profile-profile-module").then(__webpack_require__.bind(null,
          /*! ../../profile/profile.module */
          "723k")).then(function (m) {
            return m.ProfilePageModule;
          });
        }
      }];

      var InitialPageRoutingModule = function InitialPageRoutingModule() {
        _classCallCheck(this, InitialPageRoutingModule);
      };

      InitialPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], InitialPageRoutingModule);
      /***/
    },

    /***/
    "aVnH":
    /*!********************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/home/initial/initial.page.html ***!
      \********************************************************************************************/

    /*! exports provided: default */

    /***/
    function aVnH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n\n<ion-content>\n<ion-grid>\n  <ion-row>\n    <ion-col size=\"10\" style=\"text-align: left;\">\n      <h3>Hola, {{this.username}}</h3>\n    </ion-col>\n    <ion-col size=\"2\">\n   \n  <ion-img class=\"imgProfile\" [src]=\"this.userImage\" routerLink=\"/profile\"></ion-img>\n    </ion-col>\n  </ion-row>\n  \n</ion-grid>\n\n  <app-slider-vertical  [information]= 'this.goalInfo'></app-slider-vertical>  \n  <app-slider-horizontal [information]= 'this.appointment' slidesType=\"2\"></app-slider-horizontal>\n  <app-slider-horizontal [information]= 'this.advicesInfo' slidesType=\"1\"></app-slider-horizontal>\n  <app-slider-vertical  [information]= 'this.dietInfo'></app-slider-vertical>\n  <app-slider-vertical [information]= 'this.drugInfo'></app-slider-vertical>\n  <app-slider-vertical [information]= 'this.playInfo'></app-slider-vertical>\n  <app-slider-vertical [information]= 'this.activityInfo'></app-slider-vertical>\n</ion-content>\n";
      /***/
    },

    /***/
    "rrks":
    /*!******************************************************!*\
      !*** ./src/app/pages/home/initial/initial.page.scss ***!
      \******************************************************/

    /*! exports provided: default */

    /***/
    function rrks(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = ".imgProfile {\n  width: 30px;\n}\n\nion-img {\n  height: 50px;\n  width: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2luaXRpYWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksV0FBQTtBQUNKOztBQUVBO0VBQ0ksWUFBQTtFQUNBLFdBQUE7QUFDSiIsImZpbGUiOiJpbml0aWFsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pbWdQcm9maWxle1xuICAgIHdpZHRoOiAzMHB4O1xufVxuXG5pb24taW1ne1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbn0iXX0= */";
      /***/
    }
  }]);
})();
//# sourceMappingURL=initial-initial-module-es5.js.map