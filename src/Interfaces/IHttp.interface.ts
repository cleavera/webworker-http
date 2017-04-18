import {IHttpResponse} from "./IHttpResponse.interface";

export interface IHttp {
    getJSON(url, headers?: any): Promise<IHttpResponse>;

    options(url, headers?: any): Promise<IHttpResponse>;

    remove(url, headers?: any): Promise<IHttpResponse>;

    post(url, body, headers?: any): Promise<IHttpResponse>;

    put(url, body, headers?: any): Promise<IHttpResponse>;
}