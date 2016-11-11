"use strict";
var WebWorker_service_1 = require('./WebWorker.service');
var Http = (function () {
    function Http() {
    }
    Http.getHttpWorker = function () {
        if (!window.$AnthonyCleaver) {
            window.$AnthonyCleaver = {};
        }
        if (!window.$AnthonyCleaver.PresentationGenerator) {
            window.$AnthonyCleaver.PresentationGenerator = {};
        }
        if (!window.$AnthonyCleaver.PresentationGenerator.HttpWebWorker) {
            window.$AnthonyCleaver.PresentationGenerator.HttpWebWorker = new WebWorker_service_1.$WebWorker($$Http);
        }
        return window.$AnthonyCleaver.PresentationGenerator.HttpWebWorker;
    };
    return Http;
}());
exports.Http = Http;
var $$Http = (function () {
    function $$Http() {
    }
    $$Http._parseHeaders = function (headers) {
        var out = {}, headerEntries = headers.entries(), header = headerEntries.next(), i = 0;
        while (!header.done) {
            out[header.value[0]] = header.value[1];
            header = headerEntries.next();
        }
        return out;
    };
    $$Http.getJSON = function (url) {
        var _this = this;
        return fetch(new Request(url)).then(function (response) {
            return response.json().then(function (body) {
                return { status: response.status, body: body, headers: _this._parseHeaders(response.headers) };
            });
        });
    };
    $$Http.options = function (url) {
        var _this = this;
        return fetch(new Request(url), { method: 'OPTIONS' }).then(function (response) {
            return response.json().then(function (body) {
                return { status: response.status, body: body, headers: _this._parseHeaders(response.headers) };
            });
        });
    };
    return $$Http;
}());
