(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["report-problem-report-problem-module"], {
    /***/
    "7mH+":
    /*!*********************************************************************!*\
      !*** ./src/app/pages/profile/report-problem/report-problem.page.ts ***!
      \*********************************************************************/

    /*! exports provided: ReportProblemPage */

    /***/
    function mH(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ReportProblemPage", function () {
        return ReportProblemPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_report_problem_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./report-problem.page.html */
      "YRjO");
      /* harmony import */


      var _report_problem_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./report-problem.page.scss */
      "Ul5q");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic-native/chooser/ngx */
      "UWV4");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/services/doole.service */
      "tE2R");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @capacitor/core */
      "gcOT");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ionic-native/file/ngx */
      "FAH8");

      var Camera = _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["Plugins"].Camera;

      var ReportProblemPage = /*#__PURE__*/function () {
        function ReportProblemPage(translate, router, dooleService, //private chooser: Chooser,
        //private sanitizer: DomSanitizer,
        fb, platform, file, loadingController, alertController) {
          _classCallCheck(this, ReportProblemPage);

          this.translate = translate;
          this.router = router;
          this.dooleService = dooleService;
          this.fb = fb;
          this.platform = platform;
          this.file = file;
          this.loadingController = loadingController;
          this.alertController = alertController;
          this.patient_files = []; //file: any;
          //file64: SafeResourceUrl;

          this.numFile = 0;
          this.images = [];
        }

        _createClass(ReportProblemPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.form = this.fb.group({
              category: [''],
              description: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__["Validators"].required]],
              images: [this.images]
            });
          }
        }, {
          key: "addImage",
          value: function addImage(source) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              var image, fileUri, filename;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return Camera.getPhoto({
                        quality: 60,
                        allowEditing: false,
                        resultType: _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["CameraResultType"].DataUrl,
                        source: source
                      })["catch"](function (e) {
                        console.log('cancelled');
                      });

                    case 2:
                      image = _context.sent;

                      if (image) {
                        console.log("image: ", image);
                        fileUri = _capacitor_core__WEBPACK_IMPORTED_MODULE_7__["Capacitor"].convertFileSrc(image.dataUrl);
                        filename = Date.now(); //new Date().getTime(); 

                        this.saveBase64(fileUri, filename.toString()).then(function (file) {
                          _this.patient_files.push({
                            name: filename + '.' + image.format,
                            file: file,
                            type: image.format
                          });

                          _this.form.patchValue({
                            images: 'data:' + "image/".concat(image.format) + ';base64,' + image.base64String
                          });

                          _this.numFile = _this.patient_files.length;
                        });
                      }

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
          /*    async addImage(source: CameraSource) {
              const image = await Camera.getPhoto({
                quality: 60,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source
              });
          
              if(image){
                console.log("image: ", image);
                var fileUri = Capacitor.convertFileSrc(image.dataUrl);
                console.log("addImage - savePicture fileUri: ", fileUri);
          
                this.images.push(fileUri)
                this.patient_files.push({ name: Date.now() + '.' + image.format, file: fileUri, type: image.format })
                this.form.patchValue({
                  images: 'data:' + `image/${image.format}` + ';base64,' + image.base64String
                });
                this.numFile = this.patient_files.length;
          
              }else{
                console.log("no image");
              }
            }  */

        }, {
          key: "selectImageSource",
          value: function selectImageSource() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      // Only allow file selection inside a browser
                      if (!this.platform.is('hybrid')) {
                        this.fileInput.nativeElement.click();
                      } else {
                        this.addImage(_capacitor_core__WEBPACK_IMPORTED_MODULE_7__["CameraSource"].Photos);
                      }

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "uploadFileFromBrowser",
          value: function uploadFileFromBrowser(event) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var eventObj, target, file, toBase64, result, base64result;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
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

                      _context3.next = 6;
                      return toBase64(file)["catch"](function (e) {
                        return Error(e);
                      });

                    case 6:
                      result = _context3.sent;
                      base64result = result; //console.log(" base64result.split(',')[1] ", base64result.split(',')[1]);

                      this.images.push(base64result);
                      this.patient_files.push({
                        name: file.name,
                        file: base64result,
                        type: file.type
                      });
                      this.numFile = this.patient_files.length;
                      this.form.patchValue({
                        images: result
                      });

                    case 12:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "openFile",
          value: function openFile(file) {
            console.log("[ReportProblemPage] openFile: ", file);
          }
        }, {
          key: "removeFile",
          value: function removeFile(name) {
            var _this2 = this;

            console.log("[ReportProblemPage] removeFile: ", name);
            this.patient_files.forEach(function (element, index) {
              if (element.name == name) _this2.patient_files.splice(index, 1);
            });
            this.numFile = this.patient_files.length;
          }
        }, {
          key: "submit",
          value: function submit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var res;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      res = this.patient_files[0].file;
                      console.log("[ReportProblemPage] submit()", res);

                      if (!this.platform.is('hybrid')) {
                        _context4.next = 5;
                        break;
                      }

                      _context4.next = 5;
                      return this.saveFile(res);

                    case 5:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          } // Save new diagnostic test

        }, {
          key: "sendProblemReport",
          value: function sendProblemReport() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var _this3 = this;

              var loading, category, description;
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      console.log('[ReportProblemPage] sendProblemReport()');
                      _context6.next = 3;
                      return this.loadingController.create();

                    case 3:
                      loading = _context6.sent;
                      _context6.next = 6;
                      return loading.present();

                    case 6:
                      category = this.form.get('category').value;
                      this.form.get('category').setValue(category);
                      description = this.form.get('description').value;
                      this.form.get('description').setValue(description);
                      this.patient_files.forEach(function (item) {
                        _this3.images.push(item.file);
                      });
                      this.form.get('images').setValue(this.images);
                      console.log("data:", this.images);
                      this.dooleService.postAPIReportProblem(
                      /* this.form.value */
                      this.images[0]).subscribe(function (data) {
                        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                          return regeneratorRuntime.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  console.log("data:", data);
                                  if (data.success) this.presentAlert(this.translate.instant("report_problem.alert_successful_response"));

                                case 2:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _callee5, this);
                        }));
                      }, function (error) {
                        // Called when error
                        loading.dismiss();
                        console.log("error: ", error);
                        throw new _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpErrorResponse"](error);
                      }, function () {
                        // Called when operation is complete (both success and error)
                        loading.dismiss();
                      });

                    case 14:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }, {
          key: "enableButtonAddFile",
          value: function enableButtonAddFile() {
            if (this.patient_files.length >= 6 || this.form.invalid) {
              return true;
            }

            return false;
          }
        }, {
          key: "goBacktoProfile",
          value: function goBacktoProfile() {
            if (this.form.valid || this.form.get('images').value.length > 0 || this.form.get('category').value.length > 0) {
              console.log("[ReportProblemPage] goBacktoProfile()", this.form.value);
              this.presentAlertConfirm();
            } else {
              this.router.navigateByUrl('/profile');
            }
          }
        }, {
          key: "presentAlertConfirm",
          value: function presentAlertConfirm() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var _this4 = this;

              var alert;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return this.alertController.create({
                        cssClass: 'my-alert-class',
                        header: this.translate.instant("report_problem.title_report_problem"),
                        message: this.translate.instant("report_problem.alert_confirm_exit"),
                        buttons: [{
                          text: this.translate.instant("alert.button_cancel"),
                          role: 'cancel',
                          cssClass: 'secondary',
                          handler: function handler(blah) {
                            console.log('Confirm Cancel: blah');
                          }
                        }, {
                          text: this.translate.instant("alert.button_ok"),
                          handler: function handler() {
                            console.log('Confirm Okay');

                            _this4.router.navigateByUrl('/profile');
                          }
                        }]
                      });

                    case 2:
                      alert = _context7.sent;
                      _context7.next = 5;
                      return alert.present();

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "presentAlert",
          value: function presentAlert(message) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var _this5 = this;

              var alert;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.alertController.create({
                        cssClass: 'my-alert-class',
                        message: message,
                        buttons: [{
                          text: this.translate.instant("alert.button_ok"),
                          handler: function handler() {
                            console.log('Confirm Okay');

                            _this5.router.navigateByUrl('/profile');
                          }
                        }],
                        backdropDismiss: false
                      });

                    case 2:
                      alert = _context8.sent;
                      _context8.next = 5;
                      return alert.present();

                    case 5:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "saveFile",
          value: function saveFile(data) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var _this6 = this;

              var loading;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return this.loadingController.create();

                    case 2:
                      loading = _context9.sent;
                      _context9.next = 5;
                      return loading.present();

                    case 5:
                      this.dooleService.uploadFile(data).then(function (res) {
                        var isSuccess = res.success;
                        if (isSuccess) _this6.presentAlert(_this6.translate.instant("report_problem.alert_successful_response"));else _this6.presentAlert(_this6.translate.instant("report_problem.alert_no_successful_response"));
                      })["catch"](function (err) {
                        console.log("Error uploadFile: ", err);
                        loading.dismiss();

                        _this6.presentAlert(err);
                      })["finally"](function () {
                        loading.dismiss();
                      });

                    case 6:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "savePicture",
          value: function savePicture(fileUri) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              var _this7 = this;

              var filename;
              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      console.log("[ReportProblemPage] savePicture() fileUri: ", fileUri); //const loading = await this.loadingController.create();
                      //await loading.present();

                      filename = new Date().getTime();
                      this.saveBase64(fileUri, filename.toString()).then(function (res) {
                        console.log("savePicture() saveBase64 res: ", res);

                        _this7.dooleService.uploadFile(res).then(function (data) {
                          console.log("savePicture() uploadFile res: ", res); //loading.dismiss();
                        })["catch"](function (err) {
                          console.log("Error uploadFile: ", err); //loading.dismiss();
                        })["finally"](function () {//loading.dismiss();
                        });
                      });

                    case 3:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, this);
            }));
          }
        }, {
          key: "saveBase64",
          value: function saveBase64(base64, name) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
              var realData = base64.split(",")[1];

              var blob = _this8.b64toBlob(realData, 'image/jpeg');

              _this8.file.writeFile(_this8.file.cacheDirectory, name, blob).then(function () {
                resolve(_this8.file.cacheDirectory + name);
              })["catch"](function (err) {
                console.log(err);
                console.log('error writing blob');
                reject(err);
              });
            });
          }
        }, {
          key: "b64toBlob",
          value: function b64toBlob(b64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 512;
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
            console.log("this is bob: ", blob);
            return blob;
          }
        }]);

        return ReportProblemPage;
      }();

      ReportProblemPage.ctorParameters = function () {
        return [{
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"]
        }, {
          type: src_app_services_doole_service__WEBPACK_IMPORTED_MODULE_6__["DooleService"]
        }, {
          type: _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormBuilder"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["Platform"]
        }, {
          type: _ionic_native_file_ngx__WEBPACK_IMPORTED_MODULE_12__["File"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["LoadingController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_9__["AlertController"]
        }];
      };

      ReportProblemPage.propDecorators = {
        fileInput: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"],
          args: ['fileInput', {
            "static": false
          }]
        }]
      };
      ReportProblemPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-report-problem',
        template: _raw_loader_report_problem_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        providers: [_ionic_native_chooser_ngx__WEBPACK_IMPORTED_MODULE_4__["Chooser"]],
        styles: [_report_problem_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], ReportProblemPage);
      /***/
    },

    /***/
    "S5g2":
    /*!***********************************************************************!*\
      !*** ./src/app/pages/profile/report-problem/report-problem.module.ts ***!
      \***********************************************************************/

    /*! exports provided: ReportProblemPageModule */

    /***/
    function S5g2(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ReportProblemPageModule", function () {
        return ReportProblemPageModule;
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


      var _report_problem_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./report-problem-routing.module */
      "SOt6");
      /* harmony import */


      var _report_problem_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./report-problem.page */
      "7mH+");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      "sYmb");
      /* harmony import */


      var src_app_components_components_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! src/app/components/components.module */
      "j1ZV");

      var ReportProblemPageModule = function ReportProblemPageModule() {
        _classCallCheck(this, ReportProblemPageModule);
      };

      ReportProblemPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], src_app_components_components_module__WEBPACK_IMPORTED_MODULE_8__["ComponentsModule"], _report_problem_routing_module__WEBPACK_IMPORTED_MODULE_5__["ReportProblemPageRoutingModule"]],
        declarations: [_report_problem_page__WEBPACK_IMPORTED_MODULE_6__["ReportProblemPage"]]
      })], ReportProblemPageModule);
      /***/
    },

    /***/
    "SOt6":
    /*!*******************************************************************************!*\
      !*** ./src/app/pages/profile/report-problem/report-problem-routing.module.ts ***!
      \*******************************************************************************/

    /*! exports provided: ReportProblemPageRoutingModule */

    /***/
    function SOt6(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ReportProblemPageRoutingModule", function () {
        return ReportProblemPageRoutingModule;
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


      var _report_problem_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./report-problem.page */
      "7mH+");

      var routes = [{
        path: '',
        component: _report_problem_page__WEBPACK_IMPORTED_MODULE_3__["ReportProblemPage"]
      }];

      var ReportProblemPageRoutingModule = function ReportProblemPageRoutingModule() {
        _classCallCheck(this, ReportProblemPageRoutingModule);
      };

      ReportProblemPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], ReportProblemPageRoutingModule);
      /***/
    },

    /***/
    "Ul5q":
    /*!***********************************************************************!*\
      !*** ./src/app/pages/profile/report-problem/report-problem.page.scss ***!
      \***********************************************************************/

    /*! exports provided: default */

    /***/
    function Ul5q(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "#container * {\n  margin: 0;\n  padding: 0;\n}\n\n#container {\n  width: 100%;\n}\n\n#left,\n#middle,\n#right {\n  display: inline-block;\n  *display: inline;\n  zoom: 1;\n  vertical-align: top;\n}\n\n#left {\n  width: 10%;\n}\n\n#middle {\n  vertical-align: bottom;\n  width: 75%;\n}\n\n#right {\n  vertical-align: bottom;\n  width: 10%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3JlcG9ydC1wcm9ibGVtLnBhZ2Uuc2NzcyIsInJlcG9ydC1wcm9ibGVtLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFNBQUE7RUFDQSxVQUFBO0FBQ0o7O0FBQ0U7RUFDRSxXQUFBO0FBRUo7O0FBQ0U7OztFQUdFLHFCQUFBO0dDRUYsZURERTtFQUNBLE9BQUE7RUFDQSxtQkFBQTtBQUVKOztBQUFFO0VBQ0UsVUFBQTtBQUdKOztBQURFO0VBQ0Usc0JBQUE7RUFDQSxVQUFBO0FBSUo7O0FBRkU7RUFDRSxzQkFBQTtFQUNBLFVBQUE7QUFLSiIsImZpbGUiOiJyZXBvcnQtcHJvYmxlbS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyICoge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG4gICNjb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICBcbiAgfVxuICAjbGVmdCxcbiAgI21pZGRsZSxcbiAgI3JpZ2h0IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgKmRpc3BsYXk6IGlubGluZTtcbiAgICB6b29tOiAxO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIH1cbiAgI2xlZnQge1xuICAgIHdpZHRoOiAxMCU7XG4gIH1cbiAgI21pZGRsZSB7XG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICB3aWR0aDogNzUlO1xuICB9XG4gICNyaWdodCB7XG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICB3aWR0aDogMTAlO1xuICB9IiwiI2NvbnRhaW5lciAqIHtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4jY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiNsZWZ0LFxuI21pZGRsZSxcbiNyaWdodCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgKmRpc3BsYXk6IGlubGluZTtcbiAgem9vbTogMTtcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcbn1cblxuI2xlZnQge1xuICB3aWR0aDogMTAlO1xufVxuXG4jbWlkZGxlIHtcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgd2lkdGg6IDc1JTtcbn1cblxuI3JpZ2h0IHtcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgd2lkdGg6IDEwJTtcbn0iXX0= */";
      /***/
    },

    /***/
    "YRjO":
    /*!*************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/profile/report-problem/report-problem.page.html ***!
      \*************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function YRjO(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-button slot=\"start\" fill=\"clear\" (click)=\"goBacktoProfile()\">{{'alert.button_cancel' | translate }}\n     <!--  <ion-back-button icon=\"\" text=\"\" ></ion-back-button> -->\n    </ion-button>\n    <ion-title>{{'report_problem.title_report_problem' | translate }}</ion-title>\n    <ion-button slot=\"end\" fill=\"clear\" (click)=\"submit()\">\n      {{'report_problem.button_send' | translate }}\n    </ion-button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class=\"cardProfile\">\n    <form (ngSubmit)=\"submit()\" [formGroup]=\"form\">\n    <ion-list>\n      <ion-item>\n        <ion-label>{{'report_problem.subtitle_category' | translate }}</ion-label>\n        <ion-icon name=\"chevron-forward-outline\" slot=\"end\" size=\"small\"></ion-icon>\n        <ion-input formControlName=\"category\"></ion-input>\n      </ion-item>\n      <ion-item >\n        <ion-label>{{'report_problem.subtitle_description' | translate }}</ion-label>\n        <ion-textarea\n        formControlName=\"description\"\n      ></ion-textarea>       \n      </ion-item>\n      <ion-item lines=\"none\" >\n        <ion-label>{{'report_problem.subtitle_screenshot' | translate }}</ion-label>\n        <ion-label slot=\"end\">{{this.numFile}}/6</ion-label>\n      </ion-item>\n      <ion-item lines=\"none\">\n        <ion-label>{{'report_problem.description_screenshot' | translate }}</ion-label>\n      </ion-item>\n      <ion-item lines=\"none\" *ngIf=\"this.patient_files.length > 0\">\n        <div id=\"container\" style=\"margin-top: 10px;\">\n          <div *ngFor=\"let file of this.patient_files\">\n            <!-- <ion-card class=\"cardProfile\"> -->\n              <div id=\"left\">\n                <ion-icon name=\"open\" color=\"primary\" (click)=\"openFile(file)\"></ion-icon>\n              </div>\n              <div id=\"middle\">\n                <p class=\"titule\">{{ file.name }}</p>\n              </div>\n              <div id=\"right\">\n                <ion-icon name=\"close-circle\" color=\"primary\" (click)=\"removeFile(file.name)\"></ion-icon>\n              </div> \n          <!-- </ion-card> -->\n          </div>       \n        </div>\n      </ion-item>\n      <input\n      type=\"file\"\n      #fileInput\n      (change)=\"uploadFileFromBrowser($event)\"\n      hidden=\"true\"\n      accept=\"image/*\">\n\n      <ion-button slot=\"start\" \n      fill=\"clear\" \n      (click)=\"selectImageSource()\"\n      [disabled]=\"enableButtonAddFile()\">{{'report_problem.button_add_file' | translate }}\n      </ion-button>\n    </ion-list>\n  </form>\n  </ion-card>\n</ion-content>\n";
      /***/
    }
  }]);
})();
//# sourceMappingURL=report-problem-report-problem-module-es5.js.map