export declare class $Blob {
    private _url;
    blob: Blob;
    constructor(blob: Blob);
    encode(): Promise<{}>;
    getURL(): string;
    remove(): void;
    static fromString(str: string): $Blob;
    static fromBlob(blob: Blob): $Blob;
}
