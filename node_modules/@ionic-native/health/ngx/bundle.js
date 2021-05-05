'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core = require('@ionic-native/core');
var core$1 = require('@angular/core');

var Health = /** @class */ (function (_super) {
    tslib.__extends(Health, _super);
    function Health() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Health.prototype.isAvailable = function () { return core.cordova(this, "isAvailable", { "callbackOrder": "reverse" }, arguments); };
    Health.prototype.promptInstallFit = function () { return core.cordova(this, "promptInstallFit", { "callbackOrder": "reverse" }, arguments); };
    Health.prototype.requestAuthorization = function (datatypes) { return core.cordova(this, "requestAuthorization", {}, arguments); };
    Health.prototype.isAuthorized = function (datatypes) { return core.cordova(this, "isAuthorized", {}, arguments); };
    Health.prototype.query = function (queryOptions) { return core.cordova(this, "query", {}, arguments); };
    Health.prototype.queryAggregated = function (queryOptionsAggregated) { return core.cordova(this, "queryAggregated", {}, arguments); };
    Health.prototype.store = function (storeOptions) { return core.cordova(this, "store", {}, arguments); };
    Health.pluginName = "Health";
    Health.plugin = "cordova-plugin-health";
    Health.pluginRef = "navigator.health";
    Health.repo = "https://github.com/dariosalvi78/cordova-plugin-health";
    Health.platforms = ["Android", "iOS"];
    Health.decorators = [
        { type: core$1.Injectable }
    ];
    return Health;
}(core.IonicNativePlugin));

exports.Health = Health;
