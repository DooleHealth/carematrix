'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var Base64 = /** @class */ (function (_super) {
    tslib.__extends(Base64, _super);
    function Base64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Base64.prototype.encodeFile = function (filePath) { return core.cordova(this, "encodeFile", {}, arguments); };
    Base64.pluginName = "Base64";
    Base64.plugin = "com-badrit-base64";
    Base64.pluginRef = "plugins.Base64";
    Base64.repo = "https://github.com/hazemhagrass/phonegap-base64";
    Base64.platforms = ["Android", "iOS"];
    Base64.decorators = [
        { type: core$1.Injectable }
    ];
    return Base64;
}(core.IonicNativePlugin));

exports.Base64 = Base64;
