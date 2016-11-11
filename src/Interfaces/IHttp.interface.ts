import {IHttpResponse} from "./IHttpResponse.interface";

export interface IHttp {
    getJSON(url): Promise<IHttpResponse>;

    options(url): Promise<IHttpResponse>;

    remove(url): Promise<IHttpResponse>;

    post(url, body): Promise<IHttpResponse>;

    put(url, body): Promise<IHttpResponse>;
}