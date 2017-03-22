"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
  * WebService
  * Joe Booth:  Angular 2 Succinctly
  *
  * Sample HTTP calls:
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
require('rxjs/Rx');
var WebService = (function () {
    function WebService(_http) {
        this._http = _http;
        this._IPURL = "http://ip.jsontest.com";
        this._MD5URL = "http://md5.jsontest.com?text=";
    }
    WebService.prototype.getIP = function () {
        return this._http.get(this._IPURL)
            .map(this.extractIP)
            .catch(this.handleError);
    };
    WebService.prototype.getMD5 = function (str) {
        var finalUrl = this._MD5URL + encodeURI(str);
        return this._http.get(finalUrl)
            .map(this.extractMD5);
    };
    /* Private methods to support http calls */
    WebService.prototype.extractIP = function (res) {
        var body = res.json();
        return body.ip || {};
    };
    WebService.prototype.extractMD5 = function (res) {
        var body = res.json();
        return body.md5 || {};
    };
    WebService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Rx_1.Observable.throw(errMsg);
    };
    WebService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], WebService);
    return WebService;
}());
exports.WebService = WebService;
//# sourceMappingURL=WebService.js.map