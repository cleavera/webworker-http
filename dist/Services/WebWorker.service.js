"use strict";
var Blob_service_1 = require('./Blob.service');
var UniqueId_helper_1 = require('./UniqueId.helper');
var Partial_helper_1 = require('./Partial.helper');
var $WebWorker = (function () {
    function $WebWorker(service) {
        var _this = this;
        var workerBlob = this._spawnWorker(service);
        this._blob = workerBlob.blob;
        this._worker = workerBlob.worker;
        this._promise = {};
        this._worker.onmessage = function (e) {
            var data = e.data;
            if (data.success === true) {
                _this._promise[data.callId].resolve(data.result);
            }
            else {
                _this._promise[data.callId].reject(data.result);
            }
        };
    }
    $WebWorker.prototype._callMethod = function (methodName) {
        var _this = this;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var id = UniqueId_helper_1.$uniqueId('$WebWorkerCall');
            _this._promise[id] = { resolve: resolve, reject: reject };
            _this._worker.postMessage({
                callId: id,
                command: methodName,
                params: params
            });
        });
    };
    $WebWorker.prototype._spawnWorker = function (functions) {
        var _this = this;
        var workerSource = 'var _commands = {};\n\n', funcs = Object.keys(functions);
        funcs.forEach(function (name) {
            workerSource += "_commands['" + name + "'] = " + functions[name].toString() + ";\n";
            _this[name] = Partial_helper_1.$partial(_this._callMethod, name);
        });
        workerSource += "\n      addEventListener('message', function(e) {\n        var data = e.data;\n\n        Promise.resolve(_commands[data.command].apply(_commands, data.params)).then(function(result) {\n          postMessage({\n            callId: data.callId,\n            result: result,\n            success: true\n          });\n        }, function(result) {\n          postMessage({\n            callId: data.callId,\n            result: result,\n            success: false\n          });\n        });\n      });";
        var workerBlob = Blob_service_1.$Blob.fromString(workerSource);
        return {
            blob: workerBlob,
            worker: new Worker(workerBlob.getURL())
        };
    };
    return $WebWorker;
}());
exports.$WebWorker = $WebWorker;
