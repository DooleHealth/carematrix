(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["legal-legal-module"], {
    /***/
    "DGV+":
    /*!*****************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/legal/legal.page.html ***!
      \*****************************************************************************************/

    /*! exports provided: default */

    /***/
    function DGV(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n        <ion-back-button\n            [text]=\"buttonText\"\n            [icon]=\"buttonIcon\">\n        </ion-back-button>\n      </ion-buttons>\n    <ion-title class=\"toolbarTitle\" >{{ 'legal.header' | translate}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <div class=\"main-container\" *ngIf=\"this.legal !== undefined\">\n    <p align=\"center\">\n      <strong>{{this.legal.title}}</strong>\n  </p>\n  <div *ngFor=\"let paragraph of legal.introduction\">\n    <p>\n        <em>\n            {{paragraph}}\n        </em>\n    </p>\n    <p>\n        <em> </em>\n    </p>\n  </div>\n\n    <div *ngFor=\"let section of legal.sections\">\n        <p>\n            <strong>{{section.title}}</strong>\n        </p>\n        <div *ngIf=\"section.description !== undefined\">\n            <p *ngFor=\"let description of section.description\">\n                {{description}}\n            </p>\n        </div>\n    </div>\n\n  <p>\n      <strong>1.1.- Identificación de responsables:</strong>\n  </p>\n  <p>\n      El responsable del tratamiento es la Fundación FLS de Lucha contra el Sida,\n      las enfermedades infecciosas y la promoción de la salud y la ciencia, con\n      domicilio en Badalona (08916), Ctra. de Canyet s / n - Hosp. Univ. Germans\n  Trias i Pujol, 2ª planta Maternal, teléfono: (+34) 934 657 897    <strong></strong>\n  </p>\n  <p>\n      El delegado de protección de datos es CIPDI Tratamiento de la Infomación SL\n  Puede contactar con el delegado al correo electrónico    <a href=\"mailto:lopd@flsida.org\">lopd@flsida.org</a>\n  </p>\n  <p>\n      <strong>1.2.- Finalidades de tratamiento y base jurídica</strong>\n  </p>\n  <p>\n      <strong>1.2.1.- Finalidad general.</strong>\n  </p>\n  <p>\n      Los datos que nos facilite mediante esta aplicación, los que nos envíe a\n      nuestra dirección de correo electrónico y los que se puedan generar\n      mientras mantenga relación con el responsable del tratamiento se\n      incorporarán, <em>tal como nos las ceda</em>, a una base de datos\n      titularidad del responsable del tratamiento.\n      <em>\n          Para poder utilizar la aplicación puede ser necesario ponerla en\n          contacto en su nombre con los datos de su proveedor de servicios de\n          salud o socio-sanitarios. Al aceptar estas cláusulas usted autoriza\n          este tratamiento de datos.\n      </em>\n  </p>\n  <p>\n      <em>Sólo utilizaremos los datos para prestarle los servicios</em>\n      que nos solicite y para enviar información de nuestras actividades por\n      correo electrónico o dirección postal.\n  </p>\n  <p>\n      La base jurídica de este tratamiento será la relación contractual que\n      mantenga con el responsable del tratamiento y el consentimiento que otorga\n      al aceptar este aviso.\n  </p>\n  <p>\n      <strong>1.2.2.- Tratamiento de imágenes</strong>\n  </p>\n  <p>\n      Desde la propia aplicación usted puede personalizar su perfil de usuario y\n      puede subir a su perfil fotografías de sus pruebas o informes.\n  </p>\n  <p>\n      El tratamiento de estas imágenes está legitimado con el consentimiento de\n      los afectados o en aplicación del artículo 8 de la LO 1/1982 de protección\n      del derecho al honor, la intimidad y la propia imagen\n  </p>\n  <p>\n      <strong>1.3.- Categorías de destinatarios</strong>\n      .\n  </p>\n  <p>\n      Para dar cumplimiento a las anteriores finalidades tendrán acceso a sus\n      datos:\n  </p>\n  <p>\n      ● El personal debidamente autorizado por la dirección del responsable del\n      tratamiento\n  </p>\n  <p>\n  ● Los proveedores necesarios para dar cumplimiento a su demanda.    <em>La Fundación</em> ha firmado contratos de confidencialidad con todos\n      estos proveedores y, en especial, con aquellos que se dedican al\n      alojamiento de datos.\n  </p>\n  <p>\n      ● La administración pública en el ámbito de sus competencias.\n  </p>\n  <p>\n      Puede ampliar esta información consultando al DPO\n  </p>\n  <p>\n      <strong>1.4.- Transferencia internacional de datos</strong>\n  </p>\n  <p>\n      Para desarrollar sus funciones el responsable del tratamiento no cede, ni\n      deposita datos fuera de la Unión Europea.\n  </p>\n  <p>\n      <strong>1.5.- Plazo de conservación de la información.</strong>\n  </p>\n  <p>\n      El responsable del tratamiento conservará su información mientras no\n      revoque el consentimiento otorgado en aceptar esta cláusula.\n  </p>\n  <p>\n      <strong>1.6.- Derechos como afectado</strong>\n  </p>\n  <p>\n      Tiene derecho a acceder, rectificar, suprimir, oponerse a que sus datos se\n      traten, a limitar el tratamiento, a pedir la portabilidad de los datos, a\n      no ser sometido a decisiones individuales automatizadas y a revocar el\n      consentimiento que otorga.\n  </p>\n  <p>\n      Para ejercer estos derechos puede dirigirse por escrito a las direcciones\n      del responsable del tratamiento que constan en este aviso legal.\n  </p>\n  <p>\n      <strong> 1.7.- Derecho de reclamación.</strong>\n  </p>\n  <p>\n      El organismo competente para conocer de la correcta aplicación de las\n      normas sobre tratamiento de la información es la Autoridad de Protección de\n      Datos, con domicilio en la Calle Jorge Juan n. 6 de Madrid.\n  </p>\n  <p>\n      <strong>1.8.- Obligaciones del afectado.</strong>\n  </p>\n  <p>\n      El afectado debe aportar información veraz y actualizada en todos los\n      procesos de recogida de datos, siendo él el único responsable de la\n      vulneración de esta obligación.\n      <em>\n          Además debe considerar que aquellos datos que aporte en nombre propio\n          relacionados con su salud o situación sociosanitaria pueden tener\n          implicaciones en las decisiones del profesional que las reciba por lo\n          que la equivocación o engaño serán responsabilidad del usuario.\n      </em>\n  </p>\n  <p>\n      En los formularios de recogida de datos están marcados los datos que son\n      obligatorios aportar, en función de la demanda que haga el afectado. La\n      falta de la aportación de estos datos puede suponer la imposibilidad de\n      participar de la actividad o proporcionar el servicio que se solicita.\n  </p>\n  <p>\n      <strong>1.9.- Elaboración de perfiles</strong>\n  </p>\n  <p>\n      Para el cumplimiento de los objetivos del responsable del tratamiento y,\n      sobre todo, para hacer una atención más personalizada, cuidadosa y eficaz\n      del usuario, a veces, es necesario elaborar perfiles de los destinatarios\n  de los servicios. En ningún caso, la elaboración del perfil    <em>se hace de manera exclusivamente automatizada.</em>\n  </p>\n  <p>\n      <strong>2. CONSENTIMIENTO DEL USUARIO</strong>\n  </p>\n  <p>\n      Se entiende que el usuario acepta las condiciones establecidas\n      <em>\n          si pulsa el botón 'ACEPTAR' que se encuentra en todos los formularios\n          de recogida de datos, o si envía un mensaje por cualquiera de los\n          sistemas de comunicación existentes en la propia App o por correo\n          electrónico.\n      </em>\n  </p>\n  <p>\n      <strong> </strong>\n  </p>\n  <p>\n      <strong>3. SEGURIDAD</strong>\n      <em></em>\n  </p>\n  <p>\n      <em>\n          Los datos personales se guardan en la base de datos general de\n          administración de la Fundación que, en todo caso, garantiza las medidas\n          técnicas y organizativas para preservar la integridad y la seguridad de\n          la información que trata.\n      </em>\n  </p>\n  <p>\n      <strong> </strong>\n  </p>\n  <ion-item lines=\"none\">\n  <ion-checkbox color=\"primary\" [(ngModel)]=\"this.isChecked\" style=\"margin-right: 5px;\"></ion-checkbox>\n  <ion-label>{{ 'legal.acept_conditions_label' | translate}}</ion-label>\n</ion-item>\n  <ion-button type=\"button\" color=\"primary\" expand=\"block\" class=\"enter-btn\" (click)=\"acceptLegalConditions()\" [disabled]=\"!this.isChecked\">\n    {{ 'legal.next_button' | translate}}\n</ion-button>\n  </div>\n</ion-content>\n";
      /***/
    },

    /***/
    "IWm/":
    /*!*************************************************!*\
      !*** ./src/app/pages/login/legal/legal.page.ts ***!
      \*************************************************/

    /*! exports provided: LegalPage */

    /***/
    function IWm(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LegalPage", function () {
        return LegalPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_legal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./legal.page.html */
      "DGV+");
      /* harmony import */


      var _legal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./legal.page.scss */
      "OfTL");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");

      var Storage = _capacitor_core__WEBPACK_IMPORTED_MODULE_5__["Plugins"].Storage;

      var LegalPage = /*#__PURE__*/function () {
        function LegalPage(router, translate, alertController, dooleService) {
          _classCallCheck(this, LegalPage);

          this.router = router;
          this.translate = translate;
          this.alertController = alertController;
          this.dooleService = dooleService;
          this.KEY_LOCAL_STORAGE = 'showIntro';
          this.isChecked = false;
        }

        _createClass(LegalPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.getLegalInformation();
          }
        }, {
          key: "getLegalInformation",
          value: function getLegalInformation() {
            var _this = this;

            this.dooleService.getAPILegalInformation().subscribe(function (res) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = console;
                        _context.next = 3;
                        return res;

                      case 3:
                        _context.t1 = _context.sent;

                        _context.t0.log.call(_context.t0, '[LegalPage] getAPILegalInformation()', _context.t1);

                        this.legal = res; //this.showInformation()

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }, function (err) {
              console.log('getAll ERROR(' + err.code + '): ' + err.message);
              throw err;
            });
          }
        }, {
          key: "acceptLegalConditions",
          value: function acceptLegalConditions() {
            this.sendLegalConformation();
          }
        }, {
          key: "sendLegalConformation",
          value: function sendLegalConformation() {
            var _this2 = this;

            this.dooleService.postAPILegalConfirmation(this.isChecked).subscribe(function (res) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var legal;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = console;
                        _context2.next = 3;
                        return res;

                      case 3:
                        _context2.t1 = _context2.sent;

                        _context2.t0.log.call(_context2.t0, '[LegalPage] sendLegalConformation()', _context2.t1);

                        legal = res.success;

                        if (legal) {
                          this.router.navigate(['/sms']);
                        } //else this.dooleService.presentAlert("Server response is false ")


                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));
            }, function (err) {
              console.log('getAll ERROR(' + err.code + '): ' + err.message);

              _this2.dooleService.presentAlert(err.message);

              throw err;
            });
          }
        }, {
          key: "getStorage",
          value: function getStorage() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this3 = this;

              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      Storage.get({
                        key: this.KEY_LOCAL_STORAGE
                      }).then(function (data) {
                        //console.log(`[IntroPage] ngOnInit()`,data.value.toString());
                        var showIntro = Boolean(data.value);

                        if (showIntro) {
                          console.log("[IntroPage] ngOnInit() localStorage", showIntro);

                          _this3.router.navigate(['/home/initial']);
                        } else {
                          _this3.router.navigate(['/intro']);
                        }
                      });

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return LegalPage;
      }();

      LegalPage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }, {
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["AlertController"]
        }, {
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_8__["DooleService"]
        }];
      };

      LegalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-legal',
        template: _raw_loader_legal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_legal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], LegalPage);
      /***/
    },

    /***/
    "OfTL":
    /*!***************************************************!*\
      !*** ./src/app/pages/login/legal/legal.page.scss ***!
      \***************************************************/

    /*! exports provided: default */

    /***/
    function OfTL(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsZWdhbC5wYWdlLnNjc3MifQ== */";
      /***/
    },

    /***/
    "XR32":
    /*!***************************************************!*\
      !*** ./src/app/pages/login/legal/legal.module.ts ***!
      \***************************************************/

    /*! exports provided: LegalPageModule */

    /***/
    function XR32(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LegalPageModule", function () {
        return LegalPageModule;
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


      var _legal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./legal-routing.module */
      "cy4f");
      /* harmony import */


      var _legal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./legal.page */
      "IWm/");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");

      var LegalPageModule = function LegalPageModule() {
        _classCallCheck(this, LegalPageModule);
      };

      LegalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], _legal_routing_module__WEBPACK_IMPORTED_MODULE_5__["LegalPageRoutingModule"]],
        declarations: [_legal_page__WEBPACK_IMPORTED_MODULE_6__["LegalPage"]]
      })], LegalPageModule);
      /***/
    },

    /***/
    "cy4f":
    /*!***********************************************************!*\
      !*** ./src/app/pages/login/legal/legal-routing.module.ts ***!
      \***********************************************************/

    /*! exports provided: LegalPageRoutingModule */

    /***/
    function cy4f(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LegalPageRoutingModule", function () {
        return LegalPageRoutingModule;
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


      var _legal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./legal.page */
      "IWm/");

      var routes = [{
        path: '',
        component: _legal_page__WEBPACK_IMPORTED_MODULE_3__["LegalPage"]
      }, {
        path: 'sms',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | sms-sms-module */
          "sms-sms-module").then(__webpack_require__.bind(null,
          /*! ../sms/sms.module */
          "o3pB")).then(function (m) {
            return m.SmsPageModule;
          });
        }
      }];

      var LegalPageRoutingModule = function LegalPageRoutingModule() {
        _classCallCheck(this, LegalPageRoutingModule);
      };

      LegalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], LegalPageRoutingModule);
      /***/
    }
  }]);
})();
//# sourceMappingURL=legal-legal-module-es5.js.map