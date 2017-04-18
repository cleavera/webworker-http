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
        var out = {}, headerEntries = headers.entries(), header = headerEntries.next();
        while (!header.done) {
            out[header.value[0]] = header.value[1];
            header = headerEntries.next();
        }
        return out;
    };
    $$Http._parseResponse = function (response) {
        var _this = this;
        var code = response.status;
        var isSuccessfulResponse = Math.floor(code / 100) === 2;
        return response.json().then(function (body) {
            if (isSuccessfulResponse) {
                return { status: response.status, body: body, headers: _this._parseHeaders(response.headers) };
            }
            return Promise.reject({ status: response.status, body: body, headers: _this._parseHeaders(response.headers) });
        });
    };
    $$Http._createRequest = function (url, method, headers, body) {
        if (method === void 0) { method = 'GET'; }
        if (headers === void 0) { headers = {}; }
        if (!('Content-Type' in headers)) {
            headers['Content-Type'] = 'application/json';
        }
        if (body) {
            return new Request(url, {
                method: method,
                body: JSON.stringify(body),
                headers: new Headers(headers)
            });
        }
        return new Request(url, {
            method: method,
            headers: new Headers(headers)
        });
    };
    $$Http.getJSON = function (url, headers) {
        var _this = this;
        return fetch(this._createRequest(url, 'GET', headers)).then(function (response) { return _this._parseResponse(response); });
    };
    $$Http.options = function (url, headers) {
        var _this = this;
        return fetch(this._createRequest(url, 'OPTIONS', headers)).then(function (response) { return _this._parseResponse(response); });
    };
    $$Http.remove = function (url, headers) {
        var _this = this;
        return fetch(this._createRequest(url, 'DELETE', headers)).then(function (response) {
            return { status: response.status, headers: _this._parseHeaders(response.headers) };
        });
    };
    $$Http.post = function (url, body, headers) {
        var _this = this;
        return fetch(this._createRequest(url, 'POST', headers, body)).then(function (response) { return _this._parseResponse(response); });
    };
    $$Http.put = function (url, body, headers) {
        var _this = this;
        return fetch(this._createRequest(url, 'PUT', headers, body)).then(function (response) { return _this._parseResponse(response); });
    };
    return $$Http;
}());
