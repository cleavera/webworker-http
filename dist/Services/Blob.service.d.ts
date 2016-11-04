export declare class $Blob {
    private _url;
    blob: Blob;
    constructor(blob: Blob);
    encode(): any;
    getURL(): string;
    remove(): void;
    static fromString(str: string): $Blob;
    static fromBlob(blob: Blob): $Blob;
}
