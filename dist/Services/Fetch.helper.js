"use strict";
var Http_service_1 = require('./Http.service');
function appendLocalHost(url) {
    if (url.substr(0, 1) !== '/') {
        return url;
    }
    return window.location.protocol + '//' + window.location.host + url;
}
function $fetch(url) {
    var httpWorker = Http_service_1.Http.getHttpWorker();
    return httpWorker.getJSON(appendLocalHost(url));
}
exports.$fetch = $fetch;
