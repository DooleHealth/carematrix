(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["onboarding-intro-intro-module"],{

/***/ "1PsH":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/onboarding/intro/intro.page.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <ion-content fullscreen class=\"ion-padding\" scroll-y=\"true\">\n    <div class=\"main-container\">\n      <ion-slides pager=\"true\">\n        <!-- first slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <h1 class=\"titleBold\">Bienvenido a <br>\n              <span style=\"color:#3498DB;\">Doole Health</span>\n            </h1>\n\n            <ion-grid style=\"text-align: start;\">\n              <ion-row>\n                <ion-col size=\"2\">\n                  <img class=\"iconPadding\" src=\"assets/icons/Estrella.svg\" />\n                </ion-col>\n                <ion-col size=\"10\">\n                  <p><b>Todo en uno</b><br>Toda tu información médica\n                    en una sola app</p>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col size=\"2\">\n                  <img class=\"iconPadding\" src=\"assets/icons/Icono.svg\" />\n                </ion-col>\n                <ion-col size=\"10\">\n                  <p><b>Contacta con tu médico</b><br> Habla con tu especialista directamente o solicita una consulta\n                    presencial\n                  </p>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col size=\"2\" padding>\n                  <img class=\"iconPadding\" src=\"assets/icons/Vector.svg\" />\n                </ion-col>\n                <ion-col size=\"10\">\n                  <p><b>Salud y deporte</b><br>Conecta tus aplicaciones de salud\n                    para ver tu evolución</p><br>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </div>\n        </ion-slide>\n\n        <!-- second slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <img class=\"iconPadddingCenter\" src=\"assets/icons/calendar.svg\" />\n            <h1 class=\"titleBoldCentered\">Agenda<br>\n            </h1>\n            <ion-grid style=\"text-align: center;\">\n              <ion-col size=\"12\">\n                <p>La agenda de Doole Health te permite incluirtodos tus citas y recordatorios médicos.\n                  ¡No podrás vivir sin ella!</p>\n              </ion-col>\n            </ion-grid>\n          </div>\n        </ion-slide>\n\n        <!-- third slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <img class=\"iconPadddingCenter\" src=\"assets/icons/chat.svg\" />\n            <h1 class=\"titleBoldCentered\">Contacta<br>\n            </h1>\n            <ion-grid style=\"text-align: center;\">\n              <ion-col size=\"12\">\n                <p>Habla con tu médico y especialista a través de videollamada o chat \n                  y solicita una cita presencial ¡Nunca fué tan rápido y cómodo!</p>\n              </ion-col>\n            </ion-grid>\n          </div>\n        </ion-slide>\n        <!-- fourth slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <img class=\"iconPadddingCenter\" src=\"assets/icons/Seguimiento.svg\" />\n            <h1 class=\"titleBoldCentered\">Seguimiento<br>\n            </h1>\n            <ion-grid style=\"text-align: center;\">\n              <ion-col size=\"12\">\n                <p>Revisa resultados clínicos, contesta formularios o comprueba la evolución de tus constantes.\n                  ¡Ahora podrás revisarlos siempre que quieras!</p>\n              </ion-col>\n            </ion-grid>\n          </div>\n        </ion-slide>\n        <!-- fifth slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <img class=\"iconPadddingCenter\" src=\"assets/icons/Mi Diario.svg\" />\n            <h1 class=\"titleBoldCentered\">Mi Diario<br>\n            </h1>\n            <ion-grid style=\"text-align: center;\">\n              <ion-col size=\"12\">\n                <p>En un vistazo revisa tu dieta, medicación, juegos e información de salud del día.\n                  ¡Cuidar de tu salud nunca había sido tan fácil!</p>\n              </ion-col>\n            </ion-grid>\n          </div>\n        </ion-slide>\n        <!-- sixth  slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <img class=\"iconPadddingCenter\" src=\"assets/icons/Novedades.svg\" />\n            <h1 class=\"titleBoldCentered\">Novedades y Consejos<br>\n            </h1>\n            <ion-grid style=\"text-align: center;\">\n              <ion-col size=\"12\">\n                <p>Dispón de las últimas novedades sanitarias y consejos por parte de equipo médico\n                  ¡Mantente actualizado en todo momento!</p>\n              </ion-col>\n            </ion-grid>\n          </div>\n        </ion-slide>\n        <!-- seventh  slide -->\n        <ion-slide>\n          <div class=\"slide\">\n            <img class=\"iconPadddingCenter\" src=\"assets/icons/Mi Perfil.svg\" />\n            <h1 class=\"titleBoldCentered\">Mi Perfil<br>\n            </h1>\n            <ion-grid style=\"text-align: center;\">\n              <ion-col size=\"12\">\n                <p>Configura tus datos y tus preferencias de notificación para poder estar siempre informado.\n                  ¡Disfruta tu experiencia en Doole Health!</p>\n              </ion-col>\n            </ion-grid>\n          </div>\n        </ion-slide>\n        \n      </ion-slides>\n      <ion-button type=\"button\" color=\"primary\" expand=\"block\" class=\"buttonPadding\" (click)=\"introAction()\">\n        Continuar\n      </ion-button>\n    </div>\n  </ion-content>");

/***/ }),

/***/ "KJnM":
/*!****************************************************************!*\
  !*** ./src/app/pages/onboarding/intro/intro-routing.module.ts ***!
  \****************************************************************/
/*! exports provided: IntroPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageRoutingModule", function() { return IntroPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _intro_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intro.page */ "l00f");




const routes = [
    {
        path: '',
        component: _intro_page__WEBPACK_IMPORTED_MODULE_3__["IntroPage"]
    }
];
let IntroPageRoutingModule = class IntroPageRoutingModule {
};
IntroPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], IntroPageRoutingModule);



