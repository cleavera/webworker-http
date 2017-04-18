import { IHttpResponse } from "./IHttpResponse.interface";
export interface IHttp {
    getJSON(url: any, headers?: any): Promise<IHttpResponse>;
    options(url: any, headers?: any): Promise<IHttpResponse>;
    remove(url: any, headers?: any): Promise<IHttpResponse>;
    post(url: any, body: any, headers?: any): Promise<IHttpResponse>;
    put(url: any, body: any, headers?: any): Promise<IHttpResponse>;
}
