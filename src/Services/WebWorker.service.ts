import {$Blob} from './Blob.service'
import {$uniqueId} from './UniqueId.helper'
import {$partial} from './Partial.helper'

export class $WebWorker {
  private _promise: any;
  private _blob: $Blob;
  private _worker: Worker;

  constructor(service: any) {
    var workerBlob = this._spawnWorker(service);

    this._blob = workerBlob.blob;
    this._worker = workerBlob.worker;
    this._promise = {};

    this._worker.onmessage = e => {
      var data = e.data;

      if (data.success === true) {
        this._promise[data.callId].resolve(data.result);
      } else {
        this._promise[data.callId].reject(data.result);
      }
    };
  }

  private _callMethod(methodName, ...params) {
    return new Promise((resolve, reject) => {
      var id = $uniqueId('$WebWorkerCall');

      this._promise[id] = { resolve: resolve, reject: reject };

      this._worker.postMessage({
        callId: id,
        command: methodName,
        params: params
      });
    });
  }

  private _spawnWorker(functions: any) {
    var workerSource = 'var _commands = {};\n\n',
      funcs = Object.keys(functions);

    funcs.forEach(name => {
      workerSource += `_commands['${name}'] = ${functions[name].toString()};\n`;
      this[name] = $partial(this._callMethod, name);
    });

    workerSource += `
      addEventListener('message', function(e) {
        var data = e.data;

        Promise.resolve(_commands[data.command].apply(_commands, data.params)).then(function(result) {
          postMessage({
            callId: data.callId,
            result: result,
            success: true
          });
        }, function(result) {
          postMessage({
            callId: data.callId,
            result: result,
            success: false
          });
        });
      });`;

    var workerBlob = $Blob.fromString(workerSource);

    return {
      blob: workerBlob,
      worker: new Worker(workerBlob.getURL())
    };
  }
}
