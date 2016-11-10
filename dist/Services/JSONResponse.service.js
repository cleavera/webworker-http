"use strict";
var JSONResponse = (function () {
    function JSONResponse(response) {
        this.headers = response.headers;
        this.status = response.status;
        this.body = response.json();
    }
    return JSONResponse;
}());
exports.JSONResponse = JSONResponse;