/***/ }),

/***/ "fU9T":
/*!********************************************************!*\
  !*** ./src/app/pages/onboarding/intro/intro.page.scss ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".titleBold {\n  font-weight: 1000;\n  margin-top: 10%;\n  font-size: 40px;\n  text-align: left;\n}\n\n.iconPadding {\n  padding-top: 90%;\n}\n\n.titleBoldCentered {\n  font-weight: 1000;\n  margin-top: 10%;\n  font-size: 40px;\n  text-align: center;\n}\n\n.iconPadddingCenter {\n  padding-top: 20%;\n}\n\n.buttonPadding {\n  margin-bottom: 3%;\n  margin-top: 7%;\n}\n\n.buttonPadding2 {\n  margin-bottom: 3%;\n  margin-top: 10%;\n}\n\n/* ----------- iPhone 10 ----------- */\n\n@media only screen and (min-device-height: 800px) and (orientation: portrait) {\n  .buttonPadding {\n    margin-top: 40%;\n  }\n}\n\n/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 330px) {\n  .main-container {\n    margin-left: 5%;\n    margin-right: 5%;\n    margin-top: 0%;\n    margin-bottom: 5%;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludHJvLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUNBO0VBQ0ksZ0JBQUE7QUFFSjs7QUFBQTtFQUNJLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQUdKOztBQURBO0VBQ0ksZ0JBQUE7QUFJSjs7QUFEQTtFQUNJLGlCQUFBO0VBQ0EsY0FBQTtBQUlKOztBQUZBO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0FBS0o7O0FBREEsc0NBQUE7O0FBQ0E7RUFJSTtJQUNJLGVBQUE7RUFDTjtBQUNGOztBQUdBLHFEQUFBOztBQUNBO0VBSUk7SUFDSSxlQUFBO0lBQ0EsZ0JBQUE7SUFDQSxjQUFBO0lBQ0EsaUJBQUE7RUFKTjtBQUNGIiwiZmlsZSI6ImludHJvLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aXRsZUJvbGR7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDA7XG4gICAgbWFyZ2luLXRvcDogMTAlO1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLmljb25QYWRkaW5ne1xuICAgIHBhZGRpbmctdG9wOiA5MCU7XG59XG4udGl0bGVCb2xkQ2VudGVyZWR7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDA7XG4gICAgbWFyZ2luLXRvcDogMTAlO1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uaWNvblBhZGRkaW5nQ2VudGVye1xuICAgIHBhZGRpbmctdG9wOiAyMCU7XG59XG5cbi5idXR0b25QYWRkaW5ne1xuICAgIG1hcmdpbi1ib3R0b206MyU7XG4gICAgbWFyZ2luLXRvcDogNyU7XG59XG4uYnV0dG9uUGFkZGluZzJ7XG4gICAgbWFyZ2luLWJvdHRvbTozJTtcbiAgICBtYXJnaW4tdG9wOiAxMCU7XG4gICAgXG59XG5cbi8qIC0tLS0tLS0tLS0tIGlQaG9uZSAxMCAtLS0tLS0tLS0tLSAqL1xuQG1lZGlhIG9ubHkgc2NyZWVuXG4gIGFuZCAobWluLWRldmljZS1oZWlnaHQgOiA4MDBweClcbiAgYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpXG57XG4gICAgLmJ1dHRvblBhZGRpbmd7XG4gICAgICAgIG1hcmdpbi10b3A6NDAlO1xuICAgIH1cbiAgICBcbn1cblxuLyogLS0tLS0tLS0tLS0gaVBob25lIDUsIDVTLCA1QyBhbmQgNVNFIC0tLS0tLS0tLS0tICovXG5AbWVkaWEgb25seSBzY3JlZW5cbiAgYW5kIChtaW4tZGV2aWNlLXdpZHRoIDogMzIwcHgpXG4gIGFuZCAobWF4LWRldmljZS13aWR0aCA6IDMzMHB4KVxue1xuICAgIC5tYWluLWNvbnRhaW5lciB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1JTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA1JTtcbiAgICAgICAgbWFyZ2luLXRvcDowJTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNSU7XG4gICAgICB9XG4gICAgXG59XG5cbiJdfQ== */");

/***/ }),

/***/ "hxez":
/*!********************************************************!*\
  !*** ./src/app/pages/onboarding/intro/intro.module.ts ***!
  \********************************************************/
/*! exports provided: IntroPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPageModule", function() { return IntroPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _intro_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./intro-routing.module */ "KJnM");
/* harmony import */ var _intro_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./intro.page */ "l00f");







let IntroPageModule = class IntroPageModule {
};
IntroPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _intro_routing_module__WEBPACK_IMPORTED_MODULE_5__["IntroPageRoutingModule"]
        ],
        declarations: [_intro_page__WEBPACK_IMPORTED_MODULE_6__["IntroPage"]]
    })
], IntroPageModule);



/***/ }),

/***/ "l00f":
/*!******************************************************!*\
  !*** ./src/app/pages/onboarding/intro/intro.page.ts ***!
  \******************************************************/
/*! exports provided: IntroPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntroPage", function() { return IntroPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_intro_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./intro.page.html */ "1PsH");
/* harmony import */ var _intro_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intro.page.scss */ "fU9T");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @capacitor/core */ "gcOT");






const { Storage } = _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["Plugins"];
let IntroPage = class IntroPage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    introAction() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield Storage.set({
                key: 'showIntro',
                value: 'true'
            });
            console.log(`[IntroPage] introAction()`);
            this.router.navigate(['/home/initial']);
        });
    }
};
IntroPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
IntroPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-intro',
        template: _raw_loader_intro_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_intro_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], IntroPage);



/***/ })

}]);
//# sourceMappingURL=onboarding-intro-intro-module-es2015.js.map