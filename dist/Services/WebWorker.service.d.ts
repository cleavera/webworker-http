export declare class $WebWorker {
    private _promise;
    private _blob;
    private _worker;
    constructor(service: any);
    private _callMethod(methodName, ...params);
    private _spawnWorker(functions);
}
