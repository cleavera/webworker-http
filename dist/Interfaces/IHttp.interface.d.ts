import { IHttpResponse } from "./IHttpResponse.interface";
export interface IHttp {
    getJSON(url: any): Promise<IHttpResponse>;
    options(url: any): Promise<IHttpResponse>;
    remove(url: any): Promise<IHttpResponse>;
    post(url: any, body: any): Promise<IHttpResponse>;
    put(url: any, body: any): Promise<IHttpResponse>;
}
